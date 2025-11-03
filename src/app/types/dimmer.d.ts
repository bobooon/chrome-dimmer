/// <reference types="vite/client" />

declare global {
  type DimmerMode = 'global' | 'website'
  type DimmerUpdateType = 'activated' | 'reset' | null

  interface DimmerOverlay {
    blend: string
    color: string
    opacity: number
  }

  interface DimmerState {
    settings: DimmerSettings
  }

  interface DimmerSettings {
    global: { overlay: DimmerOverlay }
    website: {
      hostname: string
      mode: DimmerMode
      on: boolean
      overlay: DimmerOverlay
    }
  }
}

export {}
