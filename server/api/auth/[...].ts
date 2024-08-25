import CredentialsProvider from 'next-auth/providers/credentials'
import {
  compare,
} from 'bcrypt'
import type {
  AuthOptions,
  DefaultSession,
} from 'next-auth'
import {
  NuxtAuthHandler,
} from '#auth'
import prisma from '~/lib/prisma'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const authOptions: AuthOptions = {
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error('User cannot be found')
        }

        const isValidPassword = await compare(credentials.password, user.password)

        if (!isValidPassword) {
          throw new Error('Password is incorrect')
        }

        return {
          id: user.id,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

export default NuxtAuthHandler(authOptions)
