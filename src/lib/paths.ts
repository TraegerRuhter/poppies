// The two doorway paths (decisions §7). Each is a static route with its own
// temperature within the one palette; ticket 06 builds the pages themselves.
export const PATHS = {
  celebration: { href: '/celebrations', temperature: 'warm', heroSlot: 'celebrations-hero' },
  wedding: { href: '/weddings', temperature: 'cool', heroSlot: 'weddings-hero' },
} as const;
