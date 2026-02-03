import { Router } from 'express'
import {
  register,
  verifyEmail,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  me,
  googleLogin,
} from '@/controllers/auth.controller'
import { requireAuth } from '@/middlewares/auth'
import { validate } from '@/middlewares/validate'
import {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '@/validators/auth.schemas'
import { googleLoginSchema } from '@/validators/google.schemas'
import { authLimiter, loginLimiter, forgotLimiter } from '@/middlewares/rateLimiters'

const router = Router()

router.post('/register', authLimiter, validate(registerSchema), register)
router.post('/verify-email', authLimiter, validate(verifyEmailSchema), verifyEmail)
router.post('/login', loginLimiter, validate(loginSchema), login)
router.post('/google', authLimiter, validate(googleLoginSchema), googleLogin)
router.post('/refresh', authLimiter, validate(refreshSchema), refresh)
router.post('/logout', authLimiter, validate(logoutSchema), logout)
router.post('/forgot-password', forgotLimiter, validate(forgotPasswordSchema), forgotPassword)
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword)
router.post('/change-password', authLimiter, validate(changePasswordSchema), requireAuth, changePassword)
router.get('/me', requireAuth, me)

export default router
