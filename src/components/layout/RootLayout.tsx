import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageFallback } from './PageFallback'
import { DownloadModal } from '@/components/ui/DownloadModal'

/**
 * RootLayout — shared shell around every route.
 * Includes skip-to-content link, sticky header, footer, Suspense
 * boundary, and automatic 30-second download app popup.
 */
export const RootLayout = () => {
  const [showAutoPopup, setShowAutoPopup] = useState(false)

  useEffect(() => {
    // Check if user has already seen or dismissed the download popup in this session
    try {
      const hasSeen = sessionStorage.getItem('singleclik_auto_download_seen')
      if (hasSeen) return
    } catch {
      // Ignore storage access issues in restricted contexts
    }

    const timer = setTimeout(() => {
      setShowAutoPopup(true)
      try {
        sessionStorage.setItem('singleclik_auto_download_seen', 'true')
      } catch {
        // Ignore
      }
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setShowAutoPopup(false)
    try {
      sessionStorage.setItem('singleclik_auto_download_seen', 'true')
    } catch {
      // Ignore
    }
  }

  return (
    <>
      <a
        href="#main"
        title="SingleClik Main Content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg"
      >
        Skip to main content
      </a>
      <div className="flex min-h-screen flex-col bg-bg text-fg overflow-x-hidden w-full max-w-full">
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none w-full overflow-x-hidden">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>

      {/* 30-second Auto Download App Popup */}
      <DownloadModal
        isOpen={showAutoPopup}
        onClose={handleClose}
        title="Download Single Clik App"
        subtitle="Connect with verified local businesses, chat securely with zero spam, and get things done faster on mobile."
      />
    </>
  )
}
