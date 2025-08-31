import { createRouter, createWebHistory } from 'vue-router'
import ArtIdeaList from '@/pages/ArtIdeaList.vue'
import ArtIdeaDetails from '@/pages/ArtIdeaDetails.vue'
import CreateArtIdea from '@/pages/CreateArtIdea.vue'
import CreateReferenceMaterial from '@/pages/CreateReferenceMaterial.vue'
import HomeView from '@/pages/HomeView.vue'
import ReferenceMaterialList from '@/pages/ReferenceMaterialList.vue'
import AIAssistantComponent from '@/pages/AIAssistantComponent.vue'
import {   
    PAGE_LINK_HOME,
    PAGE_ART_IDEAS_LIST,
    PAGE_ART_IDEA,
    PAGE_REFERENCE_MATERIAL_LIST,
    PAGE_CREATE_ART_IDEA,
    PAGE_CREATE_REFERENCE_MATERIAL,
    PAGE_AI_ASSISTANT,
} from '@/urls'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PAGE_LINK_HOME,
      name: 'home',
      component: HomeView,
    },
    {
      path: PAGE_ART_IDEAS_LIST,
      name: 'ideas',
      component: ArtIdeaList,
    },
    { path: PAGE_ART_IDEA, 
      name: 'idea_details',
      component: ArtIdeaDetails,
    },
    {
      path: PAGE_REFERENCE_MATERIAL_LIST,
      name: 'references_list',
      component: ReferenceMaterialList,
    },
    {
      path: PAGE_CREATE_ART_IDEA,
      name: 'create_art_idea',
      component: CreateArtIdea,
    },
    {
      path: PAGE_CREATE_REFERENCE_MATERIAL,
      name: 'create_reference_material',
      component: CreateReferenceMaterial,
    },
    {
      path: PAGE_AI_ASSISTANT,
      name: 'assistant',
      component: AIAssistantComponent,
    },
  ],
})

export default router
