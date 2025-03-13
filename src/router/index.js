import { createRouter, createWebHashHistory } from 'vue-router'
import PageNotes from '@/pages/PageNotes.vue'
import PageOverview from '@/pages/PageOverview.vue'
import PageEditNote from '@/pages/PageEditNote.vue'
import PageAuth from '@/pages/PageAuth.vue'
import { useStoreAuth } from '@/stores/storeAuth'

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
  },
  {
    path: '/auth',
    name: 'auth',
    component: PageAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// navigation guards - this will triger every time when a user try to go to a new rout
router.beforeEach(async (to, from) => {
  const storeNotes = useStoreAuth()
  if(!storeNotes.user.id && to.name !== 'auth') {
    return { name: 'auth' }
  }
  if(storeNotes.user.id && to.name === 'auth') {
    return false
  }
})

export default router