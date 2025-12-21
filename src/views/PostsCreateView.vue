<script setup>
import PostForm from '@/components/PostForm.vue';

function createPost({ name, content, image_url, category_id }) {
  alert([name, content, image_url, category_id].join(", "));
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Создать новый пост</h1>
    <PostForm text="Добавить" @done="createPost" />
  </div>
</template>
