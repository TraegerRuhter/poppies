// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// Static by default. The adapter lets the enquiry route and form opt into
// on-demand rendering; everything else is prerendered.
export default defineConfig({
  adapter: vercel(),
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
