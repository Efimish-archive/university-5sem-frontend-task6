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
  if (model.value.name < 1) return;
  emit('done', { name: model.value.name });
}
</script>

<template>
  <form class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <label for="name">Имя категории</label>
      <input type="text" id="name" v-model="model.name" class="bg-gray-700 border-2 rounded-lg">
    </div>
    <button type="submit" class="bg-green-400 p-2 rounded-lg cursor-pointer" @click.prevent="done">{{ text }}</button>
  </form>
</template>
