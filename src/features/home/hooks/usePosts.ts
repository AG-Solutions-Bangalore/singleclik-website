import { useQuery } from '@tanstack/react-query'
import { postsApi } from '../api/posts.api'
import type { Post } from '@/types'

/**
 * Query key factory.
 *
 * Centralising keys prevents typo-driven cache misses and makes
 * invalidation explicit. Pass arguments to a factory function so the
 * cache is keyed by the request parameters.
 */
export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
}

export const usePosts = () =>
  useQuery<Post[]>({
    queryKey: postKeys.list(),
    queryFn: ({ signal }) => postsApi.list(signal),
  })

export const usePost = (id: number) =>
  useQuery<Post>({
    queryKey: postKeys.detail(id),
    queryFn: ({ signal }) => postsApi.byId(id, signal),
    enabled: Number.isFinite(id) && id > 0,
  })
