# Break-even model

`poppies-break-even.xlsx` is a small model with live formulas. Change the blue
inputs on **Inputs** and the booking counts on **Year**; **Products** shows what
each job earns per hour of her time, and **Break-even** shows how many jobs
cover a year's fixed costs. Sources for every input are in column D of
**Inputs** (mostly `../research/07`, `09` and `10`).

The file is set to **recalculate when opened**, so Excel, Google Sheets and
Numbers show live values. It was written by `build_model.py` (openpyxl), so
rebuild from that script rather than editing structure by hand.

## How it was checked (2026-11-06)

LibreOffice, the usual recalculation tool, couldn't load any file in this
environment, not even a two-cell test. So every formula was evaluated with the
Python `formulas` library instead: **280 cells, zero errors**. The garland row
was then checked by hand: $680 price, $44 materials, $76 mileage, $20.40 card
fees, $539.60 contribution, 9.25 hours, about $58 an hour.

The check found two mistakes, both fixed:

- **The model double-counted driving** (1 hour each way for 25 miles). It now
  uses 0.5 hours one way, about 1 hour per round trip, which matches the
  research.
- **The research's "$43 an hour" was an addition slip** (9.25 hours printed as
  10.25). The corrected figure, about $48 an hour, is now used in
  `research/07`, the pricing proposal, `ideas.md`, ticket 05 and the ideas
  page.

## What the example year says

The example mix is 90 bookings, about $39,300 revenue, $4,000 fixed costs,
about $18,900 take-home after a 27.5% tax set-aside, over about 490 hours of
work (about $38 an hour all-in). **It's an example, not a forecast.** About 12
average bookings cover the fixed costs. The **organic arch** is the one product
below the $45 an hour target at $450; it needs a higher price or less build
time.
