import { api } from '@/lib/api'

export type AuthUser = {
  id: string
  name: string
  email: string
}

export async function login(email: string, password: string) {
  const { data } = await api.post('/api/auth/login', { email, password })
  return data
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post('/api/auth/register', { name, email, password })
  return data
}

export async function verifyEmail(token: string) {
  const { data } = await api.post('/api/auth/verify-email', { token })
  return data
}

export async function resendVerification(email: string) {
  const { data } = await api.post('/api/auth/resend-verification', { email })
  return data
}

export async function forgotPassword(email: string) {
  const { data } = await api.post('/api/auth/forgot-password', { email })
  return data
}

export async function resetPassword(token: string, newPassword: string) {
  const { data } = await api.post('/api/auth/reset-password', { token, newPassword })
  return data
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const { data } = await api.post('/api/auth/change-password', {
    currentPassword,
    newPassword,
  })
  return data
}

export async function logout() {
  const { data } = await api.post('/api/auth/logout')
  return data
}

export async function me() {
  const { data } = await api.get('/api/auth/me')
  return data
}

export async function refresh() {
  const { data } = await api.post('/api/auth/refresh')
  return data
}

export async function googleLogin(idToken: string) {
  const { data } = await api.post('/api/auth/google', { idToken })
  return data
}
