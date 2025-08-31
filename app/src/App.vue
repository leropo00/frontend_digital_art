<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {   
    PAGE_LINK_HOME,
    PAGE_ART_IDEAS_LIST,
    PAGE_REFERENCE_MATERIAL_LIST,
    PAGE_CREATE_ART_IDEA,
    PAGE_CREATE_REFERENCE_MATERIAL,
    PAGE_AI_ASSISTANT,
} from '@/urls'

const navLinks = [
  { label: 'Home', to: PAGE_LINK_HOME },
  { label: 'Art Ideas List', to: PAGE_ART_IDEAS_LIST },
  { label: 'Create new Art Idea', to: PAGE_CREATE_ART_IDEA },
  { label: 'Reference Material List', to: PAGE_REFERENCE_MATERIAL_LIST },
  { label: 'Create new Reference Material', to: PAGE_CREATE_REFERENCE_MATERIAL },
  { label: 'AI Assistant', to:  PAGE_AI_ASSISTANT },
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
  <notifications />

</template>