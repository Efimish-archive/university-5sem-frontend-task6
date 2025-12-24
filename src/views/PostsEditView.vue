<script setup>
import PostForm from '@/components/PostForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRouteParams } from '@vueuse/router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createPostsApi } from '@/api/posts';
import { watchEffect } from 'vue';
import { useCategories } from '@/cache/categoriesQuery';
import { usePost } from '@/cache/postsQuery';

const slug = useRouteParams('slug');
const router = useRouter();
const queryClient = useQueryClient();
const { put } = createPostsApi();
const { data: categories } = useCategories();

const form = ref({
  name: '',
  content: '',
  image_url: '',
  category_id: '',
});

const query = usePost(slug);

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
    queryClient.invalidateQueries({
      queryKey: ['posts'],
    });
    router.push("/posts");
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
    <PostForm text="Сохранить" :categories="categories" v-model="form" @done="editPost" />
  </div>
</template>
