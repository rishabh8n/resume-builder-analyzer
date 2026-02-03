import { ReactNode } from 'react'

import { useAuthInit } from '@/features/auth/hooks/useAuthInit'

export function AppProvider({ children }: { children: ReactNode }) {
  useAuthInit()
  return <>{children}</>
}
