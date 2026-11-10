import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { handleEnquiry } from '../../lib/enquiry';
import { createRateLimiter } from '../../lib/rate-limit';
import { airtableMirror, resendMailer } from '../../lib/services';

export const prerender = false;

// Per-instance only; the Vercel Firewall rule on this route is the real guard.
const limiter = createRateLimiter({ limit: 5, windowMs: 60 * 60 * 1000 });

const log = (message: string) => console.error(message);

export const POST: APIRoute = ({ request, locals, rewrite }) =>
  handleEnquiry(request, {
    recipients: (getSecret('ENQUIRY_TO') ?? '')
      .split(',')
      .map((address) => address.trim())
      .filter(Boolean),
    mailer: resendMailer(getSecret('RESEND_API_KEY'), getSecret('ENQUIRY_FROM'), log),
    mirror: airtableMirror(
      getSecret('AIRTABLE_TOKEN'),
      getSecret('AIRTABLE_BASE_ID'),
      getSecret('AIRTABLE_TABLE'),
    ),
    log,
    limiter,
    mailTimeoutMs: 8_000,
    // Render /enquire in place of this response, handing it the bounce. A
    // fresh GET, because Astro won't rewrite a request whose body was read.
    bounce: (bounce) => {
      locals.enquiryBounce = bounce;
      return rewrite(new Request(new URL('/enquire', request.url)));
    },
    mirrorTimeoutMs: 3_000,
  });
