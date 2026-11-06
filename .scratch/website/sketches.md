# Homepage sketches: ten ideas

2026-11-07. **A throwaway prototype, nothing decided.** Ten structurally different
ideas for making the homepage unique and fun *and* useful, built on the real site
with real content.

**See them:** run `pnpm dev`, open `/prototype/home`, and flip with the floating
bar, the ← → keys, or `?variant=A`…`J`. It also opens on this branch's Vercel
**preview** deployment at `/prototype/home`, so it can be reviewed on a phone.
Production returns a 404. Code is in `src/components/prototype/` and `src/pages/prototype/home.astro`.

There are no photos yet, so the sketches draw their colour from seeded,
procedurally generated organic garlands (`src/components/prototype/garland.ts`).
In the real thing, most of these would carry photographs.

The research behind this is in `research/web-design-inspiration.md`.

| | Sketch | The idea | Why it's useful, not just fun | Bends a committed rule? |
| --- | --- | --- | --- | --- |
| A | **Gallery wall** | The doorway as two framed works hung on a wall, each with a museum label: title, medium, year, place, "from" price | The label carries real facts (materials, area, price) in a format people already read. It makes the "gallery-wall" brand literal | No |
| B | **Palette doorway** | Hovering or tabbing to "A celebration" or "A wedding" shifts the *whole page* to that path's temperature, with the garland changing palette, before you click | It previews each register, which is the point of the doorway (decisions §7). Fades only | No |
| C | **Build a garland** | Tap up to four colours from the studio's actual stock and watch the garland redraw. "Ask about this palette" carries the colours into the enquiry | Answers "what would my colours look like?" and pre-fills the form with a palette, the vaguest field in most enquiries | No |
| D | **Garland ruler** | Drag a length from 4 to 30 ft; the garland redraws to scale against a 6 ft table, a door and a person, with a plain-English verdict ("a designed corner") | Answers "how much do I need?", the question behind most quotes, and feeds the size into the enquiry | No |
| E | **Pop to reveal** | "Events that pop." over six balloons; tap one and it fades away to reveal a useful fact or a link (air not helium, weddings, where we work, enquire) | The tagline, made literal, hiding the FAQ in a toy | **Slightly.** It's playful by nature. Motion is a short fade, no bounce, and instant with reduced motion |
| F | **Field guide** | The services as specimen plates in a naturalist's field guide: "Organic garland, *Sertum organicum*", with habitat, lifespan, size, often seen at | A services and longevity explainer people will actually read; the coast has a naturalist streak | No |
| G | **Tide table** | Summer Saturdays laid out like a tide chart (open, on hold, booked) with "10 Saturdays left this summer" | Answers "is my date free?" before anyone asks. It's honest scarcity, but only if she keeps it current | No. **But it needs her to update it by hand**, or it lies |
| H | **Postcard enquiry** | The enquiry written as one sentence on a postcard from the coast: "Hello Poppies, we're planning [a wedding] in [Yachats] on [date]…" | A real form, posting to the same `/api/enquiry`, that feels like writing rather than filling in. Conversational forms are the one "fun" pattern with a conversion argument (see the research) | No |
| I | **Install day** | Scroll through the morning of an install (7:30 arrive, 8:15 frame, 9:00 garland…) while an empty room fills with garland beside it | Shows what booking her actually involves (no wall damage, she sweeps up) and builds trust. CSS scroll-driven animation, no JS. Reduced motion shows it finished | **Slightly.** It's motion tied to scroll, though it's a reveal, not a bounce |
| J | **Today on the coast** | A small conditions card (wind, fog, temperature by town) with "what that means for your installation": anchored, air not helium, the tent | Turns the coast's weather from an objection into expertise, with local character. **Example data**; a real one could read the National Weather Service forecast | No |

## Combinations worth considering

These aren't either/or. A plausible real homepage could be:

- **B** (palette doorway) as the opening, then
- **A**-style museum labels on the real photos in the gallery, then
- **D** (ruler) or **C** (palette builder) as one interactive moment, then
- **H** (postcard) as the closing call to action, replacing the plain
  "Start an enquiry" button.

**F** (field guide) and **J** (coast conditions) suit guide pages more than the
homepage. **G** (tide table) only works if she'll update it.

## What the prototype doesn't do

- `/enquire` doesn't yet read `?colours=` (C) or `?scale=` (D). Wiring that is
  a small change to the form if either survives.
- No photos. Every sketch would look different with real work in it.
- The "from $[__]" prices are placeholders. Pricing is open in the
  offering-model map.

## Capture (per the prototype skill)

Once a direction wins, fold it into the real homepage, then move the prototype
code to a throwaway branch and delete it from `main`.
