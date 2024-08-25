import type {
  DefaultSession,
} from 'next-auth'
import NextAuth from 'next-auth'
import {
  JWT,
} from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      isVerified: boolean
    } & DefaultSession['user']
  }

  interface User {
    isVerified: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isVerified: boolean
  }
}
