import jwt from 'jsonwebtoken'
import prisma from '~/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET as string

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
      },
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found',
      })
    }

    return {
      user,
    }
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    })
  }
})
