// The real boundaries behind the enquiry path: Resend for email, Airtable for
// the mirror. Plain fetch, so neither SDK becomes a dependency.

import type { Enquiry, EnquiryEmail } from './enquiry';

// Resend's shared test sender works before the domain exists, but mail from it
// can land in spam. Set ENQUIRY_FROM once the domain is verified in Resend.
const TEST_SENDER = 'onboarding@resend.dev';

export function resendMailer(apiKey: string | undefined, from: string | undefined) {
  return {
    async send(email: EnquiryEmail) {
      if (!apiKey) throw new Error('RESEND_API_KEY is not set');
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: from || TEST_SENDER,
          to: email.to,
          reply_to: email.replyTo,
          subject: email.subject,
          text: email.text,
        }),
      });
      if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
    },
  };
}

export function airtableMirror(token: string | undefined, baseId: string | undefined, table: string | undefined) {
  return {
    async append(enquiry: Enquiry) {
      if (!token || !baseId || !table) throw new Error('Airtable is not configured');
      const response = await fetch(
        `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
        {
          method: 'POST',
          headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
          body: JSON.stringify({
            typecast: true,
            records: [
              {
                fields: {
                  Name: enquiry.name,
                  Email: enquiry.email,
                  Date: enquiry.date,
                  Town: enquiry.town,
                  Event: enquiry.eventType,
                  Scale: enquiry.scale,
                  Colours: enquiry.colours,
                  Budget: enquiry.budget,
                  Received: new Date().toISOString(),
                },
              },
            ],
          }),
        },
      );
      if (!response.ok) throw new Error(`Airtable ${response.status}: ${await response.text()}`);
    },
  };
}
