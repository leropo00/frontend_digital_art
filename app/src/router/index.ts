import { createRouter, createWebHistory } from 'vue-router'
import ArtIdeaList from '../pages/ArtIdeaList.vue'
import ArtIdeaDetails from '../pages/ArtIdeaDetails.vue'
import CreateArtIdea from '../pages/CreateArtIdea.vue'
import CreateReferenceMaterial from '../pages/CreateReferenceMaterial.vue'
import HomeView from '../pages/HomeView.vue'
import ReferenceMaterialList from '../pages/ReferenceMaterialList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/art_ideas_list',
      name: 'ideas',
      component: ArtIdeaList,
    },
    { path: '/art_idea/:id', 
      name: 'idea_details',
      component: ArtIdeaDetails,
    },
    {
      path: '/reference_list',
      name: 'references_list',
      component: ReferenceMaterialList,
    },
    {
      path: '/create_art_idea',
      name: 'create_art_idea',
      component: CreateArtIdea,
    },
    {
      path: '/create_reference_material',
      name: 'create_reference_material',
      component: CreateReferenceMaterial
    },
  ],
})

export default router
