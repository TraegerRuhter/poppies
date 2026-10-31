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

### 3. Naming — unresolved, blocked externally

`naming/poppies-name-collision.md`

"Poppies" is a soft pun (*pop*) with a poppy flower as the logo. The name is
**not settled**, and the website treats the business name as a single config
value so it stays cheap to change.

- `poppies.events` was **withdrawn** — one character from `poppiesevents.com`, an
  LA wedding studio with poppy-flower branding.
- Four Oregon businesses already trade on "Poppies," three touching weddings.
  None does balloon installation, which is the argument for a balloon qualifier.
- **The two decisive checks were never run** — the Oregon Secretary of State
  registry and USPTO were both blocked by this environment's egress proxy. Free,
  roughly ten minutes, and they gate the name.

## A caveat that applies to all the research here

Every research file in this directory rests on **search-result snippets**. The
egress proxy blocked direct page fetching for every domain attempted, including
the Oregon SOS registry, USPTO, The Knot, and WeddingWire. Each file states this
at the top and marks per-claim confidence. Re-running any of it from an
unblocked network would raise confidence materially.

## Open items the owner or developer must act on

| Item | Blocks |
| --- | --- |
| Oregon SOS + USPTO name searches | The name, and therefore the domain |
| Buy the domain, in her name and email | Resend sender verification, and so the inquiry form |
| Business email on that domain | The form's from/to addresses |
| Photo audit — what exists, how good | The first layout; the site is designed to look deliberate at six photos |
| Answer the service-list checklist | The service menu draft, and most of the map |
