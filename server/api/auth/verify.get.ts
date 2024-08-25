import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const token = query.token as string

    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Verification token is required',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        verificationToken: token,
      },
    })

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid verification token',
      })
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email verified successfully',
        isVerified: true,
      }),
    }
  }
  catch (error: any) {
    console.error('Verification error:', error)

    if (error.statusCode) {
      throw error
    }
    else {
      throw createError({
        statusCode: 500,
        statusMessage: 'An unexpected error occurred during verification',
      })
    }
  }
})
