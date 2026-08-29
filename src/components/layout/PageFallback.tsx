/**
 * Lightweight skeleton shown while a lazy-loaded page chunk is fetching.
 * Kept dependency-free so it ships inside the main bundle without bloat.
 */
export const PageFallback = () => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Loading"
    className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
  >
    <div className="h-8 w-2/3 animate-pulse rounded-md bg-surface" />
    <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-surface" />
    <div className="mt-2 h-4 w-5/6 animate-pulse rounded-md bg-surface" />
    <span className="sr-only">Loading…</span>
  </div>
)
