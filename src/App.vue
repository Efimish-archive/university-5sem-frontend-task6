<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="w-screen h-screen bg-gray-900 text-gray-200">
    <header class="w-full bg-gray-800 p-4 flex justify-center">
      <nav class="flex gap-4 text-2xl">
        <RouterLink to="/">Домой</RouterLink>
        <RouterLink to="/categories">Категории</RouterLink>
        <RouterLink to="/posts">Посты</RouterLink>
      </nav>
    </header>
    <main class="w-screen p-4 flex flex-col justify-center items-center">
      <RouterView />
    </main>
  </div>
</template>
