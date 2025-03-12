import { createRouter, createWebHashHistory } from 'vue-router'
import PageNotes from '@/pages/PageNotes.vue'
import PageOverview from '@/pages/PageOverview.vue'
import PageEditNote from '@/pages/PageEditNote.vue'

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
  },
  {
    path: '/edit-note/:id',
    name: 'edit-note',
    component: PageEditNote
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router