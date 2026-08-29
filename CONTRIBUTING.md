# Contributing

Thanks for your interest in improving SingleClik.

## Local setup

Requirements: **Node ≥ 22** (see `.nvmrc`).

```bash
nvm use            # or: fnm use
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Typecheck → generate sitemap → production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint on the source tree |
| `npm run sitemap` | Regenerate `public/sitemap.xml` |

## Workflow

1. Branch from `main`: `git checkout -b feat/short-description`
2. Keep commits small and focused. Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `refactor:`).
3. Run `npm run lint` and `npm run build` before pushing.
4. Open a Pull Request against `main`.

## Adding a feature

1. Create `src/features/<name>/` with subfolders: `components/`, `pages/`, `hooks/`, `api/`, `seo/`.
2. Add a page in `pages/<Name>Page.tsx` and a SEO preset in `seo/<name>.seo.ts`.
3. Register the route in `src/app/router.tsx` (always `React.lazy`).
4. Add the path to `ROUTES` in `scripts/generate-sitemap.mjs`.
5. Re-export the public surface from `features/<name>/index.ts`.

## Style

- Tailwind utilities only — no `bg-[#2563EB]`. Use tokens defined in `src/index.css`.
- One component per file. Co-locate styles, hooks, and types.
- Use the semantic helpers (`<Heading>`, `<Section>`) for outline integrity.
- Every page needs an `<Seo {...preset} />` near the top.
- Every fetch goes through `src/lib/api.ts`. State goes through `useQuery`.
- No hard-coded URLs in components — read from `env.siteUrl` / `env.apiBaseUrl`.

## Reporting issues

Use the GitHub issue templates. Include reproduction steps, expected vs. actual behavior, and your `node --version`.
