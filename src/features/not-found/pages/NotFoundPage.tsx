import { Link, useNavigate } from 'react-router-dom'
import { Home, Info, ArrowLeft, MailQuestion } from 'lucide-react'
import { Seo } from '@/components/seo'
import { Heading } from '@/components/semantic'
import { Button } from '@/components/ui'
import { notFoundSeo } from '../seo/notFound.seo'
import { NotFoundIllustration } from '../components/NotFoundIllustration'
import { QuickLinkCard } from '../components/QuickLinkCard'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Seo {...notFoundSeo} />

      <main className="relative isolate flex min-h-[calc(100vh-8rem)] items-center overflow-hidden">
        {/* Decorative gradient blobs — sit behind content, no a11y impact. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-soft opacity-60 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-softer opacity-60 blur-3xl" />
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
          <NotFoundIllustration className="h-44 w-full max-w-sm text-fg sm:h-56" />

          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Error 404
          </p>

          <Heading level="h1" size="4xl" className="mt-3">
            Page not found
          </Heading>

          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            Sorry, we couldn't find the page you're looking for. The link may
            be broken, the page may have moved, or you might have typed the
            address incorrectly.
          </p>

          {/* Primary actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className="min-w-[10rem]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Go back
            </Button>
            <Link
              to="/"
              className="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-button bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:bg-brand-hover"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </div>

          {/* Helpful navigation */}
          <div className="mt-16 w-full">
            <Heading level="h2" size="lg" className="text-muted">
              Or try one of these
            </Heading>

            <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
              <QuickLinkCard
                to="/"
                label="Home"
                description="Start fresh from our homepage"
                icon={<Home className="h-5 w-5" aria-hidden="true" />}
                accentClassName="bg-brand-soft text-brand"
              />
              <QuickLinkCard
                to="/about"
                label="About"
                description="Learn more about SingleClick"
                icon={<Info className="h-5 w-5" aria-hidden="true" />}
                accentClassName="bg-accent-purple/15 text-accent-purple"
              />
            </div>
          </div>

          {/* Report broken link */}
          <p className="mt-12 flex items-center gap-1.5 text-sm text-muted">
            <MailQuestion className="h-4 w-4" aria-hidden="true" />
            Think this is a mistake?
            <a
              href="mailto:hello@singleclik.example.com?subject=Broken%20link%20report"
              className="font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
            >
              Report this broken link
            </a>
          </p>
        </div>
      </main>
    </>
  )
}
