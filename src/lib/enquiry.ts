// The enquiry path (website ticket 02). Email is the source of truth; external
// services are passed in so tests can stand in for them at the boundary.

import { PATHS } from './paths';
import type { RateLimiter } from './rate-limit';

// Every enquiry field in one place: its form name, its label in the email, its
// Airtable column, how the form asks for it when missing (null if optional),
// and what the email shows when it is left blank. Budget especially is soft
// (decisions §3).
export const FIELDS = [
  { key: 'name', label: 'Name', column: 'Name', missing: 'your name', blank: '' },
  { key: 'email', label: 'Email', column: 'Email', missing: 'an email address we can reply to', blank: '' },
  { key: 'date', label: 'Date', column: 'Date', missing: 'the date', blank: '' },
  { key: 'town', label: 'Town or venue', column: 'Town', missing: 'the town or venue', blank: '' },
  { key: 'eventType', label: 'Event', column: 'Event', missing: 'what you are planning', blank: '' },
  { key: 'scale', label: 'Scale', column: 'Scale', missing: null, blank: '—' },
  { key: 'colours', label: 'Colours', column: 'Colours', missing: null, blank: '—' },
  { key: 'budget', label: 'Budget', column: 'Budget', missing: null, blank: 'not given' },
  { key: 'latex', label: 'Latex allergy', column: 'Latex allergy', missing: null, blank: 'none mentioned' },
  { key: 'source', label: 'Heard about us', column: 'Heard about us', missing: null, blank: 'not given' },
] as const;

// What the form offers under "What are you planning?", and so the only event
// types the server accepts.
export const EVENT_TYPES = [
  ...Object.entries(PATHS).map(([value, path]) => ({ value, label: path.enquiryLabel })),
  { value: 'other', label: 'Something else' },
];

// Every answer is one line of at most this many characters. The form sets the
// same cap, so only a hand-built request is ever cut short.
export const MAX_FIELD_LENGTH = 500;

export type Enquiry = Record<(typeof FIELDS)[number]['key'], string>;

export interface EnquiryEmail {
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
}

export interface EnquiryDeps {
  recipients: string[];
  mailer: { send(email: EnquiryEmail): Promise<void> };
  mirror: { append(enquiry: Enquiry): Promise<void> };
  log: (message: string) => void;
  limiter: RateLimiter;
  /** How long the email may take before the visitor is told it failed. */
  mailTimeoutMs: number;
  /** How long the mirror may take before the visitor stops waiting for it. */
  mirrorTimeoutMs: number;
}

// Deliberately not a name a browser or password manager would autofill (the
// old name, "website", was): a filled honeypot drops the enquiry silently.
export const HONEYPOT = 'enquiry_ref';

function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  // An impossible date such as 30 February either fails to parse or rolls over.
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

// Required fields with a shape of their own; the rest only need an answer.
const VALID: Partial<Record<keyof Enquiry, (value: string) => boolean>> = {
  email: (value) => /^[^\s@]+@[^\s@]+$/.test(value),
  date: isCalendarDate,
  eventType: (value) => EVENT_TYPES.some((t) => t.value === value),
};

/** Required fields that are blank or unusable, which the form asks for again. */
function missingFields(enquiry: Enquiry): string[] {
  return FIELDS.filter((f) => f.missing !== null)
    .filter((f) => !(VALID[f.key]?.(enquiry[f.key]) ?? enquiry[f.key] !== ''))
    .map((f) => f.key);
}

function readEnquiry(form: FormData): Enquiry {
  return Object.fromEntries(
    FIELDS.map((f) => [
      f.key,
      String(form.get(f.key) ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_FIELD_LENGTH),
    ]),
  ) as Enquiry;
}

/** Back to the form, naming what is missing and carrying what was typed. */
function bounceTo(enquiry: Enquiry, missing: string[]): string {
  const params = new URLSearchParams({ missing: missing.join(',') });
  for (const f of FIELDS) if (enquiry[f.key] !== '') params.set(f.key, enquiry[f.key]);
  return `/enquire?${params}`;
}

function compose(enquiry: Enquiry, to: string[]): EnquiryEmail {
  const lines = FIELDS.map((f) => `${f.label}: ${enquiry[f.key] || f.blank}`);
  return {
    to,
    replyTo: enquiry.email,
    subject: `Enquiry: ${enquiry.eventType}, ${enquiry.date}, ${enquiry.town}`,
    text: lines.join('\n'),
  };
}

const describe = (error: unknown) => (error instanceof Error ? error.message : String(error));

function withTimeout<T>(work: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms);
  });
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer));
}

const redirect = (location: string) =>
  new Response(null, { status: 303, headers: { location } });

export async function handleEnquiry(request: Request, deps: EnquiryDeps): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response('Expected a form submission.', { status: 400 });
  }

  // A hidden field no person sees. Bots fill it; they get the same thank-you
  // page as everyone else, so there is nothing to learn from probing. Logged,
  // so a real enquiry dropped this way leaves a trace.
  if (String(form.get(HONEYPOT) ?? '') !== '') {
    deps.log('Enquiry dropped: the honeypot field was filled');
    return redirect('/enquire/thanks');
  }

  // Validate before counting, so correcting a bounced form costs nothing.
  const enquiry = readEnquiry(form);
  const missing = missingFields(enquiry);
  if (missing.length > 0) return redirect(bounceTo(enquiry, missing));

  const sender = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (!deps.limiter.allow(sender)) {
    deps.log(`Enquiry rate-limited for ${sender}`);
    return redirect('/enquire/error');
  }

  // The email and the mirror run independently (decisions §6): the mirror still
  // records an enquiry whose email failed, and a slow or failing mirror is
  // logged and swallowed, never allowed to block or undo the email.
  const [sent] = await Promise.allSettled([
    withTimeout(deps.mailer.send(compose(enquiry, deps.recipients)), deps.mailTimeoutMs),
    withTimeout(deps.mirror.append(enquiry), deps.mirrorTimeoutMs).catch((error) =>
      deps.log(`Enquiry mirror failed: ${describe(error)}`),
    ),
  ]);
  if (sent.status === 'rejected') {
    deps.log(`Enquiry email failed: ${describe(sent.reason)}`);
    return redirect('/enquire/error');
  }

  return redirect('/enquire/thanks');
}
