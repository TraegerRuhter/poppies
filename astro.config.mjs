// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Static by default. The adapter is here so the enquiry function (ticket 02)
// can opt a single route into on-demand rendering.
export default defineConfig({
  adapter: vercel(),
});
