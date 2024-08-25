import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_POST
  || '587',
  ),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.APP_URL}/verify?token=${token}`

  await transporter.sendMail({
    from: '"Content Planner" <noreply@contentplanner.com>',
    to: email,
    subject: 'Verify your email',
    html: `
        <h1>Email verification</h1>
        <p>Please click this link to verify your email:
            <a href="${verificationLink}">${verificationLink}</a>
        </p>
        <p>This link will expire in 24 hours</p>
    `,
  })
}
