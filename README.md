# poppies

Website for Poppies, a balloon art business on the Oregon coast. Astro, static,
deployed on Vercel. Planning and tickets live in `.scratch/` — start at
`.scratch/README.md`.

## Develop

Needs Node 24 (Astro 7.4 requires ≥ 22.23.4) and pnpm.

```sh
pnpm install
pnpm dev      # local server
pnpm build    # static build
pnpm check    # type-check
```

The business name is set in one place: `src/site.config.ts`.
