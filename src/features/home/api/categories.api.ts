import { api } from '@/lib/api'
import type { CategoriesResponse } from '@/types'

export const categoriesApi = {
  list: (signal?: AbortSignal) =>
    api<CategoriesResponse>({
      url: 'https://singleclik.com/api/public/api/getCategories',
      signal,
    }),
}
