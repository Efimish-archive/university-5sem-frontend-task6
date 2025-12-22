import { createPostsApi } from '../api/posts'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export function usePosts() {
  const { getAll } = createPostsApi()

  const query = useQuery({
    queryKey: ['posts'],
    select: (d) => d.data,
    queryFn: getAll,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  const count = computed(() => (query.data.value ?? []).length)

  return { ...query, count }
}
