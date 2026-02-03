import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

export function RedirectIfAuth() {
  const status = useAuthStore((s) => s.status)

  if (status === 'loading' || status === 'idle') return null
  if (status === 'authenticated') return <Navigate to="/" replace />

  return <Outlet />
}
