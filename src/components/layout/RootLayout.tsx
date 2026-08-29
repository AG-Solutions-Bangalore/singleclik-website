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
    <a href="#main" className="skip-link">
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
