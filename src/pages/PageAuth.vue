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