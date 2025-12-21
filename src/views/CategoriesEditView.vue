<script setup>
import CategoryForm from '@/components/CategoryForm.vue';
import { useRouteParams } from '@vueuse/router';
import { useRouter } from 'vue-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { createCategoriesApi } from '@/api/categories';
import { watchEffect } from 'vue';

const id = useRouteParams('id');
const router = useRouter();
const queryClient = useQueryClient();
const { get, put } = createCategoriesApi();

const query = useQuery({
  queryKey: ['content', id],
  queryFn: ({ queryKey }) => get(queryKey[1]),
  select: (d) => d.data,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60,
});

watchEffect(() => {
  if (query.data.value) {
    // form.value.title = data.value.title
    // form.value.content = data.value.content
  }
});

const mutation = useMutation({
  mutationFn: put,
  onSuccess() {
    query.refetch();
    queryClient.invalidateQueries({
      queryKey: ['contents'],
    });
  },
  onError(data) {
    console.error(data);
  },
});

function editCategory(data) {
  mutation.mutate(id, data);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Редактировать категорию #{{ id }}</h1>
    <CategoryForm text="Сохранить" @done="editCategory" />
  </div>
</template>
