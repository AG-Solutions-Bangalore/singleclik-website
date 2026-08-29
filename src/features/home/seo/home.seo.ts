import { env } from '@/lib/env'
import type { PageMeta } from '@/types'

/**
 * Feature-level SEO preset.
 *
 * Each feature owns its metadata in `seo/`. Pages import this and pass
 * it to <Seo />, keeping head management discoverable per feature.
 */
export const homeSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'Home',
  description:
    'SingleClik is a high-performance React boilerplate: Vite, TypeScript, Tailwind v4, code-split routes, and React Query — ready to ship.',
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SingleClik — Home',
    url: `${env.siteUrl}/`,
    isPartOf: {
      '@type': 'WebSite',
      name: env.siteName,
      url: env.siteUrl,
    },
  },
}
