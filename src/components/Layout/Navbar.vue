<script setup>
import { useOnClickOutside } from '@/use/useOnClickOutside'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

useOnClickOutside(() => {
  if (isOpen.value) {
    toggleMenu()
  }
})
</script>

<template>
  <nav class="bg-sky-600 text-2xl text-white mb-8 shadow-sm">
    <div class="relative flex justify-between items-center container mx-auto">
      <h1>
        <RouterLink class="block p-4" to="/">NoteSync</RouterLink>
      </h1>

      <button
        @click.stop="toggleMenu"
        class="block md:hidden pr-3 cursor-pointer"
      >
        <i v-if="isOpen" class="material-icons mr-2">close</i>
        <i v-else class="material-icons mr-2">menu</i>
      </button>

      <ul
        class="bg-sky-600 md:flex md:justify-end items-center md:top-0 md:border-none md:static absolute w-full top-16 left-0 shadow-md border border-white"
        :class="isOpen ? 'block' : 'hidden md:flex'"
      >
        <li>
          <RouterLink class="block p-4" to="/">Notes</RouterLink>
        </li>
        <li>
          <RouterLink class="block p-4" to="/overview">Overview</RouterLink>
        </li>
        <li>
          <button
            class="btn bg-red-700 hover:bg-red-600 m-1"
          >Logout</button>
        </li>
      </ul>
    </div>
  </nav>
    
</template>

<style scoped>
.router-link-exact-active {
  background: #1ea7f9;
}
</style>
