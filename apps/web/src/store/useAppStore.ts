import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface AppState {
  ready: boolean
  setReady: (ready: boolean) => void
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    ready: true,
    setReady: (ready) =>
      set((state) => {
        state.ready = ready
      }),
  }))
)
