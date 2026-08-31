import { env } from '@/lib/env'
import type { PageMeta } from '@/types'

export const aboutSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'About',
  description:
    'Learn how SingleClik is structured: feature modules, code splitting, SEO, and the tooling that ties it together.',
  path: '/about',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About SingleClik',
    url: `${env.siteUrl}/about`,
  },
}
