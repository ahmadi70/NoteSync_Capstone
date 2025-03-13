<script setup>
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()
onMounted(() => {
  storeNotes.getNotes()
})
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
  </div>
  
</template>
