import { createRouter, createWebHashHistory } from 'vue-router'
import General from '../views/General.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'general',
      component: General
    },
    {
      path: '/update',
      name: 'update',
      component: () => import('../views/Update.vue')
    }
  ]
})

export default router
