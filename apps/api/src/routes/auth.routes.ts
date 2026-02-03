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

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/verify-email', validate(verifyEmailSchema), verifyEmail)
router.post('/login', validate(loginSchema), login)
router.post('/google', validate(googleLoginSchema), googleLogin)
router.post('/refresh', validate(refreshSchema), refresh)
router.post('/logout', validate(logoutSchema), logout)
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword)
router.post('/reset-password', validate(resetPasswordSchema), resetPassword)
router.post('/change-password', validate(changePasswordSchema), requireAuth, changePassword)
router.get('/me', requireAuth, me)

export default router
