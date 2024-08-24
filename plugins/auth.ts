export default defineNuxtPlugin(async () => {
  if (process.client) {
    const {
      checkAuth,
    } = useAuth()
    await checkAuth()
  }
})
