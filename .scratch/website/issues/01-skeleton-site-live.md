# 01 — Skeleton site live on Vercel

**What to build:** An Astro site deployed to a Vercel preview URL that renders one page showing the business name, styled by the shared layout and design tokens every later ticket builds on. There is no domain yet, so the preview URL is the demo.

The tokens encode the design decisions in `.scratch/website/decisions.md` §8: a warm neutral ground, the photographs supplying the colour, the poppy accent used sparingly and never as a large field, no script or handwriting typefaces, and motion limited to quiet fades and rises. The two paths will later shift *temperature* within this one palette (warmer for celebrations, cooler and coastal for weddings), so the tokens should make that a per-route override, not a second palette.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Astro project at the repo root builds cleanly and deploys to a Vercel preview URL
- [ ] The business name is a single config value; changing it in one place changes every page (the name is unsettled — see `.scratch/naming/poppies-name-collision.md`)
- [ ] Content is set up as structured content collections, not hardcoded in components (decisions §4)
- [ ] Shared layout with design tokens for colour, type and spacing; a per-route temperature override exists and is exercised by a throwaway check
- [ ] No script typefaces; motion is fades and rises only, and respects `prefers-reduced-motion`
- [ ] Zero client-side JavaScript on the page by default
