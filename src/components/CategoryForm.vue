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

function done() {
  if (name.value.length < 1) return;
  emit('done', { name: name.value });
}
</script>

<template>
  <form class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <label for="name">Имя категории</label>
      <input type="text" id="name" v-model="name" class="bg-gray-700 border-2 rounded-lg">
    </div>
    <button type="submit" class="bg-green-400 p-2 rounded-lg cursor-pointer" @click.prevent="done">{{ text }}</button>
  </form>
</template>
