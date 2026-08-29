import { api } from '@/lib/api'
import type { Post } from '@/types'

/**
 * Feature-level API surface.
 *
 * All network calls for this feature go through these functions so the
 * rest of the feature (hooks, components) never imports `fetch` directly.
 * That gives us one place to add auth headers, retry policy, or to mock.
 */
export const postsApi = {
  list: (signal?: AbortSignal) =>
    api<Post[]>({ path: '/posts', signal, headers: { 'Cache-Control': 'no-cache' } }),

  byId: (id: number, signal?: AbortSignal) =>
    api<Post>({ path: `/posts/${id}`, signal }),
}
