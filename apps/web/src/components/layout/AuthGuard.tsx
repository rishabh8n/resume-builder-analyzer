import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

export function AuthGuard() {
  const status = useAuthStore((s) => s.status)

  if (status === 'loading' || status === 'idle') return null
  if (status === 'unauthenticated') return <Navigate to="/login" replace />

  return <Outlet />
}
