import { Link } from 'react-router-dom'
import { Seo } from '@/components/seo'
import { Heading, Section } from '@/components/semantic'
import { notFoundSeo } from '../seo/notFound.seo'

export const NotFoundPage = () => (
  <>
    <Seo {...notFoundSeo} />
    <Section id="not-found" className="py-24 text-center">
      <Heading level="h1" size="4xl">404</Heading>
      <p className="mt-2 text-lg text-muted">We couldn't find that page.</p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex h-10 items-center justify-center rounded-button bg-brand px-4 text-sm font-medium text-brand-fg transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Back to home
        </Link>
      </div>
    </Section>
  </>
)
