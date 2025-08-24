<template>
  <div class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10">
    <table class="w-full table-fixed">
      <thead class="text-lg">
        <tr class="bg-gray-300">
          <th class="px-6 py-1">
            Identifier
          </th>
          <th class="px-6 py-1">
            Id
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="item in itemsList" :key="item.id">
          <td class="px-6 py-1">
            {{ item.identifier_name }}
          </td>
          <td class="px-6 py-1">
            <a :href="`/art_idea/${item.id}`" @click="navigate">
              Detail link         
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import useArtIdeasStore from '@/stores/useArtIdeasStore'


const ideasLists = useArtIdeasStore()
const itemsList = computed(() => ideasLists.data);

onMounted(async () => {
  await ideasLists.fetchList()
})

</script>
