import { z } from 'zod'

const email = z.string().email('Invalid email')
const password = z.string().min(8, 'Password must be at least 8 characters')

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email,
    password,
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})

export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string().min(10, 'Token is required'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})

export const resendVerificationSchema = z.object({
  body: z.object({
    email,
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})

export const loginSchema = z.object({
  body: z.object({
    email,
    password,
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})

export const logoutSchema = z.object({
  body: z.object({
    refreshToken: z.string().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})

export const forgotPasswordSchema = z.object({
  body: z.object({
    email,
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(10, 'Token is required'),
    newPassword: password,
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(8),
    newPassword: password,
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})
