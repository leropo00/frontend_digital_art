<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Art Ideas List', to: '/art_ideas_list' },
  { label: 'Create new Art Idea', to: '/create_art_idea' },
  { label: 'Reference Material List', to: '/reference_list' },
  { label: 'Create new Reference Material', to: '/create_reference_material' }
]
</script>

<template>
  <header>
    <div class="wrapper mb-6">
      <nav class="flex">
        <span class="px-2"  v-for="(link, index) in navLinks" :key="index">
          <RouterLink :to="link.to">{{ link.label }}</RouterLink>
        </span>
      </nav>
    </div>
  </header>

  <RouterView />
</template>