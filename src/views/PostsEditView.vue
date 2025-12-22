<script setup>
import PostForm from '@/components/PostForm.vue';
import { ref } from 'vue';
import { useRouteParams } from '@vueuse/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { createPostsApi } from '@/api/posts';
import { watchEffect } from 'vue';

const slug = useRouteParams('slug');
const queryClient = useQueryClient();
const { get, put } = createPostsApi();

const form = ref({
  name: '',
  content: '',
  image_url: '',
  category_id: 1,
});

const query = useQuery({
  queryKey: ['posts', slug],
  queryFn: ({ queryKey }) => get(queryKey[1]),
  select: (d) => d.data,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60,
});

watchEffect(() => {
  if (query.data.value) {
    form.value.name = query.data.value.name;
    form.value.content = query.data.value.content;
    form.value.image_url = query.data.value.image_url;
    form.value.category_id = query.data.value.category_id;
  }
});

const mutation = useMutation({
  mutationFn: ({ slug, payload }) => put(slug, payload),
  onSuccess() {
    query.refetch();
    queryClient.invalidateQueries({
      queryKey: ['posts'],
    });
  },
  onError(data) {
    console.error(data);
  },
});

function editPost(payload) {
  mutation.mutate({ slug: slug.value, payload });
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Редактировать пост #{{ slug }}</h1>
    <PostForm text="Сохранить" v-model="form" @done="editPost" />
  </div>
</template>
