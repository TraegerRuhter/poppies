# Handoff — 2026-11-10

Where the work stands, for whoever picks it up next. This page covers recent
changes and next steps. For background, read `.scratch/README.md`. Some of it
is stale; see the corrections below.

## State in one paragraph

The website (Astro 7 on Vercel) is built and live at https://poppies.vercel.app.
Website tickets 01–07 are done and merged to `main`. Vercel deploys production
from `main`.

The site is waiting on people, not code: env vars, photos, copy and a domain.
The offering model is paused at the tent ticket (07). Overnight research
produced 172 triaged ideas plus 13 parked, twelve research streams, drafts, a
break-even workbook and ten homepage sketches. All of it is merged. Nothing is
open in GitHub: PR #9 was the last, and it is merged.

## Corrections to `.scratch/README.md`

- "No application code exists yet" is out of date. The site exists under
  `src/`.
- The site deploys from `main`, not from the feature branch.
- Ideas: there are **172 plus 13 parked**, not 131. The research streams now
  run `01`–`12`; streams 07–12 cover pricing, competitors, operations, Oregon
  setup, B2B buyers, and craft and community.
- The tagline is decided: **"Events that pop."** It's in `src/site.config.ts`.

## What's live that shouldn't stay

- **`/prototype/home`**, the ten homepage sketches (A–J), is live on
  production so they can be reviewed. You pick a sketch from the dropdown in
  the bottom bar.
  - It's unlinked, `noindex`, and excluded from the sitemap
    (`astro.config.mjs`).
  - **Remove it before launch:** delete `src/pages/prototype/` and
    `src/components/prototype/`, or restore the dev/preview-only check in
    `home.astro`.
  - Details are in `.scratch/website/sketches.md`.

## The plan (2026-11-11)

`.scratch/plan/` turns the research and the 172 ideas into **one business
plan that picks**: a nine-piece menu with prices, three engines in order
(celebrations, standing work, weddings and The Pavilion), the year month by
month, three money scenarios, the first 90 days and a job playbook. Start at
`plan/the-plan.md`.

- **For the owner:** https://claude.ai/artifact/PXZzmcLdKAataVnnqv1Ku9
  (private until shared). Her twelve calls are on the page as tap-to-answer
  questions, saved to the page's database (collection `answers`). Read them
  back with the artifact's data tools.
- **Numbers:** `plan/numbers.py`. The arch moved from $450 to $550 because
  the model showed $450 pays under $45 an hour.
- **Website ticket 05 stays blocked** until she agrees the menu.

## Waiting on a decision

1. **Homepage sketches.** Which of A–J to pursue, if any. No verdict yet.
2. **Tent (offering-model ticket 07).** Paused. The four-variant prototype at
   `offering-model/prototypes/tent-role/index.html` needs a verdict. The open
   question is whether the tent ever goes out without balloons.
3. **Owner checklist (offering-model ticket 03).** Only she can answer it. It
   blocks the service menu, and through it the site's services and prices.
4. **Drafts awaiting her review.** These are in `ideas/drafts/`:
   - the explainers;
   - the review kit;
   - the Google profile checklist;
   - partner outreach;
   - the pricing proposal;
   - the 12-month calendar;
   - the startup checklist;
   - the two product concepts.

## Blocked on people, not code

- **Enquiry form:**
  - In Vercel, set `RESEND_API_KEY` and `ENQUIRY_TO` (and optionally the
    Airtable variables).
  - Add a Vercel Firewall rate-limit rule on `/api/enquiry`.
  - The Airtable table needs two new columns: "Latex allergy" and "Heard about
    us".
  - Until all of this is done, every enquiry goes to the error page, by
    design.
- **Trademark:** POPPIE (USPTO 98162236, balloon design) is *reportedly*
  registered. Confirm it at TSDR and get an attorney's view **before** buying
  the domain, making signage or filing an assumed business name. The Oregon
  SOS registry is still unchecked; both registries are blocked from cloud
  sessions.
- **Domain, then email:** once the domain is bought, set `SITE_URL`, verify
  the domain in Resend, and set `ENQUIRY_FROM` and `site.email`.
- **Photos:** none exist yet. Work from `/shot-list`.

## Good next moves (no owner needed)

- Resume the tent grilling (ticket 07) with `/wayfinder` and the map. Work one
  ticket per session.
- Pick ideas marked `who dev` in the "Do now" tier of `ideas/ideas.md`.
- Once a sketch is chosen, turn it into a real ticket under `website/issues/`
  and remove the prototype route.

## Working notes

- **Node 24** is required locally.
  - `pnpm check` should report 0 errors.
  - `pnpm test` runs 13 Vitest tests, all at the `handleEnquiry` seam.
  - `pnpm build` builds the site.
- **Break-even workbook:** `ideas/model/poppies-break-even.xlsx`, built by
  `build_model.py`.
  - LibreOffice didn't work in the cloud container, so it was checked with
    the Python `formulas` library.
  - The model's rate is about **$48/h**, not $43.
- **Ideas page:** https://claude.ai/artifact/J3XxwNaYN31tysYFjM5QRk (private).
  It's generated from `ideas/page-src/`.
- **Research reliability:** all the research rests on search snippets, because
  direct page fetches were blocked. Confidence is marked per claim. Event dates
  and competitors (for example Float Balloon Bar LC) need confirming.
- **Branch:** `claude/setup-matt-pocock-skill-9l6e61`. Restart it from `main`
  after each merged PR.
