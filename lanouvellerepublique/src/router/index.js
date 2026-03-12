import { createRouter, createWebHistory } from 'vue-router' 
import MapView from '@/views/MapView.vue'
import ListView from '../views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListView,
    },
    {
      path: '/carte',
      name: 'carte',
      component: MapView,
    },
  ],
})

export default router
