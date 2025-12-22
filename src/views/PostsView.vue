<script setup>
import BaseTable from '@/components/BaseTable.vue';
import { usePosts } from '@/cache/postsQuery';
import { useRouter } from 'vue-router';

const router = useRouter();
const { data } = usePosts();

const header = {
  id: 'ID',
  name: 'Имя',
  slug: 'Слаг',
  content: 'Контент',
  image_url: 'Ссылка на картинку',
  category_id: 'ID категории',
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
  alert(`удаление ${slug}...`);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-3xl">Список постов</h1>
    <div class="flex flex-col gap-1 text-black">
      <button class="bg-green-400 p-2 rounded-lg cursor-pointer" @click="createPost">Добавить новый
        пост</button>
      <BaseTable :header="header" :rows="data">
        <template #actions="{ row: { slug } }">
          <span class="flex gap-1 text-black">
            <button class="bg-blue-400 p-2 rounded-lg cursor-pointer" @click="editPost(slug)">Редактировать</button>
            <button class="bg-red-400 p-2 rounded-lg cursor-pointer" @click="deletePost(slug)">Удалить</button>
          </span>
        </template>
      </BaseTable>
    </div>
  </div>
</template>
