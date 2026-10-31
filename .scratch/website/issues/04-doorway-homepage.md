# 04 — The doorway homepage

**What to build:** A homepage that asks one question — *What are you planning?* — with two paths at launch, **Celebrations** and **Weddings**, plus an escape hatch (decisions §7). Ordinary scrolling content sits underneath the chooser, so a visitor who ignores the question still gets a normal site: some photographs and a way to make contact.

The paths themselves are built in ticket 06; here they may link to stub routes.

Branch on register, never on photo count. Two paths, not five — more branches starve the imagery.

**Blocked by:** 01 — Skeleton site live on Vercel.

**Status:** ready-for-agent

- [x] The homepage leads with the single question and the two path choices
- [x] An escape hatch is visible for visitors who just want to look or get in touch
- [x] Scrolling content beneath the chooser works as a complete page on its own
- [x] The paths are real links to static routes (stubs are fine until ticket 06)
- [x] No full multi-step guided flow — that was considered and deferred

## Comments

**2026-10-31 — built.**

- **The doorway** leads the homepage with "What are you planning?" as two
  picture cards, Celebrations and Weddings. Each shows its path's hero slot and
  is tinted with its path's temperature, so the warm/cool difference is visible
  before you click. The tokens now let any element carry `data-temperature`,
  not just `<html>`.
- **The escape hatch** is a line under the cards: "Not sure yet? See the work
  or tell us about it."
- **The ordinary page underneath:** the homepage hero with the intro, the full
  gallery, and a closing "Start an enquiry".
- **On a phone** the cards become compact rows, so both choices and the escape
  hatch fit on the first screen. Checked at 390px.
- `/celebrations` and `/weddings` are stubs at their temperatures, each linking
  to the form with `?event=` set. Ticket 06 replaces them.
- **Added beyond the ticket:** a small header nav (Celebrations, Weddings,
  Enquire) on every page.
- All the copy is in `src/content/pages/home.md`: the question, each path's
  label and blurb, and the escape-hatch text.

Checked at 1280px and 390px, with no photos and with test photos in every hero
and gallery slot: no overflow, no `<script>` on the page, the doors link to the
right routes, and the wedding stub renders cool.
