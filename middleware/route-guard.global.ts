export default defineNuxtRouteMiddleware(async (to) => {
  const {
    status,
    signOut,
  } = useAuth()

  await useAuth().getSession()

  if (status.value === 'authenticated' && to.path === '/') {
    return navigateTo('/dashboard')
  }

  if (status.value === 'unauthenticated' && to.path !== '/') {
    await signOut({
      redirect: false,
    })
    return navigateTo('/')
  }
})
