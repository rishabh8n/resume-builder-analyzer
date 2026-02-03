import { resend } from '@/utils/resend'
import { env } from '@/config/env'

export async function sendVerificationEmail(email: string, verifyUrl: string) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) return

  await resend.emails.send({
    from: env.RESEND_FROM,
    to: email,
    subject: 'Verify your email',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Verify your email</h2>
        <p>Click the button below to verify your email address.</p>
        <p><a href="${verifyUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#fff;border-radius:6px;text-decoration:none">Verify Email</a></p>
        <p>If you did not create an account, you can ignore this email.</p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) return

  await resend.emails.send({
    from: env.RESEND_FROM,
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Reset your password</h2>
        <p>Click the button below to reset your password.</p>
        <p><a href="${resetUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#fff;border-radius:6px;text-decoration:none">Reset Password</a></p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  })
}
