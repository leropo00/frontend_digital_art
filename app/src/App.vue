<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
          <span class="px-2">
            <RouterLink to="/">Home</RouterLink>
          </span>
          <span class="px-2">
            <RouterLink to="/art_ideas_list">Art Ideas List</RouterLink>
          </span>
          <span class="px-2">
            <RouterLink to="/reference_list">Reference Material List</RouterLink>
          </span>
        </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
