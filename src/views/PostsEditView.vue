<script setup>
import PostForm from '@/components/PostForm.vue';
import { useRouteParams } from '@vueuse/router';

const id = useRouteParams('id');

function editPost({ name, content, image_url, category_id }) {
  alert([name, content, image_url, category_id].join(", "));
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Редактировать пост #{{ id }}</h1>
    <PostForm text="Сохранить" @done="editPost" />
  </div>
</template>
