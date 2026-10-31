import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Slot = CollectionEntry<'slots'>;
export type Photo = CollectionEntry<'photos'>;
export type Register = 'celebration' | 'wedding';

// A position in a layout: a photo, or the slot it is waiting to be filled for.
export interface Frame {
  slot?: Slot;
  photo?: Photo;
}

const byOrder = (a: Slot, b: Slot) => a.data.order - b.data.order;

const serves = (entryRegister: string, register?: Register) =>
  !register || entryRegister === 'both' || entryRegister === register;

/** The photo assigned to a slot, enforcing the hero rule at build time. */
export async function frameFor(slotId: string): Promise<Frame> {
  const slot = await getEntry('slots', slotId);
  if (!slot) throw new Error(`Unknown slot "${slotId}" — see src/content/slots.yaml`);
  const photo = (await getCollection('photos')).find((p) => p.data.slot?.id === slotId);
  if (photo && slot.data.role === 'hero' && photo.data.licensedCharacter) {
    throw new Error(
      `Photo "${photo.id}" is licensed-character work and cannot fill hero slot "${slotId}" (decisions §2).`,
    );
  }
  return { slot, photo };
}

/**
 * A gallery for one register, or for everything. Gallery slots come first, in
 * shot-list order, as placeholders until filled; then every other photo for the
 * register that is not already the hero or portrait somewhere.
 */
export async function galleryFrames(register?: Register): Promise<Frame[]> {
  const slots = (await getCollection('slots'))
    .filter((s) => s.data.role === 'gallery' && serves(s.data.register, register))
    .sort(byOrder);
  const photos = (await getCollection('photos')).filter((p) => serves(p.data.register, register));
  const slotRoles = new Map((await getCollection('slots')).map((s) => [s.id, s.data.role]));

  const placed = new Set<string>();
  const frames: Frame[] = slots.map((slot) => {
    const photo = photos.find((p) => p.data.slot?.id === slot.id);
    if (photo) placed.add(photo.id);
    return { slot, photo };
  });
  for (const photo of photos) {
    const role = photo.data.slot && slotRoles.get(photo.data.slot.id);
    if (placed.has(photo.id) || role === 'hero' || role === 'portrait') continue;
    frames.push({ photo });
  }
  return frames;
}

export type RowKind = 'feature' | 'pair' | 'trio' | 'single';

/**
 * Splits a gallery into rows that always fill: no row is ever left with a gap.
 * Alternates a feature row (one large, one small) with a row of three; small
 * remainders become a pair or a closing single.
 */
export function rows<T>(items: T[]): { kind: RowKind; items: T[] }[] {
  const out: { kind: RowKind; items: T[] }[] = [];
  let i = 0;
  while (i < items.length) {
    const left = items.length - i;
    const even = out.length % 2 === 0;
    const size = left <= 3 ? left : left === 4 ? 2 : even ? 2 : 3;
    const kind: RowKind = size === 1 ? 'single' : size === 3 ? 'trio' : even ? 'feature' : 'pair';
    out.push({ kind, items: items.slice(i, i + size) });
    i += size;
  }
  return out;
}
