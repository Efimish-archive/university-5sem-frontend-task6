<script setup>
defineProps({
  rows: {
    type: Array,
    required: true,
  },
  header: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th v-for="(label, key) in header" :key="key"
            class="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
            <slot :name="`header-${key}`" :key="key">
              {{ label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index" class="border-b hover:bg-gray-50">
          <td v-for="(label, key) in header" :key="key" class="px-4 py-3 text-sm text-gray-700">
            <slot :name="key" :value="row[key]" :row="row">
              {{ row[key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="rows.length === 0" class="text-center py-8 text-gray-500">
      Нет данных для отображения
    </div>
  </div>
</template>
