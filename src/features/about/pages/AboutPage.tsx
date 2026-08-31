import { Seo } from '@/components/seo'
import { Heading, Section } from '@/components/semantic'
import { aboutSeo } from '../seo/about.seo'

export const AboutPage = () => (
  <>
    <Seo {...aboutSeo} />

    <Section id="about-hero" className="pt-16 pb-8">
      <Heading level="h1" size="4xl">
        About SingleClik
      </Heading>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        A boilerplate that respects the boring fundamentals — semantic
        HTML, server-state caching, and a build pipeline tuned for the
        Core Web Vitals.
      </p>
    </Section>

    <Section id="architecture" title="Architecture" eyebrow="How it's wired">
      <ul className="grid gap-4 sm:grid-cols-2">
        {[
          { title: 'Feature modules', body: 'Each page lives under src/features/<name>/ with its own components, hooks, api and seo.' },
          { title: 'Code-split routes', body: 'Every page is React.lazy() — only the visited route ships JavaScript.' },
          { title: 'React Query', body: 'Server state is cached, deduped, retried, and cancellable by default.' },
          { title: 'SEO by default', body: 'A typed <Seo /> component, canonical URLs, Open Graph, and a generated sitemap.xml.' },
        ].map((item) => (
          <li key={item.title} className="rounded-card border border-border bg-bg p-5 shadow-card">
            <Heading level="h3" size="lg">{item.title}</Heading>
            <p className="mt-2 text-sm text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  </>
)
