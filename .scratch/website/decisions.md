# Poppies website — decisions record

Status: ready-for-agent
Date: 2026-08-12
Source: `/grilling` session, 11 questions

The technical and design decisions for the website, settled by grilling. This is
not a spec — the site's *content* decisions (services, packaging, pricing) are
blocked on the offering model, which is being charted separately. Written down so
the reasoning survives outside a chat transcript.

## The business

Poppies (working name) — a balloon art business on the Oregon coast. Sculptural
figure work, arches, and garlands for birthdays and celebrations, with ambitions
toward weddings and larger events, and access to a large pop-up event tent.

The site's job: explain what she offers, prove it with photographs, capture
qualified enquiries.

## Decisions

### 1. Balloon art, present tense

The site sells the balloon business as it exists today. Larger events are
referenced as capability, never pitched as a portfolio she does not have — a site
advertising weddings with no wedding photographs reads as aspirational and costs
credibility on the work she *can* prove.

The refined visual identity gets built now, so the business grows into it without
a rebrand. Brand is expensive to change later; a service list is cheap.

### 2. Photographs are the binding constraint

The site must look deliberate at six photographs and still right at forty. No
layout that only works when full — no grid with a visible hole, no gallery that
needs twelve images to avoid looking abandoned.

The build doubles as a **shot list**: explicit slots with aspect ratios and
framing notes, so the eventual photo session is an errand with a checklist rather
than a vague ambition.

Phone photographs are acceptable. What makes event photos look amateur is
cluttered backgrounds, mixed indoor lighting, and shooting mid-party — not the
camera. Shot before guests arrive, in daylight, against a clean background, a
modern phone is enough.

Balloon installations are ephemeral, so the archive only grows if someone
photographs them deliberately before each event starts.

Licensed-character work (the Very Hungry Caterpillar piece) stays out of the hero
slot — using a recognizable character to advertise a commercial service is a grey
area, and character work is also the most "kidsy" thing in the portfolio, which is
the register the brand is avoiding.

### 3. Inquiry form only — no booking calendar

A calendar would promise three things that are not true: that she has standard
priced slots, that availability is accurate in real time, and that picking a date
means confirmation. None hold for custom installation work, and every date booked
offline would have to be blocked online daily or she double-books a real customer.

The form asks structured qualifying questions — event date, venue or town, event
type, rough scale, colors — including a **soft, optional budget range**. The range
costs a few enquiries from people who find it presumptuous and saves hours quoting
jobs that were never going to close.

Revisit if a genuinely standardized fixed-price product ever exists.

### 4. Maintenance sits with the developer

Static site, content in structured data files, deployed by the developer. The
content volume (a handful of services, a slowly growing portfolio) does not
justify a CMS or its permanent third-party dependency.

Two conditions:

- **Content lives in structured data files, not hardcoded in components.** Adding
  a CMS later becomes repointing a data source rather than rewriting the site.
- **The domain and hosting are registered in the owner's name and email**, not the
  developer's. This is a real business that may outlive any one person's
  involvement.

The known risk: "I'll maintain my mother's site" has a shelf life. If appetite
fades, a hosted builder is the correct answer rather than a site that rots.

### 5. Astro on Vercel

- **Content collections** are the structured-data-files condition as a built-in,
  typed and validated at build time.
- **Image optimization** matters enormously here. Phone photographs run 4–8MB
  each; unoptimized, a gallery is a 40MB load for a customer on coast cell
  service. Astro generates responsive sizes and modern formats at build time.
- **Zero JavaScript by default**, which a brochure site with one form barely
  needs.

Vercel because the developer already works there. Supabase is explicitly *not*
used — no auth, no relational data, and free-tier projects pause after inactivity,
which would break the form silently during a quiet month.

### 6. Inquiries: email is the source of truth, Airtable is a mirror

A Vercel serverless function sends the enquiry via Resend and **independently**
appends a row to Airtable. Storage failures are logged and swallowed, never
blocking the email.

If Airtable breaks, changes its API, or gets forgotten, the business keeps
working and nothing is lost but a convenience view. Airtable earns its place by
giving a sortable, filterable interface for free — and quietly becomes a
lightweight CRM once someone adds Status, Notes, and Quoted Amount columns.

Airtable over Google Sheets purely on integration cost: a POST with a bearer
token, versus service accounts and OAuth for the same result.

Four details that matter more than the choice:

- **`Reply-To` set to the customer's address**, so replying from a mail app just
  works. Without it, addresses get copied by hand forever.
- **Sent to two recipients** — the owner and the developer. A lead in a spam
  folder is not a lost job.
- **A honeypot field plus rate limiting.** Any public form attracts bots within
  weeks; a hidden field kills most of it with no CAPTCHA friction.
- **The sender domain must be verified in Resend**, or mail lands in spam. This
  fails silently and looks exactly like "nobody is enquiring."

### 7. Doorway, not a maze

The homepage asks one question — *What are you planning?* — with **two paths at
launch (Celebrations and Weddings) plus an escape hatch**. Each path is a real
static route with its own palette, copy, hero, and gallery filtered from one
shared photo pool.

Ordinary scrolling content sits underneath the chooser, so anyone who ignores the
question still gets a normal site. That escape hatch protects conversion for
someone who just wants photographs and a way to make contact.

This resolves a genuine tension: a single flat page speaking to both birthday
parties and weddings reads as neither, but a branching site never shows a visitor
the other register. The site is exactly as playful as the thing the visitor said
they were planning.

Falls out for free: enquiries arrive **pre-qualified**, and static routes per path
rank for their own search terms in a way anchor links cannot.

Constraints attached:

- **Branch on register, never on photo count.** The gallery draws from one shared
  pool, so a path with three photographs still looks deliberate because the
  section was designed for three.
- **Two paths at launch, not five.** More branches starve the available imagery.

A full multi-step guided flow was considered and deferred — it adds clicks between
arrival and proof, risks reading gimmicky, and starves for images. The doorway
captures nearly all the value at a fraction of the cost, and can grow into the
flow later.

Also decided: an **About section with a photograph of her** (for a business
entering someone's home or wedding venue, "who is this person" is a live
question), and **service-area towns named explicitly** in the footer, for local
search and to head off quotes from three hours inland.

### 8. Gallery-wall aesthetic, coastal on the wedding path

Her work *is* the color — balloon installations are saturated and high-contrast by
nature. Site chrome that competes with them is the most common failure in this
category. **Restraint around loud content is what reads as refined.**

Warm neutral ground, generous whitespace, the photographs supplying the color,
with **vivid highlight colors used sparingly and precisely**. An accent only reads
as vivid if it is surrounded by restraint.

The two paths shift *temperature* within one palette rather than swapping
palettes: the wedding path cools and mutes toward coastal, celebrations run
warmer.

Rejected: poppy red as a large field color. At scale, next to balloon
photography, saturated red is visual noise and reads as budget party-supply.

Two one-way doors on tone, committed now:

- **No script or handwriting typefaces.** The fastest route to cutesy.
- **Motion limited to quiet fades and rises.** Nothing bouncing, nothing floating.
  One bouncing balloon undoes the entire strategy.

## Open items

| Item | Why it matters |
| --- | --- |
| Oregon SOS + USPTO searches | Gates the name. Both blocked from the research session; free, roughly ten minutes. See `.scratch/naming/poppies-name-collision.md`. |
| Domain choice | `poppies.events` **withdrawn** — one character from `poppiesevents.com`, an LA wedding studio with poppy-flower branding. |
| Business email on the domain | Resend needs a verified sender or the form fails silently. |
| Photo audit | What actually exists, and how good. Shapes the first layout. |
| Offering model | What she sells, packaging, pricing, growth sequence. **Blocks the site's content.** Being charted separately. |

The business name is **a single config value**, changed in one place when the
registry checks come back. It does not block building.

## Testing posture

A static marketing site has few seams worth testing. The one that matters is the
inquiry function: that email sends, that an Airtable failure does not block it,
and that the honeypot rejects bots. No coverage manufactured for pages that render
markdown.
