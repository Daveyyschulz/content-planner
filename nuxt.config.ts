// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxtjs/supabase',
    '@sidebase/nuxt-auth',
  ],
  auth: {
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'credentials',
      addDefaultCallbackUrl: true,
    },
  },
  supabase: {
    redirect: false,
  },
})
