import type { Request, Response } from 'express'
import { ApiError } from '@/utils/ApiError'
import { ApiResponse } from '@/utils/ApiResponse'
import { asyncHandler } from '@/utils/asyncHandler'
import { User } from '@/models/User'
import { hashPassword, comparePassword } from '@/utils/password'
import { generateTokenString, hashToken } from '@/utils/crypto'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/utils/tokens'
import { env } from '@/config/env'
import { sendPasswordResetEmail, sendVerificationEmail } from '@/utils/emails'
import { verifyGoogleIdToken } from '@/utils/google'

function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  const isProd = env.NODE_ENV === 'production'
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 15,
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) throw new ApiError(400, 'Missing fields')

  const existing = await User.findOne({ email })
  if (existing) throw new ApiError(409, 'Email already in use')

  const passwordHash = await hashPassword(password)
  const emailToken = generateTokenString(24)
  const emailTokenHash = hashToken(emailToken)

  const user = await User.create({
    name,
    email,
    passwordHash,
    isEmailVerified: false,
    emailVerificationToken: emailTokenHash,
    emailVerificationExpires: new Date(Date.now() + env.EMAIL_TOKEN_EXPIRES_MS),
  })

  const verifyUrl = `${env.APP_URL}/verify-email?token=${emailToken}`
  await sendVerificationEmail(user.email, verifyUrl)

  res.status(201).json(
    ApiResponse(
      {
        user: { id: user.id, name: user.name, email: user.email },
        verifyUrl,
      },
      'Registration successful. Verify your email.'
    )
  )
})

export const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) throw new ApiError(400, 'Email required')

  const user = await User.findOne({ email })
  if (!user) throw new ApiError(200, 'If the account exists, a verification email was sent')
  if (user.isEmailVerified) throw new ApiError(400, 'Email already verified')

  const emailToken = generateTokenString(24)
  const emailTokenHash = hashToken(emailToken)
  user.emailVerificationToken = emailTokenHash
  user.emailVerificationExpires = new Date(Date.now() + env.EMAIL_TOKEN_EXPIRES_MS)
  await user.save()

  const verifyUrl = `${env.APP_URL}/verify-email?token=${emailToken}`
  await sendVerificationEmail(user.email, verifyUrl)

  res.json(ApiResponse(null, 'Verification email resent'))
})

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body
  if (!token) throw new ApiError(400, 'Token is required')

  const tokenHash = hashToken(token)
  const user = await User.findOne({
    emailVerificationToken: tokenHash,
    emailVerificationExpires: { $gt: new Date() },
  })
  if (!user) throw new ApiError(400, 'Invalid or expired token')

  user.isEmailVerified = true
  user.emailVerificationToken = undefined
  user.emailVerificationExpires = undefined
  await user.save()

  res.json(ApiResponse(null, 'Email verified'))
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) throw new ApiError(400, 'Missing fields')

  const user = await User.findOne({ email })
  if (!user || !user.passwordHash) throw new ApiError(401, 'Invalid credentials')

  const ok = await comparePassword(password, user.passwordHash)
  if (!ok) throw new ApiError(401, 'Invalid credentials')

  const refreshTokenId = generateTokenString(16)
  const refreshToken = signRefreshToken(user.id, refreshTokenId)
  const refreshTokenHash = hashToken(refreshToken)
  user.refreshTokens.push(refreshTokenHash)
  if (user.refreshTokens.length > env.MAX_REFRESH_TOKENS) {
    user.refreshTokens = user.refreshTokens.slice(-env.MAX_REFRESH_TOKENS)
  }
  await user.save()

  const accessToken = signAccessToken(user.id)
  setAuthCookies(res, accessToken, refreshToken)

  res.json(ApiResponse({ user: { id: user.id, name: user.name, email: user.email } }))
})

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken
  if (!token) throw new ApiError(401, 'Missing refresh token')

  const payload = verifyRefreshToken(token)
  const user = await User.findById(payload.sub)
  if (!user) throw new ApiError(401, 'Invalid refresh token')

  const tokenHash = hashToken(token)
  if (!user.refreshTokens.includes(tokenHash)) {
    user.refreshTokens = []
    await user.save()
    throw new ApiError(401, 'Invalid refresh token')
  }

  // rotate refresh token
  user.refreshTokens = user.refreshTokens.filter((t) => t !== tokenHash)
  const newTokenId = generateTokenString(16)
  const newRefreshToken = signRefreshToken(user.id, newTokenId)
  const newRefreshHash = hashToken(newRefreshToken)
  user.refreshTokens.push(newRefreshHash)
  if (user.refreshTokens.length > env.MAX_REFRESH_TOKENS) {
    user.refreshTokens = user.refreshTokens.slice(-env.MAX_REFRESH_TOKENS)
  }
  await user.save()

  const accessToken = signAccessToken(user.id)
  setAuthCookies(res, accessToken, newRefreshToken)

  res.json(ApiResponse(null, 'Token refreshed'))
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken
  if (token) {
    try {
      const payload = verifyRefreshToken(token)
      const user = await User.findById(payload.sub)
      if (user) {
        const tokenHash = hashToken(token)
        user.refreshTokens = user.refreshTokens.filter((t) => t !== tokenHash)
        await user.save()
      }
    } catch (_) {
      // ignore
    }
  }

  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.json(ApiResponse(null, 'Logged out'))
})

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) throw new ApiError(400, 'Email required')

  const user = await User.findOne({ email })
  if (!user) throw new ApiError(200, 'If the account exists, a reset email was sent')

  const resetToken = generateTokenString(24)
  const resetHash = hashToken(resetToken)
  user.resetPasswordToken = resetHash
  user.resetPasswordExpires = new Date(Date.now() + env.RESET_TOKEN_EXPIRES_MS)
  await user.save()

  const resetUrl = `${env.APP_URL}/reset-password?token=${resetToken}`
  await sendPasswordResetEmail(user.email, resetUrl)

  res.json(ApiResponse({ resetUrl }, 'Password reset link sent'))
})

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body
  if (!token || !newPassword) throw new ApiError(400, 'Missing fields')

  const tokenHash = hashToken(token)
  const user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpires: { $gt: new Date() },
  })
  if (!user) throw new ApiError(400, 'Invalid or expired token')

  user.passwordHash = await hashPassword(newPassword)
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  user.refreshTokens = []
  await user.save()

  res.json(ApiResponse(null, 'Password reset successful'))
})

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body
  const userId = req.user?.id
  if (!userId || !currentPassword || !newPassword) throw new ApiError(400, 'Missing fields')

  const user = await User.findById(userId)
  if (!user || !user.passwordHash) throw new ApiError(404, 'User not found')

  const ok = await comparePassword(currentPassword, user.passwordHash)
  if (!ok) throw new ApiError(401, 'Invalid credentials')

  user.passwordHash = await hashPassword(newPassword)
  user.refreshTokens = []
  await user.save()

  res.json(ApiResponse(null, 'Password changed'))
})

export const me = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id
  if (!userId) throw new ApiError(401, 'Unauthorized')

  const user = await User.findById(userId).select('-passwordHash -refreshTokens')
  if (!user) throw new ApiError(404, 'User not found')

  res.json(ApiResponse({ user }))
})

export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { idToken } = req.body
  if (!idToken) throw new ApiError(400, 'idToken is required')

  const { googleId, email, name } = await verifyGoogleIdToken(idToken)

  let user = await User.findOne({ email })
  if (!user) {
    user = await User.create({
      name,
      email,
      googleId,
      isEmailVerified: true,
    })
  } else if (!user.googleId) {
    user.googleId = googleId
    user.isEmailVerified = true
    await user.save()
  }

  const refreshTokenId = generateTokenString(16)
  const refreshToken = signRefreshToken(user.id, refreshTokenId)
  const refreshTokenHash = hashToken(refreshToken)
  user.refreshTokens.push(refreshTokenHash)
  if (user.refreshTokens.length > env.MAX_REFRESH_TOKENS) {
    user.refreshTokens = user.refreshTokens.slice(-env.MAX_REFRESH_TOKENS)
  }
  await user.save()

  const accessToken = signAccessToken(user.id)
  setAuthCookies(res, accessToken, refreshToken)

  res.json(ApiResponse({ user: { id: user.id, name: user.name, email: user.email } }))
})
