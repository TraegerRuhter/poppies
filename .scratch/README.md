# .scratch — planning and issues

Issues, specs, and planning notes for this repo, per `docs/agents/issue-tracker.md`.
Nothing here is code; it is the reasoning behind the code.

## Where things stand

Poppies is a balloon art business on the Oregon coast. **No application code
exists yet** — the repo holds skills, agent config, and the planning below.

Two efforts are live.

### 1. The website — built, waiting on people and content

`website/decisions.md`, `website/issues/` (01–07, **all done**)

Astro 7 on Vercel, deployed from this branch (project `poppies`). The site has:
the doorway homepage, the Celebrations and Weddings paths, About, the enquiry
form, the photo pool, `/shot-list`, and SEO. Each ticket's `## Comments` records
what was built and how it was checked. Local builds need **Node 24**.

**Blocked on people, not code:**

- **Enquiry form:** set `RESEND_API_KEY` and `ENQUIRY_TO` (and the optional
  Airtable trio) in Vercel, and add a Vercel Firewall rate-limit rule on
  `/api/enquiry`. Until then every enquiry lands on the error page, by design.
- **Photos:** none exist. Every slot shows a placeholder. Work from
  `/shot-list`.
- **Copy:** all page copy and shot-list framing notes are drafts in her absence.
  About assumes she works alone (checklist Q7). The footer towns are
  provisional (Q5).
- **Domain:** once bought, set `SITE_URL` in Vercel, verify the domain in Resend
  and set `ENQUIRY_FROM`, and set `site.email`.

The site's *content* — services, packaging, prices — is still blocked on
effort 2. The services collection holds a dev-only placeholder until then.

### 2. The offering model — charted, 2 of 9 tickets resolved

`offering-model/map.md` — a `/wayfinder` map. **Read the map first**; it is the
index, and each ticket holds its own detail.

Destination: a written proposal for what Poppies sells, how it is packaged and
priced, and the rule for how a new offering gets added — concrete enough for the
owner to ratify in one sitting.

**The owner is unavailable.** Every question on this map is hers, so the map
produces a *proposal*, not decisions. Each ticket keeps its options and rationale
intact and surfaces its assumptions as questions for her. This is a standing
constraint recorded in the map's Notes.

Resolved: both research tickets (pricing benchmarks, packaging patterns). Full
findings under `offering-model/research/`.

Ticket 07 (the tent) is **in progress, paused**. Facts settled by grilling: a
20×40 ft frame tent, not inflatable, 1–2 people to erect, no trailer, and no
venue site of her own. So the venue play became a "backyard venue" on the
customer's land. A four-variant UI prototype awaits a verdict:
`offering-model/prototypes/tent-role/index.html`. The open question was whether
the tent ever goes out without balloons.

**Frontier — takeable now:**

- `offering-model/issues/07-tent-role.md` — what the event tent actually is.
  A grilling ticket, workable without the owner, and the highest-value one open:
  the tent could be a rental line, a capability justifying a higher tier, or a
  venue play that changes what the business is.
- `offering-model/issues/03-current-service-list.md` — a checklist for the owner.
  Blocks the service menu draft. Nobody but her can resolve it.

Work it with `/wayfinder` and the map. **One ticket per session**, research
excepted.

### 3. Naming — decided "Poppies"; legal checks still open

`naming/poppies-name-collision.md` (see the 2026-11-02 update at the bottom).

**The name stays "Poppies"** (decided 2026-11-02). It's a single config value
on the site.

- **New high-risk finding:** **POPPIE** (USPTO serial 98162236) covers
  balloon design services, the same services as Poppies. It was **reportedly
  registered on 2024-05-14**, per an automated reviewer citing TSDR; no person
  has confirmed it yet. Confirm at https://tsdr.uspto.gov, then get a
  trademark attorney's view **before** the domain, signage or an assumed
  business name filing. That's a prerequisite, not a maybe.
- **The Oregon SOS registry is still unchecked.** Both registries are blocked
  from cloud sessions unless the environment's network settings allow them.
- **Tagline:** avoid "A pop of colour…". **A POP OF COLOR** is a filed mark
  for balloon design services.

### 4. Ideas — 131 triaged ideas from overnight market research

`ideas/` — **start at `ideas/ideas.md`** (top ten up front, tier index,
progress). It's also a filterable page: https://claude.ai/artifact/J3XxwNaYN31tysYFjM5QRk
(private).

- Six cited research streams under `ideas/research/`: balloon innovators,
  adjacent niches, the Oregon coast market, reviews and local marketing,
  customer questions, and gaps and regulation.
- **Headline:** no balloon-decor specialist is based in Lincoln County. The
  nearest serious competitor drives in from Salem and asks for two weeks'
  notice.
- **Ready-to-use drafts** in `ideas/drafts/`: four explainers, the review kit,
  a Google profile checklist, partner outreach emails, and two product
  concepts (The Arrival, The Pavilion). Policies are marked `[her call]`.
- Research input was added to tent ticket 07 (`offering-model/issues/07`)
  without resolving it.

## A caveat that applies to all the research here

Every research file in this directory rests on **search-result snippets**. The
egress proxy blocked direct page fetching for every domain attempted, including
the Oregon SOS registry, USPTO, The Knot, and WeddingWire. Each file states this
at the top and marks per-claim confidence. Re-running any of it from an
unblocked network would raise confidence materially.

## Open items the owner or developer must act on

| Item | Blocks |
| --- | --- |
| USPTO status of POPPIE (98162236) + Oregon SOS search | Whether "Poppies" is safe to register, and therefore the domain |
| Buy the domain, in her name and email | Resend sender verification, and so the inquiry form |
| Business email on that domain | The form's from/to addresses |
| Photo audit — what exists, how good | The first layout; the site is designed to look deliberate at six photos |
| Answer the service-list checklist | The service menu draft, and most of the map |
