<script setup lang="ts">
import {
  ref,
} from 'vue'
import {
  useAuth,
} from '~/composables/useAuth'

const {
  login,
  errorMessage,
  isLoading,
} = useAuth()

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await login(email.value, password.value)
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" required>
      </div>
      <button type="submit" :disabled="isLoading">
        Login
      </button>
    </form>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
