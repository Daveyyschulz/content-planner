import {
  createUser,
  findUserByEmail,
} from '~/server/utils/auth'

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

  const existingUser = await findUserByEmail(email)
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    })
  }

  const user = await createUser(email, password)
  return {
    user: {
      id: user.id,
      email: user.email,
    },
  }
})
