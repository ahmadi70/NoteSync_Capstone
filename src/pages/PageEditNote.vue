<script setup>
  import { useStoreNotes } from '@/stores/storeNotes'
  import { useRoute, useRouter } from 'vue-router'

  const storeNotes = useStoreNotes()
  const route = useRoute()
  const router = useRouter()

  const noteContent = ref('')
  noteContent.value = storeNotes.getNoteContent(route.params.id)

  const updateNote = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
  }

</script>

<template>
  <MainSection>
    <NoteBox
      v-model="noteContent"
      placeholder="Edit Note"
      actionBtnLabel="Save Note"
      boxLabel="Edit Note"
      cancelBtnLabel="Cancel"
      @handleAction="updateNote"
    />
  </MainSection>
</template>
