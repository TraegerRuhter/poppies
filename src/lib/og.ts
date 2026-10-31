import { getImage } from 'astro:assets';
import type { Frame } from './photos';

// The fallback share image: text-free, so it never bakes in the unsettled name.
export const DEFAULT_OG = '/og/default.png';

/** A 1200×630 share image cropped from a frame's photo, or the fallback. */
export async function ogImage(frame?: Frame): Promise<string> {
  if (!frame?.photo) return DEFAULT_OG;
  const image = await getImage({
    src: frame.photo.data.image,
    width: 1200,
    height: 630,
    fit: 'cover',
    format: 'jpg',
  });
  return image.src;
}
