export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface PageMeta {
  /** Used for both <title> and og:title (if not overridden). */
  title: string
  description: string
  /** Pathname-only canonical, e.g. "/about". Full URL is built from env.siteUrl. */
  path: string
  /** Open Graph image — absolute URL recommended. */
  image?: string
  /** Defaults to "website" — use "article" for blog posts. */
  type?: 'website' | 'article' | 'profile'
  /** Set to true on pages that should not be indexed. */
  noindex?: boolean
}
