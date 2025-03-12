<script setup>
import { useDateFormat } from '@vueuse/core'
import { useStoreNotes } from '@/stores/storeNotes'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const getCharacter = computed(()=> {
  const length = props.note.content.length
  const description = length > 1 ? 'characters' : 'character'
  return `${ length } ${ description }`
})

const dateFormated = computed(() => {
  const currentDate = new Date().getTime()
  const formatDate = useDateFormat(currentDate, 'DD-MM-YYYY @ HH:mm')

  return formatDate
})

const storeNotes = useStoreNotes()
const deleteNote  = () => {
  storeNotes.deleteNote(props.note.id)
}

const modals = reactive({
  deleteNote: false
})

</script>

<template>
  <div class="bg-white shadow-sm">
    <div class="p-4">
      <p>{{ note.content }}</p>
      <div class="text-sm text-gray-500 flex justify-between mt-4 items-center">
        <span>{{ dateFormated }}</span>
        <span>{{ getCharacter }}</span>
      </div>
    </div>
    
    <div class="border-t border-gray-300 flex justify-center divide-x divide-gray-300">
      <RouterLink
        :to="`/edit-note/${note.id}`"
        class="w-full py-2 cursor-pointer hover:bg-[#1ea7f9] hover:text-white text-center"
      >Edit</RouterLink>
      <button
        @click="modals.deleteNote = true"
        class="w-full py-2 cursor-pointer hover:bg-red-600 hover:text-white"
      >Delete</button>
    </div>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>
