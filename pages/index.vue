<script setup lang="ts">
import {
  useAuth,
} from '~/composables/useAuth'

const {
  isAuthenticated,
  checkAuth,
} = useAuth()

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div>
    <h1>Homepage</h1>
    {{ isAuthenticated }}
    <RegisterView v-if="isAuthenticated" />
    <LoginView v-else />
  </div>
</template>
