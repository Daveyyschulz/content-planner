import {
  findUserByEmail,
  generateToken,
} from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const {
    email,
    password,
  } = await readBody(event)

  if (!email || !password) {
    throw createError({
      status: 400,
      statusMessage: 'Email and password are required',
    })
  }

  const user = await findUserByEmail(email)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  const token = generateToken(user.id)
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  }
})
