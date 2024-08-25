<script setup lang="ts">
const {
  data,
} = useAuth()
</script>

<template>
  <h1>Hello {{ data?.user.email }}</h1>
  <LogoutButton />
</template>
