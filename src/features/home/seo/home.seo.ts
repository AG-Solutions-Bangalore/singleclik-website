import { env } from '@/lib/env'
import type { PageMeta } from '@/types'

/**
 * Single Click Home Page SEO Preset.
 */
export const homeSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'Connect, Collaborate, Get Things Done',
  description:
    'Single Click connects you with verified businesses and professionals without sharing your personal contact. Enquire, chat, and get things done – all in one secure platform.',
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Single Click — Connect. Collaborate. Get Things Done.',
    url: `${env.siteUrl}/`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Single Click',
      url: env.siteUrl,
    },
  },
}

