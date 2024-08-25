<script setup lang="ts">
const route = useRoute()
const token = route.query.token
const message = ref('')
const loading = ref(true)

interface VerificationResponse {
  message: string
}

onMounted(async () => {
  try {
    const response = await $fetch<VerificationResponse>(`/api/auth/verify?token=${token}`)
    message.value = response.message
  }
  catch (error: any) {
    message.value = error.data?.statusMessage || 'Verification failed'
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Account verification</h1>
    <p v-if="loading">
      Verifying your account...
    </p>
    <p v-else>
      {{ message }}
    </p>
  </div>
</template>
