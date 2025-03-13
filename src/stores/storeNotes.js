import { defineStore } from 'pinia'
import { 
  collection, onSnapshot, 
  doc, deleteDoc, updateDoc, addDoc,
  query, orderBy 
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef, notesCollectionQuery 
let getNotesSnapshot = null

export const useStoreNotes= defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()

      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()
    },
    getNotes() {
      this.notesLoaded = false
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach( doc => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true
      }, error => {
        console.log('Error: ',error.message)
      })
    },
    clearNotes() {
      this.notes = []
      if(getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener
    },
    async addNote(newNoteConent) {
      const currentDate = new Date().getTime()
      const date = currentDate.toString()

      await addDoc(notesCollectionRef, {
        content: newNoteConent,
        date
      })
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content
      })
    }
  },
  getters: {
    getNoteContent: state => id => state.notes.filter(note => note.id === id)[0].content,
    getNotesLength: state => state.notes.length,
    getNotesCharacters: state => {
      let count = 0
      state.notes.forEach(note => count += note.content.length)
      return count
    }
  }
})