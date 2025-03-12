<script setup>
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()

const newNote = ref('')
const newNoteRef = ref(null)
const addNote = () => {
  storeNotes.addNote(newNote.value)
  newNote.value = ''
  newNoteRef.value.focusTextArea()
}
</script>

<template>
  <MainSection class="space-y-4">
    <NoteBox
      v-model="newNote"
      @handleAction="addNote"
      ref="newNoteRef"
      actionBtnLabel="Add New Note"
      placeholder="Add New Note"
    />
    <Note
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
    />
  </MainSection>
</template>
