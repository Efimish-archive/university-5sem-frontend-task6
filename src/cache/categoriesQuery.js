import { createCategoriesApi } from '../api/categories'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export function useCategories() {
  const { getAll } = createCategoriesApi()

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: getAll,
    select: (r) => r.data,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  const count = computed(() => (query.data.value ?? []).length)

  return { ...query, count }
}

export function useCategory(id) {
  const { get } = createCategoriesApi()

  const query = useQuery({
    queryKey: ['categories', id],
    queryFn: () => get(id),
    select: (r) => r.data,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  return query
}
