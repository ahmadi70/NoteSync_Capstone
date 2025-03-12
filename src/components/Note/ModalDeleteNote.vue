<script setup>
import { useStoreNotes } from '@/stores/storeNotes';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const storeNotes = useStoreNotes()

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleKeyboard = e => {
  if(e.key === 'Escape') closeModal()
  console.log('close it')
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard)
})
</script>

<template>
  <Teleport to="body">
    <div class="absolute top-0 left-0 bg-sky-700/70 w-full h-screen flex justify-center items-center">
      <div class="w-120" ref="modelDeleteRef">
        <header class="bg-gray-200 p-2 flex justify-between items-center">
          <p>Delete Note?</p>
          <button
            class="cursor-pointer hover:text-red-600 hover:shadow-sm"
            @click="closeModal"
          >
            <i class="material-icons">close</i>
          </button>
        </header>
        <section class="bg-white p-4">
          <p>Are you sure you want to delete this note?</p>
        </section>
        <footer class="bg-gray-200 p-2 flex justify-end gap-4">
          <button
            class="btn"
            @click="closeModal"
          >Cancel</button>
          <button
            class="btn bg-red-700 hover:bg-red-600"
            @click="storeNotes.deleteNote(noteId)"
          >Delete</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>
