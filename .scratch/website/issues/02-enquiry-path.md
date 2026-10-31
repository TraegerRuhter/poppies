# 02 — The enquiry path, end to end

**What to build:** A visitor fills in the enquiry form and it lands in two inboxes, mirrored to Airtable, with bots turned away. This is the one seam on the site worth testing (decisions, *Testing posture*), so build it test-first with `/tdd`.

The form asks the structured qualifying questions from decisions §3: event date, venue or town, event type, rough scale, colours, and a **soft, optional** budget range. It also accepts the event type from the page that linked to it (for example a query parameter), so the Celebrations and Weddings paths can link in pre-qualified without this ticket depending on them.

A serverless function sends the enquiry via Resend and **independently** appends a row to Airtable. Email is the source of truth; Airtable is a convenience mirror (decisions §6).

Known gap: the sender domain cannot be verified in Resend until a domain is bought, and an unverified sender lands in spam silently. Use Resend's test sender for now and leave the domain-verification step as an explicit open item, not a silent default.

**Blocked by:** 01 — Skeleton site live on Vercel.

**Status:** ready-for-agent

- [x] An Enquire page with the qualifying fields above; budget range is optional and worded softly
- [x] The event type can be pre-filled by the linking page
- [x] Submitting sends one email to **two recipients** (the owner and the developer), with `Reply-To` set to the customer's address
- [x] The function appends a row to Airtable independently of the email; an Airtable failure is logged and swallowed, never blocking the send — proven by a test with Airtable down
- [x] A hidden honeypot field rejects bot submissions without a CAPTCHA — proven by a test
- [x] Submissions are rate-limited — proven by a test
- [x] The visitor sees a clear success or failure state; a failed send never claims success
- [x] Secrets (Resend key, Airtable token) come from environment variables, documented by name only
- [x] The Resend sender-verification step is recorded as an open item until the domain exists

## Comments

**2026-10-31 — built test-first. Needs secrets and a firewall rule before it sends anything real.**

Seams agreed before testing: one function, `handleEnquiry(request, deps)`.
Resend, Airtable and the clock are passed in; nothing inside our own code is
faked. Ten tests cover:

- delivery to both recipients with `Reply-To` set to the customer
- one Airtable row per enquiry, and email still sent when Airtable fails
- the error page when Resend fails
- the honeypot (bots get the thank-you page, nothing is sent)
- rate limiting: over the limit, per sender, window reset
- missing required fields, with a malformed email counted as missing

The form works without JavaScript. `/enquire` renders on request so it can read
`?event=` (`celebration`, `wedding` or `other`) and `?missing=`. It posts to
`/api/enquiry`, which redirects to `/enquire/thanks` or `/enquire/error`.
Checked by hand in a browser: pre-fill, the missing-fields notice, and that
with no secrets set the form ends on the error page, never a false thank-you.

**Rate limiting is two layers (agreed).** An in-memory limiter of 5 per hour
per IP is tested, but it only holds within one serverless instance. **The real
guard is a Vercel Firewall rate-limit rule on `/api/enquiry`, and it isn't set
up yet.** That's a dashboard step for a person.

**Open items for a person:**

- Set the variables named in `.env.example` in Vercel (`RESEND_API_KEY`,
  `ENQUIRY_TO`, and optionally the Airtable three). Without `RESEND_API_KEY`
  every enquiry goes to the error page.
- Add the Vercel Firewall rate-limit rule on `/api/enquiry`.
- **Sender verification:** until the domain exists and is verified in Resend,
  mail comes from Resend's test sender (`onboarding@resend.dev`) and may land
  in spam. Set `ENQUIRY_FROM` once it's verified.
- `site.email` is unset, so the error page can't offer a direct address yet.
- The budget bands on the form ($500 / $1,000 / $2,500) are invented. Only the
  $500 minimum comes from the pricing research. Revisit when the offering
  model lands.
