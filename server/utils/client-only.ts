import {
  ref,
} from 'vue'

export function useClientOnly<T>(initialValue: T) {
  const value = ref<T>(initialValue)

  if (process.client) {
    return value
  }
  else {
    return ref<T>(initialValue) as typeof value
  }
}
