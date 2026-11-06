# Startup checklist: everything before the first paid job

*In order, with rough costs. Merged from `../research/10-oregon-business-setup.md`
(legal, licences, insurance, tax: **general information, not legal or tax
advice**), `../research/09-operations-suppliers-tools.md` (equipment,
suppliers, software), and the website and naming notes elsewhere in
`.scratch/`. Every cost is an estimate from search snippets.*

**Rough total before the first job: about $1,750 (lean) to $5,600 (comfortable),
not counting a vehicle.** That's setup at $1,000–2,500 plus a starter kit at
$750–3,100.

## Phase 0: before spending anything

- [ ] **Settle the trademark question.** POPPIE (USPTO 98162236, balloon
      design services) is reportedly registered. Check TSDR, then a trademark
      attorney if it's live. **Don't pay for filings, a domain or signage under
      a name that might change.** See `../../naming/poppies-name-collision.md`.
- [ ] **Book a free session at the Oregon Coast Community College Small
      Business Development Center** (541-994-4166, per the research; confirm
      the number). Bring this checklist and `research/10`.

## Phase 1: register ($50–150, days to a few weeks)

- [ ] Choose **sole proprietor or LLC** (with the SBDC; optionally a 1-hour
      lawyer consult, $0–300).
- [ ] **Register with the Oregon Secretary of State:** an LLC ($100, plus $100
      a year) and/or an **assumed business name** for "Poppies" ($50 every 2
      years).
- [ ] **Get an EIN** from the IRS (free, minutes online).
- [ ] **Open a business bank account.**

## Phase 2: licences, insurance, tent ($550–3,200 a year)

- [ ] **Home-city business licence:** Newport about $45 + $150 a year, or
      Lincoln City $50 + $100 a year.
- [ ] **Know the other cities:** Lincoln City, Depoe Bay and Toledo license
      out-of-town businesses working inside city limits. Lincoln County itself
      has none. Check Yachats and Waldport (not found).
- [ ] **General liability insurance, $1M/$2M,** classed as a decor installer,
      **with the tent disclosed**, plus an equipment floater. About $59 per
      event, or $199–531 a year (lean figures). Ask about unlimited
      additional-insured certificates for venues.
- [ ] **Fix vehicle cover:** personal car insurance usually won't cover
      hauling gear to jobs. An endorsement, or commercial auto at $600–2,500 a
      year.
- [ ] **Tent paperwork:** find the tent's NFPA 701 flame-resistance
      certificate, or get a replacement from the maker. At 800 sq ft it's over
      Oregon Fire Code permit thresholds (400 sq ft enclosed, 700 open-sided),
      so every tent job needs a fire permit. North Lincoln Fire & Rescue wants
      15 days' notice.

## Phase 3: contract, payments, books ($300–1,000 once)

- [ ] **Contract:** draft from `research/10` §6 (deposit, cancellation,
      weather, damage, latex disclosure, no-release clause, photo rights,
      liability), and have an Oregon lawyer review it once. Oregon voids
      non-refundable deposits only when they're grossly out of proportion to
      the real loss. E-signatures are valid in Oregon (ORS 84.019).
- [ ] **Payments:** Square or Stripe for deposits. Stripe keeps its fees on
      refunds; Square's online card rate is 3.3% + 30¢ on the free plan.
- [ ] **Books:** a spreadsheet or Wave/QuickBooks. Set aside 25–30% of
      profit; quarterly estimated tax is due April, June, September and
      January 15. No Oregon sales tax; the Corporate Activity Tax doesn't
      apply under $750k in sales.

## Phase 4: equipment and suppliers ($750–3,100)

- [ ] **Supplier accounts:** no balloon wholesaler on the coast, so keep
      safety stock. Online wholesalers ship to Oregon (Instaballoons, Balloon
      Warehouse, Bargain Balloons and others). They want the business
      registration and EIN; keep Oregon resale certificate form 150-800-002
      for out-of-state sellers.
- [ ] **Starter kit** (the full table is in `research/09`):
  - an electric inflator (from $30; a pro Conwin unit is about $440)
  - two hand pumps for beaches
  - a sizer
  - strip, glue dots and tools
  - one or two frames ($30–250)
  - water bases and sandbags ($50–150)
  - opening latex stock in her core palette ($300–700; 11" latex is about
    $16–35 per 100)
  - storage and transport bags
- [ ] **No helium at launch.** Rent per job if ever needed. This fits the
      "air, not helium" position (idea #3).
- [ ] **Transport plan:** build in 4–6 ft sections and join them on site. An
      SUV carries about 8 ft, a minivan about 10 ft. Keep the A/C on and the
      sections out of the sun.

## Phase 5: systems and the website (mostly free)

- [ ] **Turn the enquiry form on:** `RESEND_API_KEY` and `ENQUIRY_TO` in
      Vercel, plus a Firewall rate-limit rule on `/api/enquiry`.
- [ ] **Airtable:** create the table with these columns: Name, Email, Date,
      Town, Event, Scale, Colours, Budget, Latex allergy, Heard about us,
      Received. Airtable's free plan holds 1,000 records.
- [ ] **Domain** (after the trademark is clear): set `SITE_URL`, verify the
      domain in Resend, set `ENQUIRY_FROM` and `site.email`.
- [ ] **Google Business Profile** (`google-business-profile-setup.md`) and the
      free directory listings (idea #11).
- [ ] **Software:** stay on Airtable plus Square/Stripe until about 2
      bookings a month, then consider HoneyBook Starter (about $29/month
      billed annually). Try Fanfaire, a balloon-specific platform, first.
      Balloon Brain (about $6) handles balloon counts.

## Phase 6: proof before the first paying client

- [ ] **Photos:** work through `/shot-list`. A styled shoot (idea #117) fills
      it fastest.
- [ ] **Her review** of the site copy, explainers and policies marked
      `[her call]`.
- [ ] **Starting prices** decided (offering-model ticket 05; see
      `pricing-proposal.md` once written).

## Every job, from then on

- [ ] Does this city need a licence?
- [ ] Is the tent going up? Then a fire permit, 15+ days ahead.
- [ ] Beach or state park? Then an OPRD permit ($100+, 3–4 weeks ahead).
- [ ] Has the venue asked for an insurance certificate naming them?
- [ ] Latex allergies noted? The no-release clause in the contract?

## Every year

- [ ] LLC annual report ($100). City licence renewals (Newport renews July 1).
      Assumed business name every 2 years ($50). Insurance renewal.
