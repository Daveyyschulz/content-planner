import {
  computed,
  ref,
} from 'vue'
import {
  useClientOnly,
} from '~/server/utils/client-only'

interface User {
  id: string
  email: string
}

interface VerifyResponse {
  user: User
}

export function useAuth() {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const errorMessage = ref<string | null>(null)
  const isLoading = ref(false)

  const token = useClientOnly<string | null>(null)

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (!import.meta.env.SSR) {
      if (newToken) {
        localStorage.setItem('token', newToken)
      }
      else {
        localStorage.removeItem('token')
      }
    }
  }

  const getToken = (): string | null => {
    if (!import.meta.env.SSR) {
      return localStorage.getItem('token')
    }
    return null
  }

  const login = async (email: string, password: string) => {
    isLoading.value = true
    errorMessage.value = null
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email,
          password,
        },
      })
      user.value = response.user
      setToken(response.token)
    }
    catch (error) {
      console.error('Login failed:', error)
      errorMessage.value = 'Login failed. Please check your credentials and try again.'
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  const signup = async (email: string, password: string) => {
    isLoading.value = true
    errorMessage.value = null
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          email,
          password,
        },
      })
      await login(email, password)
    }
    catch (error) {
      console.error('Signup failed:', error)
      errorMessage.value = 'Signup failed. Please try again.'
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    setToken(null)
  }

  const checkAuth = async () => {
    isLoading.value = true
    const storedToken = getToken()
    if (storedToken) {
      try {
        const response = await $fetch<VerifyResponse>('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        user.value = response.user
      }
      catch (error) {
        console.error('Token verification failed:', error)
        errorMessage.value = 'Session expired. Please log in again.'
        logout()
      }
      finally {
        isLoading.value = false
      }
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuth,
    errorMessage,
    isLoading,
  }
}
