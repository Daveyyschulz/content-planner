<script setup lang="ts">
import {
  ref,
} from 'vue'

const {
  status,
} = useAuth()
const showLogin = ref(true)

function toggleForm() {
  showLogin.value = !showLogin.value
}
</script>

<template>
  <div>
    <div v-if="status === 'unauthenticated'">
      <h1>{{ showLogin ? 'Login' : 'Register' }}</h1>
      <LoginForm v-if="showLogin" />
      <RegisterForm v-else />
      <button @click="toggleForm">
        {{ showLogin ? 'Need an account? Register' : 'Already have an account? Login' }}
      </button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
