<template>
  <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
    <table class="w-full table-fixed">
      <thead>
        <tr class="bg-gray-300">
    		  <th>
            Identifier
          </th>
          <th>
            Id
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="item in itemsList" :key="item.id">
          <td>
            {{ item.identifier_name }}
          </td>
          <td>
            {{ item.id }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import useArtIdeasList from '../stores/artIdeasList'
import axiosClient from '@/axios.js'

const ideasLists = useArtIdeasList()

const itemsList = computed(() => ideasLists.data);

onMounted(async () => {
  await ideasLists.fetchList()
})


</script>

<style scoped></style>
