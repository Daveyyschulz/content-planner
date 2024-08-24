import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from './prisma'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export function generateToken(userId: string): string {
  return jwt.sign({
    userId,
  }, JWT_SECRET, {
    expiresIn: '1d',
  })
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password)
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}
