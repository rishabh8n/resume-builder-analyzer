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
} from '@/controllers/auth.controller'
import { requireAuth } from '@/middlewares/auth'

const router = Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/change-password', requireAuth, changePassword)
router.get('/me', requireAuth, me)

export default router
