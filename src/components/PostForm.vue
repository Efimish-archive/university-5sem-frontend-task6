<script setup>
defineProps({
  text: {
    type: String,
    default: "Сохранить",
  },
});

const model = defineModel({
  type: Object,
  required: true,
});

const emit = defineEmits(['done']);

function done() {
  if (model.value.name.length < 1) return;
  if (model.value.content.length < 1) return;
  if (model.value.image_url.length < 1) return;
  if (model.value.category_id < 1) return;

  emit('done', {
    name: model.value.name,
    content: model.value.content,
    image_url: model.value.image_url,
    category_id: model.value.category_id,
  });
}
</script>

<template>
  <form class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <label for="name" class="flex-1">Имя поста</label>
      <input type="text" id="name" v-model="model.name" class="bg-gray-700 border-2 rounded-lg">
    </div>
    <div class="flex gap-4 items-center">
      <label for="content" class="flex-1">Контент</label>
      <textarea id="content" v-model="model.content" class="bg-gray-700 border-2 rounded-lg"></textarea>
    </div>
    <div class="flex gap-4 items-center">
      <label for="image_url" class="flex-1">Ссылка на картинку</label>
      <input type="url" id="image_url" v-model="model.image_url" class="bg-gray-700 border-2 rounded-lg">
    </div>
    <div class="flex gap-4 items-center">
      <label for="category_id" class="flex-1">ID Категории</label>
      <input type="number" id="category_id" v-model="model.category_id" min="1" class="bg-gray-700 border-2 rounded-lg">
    </div>
    <button type="submit" class="bg-green-400 p-2 rounded-lg cursor-pointer" @click.prevent="done">{{ text }}</button>
  </form>
</template>
