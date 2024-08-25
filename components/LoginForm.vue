<script setup lang="ts">
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()
const {
  signIn,
} = useAuth()

async function handleLogin() {
  try {
    errorMessage.value = ''
    const response = await signIn('credentials', {
      email: email.value,
      password: password.value,
      redirect: false,
    })

    if (response?.error) {
      errorMessage.value = response.error
    }
    else if (response?.url) {
      router.push('/dashboard')
    }
  }
  catch (error) {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
    console.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">Email:</label>
      <input v-model="email" type="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input v-model="password" type="password" required>
    </div>
    <button type="submit">
      Login
    </button>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </form>
</template>
