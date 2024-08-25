import CredentialsProvider from 'next-auth/providers/credentials'
import {
  compare,
} from 'bcrypt'
import {
  NuxtAuthHandler,
} from '#auth'
import prisma from '~/lib/prisma'

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
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
      async authorize(credentials: Record<'email' | 'password', string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error('No user found')
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          email: user.email,
          isVerified: user.isVerified,
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
        token.isVerified = user.isVerified
      }
      return token
    },
    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.isVerified = token.isVerified as boolean
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
})
