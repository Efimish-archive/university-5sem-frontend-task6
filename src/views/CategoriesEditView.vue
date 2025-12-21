<script setup>
import CategoryForm from '@/components/CategoryForm.vue';
import { useRouteParams } from '@vueuse/router';

const id = useRouteParams('id');

function editCategory({ name }) {
  alert(name);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Редактировать категорию #{{ id }}</h1>
    <CategoryForm text="Сохранить" @done="editCategory" />
  </div>
</template>
