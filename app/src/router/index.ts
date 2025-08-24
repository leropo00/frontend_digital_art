import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ArtIdeaList from '../pages/ArtIdeaList.vue'
import ArtIdeaDetails from '../pages/ArtIdeaDetails.vue'
import ReferenceMateriaList from '../pages/ReferenceMateriaList.vue'

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
      name: 'references',
      component: ReferenceMateriaList,
    },

  ],
})

export default router
