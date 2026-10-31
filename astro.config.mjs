// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// The domain is unsettled, so the site's address comes from the environment:
// SITE_URL once the domain exists, else Vercel's production URL, else local.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

// Static by default. The adapter lets the enquiry route and form opt into
// on-demand rendering; everything else is prerendered.
export default defineConfig({
  site,
  adapter: vercel(),
  integrations: [
    sitemap({
      // Working pages stay out of search.
      filter: (page) => !/\/(shot-list|enquire\/(thanks|error))\/?$/.test(page),
    }),
  ],
  env: {
    // Read at request time, never inlined into the build. All optional so the
    // site builds without them; a missing key fails the enquiry loudly instead.
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      ENQUIRY_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
      ENQUIRY_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      AIRTABLE_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      AIRTABLE_BASE_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      AIRTABLE_TABLE: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
