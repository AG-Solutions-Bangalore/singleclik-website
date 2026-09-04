import { env } from '@/lib/env'
import type { PageMeta } from '@/types'

export const privacySeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'Privacy Policy',
  description:
    'Read the official Privacy Policy for the Single Clik mobile application. Learn about information collection, data retention, security, and your privacy rights.',
  path: '/privacy-policy',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy – Single Clik',
    url: `${env.siteUrl}/privacy-policy`,
    description:
      'Official Privacy Policy for Single Clik mobile application developed by Govind Garg.',
  },
}
