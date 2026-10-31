// The two doorway paths (decisions §7), and the one place the set of paths is
// defined: content schemas, the enquiry form, galleries and the shot list all
// derive from it. Each path is a static route with its own temperature within
// the one palette.
export const PATHS = {
  celebration: {
    label: 'Celebrations',
    enquiryLabel: 'A birthday or celebration',
    page: 'celebrations',
    href: '/celebrations',
    temperature: 'warm',
    heroSlot: 'celebrations-hero',
  },
  wedding: {
    label: 'Weddings',
    enquiryLabel: 'A wedding',
    page: 'weddings',
    href: '/weddings',
    temperature: 'cool',
    heroSlot: 'weddings-hero',
  },
} as const;

export type PathKey = keyof typeof PATHS;
export type Temperature = (typeof PATHS)[PathKey]['temperature'];
export const PATH_KEYS = Object.keys(PATHS) as [PathKey, ...PathKey[]];
