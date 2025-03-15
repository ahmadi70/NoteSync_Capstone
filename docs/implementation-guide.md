# NoteSync Implementation Guide

## 1. Setup Project

```sh
pnpm create vite NoteSync_Capstone --template vue
pnpm install
pnpm dev
```

## 2. Install Auto-Import Plugins

### Install `unplugin-auto-import` and `unplugin-vue-components` to improt components and vue properties automatically

```sh
pnpm install unplugin-auto-import unplugin-vue-components -D
```

### Update `vite.config.js` to use `unplugin-auto-import`, `unplugin-vue-components`, and `@` as alias

```sh
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    Components({
      dirs: ['./src/components']
    }),
    AutoImport({
      imports: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### Update `index.html` 

```sh
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NoteSync</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```


## 3. Setup Vue Router
```sh
pnpm install vue-router@latest
```

### Do the following steps to use `vue-router`:

#1 step - create `pages` folder in the `src` and create the following pages:

`ViewNotes.vue`
```sh
<script setup></script>

<template>
  <div>
    <h1>Notes</h1>
  </div>
</template>

<style scoped></style>
```


`ViewOverview.vue`
```sh
<script setup></script>

<template>
  <div>
    <h1>Overview</h1>
  </div>
</template>

<style scoped></style>
```

#2 step - create `router` folder in the `src` and create `index.js` to use `vue-router` and define all the routes:

```sh
import { createRouter, createWebHashHistory } from 'vue-router'
import PageNotes from '@/pages/PageNotes.vue'
import PageOverview from '@/pages/PageOverview.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: PageNotes
  },
  {
    path: '/overview',
    name: 'overview',
    component: PageOverview
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```


#3 step - Update the `main.js` to use `index.js` router

```sh
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'

createApp(App)
  .use(router)
  .mount('#app')
```

#4 - Now, update the root file `app.vue`

```sh
<script setup></script>

<template>
  <RouterLink to="/">Note</RouterLink> | 
  <RouterLink to="/overview">Overview</RouterLink>

  <RouterView />
</template>
```

#5 - Now, you see the following view on browswer

<image src="./images/router-result.png" width='40%'>

## 4. Install Pinia (State Management)
```sh
pnpm install tailwindcss @tailwindcss/vite -D
```

### Update `vite.config.js` to use tailwind css
```sh
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### Add `tailwind.config.js` in the root directory, to list tailwind classes during implementation and improve the process.

```sh
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Install `material-icons` plugin, import and use it
```sh
pnpm install material-icons
```

### Update `style.css` to import `material-icons`, `tailwind` and define cutome classes

```sh
@import "material-icons/iconfont/material-icons.css";
@import "tailwindcss";

body {@apply bg-sky-100 }

@layer components {
  .btn {
    @apply bg-[#0085d1] text-white px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-[#1ea7f9];
  }
  .tab {
    @apply inline-block cursor-pointer p-2 border-b-2 border-transparent hover:text-gray-600 hover:border-b-gray-300;
  }
  .active-tab {
    @apply text-sky-500 border-b-2 border-b-sky-500;
  }
}
```


### Create the following components

`src/components/Layout/Navbar.vue`
```sh
<script setup>
import { useOnClickOutside } from '@/use/useOnClickOutside'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

useOnClickOutside(() => {
  if (isOpen.value) {
    toggleMenu()
  }
})
</script>

<template>
  <nav class="bg-sky-600 text-2xl text-white mb-8 shadow-sm">
    <div class="relative flex justify-between items-center container mx-auto">
      <h1>
        <RouterLink class="block p-4" to="/">NoteSync</RouterLink>
      </h1>

      <button
        @click.stop="toggleMenu"
        class="block md:hidden pr-3 cursor-pointer"
      >
        <i v-if="isOpen" class="material-icons mr-2">close</i>
        <i v-else class="material-icons mr-2">menu</i>
      </button>

      <ul
        class="bg-sky-600 md:flex md:justify-end items-center md:top-0 md:border-none md:static absolute w-full top-16 left-0 shadow-md border border-white"
        :class="isOpen ? 'block' : 'hidden md:flex'"
      >
        <li>
          <RouterLink class="block p-4" to="/">Notes</RouterLink>
        </li>
        <li>
          <RouterLink class="block p-4" to="/overview">Overview</RouterLink>
        </li>
        <li>
          <button
            class="btn bg-red-700 hover:bg-red-600 m-1"
          >Logout</button>
        </li>
      </ul>
    </div>
  </nav>
    
</template>

<style scoped>
.router-link-exact-active {
  background: #1ea7f9;
}
</style>
```


`src/components/Layout/MainSection.vue`
```sh
<template>
  <div class="container mx-auto p-4">
    <slot />
  </div>
</template>
```


`src/components/Note/Note.vue`
```sh
<script setup></script>

<template>
  <div class="bg-white shadow-sm">
    <div class="p-4">
      <p>note content</p>
      <div class="text-sm text-gray-500 flex justify-between mt-4 items-center">
        <span>10-03-2025 @ 21:46</span>
        <span>7 characters</span>
      </div>
    </div>
    
    <div class="border-t border-gray-300 flex justify-center divide-x divide-gray-300">
      <RouterLink
        to=""
        class="w-full py-2 cursor-pointer hover:bg-[#1ea7f9] hover:text-white text-center"
      >Edit</RouterLink>
      <button class="w-full py-2 cursor-pointer hover:bg-red-600 hover:text-white">Delete</button>
    </div>
  </div>
</template>
```

`src/components/Note/NoteBox.vue`
```sh
<script setup></script>

<template>
  <div class="bg-sky-700 p-3">
    <textarea
      class="bg-white w-full block p-2 text-gray-700 mb-4"
      placeholder="Add New Note"
      rows="4"
      maxlength="100"
    ></textarea>
    <div class="flex">
      <button class="btn">Add New Note</button>
    </div>
  </div>
</template>
```

### Create `useOnClickOutside.js` composable which is necessary for the `Navbar` component

`src/use/useOnClickOutside.js`
```sh
export function useOnClickOutside(callback) {
  const onClickOutside = event => {
    callback(event)
  };
  
  onMounted(() => {
    document.addEventListener('click', onClickOutside) // Listen to clicks anywhere
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside) // Clean up listener
  })
}
```

### Update pages to use the components

`src/pages/PageNotes.vue`
```sh
<script setup></script>

<template>
  <MainSection class="space-y-4">
    <NoteBox />
    <Note
      v-for="note in 2"
    />
  </MainSection>
</template>
```

`src/pages/PageOverview.vue`
```sh
<script setup></script>

<template> 
  <MainSection>
    <div class="bg-white w-full flex flex-col gap-3 p-3">
      <div class="flex justify-between">
        <div>Notes</div>
        <div>Characters</div>
      </div>
      <div class="flex justify-between">
        <div>2</div>
        <div>14</div>
      </div>
    </div>
  </MainSection>
</template>
```

### Update `app.vue` to use `Navbar` component

```sh
<script setup></script>

<template>
  <div>
    <Navbar />
    <RouterView />
  </div>
  
</template>
```

### Now, you see the following view on browswer

<image src="./images/notes-design.png" width='40%' />

<image src="./images/overview-design.png" width='40%' />

## 5. Improvement
Use `ref`, `emit`, `props`, `directives`, `computed`, `@vueuse/core`

### Install `@vueuse/core` for formating Date

```sh
pnpm install @vueuse/core
```

### Update `PageNotes.vue` to use `props`, `emit`, `ref` to define `notes[]`, add & delete notes

```sh
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
```

### Create custom auto-focus `directive` for note box 

```sh
export const vAutofocus = {
  mounted: (el) => {
    el.focus()
  }
}
```

### Update `Note.vue` & `NoteBox.vue` to define `emit`, `props`, `computed`, `vAutofocus directive` & `useDateFormat`

`NoteBox.vue`
```sh
<script setup>
import { vAutofocus } from '@/directives/vAutofocus'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  actionBtnLabel: {
    type: String
  },
  cancelBtnLabel: {
    type: String
  },
  boxLabel: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue', 'handleAction'])

const textareRef = ref(null)
const focusTextArea = () =>  {
  textareRef.value.focus()
}
defineExpose({focusTextArea})

const isDisabled = computed(() => !props.modelValue?.trim())
</script>

<template>
  <div class="bg-sky-700 p-3">
    <label v-if="boxLabel" class="text-white text-sm">{{ boxLabel }}</label>
    <textarea
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-autofocus
      ref="textareRef"
      class="bg-white w-full block p-2 text-gray-700 mb-4"
      :placeholder="placeholder"
      rows="4"
      maxlength="100"
    ></textarea>
    <div class="flex justify-between">
      <RouterLink v-if="cancelBtnLabel" class="btn" to="/">{{ cancelBtnLabel }}</RouterLink>
      <button
        v-if="actionBtnLabel"
        @click="$emit('handleAction')"
        :disabled="isDisabled"
        :class="['btn', { 'btn-disabled': isDisabled }]"
      >{{ actionBtnLabel }}</button>
    </div>
  </div>
</template>
```

`Note.vue`
```sh
<script setup>
import { useDateFormat } from '@vueuse/core'

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

const emit = defineEmits(['deleteClicked'])
const handleDeleteClicked = () => {
  emit('deleteClicked', props.note.id)
}
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
        to=""
        class="w-full py-2 cursor-pointer hover:bg-[#1ea7f9] hover:text-white text-center"
      >Edit</RouterLink>
      <button
        @click="handleDeleteClicked"
        class="w-full py-2 cursor-pointer hover:bg-red-600 hover:text-white"
      >Delete</button>
    </div>
  </div>
</template>
```

### Add cutom class in `style.css`

```sh
.btn-disabled {
  @apply bg-[#94a3b8] cursor-not-allowed opacity-40;
}
```

### Now, you see the following view on browswer

<image src="./images/improve-notes-page.png" width='40%' />


## 6. Install Pinia (State Management)

```sh
pnpm install pinia
```

Now to use it, update the `main.js`

```sh
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '@/router'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
```

### Create `storeNotes.js` in the `src/stores` folder and define `state`, `actions` & `getters`

```sh
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
    getNotesLength: state => state.notes.length,
    getNotesCharacters: state => {
      let count = 0
      state.notes.forEach(note => count += note.content.length)
      return count
    }
  }
})
```

### Now - update all the components and pages to use data from store

`PageNotes.vue`
```sh
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
```

`PageOverview.vue`
```sh
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
        <div>{{ storeNotes.getNotesLength }}</div>
      </div>
      <div class="flex justify-between">
        <div>Number of Character (all notes)</div>
        <div>{{ storeNotes.getNotesCharacters }}</div>
      </div>
    </div>
  </MainSection>
</template>
```

`Note.vue`
```sh
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

```

Create a new component to delete Note

`ModalDeleteNote.vue`
```sh
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
```

Create a new page for the editing note

`PageEditNote.vue`
```sh
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
```

update `router/index.js` to define route for `PageEditNote.vue` 

```sh
import { createRouter, createWebHashHistory } from 'vue-router'
import PageNotes from '@/pages/PageNotes.vue'
import PageOverview from '@/pages/PageOverview.vue'
import PageEditNote from '@/pages/PageEditNote.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: PageNotes
  },
  {
    path: '/overview',
    name: 'overview',
    component: PageOverview
  },
  {
    path: '/edit-note/:id',
    name: 'edit-note',
    component: PageEditNote
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

## 7. Firebase Setup
Firebase is a backend solution from Google, it makes easy to add backend into our app without any complicated setup and worry about scalability.

### To Setup & Configure Firebase do the following steps

- Login to Firebase account
- Create a project
- Create a Firebase Web app & coppy the `js` code
- Install Firebase using the below command:

  ```sh
  pnpm install firebase
  ```

- In your app, create a new folder called `js` in the `src` folder, then create `firebase.js` and paste the `js` code
  
  ```sh
  import { initializeApp } from "firebase/app"

  const firebaseConfig = {
    apiKey: "AIzaSyCzoeAQ5mgq4HLhMbrFOH00fhKi-E0d3Vc",
    authDomain: "notesync-a8772.firebaseapp.com",
    projectId: "notesync-a8772",
    storageBucket: "notesync-a8772.firebasestorage.app",
    messagingSenderId: "253523329549",
    appId: "1:253523329549:web:2be976ba1d157d3a2f0b44"
  }

  const app = initializeApp(firebaseConfig)
  ```

- Now, in your Firebase account continue to `console`, then click on `Firestore Database`, then `Create database`, and then select `Start in test mode` (however this mode is not secure, but I will add some secure rules later on, that only authenticated user can access to the database and able to edit thier notes)

- Firebase organized in `collection` and `documents`, so start a collection called `notes` - then add some documents with giving an `id` and adding `content` field

- Update the `firbase.js` to import `getFirestore` & export the `db` - you can check this [link](https://firebase.google.com/docs/firestore/quickstart) to learn more.

  `firebase.js`
  ```sh
  import { initializeApp } from "firebase/app"
  import { getFirestore } from "firebase/firestore"

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

  export {
    db
  }
  ```

### Firebase - Read, Add, Delete & Update notes

Update `storeNotes.js` to use the firebase db

```sh
import { defineStore } from 'pinia'
import { 
  collection, onSnapshot, 
  doc, deleteDoc, updateDoc, addDoc,
  query, orderBy 
} from 'firebase/firestore'
import { db } from '@/js/firebase'

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

export const useStoreNotes= defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    getNotes() {
      this.notesLoaded = false
      onSnapshot(notesCollectionQuery, (querySnapshot) => {
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
      })
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
```

Call `getNotes()` in the `App.vue` when the app is mounted

```sh
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()
onMounted(() => {
  storeNotes.getNotes()
})
``` 

Update `dateFormated` in the `Note.vue` to get the correct date of the note from the `date` field of database

```sh
const dateFormated = computed(() => {
  const date = new Date(parseInt(props.note.date))
  const formatDate = useDateFormat(date, 'DD-MM-YYYY @ HH:mm')

  return formatDate
})
```

Create `ProgressBar.vue` component

```sh
<template>
  <div class='w-full'>
    <div class='h-1.5 w-full bg-pink-100 overflow-hidden'>
      <div class='progress w-full h-full bg-[#1ea7f9] left-right'></div>
    </div>
  </div>
</template>

<style scoped>
.progress {
  animation: progress 1s infinite linear;
}

.left-right {
    transform-origin: 0% 50%;
}
    @keyframes progress {
    0% {
        transform:  translateX(0) scaleX(0);
    }
    40% {
        transform:  translateX(0) scaleX(0.4);
    }
    100% {
        transform:  translateX(100%) scaleX(0.5);
    }
}
</style>
```

Improve `PageNotes.vue` to show progress-bar during the process of loading data and display the default text when there is no data

```sh
<template>
  <MainSection class="space-y-4">
    <NoteBox
      v-model="newNote"
      @handleAction="addNote"
      ref="newNoteRef"
      actionBtnLabel="Add New Note"
      placeholder="Add New Note"
    />
    <ProgressBar v-if="!storeNotes.notesLoaded"/>
    <template v-else>
      <Note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />
    </template>
    
    <p
      v-if="!storeNotes.notes.length"
      class="text-center text-gray-400 text-2xl pt-4"
    >No notes here yet...</p>
  </MainSection>
</template>
```

## 8. Firebase Authentication

### Enable Firebase Authentication
- Go to your Firebase console. 
- Select the Authentication & get started. 
- Click on Email/Password & makes it Enable & save it.
- Then, navigate to users tab to see the users.

### Update the `firebase.js` to use firebase auth

```sh
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
```

### Create the `storeAuth.js`

```sh
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/js/firebase'
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => { 
    return {
      user: {}
    }
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email 
          storeNotes.init()
        } else {
          this.user = {}
          storeNotes.clearNotes()
        }
      })
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then(userCredential => {
          const user = userCredential.user
        }).catch(error => {
          console.log('error.message', error.message)
        })
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        console.log(error.message)
      })
    },
    logoutUser() {
      signOut(auth).then(() => {
        console.log('user sing out.')
      }).catch(error => {
        console.log(error.message)
      })
    }
  }
})
```

### Create `PageAuth.vue` and use the `storeAuth.js`

```sh
<script setup>
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()

const register = ref(false)
const authActionText = computed(() => register.value? 'Register' : 'Login')

const credentials = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {
  if(!credentials.email || !credentials.password) {
    console.log('please enter email/paswword')
  }
  else {
    if(register.value) {
      storeAuth.registerUser(credentials)
    }
    else {
      storeAuth.loginUser(credentials)
    }
  }
}
</script>

<template>
  <div>
    <div class="text-lg font-medium text-center text-gray-500 border-b border-gray-200">
      <ul class="flex justify-center -mb-px">
        <li class="me-2">
          <a
            class="tab"
            :class="{'active-tab' : !register}"
            @click.prevent="register = false"
          >Login</a>
        </li>
        <li class="me-2">
          <a
            class="tab"
            :class="{'active-tab' : register}"
            @click.prevent="register = true"
          >Register</a>
        </li>
      </ul>
    </div>
    <MainSection class="bg-white w-fit mt-3 space-y-4">
      <h1 class="text-lg text-center">{{ authActionText }}</h1>
      <form
        @submit.prevent="onSubmit"
        class="space-y-3 w-60"
      >
        <div class="flex flex-col text-sm">
          <label for="email">Email</label>
          <input
            v-model="credentials.email"
            id="email"
            class="border border-gray-400 p-1 text-xs outline-0"
            placeholder="Enter your email"
            type="text"
          />
        </div>
        <div class="flex flex-col text-sm">
          <label for="password">Password</label>
          <input
            v-model="credentials.password"
            id="password"
            class="border border-gray-400 p-1 text-xs outline-0"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div class="text-sm flex justify-end mt-6">
          <button class="btn">{{ authActionText }}</button>
        </div>
      </form>
    </MainSection>

  </div>
</template>
```


### Import and define route for the `PageAuth.vue`

```sh
import PageAuth from '@/pages/PageAuth.vue'

{
    path: '/auth',
    name: 'auth',
    component: PageAuth
  }
```


### Improve logout button in `Navbar.vue`

Importe and use the `storeAuth`

```sh
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()
```
 
Now, update the `ul` & `logout` button inside the template

```sh
<ul
  v-if="storeAuth.user.id"
  ...
```

```sh
<button
  @click="storeAuth.logoutUser"
  class="btn bg-red-700 hover:bg-red-600 m-1"
>Logout {{ storeAuth.user.email }}</button>
```

### Redirect User on Auth Change

To redirect the user to the Auth page when clicked logout, or redirect to the notes page when logged in, you need to access the router in the pinia store, and for this update the `main.js`

```sh
import { markRaw } from 'vue'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

- You can learn more about that [here](https://pinia.vuejs.org/core-concepts/plugins.html#Adding-new-external-properties)


Then, update `init` function of `storeAuth` to use router to redirect user to the target page

```sh
init() {
  const storeNotes = useStoreNotes()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.user.id = user.uid
      this.user.email = user.email 
      this.router.push('/')
      storeNotes.init()
    } else {
      this.user = {}
      this.router.replace('/auth')
      storeNotes.clearNotes()
    }
  })
}
```

### Use Navigation Gaurd to secure route

Navigation Guards allow us to hook into a router, and as the user tries to navigate from one rout to another rout, we can either allow them to get to the route that they're trying to get to, or we can stop them from getting to that rout and redirect them somewhere else depeding on certain criteria.

Update the `router>index.js` to use navigation guards

```sh
import { useStoreAuth } from '@/stores/storeAuth'

// navigation guards - this will triger every time when a user try to go to a new rout

router.beforeEach(async (to, from) => {
  const storeNotes = useStoreAuth()
  if(!storeNotes.user.id && to.name !== 'auth') {
    return { name: 'auth' }
  }
  if(storeNotes.user.id && to.name === 'auth') {
    return false
  }
})
```

### Now update the `storeNote.js` to use `storeAuth`, clear Notes array in State when user logged out, & Unsubscribe from the Get Notes Listener

```sh
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
```

### Firestore Security Rules

To add some security rules in your Firebase database, go to your Firebase console, click Firestore Database and select the Rules tab and update the `match` funtion

```sh
match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
    allow read, write: if request.auth.uid == userId;
  }
}
```

### Finally replace `useStoreNotes` to `useStoreAuth` in the `App.vue`

```sh
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()

onMounted(() => {
  storeAuth.init()
})
```

## 9. Deploy with Firebase Hosting
To make your app live & share it with others, do the following steps:

- ### Build App for Production
  ```sh
    pnpm run build
  ```

- ### Complete Firebase Initialization
  - Go to Firebase console 
  - Click on Hosting & copy the command run it in terminal:
    ```sh
    pnpm install -g firebase-tools
    ```

  - Click next and run the following command to login to your firebase account:
    ```sh
    firebase login
    ```
  - Then, run the following command for initialization your app on firebase:
    ```sh
    firebase init
    ```
    - Select Hosting: Configure files for Firebase Hosting and setup GitHub Action deploys.
    - Then, select your project & `dist` as your public directory.
    - Then, choose `No` for Configure as a single-page app (because your app already is a single-page app, and don't need to add/rewirte any urls by firebase).
    - Then, choose `No` for overwriting `dist/index.html` already exists. 
  - Click next and run the following command to deploy:
    ```sh
    firebase deploy
    ```
  - After finishing the deploy process, it gives you the `Hosting URL` that you can see your app live on the internet. 

## 10. App Screenshots

<img src='./images/dash-final-design.png' width='40%' />

<img src='./images/login-design-final.png' width='40%' />

<img src='./images/overview-design-final.png' width='40%' />

## References

- [Vite Documentation](https://vite.dev/)
- [Vue.js Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vue Router - Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Tailwind CSS Installation (Vite)](https://tailwindcss.com/docs/installation/using-vite)
- [Material Icons Documentation](https://developers.google.com/fonts/docs/material_icons)
- [Pinia Store Documentation](https://pinia.vuejs.org/)
- [Firebase Documentation](https://firebase.google.com/)
- [Cloud Firestore Documentation](https://firebase.google.com/docs/firestore)
