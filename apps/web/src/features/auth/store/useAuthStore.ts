import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import * as authApi from '@/features/auth/api/authApi'

interface AuthState {
  user: authApi.AuthUser | null
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
  error?: string
  init: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    status: 'idle',
    error: undefined,

    init: async () => {
      try {
        set((s) => {
          s.status = 'loading'
          s.error = undefined
        })
        const res = await authApi.me()
        set((s) => {
          s.user = res.data.user
          s.status = 'authenticated'
        })
      } catch {
        set((s) => {
          s.user = null
          s.status = 'unauthenticated'
        })
      }
    },

    login: async (email, password) => {
      set((s) => {
        s.status = 'loading'
        s.error = undefined
      })
      try {
        const res = await authApi.login(email, password)
        set((s) => {
          s.user = res.data.user
          s.status = 'authenticated'
        })
      } catch (e: any) {
        set((s) => {
          s.error = e?.response?.data?.message || 'Login failed'
          s.status = 'unauthenticated'
        })
        throw e
      }
    },

    register: async (name, email, password) => {
      set((s) => {
        s.status = 'loading'
        s.error = undefined
      })
      try {
        const res = await authApi.register(name, email, password)
        set((s) => {
          s.user = res.data.user
          s.status = 'authenticated'
        })
      } catch (e: any) {
        set((s) => {
          s.error = e?.response?.data?.message || 'Registration failed'
          s.status = 'unauthenticated'
        })
        throw e
      }
    },

    logout: async () => {
      await authApi.logout()
      set((s) => {
        s.user = null
        s.status = 'unauthenticated'
      })
    },
  }))
)
