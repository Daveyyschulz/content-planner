<script setup lang="ts">
import {
  ref,
} from 'vue'
import {
  useRouter,
} from 'vue-router'
import {
  useAuth,
} from '~/composables/useAuth'

const {
  signup,
  errorMessage,
  isLoading,
} = useAuth()

const router = useRouter()
const email = ref('')
const password = ref('')

async function handleRegister() {
  try {
    await signup(email.value, password.value)
    router.push('/about')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" required>
      </div>
      <button type="submit" :disabled="isLoading">
        Register
      </button>
    </form>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
