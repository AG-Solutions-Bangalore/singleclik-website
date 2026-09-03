import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageFallback } from './PageFallback'

/**
 * RootLayout — shared shell around every route.
 * Includes skip-to-content link, sticky header, footer, and Suspense
 * boundary for lazy-loaded page modules.
 */
export const RootLayout = () => (
  <>
    <a
      href="#main"
      title="SingleClik Main Content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg"
    >
      Skip to main content
    </a>
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  </>
)
