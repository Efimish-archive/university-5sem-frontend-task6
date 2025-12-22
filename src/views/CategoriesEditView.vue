<script setup>
import CategoryForm from '@/components/CategoryForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRouteParams } from '@vueuse/router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createCategoriesApi } from '@/api/categories';
import { watchEffect } from 'vue';
import { useCategory } from '@/cache/categoriesQuery';

const id = useRouteParams('id');
const router = useRouter();
const queryClient = useQueryClient();
const { put } = createCategoriesApi();

const form = ref({
  name: '',
});

const query = useCategory(id);

watchEffect(() => {
  if (query.data.value) {
    form.value.name = query.data.value.name;
  }
});

const mutation = useMutation({
  mutationFn: ({ id, payload }) => put(id, payload),
  onSuccess() {
    query.refetch();
    queryClient.invalidateQueries({
      queryKey: ['categories'],
    });
    router.push("/categories");
  },
  onError(data) {
    console.error(data);
  },
});

function editCategory(payload) {
  mutation.mutate({ id: id.value, payload });
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Редактировать категорию #{{ id }}</h1>
    <CategoryForm text="Сохранить" v-model="form" @done="editCategory" />
  </div>
</template>
