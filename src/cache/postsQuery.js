import { createPostsApi } from '../api/posts'
import { useQuery } from '@tanstack/vue-query'
import { computed, toValue } from 'vue'

export function usePosts() {
  const { getAll } = createPostsApi()

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: getAll,
    select: (r) => r.data,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  const count = computed(() => (query.data.value ?? []).length)

  return { ...query, count }
}

export function usePost(slug) {
  const { get } = createPostsApi()

  const query = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => get(toValue(slug)),
    select: (r) => r.data,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  return query
}

export function usePostsSearch(search) {
  const { getAll } = createPostsApi()

  const query = useQuery({
    queryKey: ['posts-search', search],
    queryFn: () => getAll(toValue(search)),
    select: (r) => r.data,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  const count = computed(() => (query.data.value ?? []).length)

  return { ...query, count }
}
