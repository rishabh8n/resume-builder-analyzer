import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

export function useAuthInit() {
  const init = useAuthStore((s) => s.init)

  useEffect(() => {
    init()
  }, [init])
}
