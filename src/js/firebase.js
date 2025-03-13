import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCzoeAQ5mgq4HLhMbrFOH00fhKi-E0d3Vc",
  authDomain: "notesync-a8772.firebaseapp.com",
  projectId: "notesync-a8772",
  storageBucket: "notesync-a8772.firebasestorage.app",
  messagingSenderId: "253523329549",
  appId: "1:253523329549:web:2be976ba1d157d3a2f0b44"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
  db,
  auth
}