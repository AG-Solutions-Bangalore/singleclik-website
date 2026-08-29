/**
 * Top-level App entry consumed by main.tsx.
 * Composes providers and mounts the route tree.
 *
 * Provider order (outermost first):
 *   ThemeProvider  ← applies theme class to <html> before any paint
 *   HelmetProvider ← enables <Seo /> in any descendant
 *   QueryClientProvider ← server-state cache available everywhere
 *   RouterProvider ← renders the active route
 */
import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from '@/lib/queryClient'
import { router } from '@/app/router'

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </HelmetProvider>
)

export default App
