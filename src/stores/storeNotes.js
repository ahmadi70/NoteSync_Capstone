import { defineStore } from 'pinia'

export const useStoreNotes= defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [
        {
          id: 'id1',
          content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed aliquam quas eos accusantium ut nulla quibusdam ipsam consequatur tempora ducimus!'
        },
        {
          id: 'id2',
          content: 'another from Pinia store'
        }
      ]
    }
  },
  actions: {
    addNote(newNoteConent) {
      const currentDate = new Date().getTime()
      const id = currentDate.toString()
      const note = {
        id,
        content: newNoteConent
      }
      this.notes.unshift(note)
    },
    deleteNote(idToDelete) {
      this.notes = this.notes.filter(note => note.id !== idToDelete)
    },
    updateNote(id, content) {
      const index = this.notes.findIndex(note => note.id === id)
      this.notes[index].content = content
    }
  },
  getters: {
    getNoteContent: state => id => state.notes.filter(note => note.id === id)[0].content,
    getNotes: state => state.notes.length,
    getNotesCharacters: state => {
      let count = 0
      state.notes.forEach(note => count += note.content.length)
      return count
    }
  }
})