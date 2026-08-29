# SingleClik — High-performance React Boilerplate

A modular, SEO-first React starter built on **Vite 8**, **React 19**, **TypeScript 6**, and **Tailwind CSS v4**.

## ✨ Features

- ⚡ **Vite 8** + **React 19** with the **React Compiler** (auto-memoization) on
- 🧩 **Feature-based architecture** — every page lives in `src/features/<name>/` with its own `components/`, `pages/`, `hooks/`, `api/`, and `seo/`
- 🎨 **Tailwind v4** with `@theme` design tokens (no JS config needed)
- 🧭 **react-router-dom 7** with route-level code splitting (`React.lazy`)
- 🪪 **react-helmet-async** + a typed `<Seo />` component for per-route meta, Open Graph, Twitter, and JSON-LD
- 🛰️ **@tanstack/react-query 5** with cached, deduped, cancellable server state
- 🌗 **next-themes** dark/light/system, integrated as a Vite provider
- 🗺️ Build-time **sitemap.xml** generator
- ♿ Skip-to-content link, focus rings, ARIA live regions, reduced-motion support

---

## 📁 Folder structure

```
src/
├── app/
│   └── router.tsx              # Code-split routes
├── components/
│   ├── layout/                 # Header, Footer, RootLayout, PageFallback
│   ├── provider/               # theme-provider
│   ├── ui/                     # Button, Card, theme-toggle
│   ├── semantic/               # <Heading>, <Section>
│   └── seo/                    # <Seo />
├── features/                   # ⬅️ Each feature is self-contained
│   ├── home/
│   │   ├── api/posts.api.ts
│   │   ├── components/{PostCard,PostList}.tsx
│   │   ├── hooks/usePosts.ts
│   │   ├── pages/HomePage.tsx
│   │   ├── seo/home.seo.ts
│   │   └── index.ts            # Public surface (barrel)
│   ├── about/
│   │   ├── pages/AboutPage.tsx
│   │   └── seo/about.seo.ts
│   └── not-found/
│       ├── pages/NotFoundPage.tsx
│       └── seo/notFound.seo.ts
├── lib/
│   ├── api.ts                  # Typed fetch wrapper w/ AbortSignal + timeout
│   ├── env.ts                  # Typed import.meta.env
│   └── queryClient.ts          # React Query defaults
├── styles/
│   └── theme.css               # Tailwind v4 @theme tokens
├── types/
│   └── index.ts                # Shared TS types
├── App.tsx                     # Provider composition
├── main.tsx                    # Entry
└── index.css                   # Re-exports theme.css
```

---

## 🚀 Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server on `http://localhost:5173` |
| `npm run build` | Typecheck → generate `sitemap.xml` → production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run sitemap` | Regenerate `public/sitemap.xml` (run during CI as part of `build`) |
| `npm run lint` | Run `oxlint` |

---

## 🔎 SEO strategy

### Per-page metadata
Every page imports a typed SEO preset from its `seo/` folder and passes it to `<Seo />`:

```tsx
// features/home/pages/HomePage.tsx
import { Seo } from '@/components/seo'
import { homeSeo } from '../seo/home.seo'

export const HomePage = () => (
  <>
    <Seo {...homeSeo} />
    {/* … */}
  </>
)
```

`<Seo />` writes `<title>`, `<meta description>`, canonical, Open Graph, Twitter Card, robots, and JSON-LD.

### Sitemap
`scripts/generate-sitemap.mjs` reads the route table and writes `public/sitemap.xml`. Add new routes by appending to `ROUTES`:

```js
const ROUTES = [
  { path: '/',         changefreq: 'weekly',  priority: 1.0 },
  { path: '/about',    changefreq: 'monthly', priority: 0.7 },
  { path: '/blog',     changefreq: 'daily',   priority: 0.8 },
]
```

For dynamic routes (e.g. blog posts), fetch the list from your CMS inside the script and push entries before the XML is rendered.

### Robots
`public/robots.txt` allows all and points crawlers at the sitemap.

### Structured data
A `WebSite` JSON-LD block lives in `index.html`. Each page can add its own via `<Seo jsonLd={...} />`.

---

## 🏗️ Semantic HTML rules

Use the helpers in `components/semantic/` to enforce a clean document outline:

1. **Exactly one `<Heading level="h1" />` per page** — render it inside the page component, not the layout.
2. **Never skip heading levels** — `h1 → h2 → h3`, not `h1 → h3`.
3. **Wrap each section in `<Section id title>`** so screen readers get a labelled region out of the box.
4. **Use semantic landmarks** — `<header role="banner">`, `<main>`, `<footer role="contentinfo">`, `<nav aria-label="…">`.
5. **Decorative icons** must be `aria-hidden="true"`. Interactive icon-only buttons need `aria-label`.

---

## ⚡ Performance

| Lever | Where |
| --- | --- |
| Route-level code splitting | `src/app/router.tsx` — every page is `React.lazy()` |
| Manual vendor chunks | `vite.config.ts` → `build.rollupOptions.output.manualChunks` (react, router, query, meta, theme, icons) |
| Long-term caching | Hashed filenames + vendor chunking → app changes don't bust React cache |
| Asset inlining | `assetsInlineLimit: 4096` |
| Preconnect / DNS-prefetch | `index.html` |
| Image hints | Use `loading="lazy"`, `decoding="async"`, and `fetchpriority="high"` on hero |
| `font-display: swap` | System font stack in `styles/theme.css` — zero font-loading penalty |
| React Compiler | `babel-plugin-react-compiler` enabled in `vite.config.ts` |
| React Query defaults | `staleTime: 60s`, `gcTime: 5m`, no refetch-on-focus |
| `prefers-reduced-motion` | Disabled in `styles/theme.css` |

Build output (typical):
```
dist/assets/HomePage-*.js   ~5 kB
dist/assets/AboutPage-*.js  ~2 kB
dist/assets/query-*.js      33 kB
dist/assets/router-*.js     92 kB
dist/assets/react-*.js     182 kB
```

---

## 🧱 Adding a new feature

1. Create `src/features/<name>/` with `components/`, `pages/`, `hooks/`, `api/`, `seo/`.
2. Add a page in `pages/<Name>Page.tsx` and a SEO preset in `seo/<name>.seo.ts`.
3. Add the route in `src/app/router.tsx` (lazy import) and in the sitemap `ROUTES` array.
4. Re-export public surface from `features/<name>/index.ts`.

---

## 🛠️ Environment variables

| Var | Default |
| --- | --- |
| `VITE_API_BASE_URL` | `https://jsonplaceholder.typicode.com` |
| `VITE_SITE_URL` | `https://singleclik.example.com` |
| `VITE_SITE_NAME` | `SingleClik` |

Copy `.env.example` to `.env.local` to override.
