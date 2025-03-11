<script setup>
const notes = ref([
  {
    id: 'id1',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed aliquam quas eos accusantium ut nulla quibusdam ipsam consequatur tempora ducimus!'
  },
  {
    id: 'id2',
    content: 'another new note'
  }
])

const newNote = ref('')
const newNoteRef = ref(null)
const addNote = () => {
  const currentDate = new Date().getTime()
  const id = currentDate.toString()
  notes.value.unshift({
    id,
    content: newNote.value
  })
  newNote.value = ''
  newNoteRef.value.focusTextArea()
}

const deleteNote = idToDelete => {
  notes.value = notes.value.filter(note => note.id !== idToDelete)
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
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @deleteClicked="deleteNote"
    />
  </MainSection>
</template>
