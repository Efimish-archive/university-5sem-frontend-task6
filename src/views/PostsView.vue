<script setup>
import BaseTable from '@/components/BaseTable.vue';
import { usePostsSearch } from '@/cache/postsQuery';
import { useRoute, useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { createPostsApi } from '@/api/posts';
import { useCategories } from '@/cache/categoriesQuery';
import { computed, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const router = useRouter();
const route = useRoute();
const { delete_ } = createPostsApi();
const categories = useCategories();

const searchParam = computed(() => route.query.search ?? '');
const searchQuery = ref(route.query.search ?? '');

const updateSearch = useDebounceFn((value) => {
  router.push({
    query: value ? { search: value } : {},
  })
}, 500);

function handleSearch() {
  updateSearch(searchQuery.value);
}

watch(
  () => route.query.search,
  (newSearch) => {
    searchQuery.value = newSearch || '';
  },
);

const { data, refetch } = usePostsSearch(searchParam);

const mutation = useMutation({
  mutationFn: delete_,
  onSuccess() {
    refetch();
  },
  onError(data) {
    console.error(data);
  },
});

const header = {
  id: 'ID',
  name: 'Имя',
  slug: 'Слаг',
  content: 'Контент',
  image_url: 'Картинка',
  category_id: 'Категория',
  actions: 'Действия',
}

function createPost() {
  router.push('/posts/create');
}

function editPost(slug) {
  router.push(`/posts/${slug}`);
}

function deletePost(slug) {
  if (!confirm(`Вы точно хотите удалить пост #${slug}?`)) return;
  mutation.mutate(slug);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Список постов</h1>
    <div class="flex flex-col gap-1 text-black">
      <input type="text" class="bg-gray-700 border-2 rounded-lg text-white" v-model="searchQuery" @input="handleSearch">
      <button class="bg-green-400 p-2 rounded-lg cursor-pointer" @click="createPost">Добавить новый
        пост</button>
      <BaseTable :header="header" :rows="data ?? []">
        <template #actions="{ row: { slug } }">
          <span class="flex gap-1 text-black">
            <button class="bg-blue-400 p-2 rounded-lg cursor-pointer" @click="editPost(slug)">Редактировать</button>
            <button class="bg-red-400 p-2 rounded-lg cursor-pointer" @click="deletePost(slug)">Удалить</button>
          </span>
        </template>
        <template #image_url="{ value, row: { name } }">
          <img :src="value" :alt="name" width="128px">
        </template>
        <template #category_id="{ value }">
          {{categories.data.value?.find(c => c.id === value)?.name ?? '-'}}
        </template>
      </BaseTable>
    </div>
  </div>
</template>
