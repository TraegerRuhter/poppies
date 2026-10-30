# How comparable businesses package their offerings

Resolves: `issues/02-packaging-patterns.md`
Status: complete, with a significant methodology caveat (read next section first)
Date: 2026-08-12

---

## Methodology and confidence warning — read this first

**I could not fetch a single business website directly.** This environment's egress
proxy blocked every domain I attempted, including neutral controls
(`en.wikipedia.org`, `balloonhq.com`, `www.atlantaballoondesigner.com`,
`www.balloonartisan.com`, `fashion-balloons.com`, `www.theballoonguyla.com`) with
`EGRESS_BLOCKED`. Direct `curl` to fifteen further domains — The Knot, WeddingWire,
Thumbtack, GigSalad, Yelp, Reddit, Instagram, Facebook, Qualatex, Balloon Suite —
returned no connection at all.

**Everything below therefore rests on web-search results: page titles, URL paths,
and snippet text.** That has three consequences you should hold onto:

1. **URL paths are my strongest evidence.** A URL like
   `bubblegumballoons.com/pages/bespoke-wedding-balloons/` or
   `theballoonguyla.com/occasions/corporate-events/` is a near-direct observation of
   how a site's information architecture is organised. Claims resting on URL
   structure are marked **(high)**.
2. **Snippet text is second-hand.** Where I quote what a page says, it comes from a
   search-engine snippet, sometimes paraphrased in the search tool's summary rather
   than reproduced verbatim. Marked **(medium)**. I have avoided presenting anything
   as a verbatim quote from a business's site unless the phrasing appeared as such.
3. **I never saw a services page laid out.** So I can describe *what sections exist*
   with reasonable confidence, and *how they feel to a visitor* only speculatively.
   Anything about visual arrangement is inference. Marked **(low)**.

**Sample size.** I have structural evidence of some kind on roughly **31 balloon and
event-decor businesses** and **5 wedding florists** used as an adjacent analogue,
plus two marketplace schemas. That is enough to see dominant patterns. It is not
enough to claim proportions — when I say "most," read it as "most of the ~31 I saw
evidence on," not as a measured share of the industry.

**Nothing here was verified against a second source unless stated.** A follow-up
pass from an unblocked network, opening ten services pages properly, would be worth
more than everything below.

---

## 1. The dominant structures, and what fits a one-person business

### The three structures are not really three

The ticket framed the question as à la carte vs tiered packages vs quote-only. What
the evidence shows is that established balloon businesses do not pick one. They run
**two tracks at once**, and the interesting variable is *where the boundary between
the tracks sits*.

**Track A — the transactional track.** Fixed or per-unit items, priced openly,
low-or-no minimum, often literally in a shop cart. Party on Butler (Pittsburgh)
calls this "Grab n' Go" — arrangements made in-store, designed for the customer to
carry out (medium). Fig Balloon Co (Boston) lets customers order online for studio
pickup with no minimum (medium). Bubblegum Balloons (London) runs a full e-commerce
shop with next-day delivery alongside its installation work (medium).

**Track B — the commissioned track.** Custom installation, quote-led, gated by a
minimum, entered through an enquiry form. Balloon Artisan (Phoenix) has a dedicated
`/large-balloon-arch-and-installation-pricing` page whose function is to state a
range and route to a form (high, from URL; medium on content). Lancaster Float Co
and Balloon Empyre (Denver) both funnel to a quote-request form with a stated
turnaround (medium).

The pure quote-only businesses — The Balloon Guy LA, 99 Haus Balloons (Chicago),
Tabitha's Balloon Bar (Orlando), Balloon HQ — have simply dropped Track A. All four
present as premium/bespoke. The pure à-la-carte businesses have dropped Track B and
are effectively retailers.

### Is there a pattern by size or market?

Yes, and it is fairly clean, though I am reading it off ~31 businesses so treat it
as a hypothesis rather than a finding:

| Business shape | Typical structure | Examples seen |
|---|---|---|
| Local, owner-operated, all-occasion | Per-unit published rate + minimum + form | Modern Little Events (Nashville): garlands "start at $25/foot," 12-foot minimum, inquiry form (medium) |
| Local with a storefront | Both tracks, explicitly separated | Party on Butler; Fig Balloon Co (medium) |
| Regional, positioned as luxury | Quote-only, occasion pages, no prices | The Balloon Guy LA; 99 Haus; Balloon Artisan (medium) |
| Scaled, multi-staff | Shop + bespoke, occasion pages, corporate arm | Bubblegum Balloons — 26 staff, 120+ venues (medium) |

The pattern is **not** "bigger businesses publish more." It is close to the inverse.
Prices get *less* visible as positioning moves upmarket, but they never disappear
entirely — they retreat into a starting anchor (see §3).

### Recommendation for a one-person business with a small portfolio

**Adopt the two-track model, with the boundary drawn by a stated minimum, and put
the sculptural figure work outside both tracks.**

Concretely:

- **Track A — a short published menu**, three or four line items, priced per foot or
  per piece with a "from" figure, and a minimum that makes small jobs viable. This is
  what a birthday enquiry needs and it answers the price question without a
  conversation.
- **Track B — one quote-led offering** for weddings and larger events, with a single
  stated minimum investment and no tiers at all. Not three wedding packages. One
  door, one number, then a conversation.
- **The figure work sits apart.** Sculptural character work does not price per linear
  foot and does not belong in a garland menu. Every business I saw that does
  sculptural work treats it as a separate, quote-led line. Folding it into a tier
  would both mis-price it and hide the thing that differentiates her.

**Why this and not tiered packages.** Tiered packages (Bronze/Silver/Gold, or
Petite/Classic/Grand) are a promise of *repeatability*: they say "I have built this
exact thing enough times to know what it costs and what it looks like." With a small
portfolio she cannot evidence that promise — a tier list with no photograph of that
tier reads as aspirational. A component menu makes a smaller, truer claim: "I make
garlands, arches, and figures; here is what each costs; here is one photograph of
each." Every item on the menu can be backed by the portfolio she actually has.

**Why not quote-only.** Quote-only is the premium posture, but it is a posture that
costs money to hold — it works when the portfolio and the referral network do the
qualifying that a price would otherwise do. She has neither yet. §3 covers the
evidence that hiding prices costs enquiries.

---

## 2. The party-to-wedding transition — the most important section

### The headline finding, stated plainly

**I found no example of a balloon business splitting into a second brand for
weddings.** I searched for this specifically and repeatedly — sister brands,
sub-brands, "Weddings by X," second domains, businesses that dropped kids' parties to
go upmarket. Nothing surfaced. Given that search is my only instrument, I cannot
prove such businesses do not exist, and I want to be honest that absence-of-evidence
through a snippet-only channel is weak evidence. But the *positive* pattern is strong
and consistent enough that I would bet on it.

**The observed pattern is: one brand, occasion-segmented pages, and the restructuring
happens somewhere other than the menu.**

### Pattern 1 — occasion pages are navigation, not packaging (high confidence)

This is the most robust finding in the whole ticket because it rests on URL paths
rather than snippets. Balloon businesses that serve both markets build a landing page
per occasion and hang them off a single brand:

- `bubblegumballoons.com/pages/bespoke-wedding-balloons/` and
  `/categories/branded-balloons-london` — same brand, same shop
- `theballoonguyla.com/occasions/corporate-events/` — an `/occasions/` namespace
- `fashion-balloons.com/event/` with `/event/wedding/` beneath it — an `/event/` hub
  with occasion children
- `figballoonco.com/collections/corporate-events`
- `ballooncelebrations.com/pages/corporate`
- `balloonista.com/events/` and `/product-category/wedding-balloons/`
- `paris312.com/collections/gender-reveal` and `/collections/business-decor`
- `balloonsbytommy.com/menus/baby.htm` — an explicit per-occasion menu namespace

These pages exist for search traffic and for reassurance ("she does weddings"). They
are almost never a different *menu*. The garland is the same garland.

**The implication for Poppies is direct.** The website map's Celebrations/Weddings
split as a *register* split is exactly what the industry does. The evidence says it
survives as a navigation and tone split, and does **not** need to become an offering
split. Two doorways, one menu underneath, is the observed convention.

### Pattern 2 — the split that actually happens is by fulfilment mode (medium-high)

Where these businesses genuinely bifurcate, the line is not birthdays-vs-weddings. It
is **buy-it-now versus commission-it**:

- **Bubblegum Balloons** (London, founded 2013 by two sisters and a friend from a
  family home — the closest structural analogue to Poppies in origin). It started in
  *gifting* — a balloon sent to a friend for a new baby. It now runs a
  next-day-delivery shop on one side and bespoke installations for weddings, brand
  launches and corporate events on the other, at venues including Claridge's and the
  Oxo Tower. **One brand throughout.** The growth was absorbed by adding a bespoke
  track, not by splitting the identity (medium).
- **Party on Butler** — Grab n' Go retail alongside installations, florals, marquee
  letter rental and event planning (medium).
- **Fig Balloon Co** — online order/pickup with no minimum alongside a "Custom
  Balloon Stylist" service (medium).

This matters because it tells you *which* division is load-bearing. A business that
grows into weddings does not need a wedding menu; it needs a commissioned track that
did not exist when it was doing $200 birthday garlands.

### Pattern 3 — the wedding page changes register and mechanism, not menu (medium)

Where I could see snippet text from wedding-specific pages, the difference from the
party pages is consistent and is about *how you buy*, not *what you buy*:

- Wedding pages lead with consultation. Balloon Boutique Events (UK) offers free
  consultations and "bespoke wedding showstoppers, each totally unique to your
  special day" (medium).
- They use commissioning vocabulary — bespoke, design conversation, venue
  coordination. Fashion Balloons describes a process running from "your first design
  conversation to final cleanup," including venue coordination and vendor
  communication (medium).
- They tend not to publish tiers. My search for named wedding balloon package tiers
  ("The Ceremony," "The Reception," Bronze/Silver/Gold applied to weddings) returned
  **nothing** across balloon businesses — while the same search shape applied to
  birthdays and baby showers returns occasion-named packages immediately (see §4).

So: parties get packages, weddings get consultations. That asymmetry is the
restructuring. It is not visible as a new tier — it is visible as a different *call to
action* on a differently-worded page.

### Pattern 4 — the real gate is credibility infrastructure, not menu design (medium)

Every source that discussed entering the wedding market talked about things that are
not the service menu:

- **Venue preferred-vendor lists.** Repeatedly named as the mechanism. Bubblegum
  Balloons' own positioning leans on being "the preferred balloon supplier for over
  120 of the UK's most famous venues" (medium). *This connects directly to the
  liability-insurance risk already flagged in `map.md` — preferred-vendor lists are
  precisely where insurance requirements bite.*
- **Styled shoots.** The standard portfolio-building device for a wedding vendor with
  no wedding work. Multiple planner-education sources describe it as the fastest way
  to build a portfolio from nothing, and note that referrals from styled-shoot
  collaborators outperform bridal fairs. 2026-era advice adds that the shoot should
  be built around a *documented portfolio gap* and treated like a real booking,
  with image rights settled up front (medium).
- **Marketplace presence.** A Knot or WeddingWire storefront functions as a
  legitimacy signal in itself (low-medium — this is my inference from how the
  marketplace pages are framed, not a sourced claim).

### The mature version of this structure — borrowed from florists (medium, high value)

Balloon businesses are young; wedding florists have been solving this exact problem
for decades, and their solution is worth copying because it is the same problem.
The convention is **two tracks divided by a minimum**:

- **Ashland Addison Florist** — an à la carte wedding line with **no minimum**, "a
  collection of pre-designed arrangements for intimate weddings," purchasable online;
  and separately **full-service weddings with a floral minimum "typically starting at
  $5,000"** covering custom design, a venue walkthrough, a dedicated designer,
  delivery, setup and breakdown (medium).
- **She Loves Me** — a $500 minimum on à la carte event florals (medium).
- **Cork & Stem** and **Calla Lane Florals** — à la carte collections explicitly
  positioned as the no-minimum alternative to full-service design (medium).
- **Poppy** — a single stated entry point, "starting at $1,750," with the inclusions
  spelled out: bridal bouquet, bridesmaid bouquets, boutonnieres, bud vase trios for
  about ten tables, delivered and set up (medium).

**This is the structure I would put in front of the owner.** The minimum, not the
brand and not the tier, is what lets one business serve a $300 birthday and a $3,000
wedding without cheapening either. The à la carte track stays honest about being
small. The full-service track is defined by a number and a process, not by a package
name. And Poppy's approach — one figure with concrete inclusions attached — is a
model for how to state a wedding minimum without inventing wedding tiers she cannot
yet photograph.

### What this means for the brand-architecture question

Ticket 09 asks about brand architecture. This ticket's evidence points one way: **do
not split the brand.** Every growth example found kept one name. The naming research
already in `.scratch/naming/poppies-name-collision.md` notes four Oregon businesses
trading on "Poppies," three of them touching weddings — that is an argument about
*which* name, not an argument for running two. Splitting would double the portfolio
problem: two brands each with half the evidence.

---

## 3. The "starting at $X" anchor

### It is close to universal, and it is always paired with a minimum

The anchor is not an alternative to quoting. It is the thing that makes the quote
form work. The consistent three-part construction is **anchor + minimum + form**:

- **Modern Little Events** — "$25/foot + delivery & installation," a **12-foot
  minimum**, then an inquiry form (medium).
- **Party on Butler** — a component ladder rather than a single figure: columns
  "start around $150," arches "$350," full venue transformations "$1,000+," with an
  exact quote promised within 24 hours (medium).
- **Balloon Artisan** — anchors at the top instead of the bottom: "most of our large
  balloon installations range between $10k–$30k," then a form with a stated
  under-two-business-hours response (medium).
- **GigSalad** normalises the whole industry into this shape — component-level "and
  up" figures: centerpieces $15+, ceilings $50+, columns $75+, walls $100+, arches
  $125+, drops $150 (medium).

Party on Butler's ladder is worth singling out. Three ascending component anchors do
more work than one number: they show scale range, they let the visitor place
themselves, and they make the top figure feel like a real thing someone bought rather
than a deterrent.

### Does it filter enquiries or deter them?

**The evidence points clearly at filter, not deter** — with the honest caveat that
the best data comes from The Knot/WeddingPro, who have a commercial interest in
vendors filling in their pricing fields.

For:

- The Knot Real Weddings 2025 Vendor Report: **78% of couples say pricing is the
  number one factor in deciding which vendors to contact** (medium; consistently
  reported across several independent sites, which raises my confidence in the number
  existing, not necessarily in its methodology).
- WeddingPro reports a test in which **venues displaying rates on their Storefront
  saw a ~25% increase in couple response rate** (medium; single source, vendor-owned,
  no methodology visible to me).
- The behavioural claim, repeated across sources: if couples cannot find pricing on
  one storefront, they move to another rather than message to ask.
- The sticker-shock counter: **60% of couples increase their budget at least once**,
  and roughly 1 in 3 luxury couples wish they had spent more (medium). An anchor
  above someone's current budget is not necessarily a lost enquiry.
- Vendor-side benefit: less time answering "how much roughly?" and fewer
  budget-mismatched consultations.

Against:

- A real, mostly photographer-led counter-position exists: publishing rates attracts
  price shoppers, and if price is the deciding factor the client was never a fit. I
  found this argued sincerely but **only as opinion — no data behind it in anything I
  saw**.

**Net read.** The anti-transparency argument is a positioning argument for
businesses whose portfolio already does the qualifying. Poppies is not there. For
her, the anchor is the cheapest possible qualification mechanism, and the practical
risk is not that it deters — it is that an anchor set too low anchors her *own*
pricing and becomes hard to climb away from. That is a pricing question and belongs
to the pricing ticket, but the packaging shape should assume an anchor exists.

### The marketplace schema is a useful sanity check

The Knot **requires** a package to carry at minimum: a **package name**, a **starting
cost**, and **at least one package feature** before it will display (medium, from
The Knot Pro vendor support documentation). The Knot also buckets vendors into
$/$$/$$$/$$$$ categories that the vendor self-selects relative to local rates.

That minimum triple — name, starting cost, one concrete inclusion — is a good
discipline for her own site. If a menu item cannot carry all three, it is not ready
to be a menu item.

---

## 4. Add-ons without a checkout feel

### What businesses actually do

Add-ons are extremely common and are handled in three distinguishable ways:

**(a) A named block attached to the main service, not a separate aisle.** Balloons
and Glitz describes enhancing "arches, garlands, photo booths and sculptures" with
"shimmer walls, LED signage, plinths, florals, banners" — phrased as enhancements *to*
a thing, which keeps the main service the subject of the sentence (medium).

**(b) A dedicated add-ons page.** Flower Walls Las Vegas has a literal `/add-ons`
page for neon signs, lighting and custom décor (high, from URL). This is the
checkout-feeling end of the spectrum and works when the add-ons are genuinely
rentable inventory.

**(c) Priced upgrades listed inline with the packages.** Picture Perfect Party Decor
lists upgrades with figures — custom wooden signs, adding flowers to balloons, plinth
or pedestal at $40–$60 each or three for $150, plus throne chairs and custom
backdrops (medium). Rockin' Robot Party similarly lists marquee letters, neon signs,
glowing orbs, rope lights (medium).

The recurring vocabulary across all of them is **"enhancements," "upgrades,"
"add-ons"** — and the recurring content is almost entirely **rental inventory**:
plinths, neon signs, marquee numbers, backdrops, shimmer walls, florals.

### What I would take from this

Three observations that shape a recommendation:

1. **The add-on lists that read as a checkout are the ones made of stuff.** Plinth,
   sign, backdrop, letter — these are objects with unit prices, and a list of objects
   with unit prices *is* a shopping cart, however it is styled. There is no styling
   trick that rescues it.
2. **Add-ons that read as craft are ones phrased as design decisions** — "add fresh
   florals," "add foil and fringe detail" — because they name a change to the thing
   being made rather than an object being sold.
3. **The best mechanism I saw does not label add-ons as add-ons at all.** Inflate
   Louisville folds the upgrade into the *specification of the tier*: the Standard
   garland includes 5", 11" and 17" balloons; the Deluxe adds 24" and 36", foil
   balloons and faux florals — and "an addition of foil balloons, fringe or florals
   will require the Deluxe Package Rate" (medium). The customer is not adding items to
   a basket. They are choosing between two levels of finish, and the finish
   difference is stated concretely enough to be credible.

**Recommendation.** Handle enrichment through *finish level* rather than an item
list, and reserve an explicit add-on list only for things that are genuinely separate
physical hires (the tent being the obvious candidate, which ticket 07 owns). Two
finish levels, defined by what is included, will cover most of what an add-on list
would have done — and it degrades gracefully, because a finish level needs one
photograph to evidence, whereas an eight-item add-on list needs eight.

---

## 5. Package naming conventions

### All three conventions are in use, at different layers

This is the cleanest structural insight in the ticket. Naming by occasion, by scale
and by component are not competing — businesses use them at **different layers of the
site**, and the layers are consistent:

| Layer | Convention used | Evidence |
|---|---|---|
| Navigation / landing pages | **Occasion** | `/collections/gender-reveal`, `/event/wedding/`, `/occasions/corporate-events/`, `/menus/baby.htm` (high) |
| Actual packages/menu items | **Component**, or **scale-encoding-a-spec** | Inflate Louisville Standard/Deluxe garland; GigSalad's column/arch/wall/ceiling/drop ladder (medium) |
| Occasion-named packages | exists, mostly at the low end | Glamour Balloons Boutique's pricing page is headed "Birthday Packages, Gender Reveal, Baby Shower & More!" (medium) |

Scale-adjective naming does appear — PopFestCo uses **Petite (4–6ft) / Premium
(8–10ft) / Luxury (10–12ft)** with balloon counts stated for each (medium) — but note
that PopFestCo is selling **DIY kits**, a product, not an installation service. The
service businesses I saw that use scale words tie them to a **specification**, not to
a vibe: Inflate Louisville's Deluxe is not "fancier," it is "also includes 24" and 36"
balloons, foil and faux florals," at $28/ft against Standard's $24/ft.

The general naming advice, from outside the industry, converges on the same place:
clarity beats cleverness, and vague tier labels ("Basic Package") are a named failure
mode because the buyer cannot tell what they are getting (medium — this is
generic marketing-blog material, weakest source class in this document).

### Which is most credible for a small portfolio

**Component naming, with occasion used only for navigation.** My reasoning:

- **Component names are claims she can evidence.** "Balloon garland," "arch,"
  "sculptural figure" — each needs exactly one photograph to be credible, and she has
  those. A tier called "Grand" needs a photograph of something grand, and the visitor
  will look for it.
- **Occasion-named packages multiply badly.** Birthday / Baby Shower / Gender Reveal /
  Graduation / Wedding is five packages that are mostly the same garland in different
  colours. Each one implies a distinct thing she has made repeatedly. Five implied
  claims, one actual garland. This convention is visible mainly at the volume end of
  the market, where the packages really are interchangeable and the naming is
  SEO-driven.
- **Scale adjectives are safe only when they encode a spec.** Petite/Grand with
  nothing behind them is a vibe. Standard/Deluxe defined by "which balloon sizes and
  materials are included" is a fact, and a fact survives a sceptical reader with no
  portfolio to check it against. If she wants two levels, define them the Inflate
  Louisville way.
- **Component naming ages into weddings without renaming.** An arch is an arch at a
  fifth birthday and at a coast wedding. A menu of components needs no restructuring
  when the wedding work arrives — which is precisely the property the ticket was
  looking for. Occasion-named packages would need a whole new set.

One deliberate break with convention worth considering: **the sculptural figure work
should be named as itself**, not absorbed into a component menu of garlands and
arches. It is the thing no competitor's menu has. Giving it its own line — quote-led,
no tier — makes the menu asymmetric, and that asymmetry is a signal rather than a
flaw.

---

## What I could not determine

Listed roughly in order of how much I think it matters.

1. **Whether any balloon business has actually split into a second brand for
   weddings.** I searched this from six angles and found nothing. Because I could not
   read any site directly, and because a sister brand would most likely be discovered
   *on* a site rather than through search, this is the single weakest area of the
   report relative to its importance. My conclusion ("nobody does this") is drawn from
   a strong positive pattern, not from a successful search for the negative.

2. **What a wedding-facing balloon page actually contains.** I know these pages exist
   (URLs) and I have snippet-level evidence of their tone. I could not see whether
   they carry a minimum, a starting anchor, a package list, or nothing but a gallery
   and a form. This is the most valuable single thing a follow-up should get, and it
   needs perhaps six page-opens: Bubblegum Balloons' bespoke-wedding page,
   Balloonista's wedding category, Fashion Balloons' `/event/wedding/`, Balloon
   Boutique Events, 99 Haus, and one Oregon comparable.

3. **Anything specific to the Oregon coast market.** I found Portland-area balloon and
   balloon-delivery businesses (Bouquets & Balloons since 1987, Balloons on Broadway,
   Salem Balloons & Flowers, Balloon Planet) but got no structural detail on any of
   them, and nothing at all from coastal towns. Whether coast wedding clients expect a
   published menu or a quote is unknown, and a small tourist-season market may behave
   quite differently from the metro examples that dominate this report.

4. **Whether "starting at" deters, measured properly.** The 78% and the 25%
   response-rate lift both trace back to The Knot / WeddingPro, a party with an
   interest in the answer. I found no independent study and no methodology. The
   direction of the effect is well-supported by consistency across sources; the
   magnitude is not.

5. **How a small portfolio actually reads to a wedding client.** My §5 recommendation
   rests on a plausibility argument — that unevidenced tiers read as aspirational —
   not on evidence. I found no research on how buyers evaluate a thin portfolio, and
   the argument could be wrong: it is at least arguable that confident tiers *create*
   the impression of experience.

6. **Whether businesses that publish per-foot rates keep them, or abandon them as they
   grow.** I saw per-foot pricing at the local end and quote-only at the premium end,
   which suggests a trajectory — but I saw a snapshot, not a history. I have no
   evidence of any individual business changing its structure over time. The
   "trajectory" may be selection, not evolution.

7. **How add-ons are visually arranged.** I have vocabulary and inventory lists. I do
   not know whether these appear as tables, cards, checkboxes or prose, which is
   precisely the "does it feel like a checkout" question the ticket asked. §4's
   recommendation is reasoned from the *content* of the lists rather than observed
   from their presentation.

8. **Naming conventions in the sculptural/figure niche specifically.** Everything I
   found on naming concerns garlands, arches and backdrops. Sculptural figure work is
   rare enough that I saw no menu containing it, so the recommendation to break it out
   as its own line is reasoning, not observation.

---

## Assumptions made, and questions for the owner

Per `map.md`, what this ticket had to assume and what only she can answer.

**Assumed:**

- That she wants birthday/celebration work to remain bookable with minimal
  back-and-forth. The two-track recommendation is built on this; if she would rather
  quote everything individually, Track A collapses and the recommendation changes.
- That the sculptural figure work is a differentiator she wants foregrounded. If it
  is instead the low-margin work she does because it is asked for, it should not get
  its own headline line on the menu.
- That she is willing to state a minimum publicly. The whole two-track structure hangs
  on the minimum being the divider; without it the tracks blur.

**Questions for her:**

1. **What is the smallest job you are willing to take?** The minimum is the single
   most structurally load-bearing number in this proposal, and it is hers to set.
2. **Do you want to keep doing small birthday work once weddings arrive?** The florist
   two-track model assumes yes. If the answer is "no, that is what I am growing out
   of," the structure simplifies considerably — and the party pages become a
   deliberate on-ramp rather than a business line.
3. **How different is a wedding garland from a birthday garland, in your hands?** If
   the answer is "not very," the one-menu convention is right. If wedding work
   genuinely means a different process — site visits, timelines, coordination with
   planners — that difference is what justifies the separate track, and she is the
   only one who knows.
4. **Is there any figure work you refuse to do?** A component menu makes an open-ended
   promise; she may want it bounded.

---

## Sources

Business sites (observed via search results and URL paths only — **none fetched
directly**):

- [Bubblegum Balloons — bespoke wedding balloons](https://bubblegumballoons.com/pages/bespoke-wedding-balloons/) · [about](https://bubblegumballoons.com/pages/about-us/) · [branded balloons](https://bubblegumballoons.com/categories/branded-balloons-london)
- [The Balloon Guy LA — corporate occasions](https://www.theballoonguyla.com/occasions/corporate-events/) · [home](https://www.theballoonguyla.com/)
- [Fig Balloon Co — custom installation service](https://figballoonco.com/pages/custom-balloon-installation-service) · [corporate events collection](https://figballoonco.com/collections/corporate-events) · [garland size guide](https://figballoonco.com/pages/balloon-garland-size-guide)
- [Party on Butler — balloon installations](https://www.partyonbutler.com/pages/balloon-installations) · [arrangements](https://www.partyonbutler.com/store-catalog/p/balloonarrangement)
- [Inflate Louisville — size guide](https://www.inflatelouisville.com/sizeguide) · [packages](https://www.inflatelouisville.com/packages) · [garlands](https://www.inflatelouisville.com/ourballoons)
- [Modern Little Events — balloon installations](https://modernlittleevents.com/balloon-installations)
- [Balloon Artisan — large installation pricing](https://www.balloonartisan.com/large-balloon-arch-and-installation-pricing) · [pricing by category](https://www.balloonartisan.com/balloon-pricing-by-category)
- [99 Haus Balloons — custom event decor](https://99hausballoons.com/products/customeventdecor)
- [Tabitha's Balloon Bar](https://www.tabithasballoonbar.com/)
- [Atlanta Balloon Designer — our rate](https://www.atlantaballoondesigner.com/our-rate/)
- [Fashion Balloons — event hub](https://fashion-balloons.com/event/) · [weddings](https://fashion-balloons.com/event/wedding/)
- [Balloonista — events](https://www.balloonista.com/events/) · [wedding balloons](https://www.balloonista.com/product-category/wedding-balloons/)
- [Balloon Celebrations — corporate](https://ballooncelebrations.com/pages/corporate)
- [Paris312 — gender reveal](https://paris312.com/collections/gender-reveal) · [business decor](https://paris312.com/collections/business-decor)
- [Balloons by Tommy — baby menu](https://www.balloonsbytommy.com/menus/baby.htm)
- [Glamour Balloons Boutique — pricing](https://glamourballoonsboutique.com/pricing/)
- [Balloons and Glitz — balloon decor](https://www.balloonsandglitz.com/balloon-decor)
- [Picture Perfect Party Decor — party packages](https://pictureperfectpartydecor.com/party-packages/)
- [Flower Walls Las Vegas — add-ons](https://www.flowerwallslasvegas.com/add-ons)
- [Rockin' Robot Party — custom balloons](https://www.rockinrobotparty.com/customballoons)
- [Memo Balloons — decoration services](https://memoballoons.com/pages/balloons-decoration-services)
- [Balloon Boutique Events (UK)](https://www.balloonboutiqueevents.co.uk/)
- [Scottsdale Party Balloons — packages & pricing](https://scottsdalepartyballoons.com/packages-and-pricing/)
- [Lancaster Float Company](https://lancasterfloatco.com/) · [Balloon Empyre FAQ](https://www.balloonempyre.com/faq) · [WOW Balloons](https://www.balloonswow.com/) · [Balloon HQ](https://balloonhq.com/) · [POParazzi Balloons](https://www.poparazziballoons.com/) · [Belle Balloons Boutique](https://www.belleballoonsboutique.com/services) · [Memorable Concepts](https://www.memorableconcepts.com/) · [Create and Inflate](https://www.createandinflateevents.com/eventservices)
- [PopFestCo balloon arch kit](https://popfestcoshop.com/products/girly-mouse-balloon-arch-kit) · [Ellie's Party Supply](https://www.elliesparty.com/)
- Oregon: [Bouquets & Balloons (Portland)](https://www.bouquetsandballoons.com/about_us) · [Balloons on Broadway](https://www.balloonsonbroadway.com/) · [Salem Balloons & Flowers](https://www.salemballoonsandflowers.com/)

Florist analogues:

- [Ashland Addison — à la carte weddings](https://www.ashaddflorist.com/weddings-and-events-a-la-carte) · [Cork & Stem](https://www.corkandstemsd.com/collections/a-la-carte-weddings) · [Calla Lane Florals](https://callalaneflorals.com/studio/wedding-flowers/) · [She Loves Me](https://shelovesme.com/pages/forever-yours) · [Poppy Flowers](https://www.poppyflowers.com/)

Marketplaces and industry data:

- [The Knot Pro — Storefront pricing](https://vendorsupport.theknotpro.com/hc/en-us/articles/4404785398676-Storefront-Pricing-on-The-Knot) · [Storefront guidelines](https://vendorsupport.theknotpro.com/hc/en-us/articles/8153808341908-Storefront-Guidelines-and-Best-Practices) · [Vendor pricing categories](https://helpcenter.theknot.com/hc/en-us/articles/20700698463636-Vendor-Pricing-Categories)
- [WeddingPro — Pricing Transparency: What Wins More Couples?](https://pros.weddingpro.com/blog/vendor-storefront-pricing/) · [The Knot Real Weddings 2025 Vendor Report](https://pros.weddingpro.com/report/the-knot-real-weddings-2025-vendor-report/)
- [GigSalad — Balloon Decor category](https://www.gigsalad.com/Event-Services/Balloon-Decor)
- [By Emily Jane — why hiding your prices is hurting your wedding business](https://www.byemilyjane.com/blog/why-wedding-vendors-should-show-prices) · [Walid Azami — why you shouldn't list your prices](https://walidazami.substack.com/p/why-you-shouldnt-list-your-prices) (the counter-position)
- [Lilly Red Academy — approaching vendors for a styled shoot](https://lillyredacademy.com/how-to-approach-vendors-for-a-styled-shoot/) · [Candice Coppola — building a portfolio from scratch](https://blog.candicecoppola.com/build-your-portfolio-as-a-wedding-planner/) · [Bespoke-Bride — 2026 styled shoot trends](https://www.bespoke-bride.com/2026/08/01/2026-styled-shoot-trends-wedding-vendors-portfolios/)
- [Chronicle Online — Cotton Events profile](https://www.chronicleonline.com/weeklies/wakulla_news/up-up-and-away-balloon-business-getting-off-the-ground/article_790c62f9-c96e-590e-8878-e02328a166ad.html) · [CanvasRebel — Shreena Patel](https://canvasrebel.com/meet-shreena-patel/)
- [Monetizely — psychology of tier names](https://www.getmonetizely.com/articles/the-psychology-of-tier-names-crafting-package-labels-that-sell)
