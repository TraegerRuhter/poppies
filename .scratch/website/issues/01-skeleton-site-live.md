# 01 — Skeleton site live on Vercel

**What to build:** An Astro site deployed to a Vercel preview URL that renders one page showing the business name, styled by the shared layout and design tokens every later ticket builds on. There is no domain yet, so the preview URL is the demo.

The tokens encode the design decisions in `.scratch/website/decisions.md` §8: a warm neutral ground, the photographs supplying the colour, the poppy accent used sparingly and never as a large field, no script or handwriting typefaces, and motion limited to quiet fades and rises. The two paths will later shift *temperature* within this one palette (warmer for celebrations, cooler and coastal for weddings), so the tokens should make that a per-route override, not a second palette.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [x] Astro project at the repo root builds cleanly
- [ ] Deploys to a Vercel preview URL — **needs a human**: import the repo in Vercel
- [x] The business name is a single config value; changing it in one place changes every page (the name is unsettled — see `.scratch/naming/poppies-name-collision.md`)
- [x] Content is set up as structured content collections, not hardcoded in components (decisions §4)
- [x] Shared layout with design tokens for colour, type and spacing; a per-route temperature override exists and is exercised by a throwaway check
- [x] No script typefaces; motion is fades and rises only, and respects `prefers-reduced-motion`
- [x] Zero client-side JavaScript on the page by default

## Comments

**2026-10-30 — built; waiting on the Vercel import.** Everything except the deploy
is done and verified locally:

- `pnpm build` and `pnpm check` are clean (0 errors).
- The built page ships **no `<script>` tags and no JS files**.
- "Poppies" appears once in `src/`, in the site config.
- Fonts (Fraunces, Inter) are self-hosted through Fontsource, so there's no
  third-party font request.
- Throwaway browser check of the temperature override: setting
  `data-temperature` to `warm` or `cool` shifts the ground and support tones,
  and the accent stays put. Reduced motion turns the rise animation off. No
  horizontal overflow at 390px.

**The deploy needs a person.** The session's Vercel connector can't create a
project. Import `TraegerRuhter/poppies` at vercel.com/new, register it **in the
owner's name** (decisions §4), and choose the Astro preset. Every branch push
then gets a preview URL. No environment variables are needed yet.

**Node version.** Astro 7.4 requires Node ≥ 22.23.4, so `package.json` pins
`engines.node` to `24.x` for Vercel. Local builds need Node 24.

**TypeScript is pinned to 6.** `astro check` doesn't support TypeScript 7 yet.
