# 07 — SEO and metadata

**What to build:** Each route is findable and shares well. The decisions record gives static per-path routes partly so they "rank for their own search terms in a way anchor links cannot" (decisions §7), and names the service-area towns for local search — this ticket makes that pay off.

Not specified in the decisions record; added at ticketing. Keep it to what a small local business site needs.

**Blocked by:** 05 — About, service area, and a services placeholder; 06 — The Celebrations and Weddings paths.

**Status:** ready-for-agent

- [x] Every route has a distinct title and description, using the business name from the single config value
- [x] Open Graph and social preview images per path, drawn from that path's hero
- [x] Local business structured data, including the service-area towns from ticket 05
- [x] A sitemap and robots file
- [x] Nothing here hardcodes the business name or domain — both are still unsettled

## Comments

**2026-10-31 — built.**

- **The site's address comes from the environment**, since the domain is
  unsettled. It uses `SITE_URL` if set, else Vercel's production URL
  (`VERCEL_PROJECT_PRODUCTION_URL`, which Vercel provides automatically), else
  localhost. **Once the domain is bought, set `SITE_URL` in Vercel.** Canonical
  links, share-image URLs, the sitemap and robots.txt all follow it.
- **Per page:** a distinct `<title>` and a meta description from content
  (`description:` in each page's frontmatter), plus a canonical link and
  Open Graph and Twitter card tags.
- **Share images:** each page uses its hero (or portrait) photo, cropped to
  1200×630 at build. With no photo yet, it uses `/og/default.png`: the warm
  ground and the poppy dot, deliberately without text, so the name is never
  baked in and no font is needed on Vercel's build machines.
- **LocalBusiness structured data** is on the homepage only. It has the name
  from config, the description, and `areaServed` from the provisional
  service-area towns. No street address, since she has no venue.
- **Sitemap:** `@astrojs/sitemap` covers `/`, `/about/`, `/celebrations/`,
  `/weddings/` and `/enquire/`. `/shot-list` and the thanks and error pages
  are filtered out, and are also `noindex`. `/robots.txt` points at
  `sitemap-index.xml`.
- **No hardcoded name:** "Poppies" appears only in `src/site.config.ts`. One
  slipped into the About description while drafting and was removed.

**Verified** across two builds. The default build (no `SITE_URL`, no photos)
uses localhost URLs and the fallback image. A build with
`SITE_URL=https://example-balloons.test` and test photos in the hero and
portrait slots switches every canonical, share-image, sitemap and robots URL
to that domain, and uses real 1200×630 crops as share images.

**Note:** the JSON-LD block is a `<script type="application/ld+json">`. It's
data and doesn't run, but a naive "no `<script>` tags" check will count it.
The pages still ship no executable JavaScript.

**2026-10-31 — review fix.** Canonical links always end in `/`, matching the
sitemap. The on-demand `/enquire` page was producing `/enquire` without one.
