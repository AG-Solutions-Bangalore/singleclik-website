import { Helmet } from 'react-helmet-async'
import { env } from '@/lib/env'
import type { PageMeta } from '@/types'

/**
 * <Seo /> — central meta-tag manager.
 *
 * Pass a PageMeta to update document head on mount / on prop change.
 * Renders nothing visible. Use once per page, near the top.
 *
 * Handles:
 *   - <title>
 *   - meta description, robots
 *   - canonical link
 *   - Open Graph (og:*)
 *   - Twitter Card
 *   - JSON-LD structured data
 */
export interface SeoProps extends PageMeta {
  /** Optional JSON-LD object, stringified by the component. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export const Seo = ({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const fullTitle = title.includes(env.siteName) ? title : `${title} · ${env.siteName}`
  const canonical = `${env.siteUrl}${path}`
  const ogImage = image ?? `${env.siteUrl}/og-image.png`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large" />
      )}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={env.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
