<script setup>
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()
</script>

<template> 
  <MainSection>
    <div class="bg-white w-full flex flex-col gap-3 p-3">
      <div class="flex justify-between">
        <div>Overview</div>
        <div>Value</div>
      </div>
      <div class="flex justify-between">
        <div>Number of Notes</div>
        <div>{{ storeNotes.getNotes }}</div>
      </div>
      <div class="flex justify-between">
        <div>Number of Character (all notes)</div>
        <div>{{ storeNotes.getNotesCharacters }}</div>
      </div>
    </div>
  </MainSection>
</template>