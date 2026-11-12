"""Year-one scenarios for the Poppies plan.

Uses the same per-job economics as ../ideas/model/build_model.py (materials,
hours, mileage at $0.76/mile over a 25-mile one-way drive, 3% card fees), with
one change: the arch is priced at $550, because the model showed $450 pays
under the $45/hour target. Run: python3 numbers.py
"""

MILE, ONE_WAY, DRIVE_H, CARD = 0.76, 25, 0.5, 0.03
FIXED = 4000          # insurance, licences, software, marketing, kit, accountant
TAX = 0.275           # set-aside share of profit
UNPAID_H_PER_WEEK = 6  # quoting, messages, outreach, photos, books

# name: (price, materials, hands-on hours, round trips)
PRODUCTS = {
    'Tideline garland, 20 ft, with teardown': (680, 44, 7.25, 2),
    'Headland arch': (550, 60, 5.75, 2),
    'The Arrival': (395, 40, 3, 2),
    'The Question (proposal)': (750, 90, 5, 2),
    'Collected garland (pickup)': (136, 17.6, 2.45, 0),
    'Standing Order (one month)': (240, 25, 3, 0.5),
    'The Pavilion': (3500, 450, 22, 3),
}

# bookings per year, in PRODUCTS order
SCENARIOS = {
    'Careful': (20, 6, 12, 4, 10, 12, 1),
    'Expected': (36, 8, 30, 8, 15, 36, 3),
    'Strong': (55, 10, 60, 14, 20, 72, 6),
}


def job(price, materials, hands_on, trips):
    mileage = trips * 2 * ONE_WAY * MILE
    hours = hands_on + trips * 2 * DRIVE_H
    contribution = price - materials - mileage - price * CARD
    return contribution, hours


if __name__ == '__main__':
    print('Per job')
    for name, p in PRODUCTS.items():
        c, h = job(*p)
        print(f'  {name:42} ${p[0]:>5}  keeps ${c:>7.0f}  {h:>5.2f} h  ${c / h:>4.0f}/h')
    print()
    for label, counts in SCENARIOS.items():
        revenue = contribution = hours = 0
        for (name, p), n in zip(PRODUCTS.items(), counts):
            c, h = job(*p)
            revenue += n * p[0]
            contribution += n * c
            hours += n * h
        profit = contribution - FIXED
        take_home = profit * (1 - TAX)
        all_hours = hours + UNPAID_H_PER_WEEK * 50
        print(f'{label}: {sum(counts)} bookings, revenue ${revenue:,.0f}, '
              f'profit before tax ${profit:,.0f}, take-home ${take_home:,.0f}, '
              f'job hours {hours:,.0f} ({hours / 50:.0f}/wk), '
              f'all hours {all_hours:,.0f} ({all_hours / 50:.0f}/wk), '
              f'take-home per hour ${take_home / all_hours:.0f}')
