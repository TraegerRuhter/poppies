# Regenerating page.html

`ideas.md` is the source of truth. After editing it:

```sh
python3 page-src/parse_ideas.py ideas.md > /tmp/ideas.json
python3 page-src/build_page.py page-src/page_template.html /tmp/ideas.json page.html
```

Run these from `.scratch/ideas/`. Then republish the artifact from `page.html`.
The research highlights, drafts and rules on the page are hard-coded in
`page_template.html`.
