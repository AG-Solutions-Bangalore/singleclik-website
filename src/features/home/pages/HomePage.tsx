import { Seo } from '@/components/seo'
import { Heading, Section } from '@/components/semantic'
import { homeSeo } from '../seo/home.seo'
import { PostList } from '../components/PostList'

/**
 * Home page — composes the SEO preset, an H1, and the PostList section.
 *
 * Document outline:
 *   <h1>  SingleClik               ← exactly one per page
 *     <h2>  Latest posts           ← from <Section title="…" />
 *       <h3> per <PostCard />       ← from <PostCard />
 */
export const HomePage = () => (
  <>
    <Seo {...homeSeo} />

    <Section id="hero" className="pt-16 pb-8">
      <Heading level="h1" size="4xl" className="max-w-3xl">
        Ship a fast, SEO-friendly React app in minutes.
      </Heading>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        A modular Vite + TypeScript + Tailwind v4 starter with code-split
        routes, server-state caching, semantic HTML helpers, and a built-in
        sitemap generator.
      </p>
    </Section>

    <Section id="latest" title="Latest posts" eyebrow="From the demo API">
      <PostList />
    </Section>
  </>
)
