import { QueryClient } from '@tanstack/react-query'
import { ApiError } from './api'

/**
 * Single shared QueryClient. The defaults are tuned for a content site:
 *
 * - `staleTime: 60s` — treat data as fresh for a minute so we don't refetch
 *   on every route entry.
 * - `gcTime: 5m` — keep unused cache for 5 minutes for instant back-nav.
 * - `retry` — exponential backoff capped at 2 attempts; never retry 4xx.
 * - `refetchOnWindowFocus: false` — typical SPA UX, no surprise refetches.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false
        return failureCount < 2
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
})
