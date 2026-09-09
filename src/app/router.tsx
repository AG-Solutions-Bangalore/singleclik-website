import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout'

/**
 * Route-level code splitting.
 * Each page is dynamically imported and becomes its own chunk. The
 * initial bundle ships only the router + layout + the home page, so
 * features like /about or /posts cost zero KB until visited.
 */
const HomePage = lazy(() => import('@/features/home/pages/HomePage').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('@/features/about/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const PrivacyPolicyPage = lazy(() =>
  import('@/features/privacy/pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
)
const NotFoundPage = lazy(() =>
  import('@/features/not-found/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'privacypolicy.html', element: <PrivacyPolicyPage /> },
      { path: 'privacypolicy', element: <PrivacyPolicyPage /> },
      { path: 'policy', element: <PrivacyPolicyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
