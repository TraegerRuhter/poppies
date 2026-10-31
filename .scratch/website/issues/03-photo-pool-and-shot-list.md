# 03 — The photo pool and the shot list

**What to build:** One shared pool of photographs and a gallery that looks deliberate at six photos and still right at forty (decisions §2). The build doubles as a **shot list**: explicit, named slots with aspect ratios and framing notes, so the eventual photo session is an errand with a checklist.

Each photo is tagged with a register (celebration, wedding, or both) so the paths can filter the one pool rather than keep separate galleries. A slot with no photo yet renders as a deliberate placeholder showing its framing note, never as a visible hole.

Phone photos run 4–8MB each and customers are on coast cell service, so image optimisation (responsive sizes, modern formats at build time) is part of this ticket, not polish.

Licensed-character work (the Very Hungry Caterpillar piece) never takes the hero slot.

**Blocked by:** 01 — Skeleton site live on Vercel.

**Status:** ready-for-agent

- [ ] Photos live in one content collection, each with a register tag, alt text, and an optional slot assignment
- [ ] Named slots carry an aspect ratio and a framing note; an empty slot renders as a designed placeholder
- [ ] The gallery reads as deliberate with 6 photos and with 40 — checked by rendering both
- [ ] The gallery can be filtered by register for use by the paths
- [ ] Images are optimised at build time into responsive sizes and modern formats
- [ ] The shot list renders as a printable checklist (slot, aspect ratio, framing note, filled or not); it is not linked from public navigation
- [ ] Hero slots cannot be filled by a photo flagged as licensed-character work
