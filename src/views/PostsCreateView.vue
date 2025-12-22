<script setup>
import PostForm from '@/components/PostForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createPostsApi } from '@/api/posts';
import { useCategories } from '@/cache/categoriesQuery';

const router = useRouter();
const queryClient = useQueryClient();
const { post } = createPostsApi();
const { data: categories } = useCategories();

const mutation = useMutation({
  mutationFn: post,
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ['posts']
    });
    router.push("/posts");
  },
  onError(data) {
    console.error(data);
  }
});

const form = ref({
  name: '',
  content: '',
  image_url: '',
  category_id: 1
});

function createPost(data) {
  mutation.mutate(data);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Создать новый пост</h1>
    <PostForm text="Добавить" :categories="categories" v-model="form" @done="createPost" />
  </div>
</template>
