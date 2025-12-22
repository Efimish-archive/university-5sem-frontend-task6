<script setup>
import BaseTable from '@/components/BaseTable.vue';
import { useCategories } from '@/cache/categoriesQuery';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createCategoriesApi } from '@/api/categories';

const router = useRouter();
const queryClient = useQueryClient();
const { data, refetch } = useCategories();
const { delete_ } = createCategoriesApi();

const mutation = useMutation({
  mutationFn: delete_,
  onSuccess() {
    refetch();
    queryClient.invalidateQueries({
      queryKey: ['categories'],
    });
  },
  onError(data) {
    console.error(data);
  },
});

const header = {
  id: 'ID',
  name: 'Имя',
  actions: 'Действия',
}

function createCategory() {
  router.push('/categories/create');
}

function editCategory(id) {
  router.push(`/categories/${id}`);
}

function deleteCategory(id) {
  if (!confirm(`Вы точно хотите удалить категорию #${id}?`)) return;
  mutation.mutate(id);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Список категорий</h1>
    <div class="flex flex-col gap-1 text-black">
      <button class="bg-green-400 p-2 rounded-lg cursor-pointer" @click="createCategory">Добавить новую
        категорию</button>
      <BaseTable :header="header" :rows="data">
        <template #actions="{ row: { id } }">
          <span class="flex gap-1 text-black">
            <button class="bg-blue-400 p-2 rounded-lg cursor-pointer" @click="editCategory(id)">Редактировать</button>
            <button class="bg-red-400 p-2 rounded-lg cursor-pointer" @click="deleteCategory(id)">Удалить</button>
          </span>
        </template>
      </BaseTable>
    </div>
  </div>
</template>
