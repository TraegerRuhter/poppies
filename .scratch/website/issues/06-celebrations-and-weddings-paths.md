# 06 — The Celebrations and Weddings paths

**What to build:** Two real static routes, one per doorway path, each with its own temperature within the one palette, its own copy and hero, and a gallery filtered by register from the shared photo pool (decisions §7, §8). Celebrations runs warmer; Weddings cools and mutes toward coastal.

The site sells the balloon business as it exists today (decisions §1). The Weddings path references larger events as **capability, never as a portfolio she does not have** — no wedding gallery that implies weddings she has not done. It must still look deliberate with very few photos, because the section is designed for few.

Each path's enquiry link pre-fills the event type, using the mechanism ticket 02 exposes. If 02 has not landed, a plain link to the Enquire page is acceptable and the pre-fill is wired up once it does.

**Blocked by:** 03 — The photo pool and the shot list; 04 — The doorway homepage.

**Status:** ready-for-agent

- [x] `Celebrations` and `Weddings` are separate static routes reachable from the doorway
- [x] Each applies its temperature override from ticket 01's tokens, within one palette
- [x] Each has its own hero slot and copy, and a gallery filtered by register from the shared pool
- [x] The Weddings path makes no claim of wedding portfolio that does not exist
- [x] Each path's enquiry link carries the event type
- [x] Both paths look deliberate at their current real photo count

## Comments

**2026-10-31 — built.** Both paths are one shared page component; the copy is
in `src/content/pages/celebrations.md` and `weddings.md`.

- Each page has an opening line and an enquiry button carrying `?event=`, the
  path's hero slot, a "what we make" section, a gallery filtered by register,
  and a closing enquiry prompt. Celebrations renders warm, Weddings cool.
- **Weddings makes no portfolio claim.** The copy says what she *can make* for
  a wedding, and the gallery is headed "Recent work", not "Our weddings".
  **All the copy on both paths is my draft and needs her voice.**
- **New build-time content checks**, alongside the hero rule:
  - a photo can't name a slot that doesn't exist
  - two photos can't claim the same slot
  - a photo for one path can't fill a slot meant only for the other
  These came from a test run where a wedding photo in the celebration-only
  "sculpture" slot quietly vanished from one page and showed up loose on the
  other.
- **Fixed a ticket 03 bug.** On phones, a feature row spanned its first photo
  across the full width, leaving the second alone in half a row. Feature rows
  are now two side by side on phones. The new check measures whether each line
  of cells fills its row. It runs on all three gallery pages at 1280px and
  390px, with 0, 7, 9 and 12 photos, and finds no holes.

Also checked: no `<script>`, no overflow, page titles "Celebrations · Poppies"
and "Weddings · Poppies".
