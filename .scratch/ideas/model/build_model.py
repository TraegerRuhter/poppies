from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.comments import Comment

wb = Workbook()
F = 'Arial'
BLUE = Font(name=F, color='0000FF')
BLACK = Font(name=F)
GREEN = Font(name=F, color='008000')
BOLD = Font(name=F, bold=True)
TITLE = Font(name=F, bold=True, size=14)
NOTE = Font(name=F, italic=True, color='666666', size=9)
YELLOW = PatternFill('solid', start_color='FFFF00')
HEAD = PatternFill('solid', start_color='EFE7DC')
USD = '$#,##0;($#,##0);-'
USD2 = '$#,##0.00;($#,##0.00);-'
PCT = '0.0%;(0.0%);-'
NUM = '#,##0.0;(#,##0.0);-'
INT = '#,##0;(#,##0);-'
thin = Side(style='thin', color='CCCCCC')

def style_all(ws):
    for row in ws.iter_rows():
        for c in row:
            if c.font is None or c.font.name != F:
                c.font = Font(name=F, bold=c.font.bold if c.font else False, italic=c.font.italic if c.font else False, color=c.font.color if c.font else None, size=c.font.size if c.font else 11)

# ---------------- Read me ----------------
rm = wb.active; rm.title = 'Read me'
lines = [
    ('Poppies: break-even model', TITLE),
    ('Research input, not a plan. Every number is an estimate from search snippets; see .scratch/ideas/research/07, 09 and 10.', NOTE),
    ('', None),
    ('How to use it', BOLD),
    ('1. Change the blue numbers on Inputs (prices, costs, fixed costs). Yellow cells are the key assumptions to replace with her real figures.', BLACK),
    ('2. Change the blue booking counts on Year to try a scenario. The example row is one plausible first year, not a forecast.', BLACK),
    ('3. Read the results: Products shows what each job earns per hour of her time; Year shows profit; Break-even shows how many jobs cover the fixed costs.', BLACK),
    ('', None),
    ('Colour key', BOLD),
    ('Blue text = an input you can change. Black = a formula. Green = a value pulled from another sheet. Yellow fill = a key assumption.', BLACK),
    ('', None),
    ('The finding that drives it', BOLD),
    ('Materials are under 10% of a garland price. The cost is her time, and the drive along Highway 101. Travel and teardown fees matter as much as the per-foot rate.', BLACK),
]
for i, (t, f) in enumerate(lines, 1):
    c = rm.cell(row=i, column=1, value=t)
    if f: c.font = f
rm.column_dimensions['A'].width = 120

# ---------------- Inputs ----------------
inp = wb.create_sheet('Inputs')
inp['A1'] = 'Inputs'; inp['A1'].font = TITLE
inp['A2'] = 'Blue = change me. Sources are in column D.'; inp['A2'].font = NOTE
rows = [
    ('Prices', None, None, None),
    ('Garland, standard ($/ft)', 28, USD, 'research/07 §6 #1; drafts/pricing-proposal.md'),
    ('Teardown fee, local ($)', 120, USD, 'research/07 §6 #3: $95–150 local'),
    ('Organic arch, installed ($)', 450, USD, 'research/07 §6 #6: $375–550'),
    ('The Arrival, with collection ($)', 395, USD, 'research/07 §6 #8'),
    ('Proposal setup, core tier ($)', 750, USD, 'research/07 §6 #9: $650–1,200'),
    ('Grab-and-go garland, 8 ft ($)', 136, USD, 'research/07 §6 #10: $15–18/ft'),
    ('Storefront subscription ($/month)', 240, USD, 'research/07 §6 #11: $200–275'),
    ('The Pavilion, all-in ($)', 3500, USD, 'research/07 §6 #13: $3,000–4,500; needs a real tent quote'),
    ('Costs', None, None, None),
    ('Materials, standard garland ($/ft)', 2.2, USD2, 'research/07 §2g'),
    ('Build time (minutes per foot)', 16.5, NUM, 'research/07 §2d: a pricing model assumption; time her own builds'),
    ('Mileage rate ($/mile)', 0.76, USD2, 'IRS rate from July 2026, per research/07 §2e'),
    ('Typical one-way drive (miles)', 25, NUM, 'research/07 §2g worked example (Newport venue)'),
    ('Typical one-way drive (hours)', 0.5, NUM, '25 miles on Highway 101 is about 30–40 min; matches research/07 §2g (about 1 h per round trip)'),
    ('Owner target wage ($/hour)', 45, USD, 'research/07 §2g: a target, not a market figure'),
    ('Card fees (share of revenue)', 0.03, PCT, 'research/10 §7: Square online 3.3% + 30¢; rounded'),
    ('Tax set-aside (share of profit)', 0.275, PCT, 'research/10 checklist: set aside 25–30%'),
    ('Fixed costs per year', None, None, None),
    ('Liability insurance ($/yr)', 600, USD, 'research/10 §4: $199–531/yr lean; plus equipment floater'),
    ('Vehicle insurance top-up ($/yr)', 600, USD, 'research/10 §4: endorsement, or $600–2,500 commercial'),
    ('Licences and filings ($/yr)', 350, USD, 'research/10: LLC $100, ABN $25/yr, 1–2 city licences'),
    ('Software ($/yr)', 350, USD, 'research/09: HoneyBook Starter ~ $350/yr, or $0–100 lean'),
    ('Marketing and print ($/yr)', 600, USD, 'Assumption: cards, a styled shoot share, listings'),
    ('Equipment, spread over 3 years ($/yr)', 1000, USD, 'research/09 starter kit: $750–3,100, over 3 years'),
    ('Accountant ($/yr)', 500, USD, 'research/10: CPA return $300–800'),
]
r = 4
NAMES = {}
for label, val, fmt, src in rows:
    if val is None:
        inp.cell(row=r, column=1, value=label).font = BOLD
        inp.cell(row=r, column=1).fill = HEAD
        for col in (2, 3, 4): inp.cell(row=r, column=col).fill = HEAD
    else:
        inp.cell(row=r, column=1, value=label).font = BLACK
        c = inp.cell(row=r, column=2, value=val); c.font = BLUE; c.number_format = fmt
        inp.cell(row=r, column=4, value=src).font = NOTE
        NAMES[label] = f'Inputs!$B${r}'
    r += 1
fixed_total_row = r
inp.cell(row=r, column=1, value='Total fixed costs ($/yr)').font = BOLD
first_fixed = [k for k in NAMES if k.endswith('($/yr)')]
rows_fixed = [int(NAMES[k].split('$')[-1]) for k in first_fixed]
c = inp.cell(row=r, column=2, value=f'=SUM(B{min(rows_fixed)}:B{max(rows_fixed)})'); c.font = BOLD; c.number_format = USD
NAMES['FIXED'] = f'Inputs!$B${r}'
for key in ('Garland, standard ($/ft)', 'Build time (minutes per foot)', 'Typical one-way drive (miles)', 'Owner target wage ($/hour)'):
    cell = inp[NAMES[key].replace('Inputs!', '').replace('$', '')]
    cell.fill = YELLOW
inp.column_dimensions['A'].width = 38; inp.column_dimensions['B'].width = 14; inp.column_dimensions['C'].width = 2; inp.column_dimensions['D'].width = 70

# ---------------- Products ----------------
pr = wb.create_sheet('Products')
pr['A1'] = 'Unit economics per job'; pr['A1'].font = TITLE
pr['A2'] = 'Hours include building, installing, teardown and driving. Blue cells are per-product assumptions.'; pr['A2'].font = NOTE
hdr = ['Product', 'Price ($)', 'Materials ($)', 'Hands-on hours', 'Round trips', 'Mileage ($)', 'Driving hours', 'Card fees ($)', 'Contribution ($)', 'Total hours', 'Earns per hour ($)', 'vs target wage']
for j, h in enumerate(hdr, 1):
    c = pr.cell(row=4, column=j, value=h); c.font = BOLD; c.fill = HEAD; c.alignment = Alignment(wrap_text=True)
N = NAMES
products = [
    # name, price formula, materials formula, hands-on hours (formula or number), round trips
    ('Garland, 20 ft standard + teardown', f'=20*{N["Garland, standard ($/ft)"]}+{N["Teardown fee, local ($)"]}', f'=20*{N["Materials, standard garland ($/ft)"]}', f'=20*{N["Build time (minutes per foot)"]}/60+1+0.75', 2),
    ('Organic arch, installed', f'={N["Organic arch, installed ($)"]}', 60, 5.75, 2),
    ('The Arrival (with collection)', f'={N["The Arrival, with collection ($)"]}', 40, 3, 2),
    ('Proposal setup (core)', f'={N["Proposal setup, core tier ($)"]}', 90, 5, 2),
    ('Grab-and-go garland, 8 ft (pickup)', f'={N["Grab-and-go garland, 8 ft ($)"]}', f'=8*{N["Materials, standard garland ($/ft)"]}', f'=8*{N["Build time (minutes per foot)"]}/60+0.25', 0),
    ('Storefront subscription (one month)', f'={N["Storefront subscription ($/month)"]}', 25, 3, 0.5),
    ('The Pavilion (tent + decor)', f'={N["The Pavilion, all-in ($)"]}', 450, 22, 3),
]
src_notes = {
    'Organic arch, installed': 'Materials and hours: assumptions scaled from research/07 §2g',
    'The Arrival (with collection)': 'research/07 §2h: materials ~$40; 3 h hands-on; 2 trips',
    'Proposal setup (core)': 'Assumption: a larger version of The Arrival',
    'The Pavilion (tent + decor)': 'Assumption: tent wear, permits and decor materials ~$450; 2 people would halve the days',
    'Storefront subscription (one month)': 'Half a trip: shops grouped on one route day (research/07 §6 #11)',
}
start = 5
for i, (name, price, mat, hours, trips) in enumerate(products):
    row = start + i
    pr.cell(row=row, column=1, value=name).font = BLACK
    c = pr.cell(row=row, column=2, value=price); c.font = GREEN; c.number_format = USD
    c = pr.cell(row=row, column=3, value=mat); c.font = BLUE if not str(mat).startswith('=') else GREEN; c.number_format = USD
    c = pr.cell(row=row, column=4, value=hours); c.font = BLUE if not str(hours).startswith('=') else GREEN; c.number_format = NUM
    c = pr.cell(row=row, column=5, value=trips); c.font = BLUE; c.number_format = NUM
    c = pr.cell(row=row, column=6, value=f'=E{row}*2*{N["Typical one-way drive (miles)"]}*{N["Mileage rate ($/mile)"]}'); c.number_format = USD
    c = pr.cell(row=row, column=7, value=f'=E{row}*2*{N["Typical one-way drive (hours)"]}'); c.number_format = NUM
    c = pr.cell(row=row, column=8, value=f'=B{row}*{N["Card fees (share of revenue)"]}'); c.number_format = USD
    c = pr.cell(row=row, column=9, value=f'=B{row}-C{row}-F{row}-H{row}'); c.number_format = USD
    c = pr.cell(row=row, column=10, value=f'=D{row}+G{row}'); c.number_format = NUM
    c = pr.cell(row=row, column=11, value=f'=IFERROR(I{row}/J{row},0)'); c.number_format = USD; c.font = BOLD
    c = pr.cell(row=row, column=12, value=f'=IF(K{row}>={N["Owner target wage ($/hour)"]},"Above target","Below target")')
    if name in src_notes:
        pr.cell(row=row, column=1).comment = Comment(src_notes[name], 'Claude')
last_prod = start + len(products) - 1
pr.cell(row=last_prod + 2, column=1, value='Reading it: a product below the target wage needs a higher price, a travel or teardown fee, or batching.').font = NOTE
widths = [36, 11, 12, 12, 10, 11, 11, 11, 14, 11, 14, 14]
for j, w in enumerate(widths, 1): pr.column_dimensions[chr(64 + j)].width = w

# ---------------- Year ----------------
yr = wb.create_sheet('Year')
yr['A1'] = 'One year: a scenario'; yr['A1'].font = TITLE
yr['A2'] = 'Change the blue booking counts. The example is one plausible first year, not a forecast.'; yr['A2'].font = NOTE
hdr = ['Product', 'Bookings per year', 'Revenue ($)', 'Contribution ($)', 'Hours']
for j, h in enumerate(hdr, 1):
    c = yr.cell(row=4, column=j, value=h); c.font = BOLD; c.fill = HEAD
example = [14, 6, 18, 6, 20, 24, 2]  # subscription counted in months (e.g. 2 shops x 12)
for i, (name, *_ ) in enumerate(products):
    row = 5 + i; prow = start + i
    yr.cell(row=row, column=1, value=f'=Products!A{prow}').font = GREEN
    c = yr.cell(row=row, column=2, value=example[i]); c.font = BLUE; c.number_format = INT
    c = yr.cell(row=row, column=3, value=f'=B{row}*Products!B{prow}'); c.number_format = USD
    c = yr.cell(row=row, column=4, value=f'=B{row}*Products!I{prow}'); c.number_format = USD
    c = yr.cell(row=row, column=5, value=f'=B{row}*Products!J{prow}'); c.number_format = NUM
yr.cell(row=5 + 5, column=2).comment = Comment('Counted in shop-months: e.g. 2 shops x 12 months = 24.', 'Claude')
tot = 5 + len(products)
yr.cell(row=tot, column=1, value='Total').font = BOLD
for col, fmt in ((2, INT), (3, USD), (4, USD), (5, NUM)):
    L = chr(64 + col)
    c = yr.cell(row=tot, column=col, value=f'=SUM({L}5:{L}{tot-1})'); c.font = BOLD; c.number_format = fmt
res = [
    ('Fixed costs ($)', f'={N["FIXED"]}', USD, GREEN),
    ('Profit before tax ($)', f'=D{tot}-B{tot+2}', USD, BOLD),
    ('Tax set-aside ($)', f'=MAX(0,B{tot+3})*{N["Tax set-aside (share of profit)"]}', USD, BLACK),
    ('Take-home after tax set-aside ($)', f'=B{tot+3}-B{tot+4}', USD, BOLD),
    ('Effective hourly rate, after fixed costs and tax ($/h)', f'=IFERROR(B{tot+5}/E{tot},0)', USD, BOLD),
    ('Weeks of work at 40 hours', f'=E{tot}/40', NUM, BLACK),
]
for k, (label, f, fmt, font) in enumerate(res):
    row = tot + 2 + k
    yr.cell(row=row, column=1, value=label).font = BLACK
    c = yr.cell(row=row, column=2, value=f); c.number_format = fmt; c.font = font
yr.column_dimensions['A'].width = 52; yr.column_dimensions['B'].width = 16
for L in 'CDE': yr.column_dimensions[L].width = 16

# ---------------- Break-even ----------------
be = wb.create_sheet('Break-even')
be['A1'] = 'Break-even'; be['A1'].font = TITLE
be['A2'] = 'How many jobs of each kind, alone, would cover a year of fixed costs.'; be['A2'].font = NOTE
for j, h in enumerate(['Product', 'Contribution per job ($)', 'Jobs to cover fixed costs'], 1):
    c = be.cell(row=4, column=j, value=h); c.font = BOLD; c.fill = HEAD
for i in range(len(products)):
    row = 5 + i; prow = start + i
    be.cell(row=row, column=1, value=f'=Products!A{prow}').font = GREEN
    c = be.cell(row=row, column=2, value=f'=Products!I{prow}'); c.font = GREEN; c.number_format = USD
    c = be.cell(row=row, column=3, value=f'=IFERROR({N["FIXED"]}/B{row},0)'); c.number_format = NUM; c.font = BOLD
mix = 5 + len(products) + 1
be.cell(row=mix, column=1, value='With the Year sheet\'s mix').font = BOLD
be.cell(row=mix + 1, column=1, value='Average contribution per booking ($)').font = BLACK
c = be.cell(row=mix + 1, column=2, value=f'=IFERROR(Year!D{tot}/Year!B{tot},0)'); c.font = GREEN; c.number_format = USD
be.cell(row=mix + 2, column=1, value='Bookings needed to break even').font = BLACK
c = be.cell(row=mix + 2, column=2, value=f'=IFERROR({N["FIXED"]}/B{mix+1},0)'); c.number_format = NUM; c.font = BOLD
be.column_dimensions['A'].width = 40; be.column_dimensions['B'].width = 24; be.column_dimensions['C'].width = 26

for ws in wb.worksheets:
    ws.sheet_view.showGridLines = False
    for row in ws.iter_rows():
        for c in row:
            if c.value is not None and (c.font is None or c.font.name != F):
                c.font = Font(name=F, bold=c.font.bold, italic=c.font.italic, color=c.font.color, size=c.font.size)
from openpyxl.workbook.properties import CalcProperties
wb.calculation = CalcProperties(fullCalcOnLoad=True)
wb.save('/home/user/poppies/.scratch/ideas/model/poppies-break-even.xlsx')
print('saved')
