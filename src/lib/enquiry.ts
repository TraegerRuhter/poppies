// The enquiry path (website ticket 02). Email is the source of truth; external
// services are passed in so tests can stand in for them at the boundary.

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
] as const;

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
  /** How long the mirror may take before the visitor stops waiting for it. */
  mirrorTimeoutMs: number;
}

export const HONEYPOT = 'website';

function missingFields(enquiry: Enquiry): string[] {
  return FIELDS.filter((f) => f.missing !== null)
    .filter((f) => (f.key === 'email' ? !/^[^\s@]+@[^\s@]+$/.test(enquiry.email) : enquiry[f.key] === ''))
    .map((f) => f.key);
}

function readEnquiry(form: FormData): Enquiry {
  return Object.fromEntries(
    FIELDS.map((f) => [f.key, String(form.get(f.key) ?? '').trim()]),
  ) as Enquiry;
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
  const form = await request.formData();

  // A hidden field no person sees. Bots fill it; they get the same thank-you
  // page as everyone else, so there is nothing to learn from probing.
  if (String(form.get(HONEYPOT) ?? '') !== '') return redirect('/enquire/thanks');

  const sender = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (!deps.limiter.allow(sender)) {
    deps.log(`Enquiry rate-limited for ${sender}`);
    return redirect('/enquire/error');
  }

  const enquiry = readEnquiry(form);
  const missing = missingFields(enquiry);
  if (missing.length > 0) return redirect(`/enquire?missing=${missing.join(',')}`);

  // The email and the mirror run independently (decisions §6): the mirror still
  // records an enquiry whose email failed, and a slow or failing mirror is
  // logged and swallowed, never allowed to block or undo the email.
  const [sent] = await Promise.allSettled([
    deps.mailer.send(compose(enquiry, deps.recipients)),
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
