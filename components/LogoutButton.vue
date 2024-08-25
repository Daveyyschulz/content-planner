<script setup lang="ts">
const {
  signOut,
} = useAuth()

async function handleLogout() {
  try {
    await signOut({
      callbackUrl: '/',
    })
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <button @click="handleLogout">
    Logout
  </button>
</template>
