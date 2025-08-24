<template>
  <div class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10">
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
            <a :href="`/idea_details/${item.id}`" @click="navigate">
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
import useReferenceMaterialStore from '../stores/referenceMaterialStore'

const referenceMaterialStore = useReferenceMaterialStore()
const itemsList = computed(() => referenceMaterialStore.data);

onMounted(async () => {
  await referenceMaterialStore.fetchList()
})

</script>
