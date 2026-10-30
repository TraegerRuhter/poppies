# 02 — The enquiry path, end to end

**What to build:** A visitor fills in the enquiry form and it lands in two inboxes, mirrored to Airtable, with bots turned away. This is the one seam on the site worth testing (decisions, *Testing posture*), so build it test-first with `/tdd`.

The form asks the structured qualifying questions from decisions §3: event date, venue or town, event type, rough scale, colours, and a **soft, optional** budget range. It also accepts the event type from the page that linked to it (for example a query parameter), so the Celebrations and Weddings paths can link in pre-qualified without this ticket depending on them.

A serverless function sends the enquiry via Resend and **independently** appends a row to Airtable. Email is the source of truth; Airtable is a convenience mirror (decisions §6).

Known gap: the sender domain cannot be verified in Resend until a domain is bought, and an unverified sender lands in spam silently. Use Resend's test sender for now and leave the domain-verification step as an explicit open item, not a silent default.

**Blocked by:** 01 — Skeleton site live on Vercel.

**Status:** ready-for-agent

- [ ] An Enquire page with the qualifying fields above; budget range is optional and worded softly
- [ ] The event type can be pre-filled by the linking page
- [ ] Submitting sends one email to **two recipients** (the owner and the developer), with `Reply-To` set to the customer's address
- [ ] The function appends a row to Airtable independently of the email; an Airtable failure is logged and swallowed, never blocking the send — proven by a test with Airtable down
- [ ] A hidden honeypot field rejects bot submissions without a CAPTCHA — proven by a test
- [ ] Submissions are rate-limited — proven by a test
- [ ] The visitor sees a clear success or failure state; a failed send never claims success
- [ ] Secrets (Resend key, Airtable token) come from environment variables, documented by name only
- [ ] The Resend sender-verification step is recorded as an open item until the domain exists
