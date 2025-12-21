<script setup>
import CategoryForm from '@/components/CategoryForm.vue';

function createCategory({ name }) {
  alert(name);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Создать новую категорию</h1>
    <CategoryForm text="Добавить" @done="createCategory" />
  </div>
</template>
