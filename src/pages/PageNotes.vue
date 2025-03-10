<script setup>
  import MainSection from '@/components/Layout/MainSection.vue'
  import NoteBox from '@/components/Note/NoteBox.vue'
  import Note from '@/components/Note/Note.vue'
</script>

<template>
  <MainSection class="space-y-4">
    <NoteBox
      actionBtnLabel="Add New Note"
      placeholder="Add New Note"
    />
    <Note
      v-for="note in 2"
    />
  </MainSection>
</template>
