import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import IdeaList from '../pages/IdeaList.vue'
import IdeaDetails from '../pages/IdeaDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ideas_list',
      name: 'ideas',
      component: IdeaList,
    },
    {
      path: '/ideas_list',
      name: 'ideas',
      component: IdeaList,
    },
    { path: '/idea_details/:id', 
      name: 'idea_details',
      component: IdeaDetails,
    },
  ],
})

export default router
