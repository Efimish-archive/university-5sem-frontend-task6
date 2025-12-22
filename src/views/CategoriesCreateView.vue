<script setup>
import CategoryForm from '@/components/CategoryForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createCategoriesApi } from '@/api/categories';

const router = useRouter();
const queryClient = useQueryClient();
const { post } = createCategoriesApi();

const mutation = useMutation({
  mutationFn: post,
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ['categories'],
    });
    router.push("/categories");
  },
  onError(data) {
    console.error(data);
  },
});

const form = ref({
  name: ''
});

function createCategory(data) {
  mutation.mutate(data);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Создать новую категорию</h1>
    <CategoryForm text="Добавить" v-model="form" @done="createCategory" />
  </div>
</template>
