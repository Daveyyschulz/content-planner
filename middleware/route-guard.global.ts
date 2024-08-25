export default defineNuxtRouteMiddleware(async (to) => {
  const {
    status,
  } = useAuth()

  await useAuth().getSession()

  if (status.value === 'authenticated' && to.path === '/') {
    return navigateTo('/dashboard')
  }

  if (status.value === 'unauthenticated' && to.path !== '/') {
    try {
      return navigateTo('/')
    }
    catch (error) {
      console.error('Error during sign out:', error)
    }
    return navigateTo('/')
  }
})
