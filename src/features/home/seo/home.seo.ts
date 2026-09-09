import { env } from '@/lib/env'
import type { PageMeta } from '@/types'

/**
 * Single Click Home Page SEO Preset.
 */
export const homeSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'SingleClik – Connect With Trusted Businesses & Professionals',
  description:
    'Connect with verified businesses and professionals on SingleClik. Discover trusted services, send enquiries, chat securely, and get things done with ease.',
  keywords:
    'SingleClik, verified businesses, professionals, business directory, connect with businesses, business services, local professionals',
  author: 'SingleClik',
  publisher: 'SingleClik',
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SingleClik – Connect With Trusted Businesses & Professionals',
    description:
      'Connect with verified businesses and professionals on SingleClik. Discover trusted services, send enquiries, chat securely, and get things done with ease.',
    url: `${env.siteUrl}/`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SingleClik',
      url: env.siteUrl,
    },
  },
}

