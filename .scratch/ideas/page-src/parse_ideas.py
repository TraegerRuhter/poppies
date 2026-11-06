import re, json, sys
s = open(sys.argv[1]).read()

def clean(t):
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r'\s*-{3,}$', '', t)
    return t

# Top ten
top = s.split('## If you read nothing else')[1].split('\n## ')[0]
headline = re.search(r'\*\*The headline from the local research:\*\*(.*?)\n\n', top, re.S)
headline = clean(headline.group(1)) if headline else ''
topten = []
for m in re.finditer(r'^(\d+)\. \*\*(.+?)\*\*(.*?)(?=^\d+\. \*\*|\Z)', top, re.S | re.M):
    topten.append({'n': int(m.group(1)), 'title': clean(m.group(2)), 'text': clean(m.group(3))})

body = s.split('## Do now', 1)[1]
body = '## Do now' + body
parked_part = body.split('## Parked')[1]
body = body.split('## Parked')[0]

def tier(n):
    if n <= 20 or 60 <= n <= 63 or 70 <= n <= 73: return 'Do now'
    if 96 <= n <= 120: return 'Explore'
    return 'Next'

ideas = []
heads = [(m.start(), m.group(1).strip()) for m in re.finditer(r'^#{2,3} (.+)$', body, re.M)]
def theme_at(pos):
    t = ''
    for hp, ht in heads:
        if hp < pos and ht not in ('Do now', 'Next'):
            t = ht
    return t.split(':')[0] if t.startswith('Local plays') else t
pat = re.compile(r'^(\d+)\. \*\*(.+?)\*\*(.*?)^\s+`(.+?)`\s*$', re.S | re.M)
for m in pat.finditer(body):
    n = int(m.group(1))
    parts = [x.strip() for x in m.group(4).split('·')]
    ideas.append({
        'n': n, 'title': clean(m.group(2)), 'text': clean(m.group(3)),
        'theme': theme_at(m.start()), 'tier': tier(n),
        'fit': parts[0].replace('fit', '').strip(), 'effort': parts[1],
        'payoff': parts[2], 'who': parts[3],
        'src': parts[4].replace('src', '').strip() if len(parts) > 4 else '',
    })
parked = []
for m in re.finditer(r'^- \*\*(.+?)\*\*(.*?)(?=^- \*\*|\Z)', parked_part, re.S | re.M):
    parked.append({'title': clean(m.group(1)), 'text': clean(m.group(2))})

bad = [x['n'] for x in ideas if 'fit' not in x]
assert not bad, bad
print(json.dumps({'headline': headline, 'topten': topten, 'ideas': ideas, 'parked': parked}, ensure_ascii=False))
