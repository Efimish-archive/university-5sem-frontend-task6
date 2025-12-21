<script setup>
import { ref } from 'vue';

const props = defineProps({
  default: Object,
  text: {
    type: String,
    default: "Сохранить",
  },
});

const emit = defineEmits(['done']);

const name = ref(props.default?.name ?? "");
const content = ref(props.default?.content ?? "");
const image_url = ref(props.default?.image_url ?? "");
const category_id = ref(props.default?.category_id ?? 1);

function done() {
  if (name.value.length < 1) return;
  if (content.value.length < 1) return;
  if (image_url.value.length < 1) return;
  if (category_id.value < 1) return;

  emit('done', {
    name: name.value,
    content: content.value,
    image_url: image_url.value,
    category_id: category_id.value,
  });
}
</script>

<template>
  <form class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <label for="name" class="flex-1">Имя поста</label>
      <input type="text" id="name" v-model="name" class="bg-gray-700 border-2 rounded-lg">
    </div>
    <div class="flex gap-4 items-center">
      <label for="content" class="flex-1">Контент</label>
      <textarea id="content" v-model="content" class="bg-gray-700 border-2 rounded-lg"></textarea>
    </div>
    <div class="flex gap-4 items-center">
      <label for="image_url" class="flex-1">Ссылка на картинку</label>
      <input type="url" id="image_url" v-model="image_url" class="bg-gray-700 border-2 rounded-lg">
    </div>
    <div class="flex gap-4 items-center">
      <label for="category_id" class="flex-1">ID Категории</label>
      <input type="number" id="category_id" v-model="category_id" min="1" class="bg-gray-700 border-2 rounded-lg">
    </div>
    <button type="submit" class="bg-green-400 p-2 rounded-lg cursor-pointer" @click.prevent="done">{{ text }}</button>
  </form>
</template>
