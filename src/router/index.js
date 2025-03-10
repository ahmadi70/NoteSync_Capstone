import { createRouter, createWebHashHistory } from 'vue-router'
import PageNotes from '@/pages/PageNotes.vue'
import PageOverview from '@/pages/PageOverview.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: PageNotes
  },
  {
    path: '/overview',
    name: 'overview',
    component: PageOverview
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router