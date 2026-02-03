import { ReactNode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { useAuthInit } from '@/features/auth/hooks/useAuthInit'
import { Toaster } from '@/components/ui/toaster'

export function AppProvider({ children }: { children: ReactNode }) {
  useAuthInit()
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      {children}
      <Toaster />
    </GoogleOAuthProvider>
  )
}
