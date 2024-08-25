<script setup lang="ts">
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()
const {
  signIn,
} = useAuth()

async function handleRegister() {
  try {
    errorMessage.value = ''
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    const response = await signIn('credentials', {
      email: email.value,
      password: password.value,
      redirect: false,
    })

    if (response?.error) {
      errorMessage.value = response.error
    }
    else {
      router.push('/dashboard')
    }
  }
  catch (error: any) {
    errorMessage.value = error.data?.statusMessage || 'An error occurred during registration'
    console.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="handleRegister">
    <div>
      <label for="email">Email:</label>
      <input v-model="email" type="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input v-model="password" type="password" required>
    </div>
    <button type="submit">
      Register
    </button>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </form>
</template>
