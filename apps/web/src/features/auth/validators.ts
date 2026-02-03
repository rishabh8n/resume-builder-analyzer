import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const forgotSchema = z.object({
  email: z.string().email('Invalid email'),
})

export const resetSchema = z.object({
  token: z.string().min(10),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
})

export const changeSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
})

export const resendSchema = z.object({
  email: z.string().email('Invalid email'),
})
