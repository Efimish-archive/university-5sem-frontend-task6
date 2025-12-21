<script setup>
import PostForm from '@/components/PostForm.vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createPostsApi } from '@/api/posts';

const router = useRouter();
const queryClient = useQueryClient();
const { post } = createPostsApi();

const mutation = useMutation({
  mutationFn: post,
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ['contents']
    });
    router.push("/posts");
  },
  onError(data) {
    console.error(data);
  }
});

function createPost(data) {
  mutation.mutate(data);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Создать новый пост</h1>
    <PostForm text="Добавить" @done="createPost" />
  </div>
</template>
