import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '../api/categories.api'
import type { CategoriesResponse } from '@/types'

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
}

export const useCategories = () =>
  useQuery<CategoriesResponse>({
    queryKey: categoryKeys.list(),
    queryFn: ({ signal }) => categoriesApi.list(signal),
    staleTime: 1000 * 60 * 15, // 15 mins cache
  })
