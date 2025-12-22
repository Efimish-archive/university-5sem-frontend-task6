<script setup>
import CategoryForm from '@/components/CategoryForm.vue';
import { ref } from 'vue';
import { useRouteParams } from '@vueuse/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { createCategoriesApi } from '@/api/categories';
import { watchEffect } from 'vue';

const id = useRouteParams('id');
const queryClient = useQueryClient();
const { get, put } = createCategoriesApi();

const form = ref({
  name: '',
});

const query = useQuery({
  queryKey: ['categories', id],
  queryFn: ({ queryKey }) => get(queryKey[1]),
  select: (d) => d.data,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60,
});

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
