import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/components/layout'

/**
 * Route-level code splitting.
 * Each page is dynamically imported and becomes its own chunk. The
 * initial bundle ships only the router + layout + the home page, so
 * features like /about or /posts cost zero KB until visited.
 */
const HomePage = lazy(() => import('@/features/home/pages/HomePage').then((m) => ({ default: m.HomePage })))
const AboutPlatformPage = lazy(() =>
  import('@/features/home/pages/AboutPlatformPage').then((m) => ({ default: m.AboutPlatformPage })),
)
const HowItWorksPage = lazy(() =>
  import('@/features/home/pages/HowItWorksPage').then((m) => ({ default: m.HowItWorksPage })),
)
const CategoriesPage = lazy(() =>
  import('@/features/home/pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage })),
)
const PrivacyTrustPage = lazy(() =>
  import('@/features/home/pages/PrivacyTrustPage').then((m) => ({ default: m.PrivacyTrustPage })),
)
const FaqPage = lazy(() => import('@/features/home/pages/FaqPage').then((m) => ({ default: m.FaqPage })))
const TestimonialsPage = lazy(() =>
  import('@/features/home/pages/TestimonialsPage').then((m) => ({ default: m.TestimonialsPage })),
)
const JoinAsBusinessPage = lazy(() =>
  import('@/features/home/pages/JoinAsBusinessPage').then((m) => ({ default: m.JoinAsBusinessPage })),
)
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
      // Clean URLs (no #) — each former hash section is now a real route.
      { path: 'about-platform', element: <AboutPlatformPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'privacy-trust', element: <PrivacyTrustPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'help-center', element: <FaqPage /> },
      { path: 'testimonials', element: <TestimonialsPage /> },
      { path: 'reviews', element: <TestimonialsPage /> },
      { path: 'join-as-business', element: <JoinAsBusinessPage /> },
      // Legacy: /about now redirects to the canonical /about-platform.
      { path: 'about', element: <Navigate to="/about-platform" replace /> },
      { path: 'Aboutplatform', element: <Navigate to="/about-platform" replace /> },
      { path: 'aboutplatform', element: <Navigate to="/about-platform" replace /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'privacypolicy.html', element: <PrivacyPolicyPage /> },
      { path: 'privacypolicy', element: <PrivacyPolicyPage /> },
      { path: 'policy', element: <PrivacyPolicyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
