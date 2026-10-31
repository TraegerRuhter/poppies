import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';
import { PATH_KEYS } from './lib/paths';

// Page copy lives in content, not in components (decisions §4), so a CMS later
// is a change of loader rather than a rewrite.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    // Search-result and share-preview text for the page (website ticket 07).
    description: z.string().optional(),
    // Path pages (decisions §7): an opening line under the title and the label
    // on the enquiry button, which carries the path's event type.
    lede: z.string().optional(),
    cta: z.string().optional(),
    // The homepage doorway (decisions §7): one question, two paths, an escape hatch.
    doorway: z
      .object({
        question: z.string(),
        paths: z.array(
          z.object({
            key: z.enum(PATH_KEYS),
            label: z.string(),
            blurb: z.string(),
          }),
        ),
        escape: z.string(),
      })
      .optional(),
  }),
});

const register = z.enum([...PATH_KEYS, 'both']);

// The photographs the site is designed around; also printed as the shot list.
// Entries keep their position in the file, which is the order they appear in
// galleries and on the shot list (the loader would otherwise sort by id).
const slots = defineCollection({
  loader: file('src/content/slots.yaml', {
    parser: (text) =>
      (parse(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order })),
  }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    role: z.enum(['hero', 'portrait', 'gallery']),
    register,
    aspect: z.enum(['3:2', '4:5', '1:1', '16:9']),
    framing: z.string(),
  }),
});

// One shared pool. Each photo is a YAML file beside its image; the paths filter
// by register rather than keeping galleries of their own.
const photos = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/photos' }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      alt: z.string(),
      register,
      slot: reference('slots').optional(),
      // Licensed-character work (e.g. the caterpillar) never takes a hero slot.
      licensedCharacter: z.boolean().default(false),
    }),
});

// The service menu. Blocked on the offering model, so it holds one placeholder;
// placeholders render in development only, never on the live site.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['placeholder', 'live']),
  }),
});

// The footer's service-area towns. Marked provisional until her travel radius
// is known.
const serviceArea = defineCollection({
  loader: file('src/content/service-area.yaml', {
    parser: (text) => [{ id: 'service-area', ...(parse(text) as object) }],
  }),
  schema: z.object({
    provisional: z.boolean(),
    towns: z.array(z.string()).min(1),
  }),
});

export const collections = { pages, slots, photos, services, serviceArea };
