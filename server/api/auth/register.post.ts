import {
  hash,
} from 'bcrypt'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const {
    email,
    password,
  } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    })
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return {
    user: {
      id: user.id,
      email: user.email,
    },
  }
})
