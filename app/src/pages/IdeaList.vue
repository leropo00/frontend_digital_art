<template>
  <div class="about">
    {{ ideasLists.data }}
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import useArtIdeasList from '../stores/artIdeasList'
import axiosClient from '@/axios.js'

const ideasLists = useArtIdeasList()

onMounted(async () => {
  await ideasLists.fetchList()
})


</script>

<style>
</style>
