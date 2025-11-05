import type { Settings } from '../extension/settings.ts'
import { api } from '../extension/api.ts'
import { defaultSettings } from '../extension/settings.ts'

interface State { settings: Settings }

const actions = {
  getSettings: (state: State, value: Settings) => {
    state.settings = { ...value }
  },
  setOn: (state: State, value: boolean) => {
    state.settings.url.on = value
  },
  setMode: (state: State, value: boolean) => {
    state.settings.url.mode = value ? 'global' : 'url'
  },
  setBlend: (state: State, value: string) => {
    state.settings[state.settings.url.mode].overlay.blend = value
  },
  setOpacity: (state: State, value: number[]) => {
    state.settings[state.settings.url.mode].overlay.opacity = value[0] / 100
  },
  setColor: (state: State, value: string) => {
    state.settings[state.settings.url.mode].overlay.color = value
  },
  reset: (state: State, _value: boolean) => {
    const settings = structuredClone(defaultSettings)
    settings.url.hostname = state.settings.url.hostname
    settings.global = state.settings.global
    state.settings = settings
  },
}

type Action = {
  [K in keyof typeof actions]: {
    type: K
    value: Parameters<typeof actions[K]>[1]
  }
}[keyof typeof actions]

export function pageReducer(prevState: State, action: Action) {
  const state = { ...prevState }

  if (actions[action.type]) {
    const handler = actions[action.type] as (state: State, value: any) => any
    handler(state, action.value)
    api.saveSettings(state.settings, action.type === 'reset' && action.value)
  }

  return state
}
