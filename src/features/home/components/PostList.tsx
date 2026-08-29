import { usePosts } from '../hooks/usePosts'
import { PostCard } from './PostCard'
import { Card } from '@/components/ui'

/**
 * Renders a grid of posts with proper loading / empty / error states.
 * Each state is exposed to assistive tech via role + aria-live.
 */
export const PostList = () => {
  const { data, isPending, isError, error, refetch, isFetching } = usePosts()

  if (isPending) {
    return (
      <div role="status" aria-live="polite" aria-label="Loading posts" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-card border border-border bg-surface" />
        ))}
        <span className="sr-only">Loading posts…</span>
      </div>
    )
  }

  if (isError) {
    return (
      <Card className="p-6" role="alert">
        <p className="font-medium text-fg">Couldn't load posts.</p>
        <p className="mt-1 text-sm text-muted">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 inline-flex h-9 items-center rounded-button bg-brand px-4 text-sm font-medium text-brand-fg hover:bg-brand/90"
        >
          Retry
        </button>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-muted" role="status">
        No posts yet.
      </p>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy={isFetching}>
      {data.slice(0, 9).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
