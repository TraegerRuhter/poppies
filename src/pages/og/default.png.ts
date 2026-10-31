import type { APIRoute } from 'astro';
import sharp from 'sharp';

// The warm ground and a single poppy dot, matching the wordmark's mark. Drawn
// without text so no font has to exist on the build machine.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f6f2ec"/>
  <rect x="60" y="60" width="1080" height="510" fill="none" stroke="#e2dbd1" stroke-width="2"/>
  <circle cx="600" cy="315" r="34" fill="#d2452f"/>
</svg>`;

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await sharp(Buffer.from(svg)).png().toBuffer()), {
    headers: { 'content-type': 'image/png' },
  });
