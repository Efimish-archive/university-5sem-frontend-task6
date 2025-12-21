<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="w-screen bg-gray-50 p-4 flex justify-center">
    <nav class="flex gap-4 text-2xl">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/categories">Categories</RouterLink>
      <RouterLink to="/posts">Posts</RouterLink>
    </nav>
  </header>
  <main class="w-screen p-4 flex justify-center items-center">
    <RouterView />
  </main>
</template>
