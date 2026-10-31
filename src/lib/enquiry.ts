// The enquiry path (website ticket 02). Email is the source of truth; external
// services are passed in so tests can stand in for them at the boundary.

import type { RateLimiter } from './rate-limit';

export interface Enquiry {
  name: string;
  email: string;
  date: string;
  town: string;
  eventType: string;
  scale: string;
  colours: string;
  budget: string;
}

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
}

export const HONEYPOT = 'website';

// Everything else is optional; budget especially is soft (decisions §3).
const REQUIRED = ['name', 'email', 'date', 'town', 'eventType'] as const;

function missingFields(enquiry: Enquiry): string[] {
  return REQUIRED.filter((key) =>
    key === 'email' ? !/^[^\s@]+@[^\s@]+$/.test(enquiry.email) : enquiry[key] === '',
  );
}

function readEnquiry(form: FormData): Enquiry {
  const field = (name: string) => String(form.get(name) ?? '').trim();
  return {
    name: field('name'),
    email: field('email'),
    date: field('date'),
    town: field('town'),
    eventType: field('eventType'),
    scale: field('scale'),
    colours: field('colours'),
    budget: field('budget'),
  };
}

function compose(enquiry: Enquiry, to: string[]): EnquiryEmail {
  const lines = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Date: ${enquiry.date}`,
    `Town or venue: ${enquiry.town}`,
    `Event: ${enquiry.eventType}`,
    `Scale: ${enquiry.scale || '—'}`,
    `Colours: ${enquiry.colours || '—'}`,
    `Budget: ${enquiry.budget || 'not given'}`,
  ];
  return {
    to,
    replyTo: enquiry.email,
    subject: `Enquiry: ${enquiry.eventType}, ${enquiry.date}, ${enquiry.town}`,
    text: lines.join('\n'),
  };
}

const describe = (error: unknown) => (error instanceof Error ? error.message : String(error));

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

  try {
    await deps.mailer.send(compose(enquiry, deps.recipients));
  } catch (error) {
    deps.log(`Enquiry email failed: ${describe(error)}`);
    return redirect('/enquire/error');
  }

  // The mirror is a convenience: its failure is logged and swallowed, never
  // allowed to block or undo the email (decisions §6).
  try {
    await deps.mirror.append(enquiry);
  } catch (error) {
    deps.log(`Enquiry mirror failed: ${describe(error)}`);
  }

  return redirect('/enquire/thanks');
}
