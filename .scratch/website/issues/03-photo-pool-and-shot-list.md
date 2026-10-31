# 03 — The photo pool and the shot list

**What to build:** One shared pool of photographs and a gallery that looks deliberate at six photos and still right at forty (decisions §2). The build doubles as a **shot list**: explicit, named slots with aspect ratios and framing notes, so the eventual photo session is an errand with a checklist.

Each photo is tagged with a register (celebration, wedding, or both) so the paths can filter the one pool rather than keep separate galleries. A slot with no photo yet renders as a deliberate placeholder showing its framing note, never as a visible hole.

Phone photos run 4–8MB each and customers are on coast cell service, so image optimisation (responsive sizes, modern formats at build time) is part of this ticket, not polish.

Licensed-character work (the Very Hungry Caterpillar piece) never takes the hero slot.

**Blocked by:** 01 — Skeleton site live on Vercel.

**Status:** ready-for-agent

- [x] Photos live in one content collection, each with a register tag, alt text, and an optional slot assignment
- [x] Named slots carry an aspect ratio and a framing note; an empty slot renders as a designed placeholder
- [x] The gallery reads as deliberate with 6 photos and with 40 — checked by rendering both
- [x] The gallery can be filtered by register for use by the paths
- [x] Images are optimised at build time into responsive sizes and modern formats
- [x] The shot list renders as a printable checklist (slot, aspect ratio, framing note, filled or not); it is not linked from public navigation
- [x] Hero slots cannot be filled by a photo flagged as licensed-character work

## Comments

**2026-10-31 — built.** There are no real photos yet, so every slot currently
shows as a placeholder.

- **Slots** live in `src/content/slots.yaml`: 4 hero or portrait slots
  (homepage, Celebrations, Weddings, About) and 7 gallery slots, each with an
  aspect ratio, a register and a framing note. The framing notes are my
  drafts from decisions §2 and need her eye.
- **Photos** are one YAML file beside each image in `src/content/photos/`
  (format in the README there).
- **Galleries** show the gallery slots first, in shot-list order, then any
  unslotted photos for that register. The layout alternates a feature row with
  a row of three, and small remainders become a pair or a single, so a row
  never has a gap.
- **The hero rule** is enforced at build time. A licensed-character photo in a
  hero slot fails the build with a message saying why.
- **The shot list** is at `/shot-list`. It isn't linked from anywhere, is
  marked `noindex`, and has print styles.
- **The homepage** shows the full gallery under the intro for now. Ticket 04
  will reshape the homepage.

**Verified** with throwaway test photos (4032px JPEGs, not committed). The
built gallery was rendered at 0, 6 and 40 photos, at 1280px and 390px: no
horizontal overflow, no broken images, no collapsed cells. AVIF was served
first, and smaller files went to the phone. The hero rule was checked by
staging a character photo in the homepage hero slot: the build fails, and
passes once the flag is cleared.

**Gotcha:** with on-demand routes, the Vercel adapter has no `astro preview`.
To look at a static build locally, serve `.vercel/output/static`.

**2026-10-31 — phone-layout bug fixed in ticket 06.** The earlier "no collapsed
cells" check missed a half-row hole on phones (a feature row's second photo sat
alone). See ticket 06's comments for the fix and the stronger check.

**2026-10-31 — review fix.** Placeholders now show the slot's framing note (the
ticket asked for it, and only the title was showing), clipped to three lines.
The phone doorway's compact thumbnails still hide it.
