# 05 — About, service area, and a services placeholder

**What to build:** The supporting pieces every path needs.

- **About** with a slot for a photograph of her. For a business entering someone's home or wedding venue, "who is this person" is a live question (decisions §7).
- **A footer naming the service-area towns explicitly**, for local search and to head off quotes from three hours inland. The real list depends on her travel radius (offering-model ticket 03, question 5), so it is a content value with a provisional list, not hardcoded.
- **A services content collection holding one placeholder entry**, clearly marked as blocked on the offering-model map (`.scratch/offering-model/map.md`). The shape of a service entry is not decided here; this only proves services render from content.

**Blocked by:** 01 — Skeleton site live on Vercel.

**Status:** ready-for-agent

- [x] About section renders with a photo slot that participates in the shot list (ticket 03's slot convention, or a compatible one if 03 has not landed)
- [x] Footer lists service-area towns from content; the list is marked provisional
- [x] A services collection exists with one placeholder entry that states it is blocked on the offering model
- [x] Nothing on the site states a service, package or price that the offering model has not produced

## Comments

**2026-10-31 — built.**

- **About** is at `/about` and in the header nav. It's the `about-portrait`
  shot-list slot beside the copy in `src/content/pages/about.md`. **The copy is
  my draft and assumes she works alone** ("done by the person you speak to").
  That's offering-model checklist question 7, still unanswered, so change it if
  she has or wants help. It needs her story; nothing about her is invented.
- **Service area** is in `src/content/service-area.yaml` and renders in every
  page's footer: "Balloon installations on the Oregon coast — Lincoln City,
  Depoe Bay, Newport, Waldport and Yachats." **The towns are a provisional
  central-coast guess**, marked `provisional: true`, until her travel radius is
  known (checklist question 5).
- **Services** are a content collection holding one placeholder that names the
  offering-model map as its blocker. Placeholders render **in development
  only**. Checked: the placeholder shows on `/celebrations` under `pnpm dev`,
  and appears nowhere in the production build. So the live site states no
  service, package or price. When the offering model lands, entries with
  `status: live` will appear on the path pages.

Also checked: `/about` has no overflow at 1280px or 390px.
