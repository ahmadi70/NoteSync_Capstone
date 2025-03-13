<script setup>
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()

onMounted(() => {
  storeAuth.init()
})
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
  </div>
  
</template>
