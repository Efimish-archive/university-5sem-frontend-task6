import { createCategoriesApi } from '../api/categories'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export function useCategories() {
  const { getAll } = createCategoriesApi()

  const query = useQuery({
    queryKey: ['categories'],
    select: (d) => d.data,
    queryFn: getAll,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  const count = computed(() => (query.data.value ?? []).length)

  return { ...query, count }
}
