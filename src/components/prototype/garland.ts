// PROTOTYPE — throwaway. Draws an organic balloon garland as SVG circles, so the
// homepage sketches have the work's colour before any photos exist. Seeded, so a
// garland looks the same on every render.

export const PALETTES = {
  celebration: ['#e8836b', '#f2c1b6', '#f4b183', '#f6e7d2', '#d2452f'],
  wedding: ['#a9b8a3', '#dfe3dc', '#9fbfbf', '#e7dccb', '#f7f3ec'],
  coast: ['#5f6b4e', '#b9a68e', '#9fbfbf', '#e7dccb', '#47646b'],
  neutral: ['#e7dccb', '#f7f3ec', '#d9cfc0', '#efe7dc', '#c9bba6'],
} as const;

export interface Balloon {
  x: number;
  y: number;
  r: number;
  color: string;
}

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

/** Balloons in clusters along a gentle curve from x=0 to x=width. */
export function garland({
  width,
  height,
  palette,
  seed = 7,
  density = 1,
  sag = 0.25,
}: {
  width: number;
  height: number;
  palette: readonly string[];
  seed?: number;
  density?: number;
  sag?: number;
}): Balloon[] {
  const rand = rng(seed);
  const out: Balloon[] = [];
  const mid = height / 2;
  const clusters = Math.max(3, Math.round((width / 46) * density));
  for (let c = 0; c <= clusters; c++) {
    const t = c / clusters;
    const cx = t * width;
    const cy = mid + Math.sin(t * Math.PI) * height * sag - height * sag * 0.5;
    // An organic cluster: one large, a few medium, a scatter of small (18", 11", 5").
    const sizes = [21, 13, 13, 13, 7, 7, 7, 7];
    for (const base of sizes) {
      const r = base * (0.85 + rand() * 0.3);
      const angle = rand() * Math.PI * 2;
      const dist = (base === 21 ? 4 : base === 13 ? 16 : 24) * rand();
      out.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist * 0.8,
        r,
        color: palette[Math.floor(rand() * palette.length)],
      });
    }
  }
  // Big ones first so small ones sit on top, as they do on a real garland.
  return out.sort((a, b) => b.r - a.r);
}
