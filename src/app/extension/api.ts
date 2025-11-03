import messagesJson from '../../locales/en/messages.json'

const overlay = { opacity: 0.5, blend: 'normal', color: '#000000' }

export const defaultSettings: DimmerSettings = {
  global: { overlay },
  website: { hostname: '*', mode: 'global', on: false, overlay },
}

const messages = messagesJson as { [key: string]: { message: string } }

export default function chromeApi() {}

chromeApi.getMessage = (key: string, substitutions?: string | string[]): string => {
  try {
    return chrome.i18n.getMessage(key, substitutions)
  }
  catch {
    return messages[key].message || ''
  }
}

chromeApi.getSettings = async () => {
  try {
    return await chrome.runtime.sendMessage({ type: 'getSettings' })
  }
  catch {
    return structuredClone(defaultSettings)
  }
}

chromeApi.saveSettings = async (settings: DimmerSettings, reset = false) => {
  try {
    if (reset)
      await chrome.runtime.sendMessage({ type: 'resetSettings' })
    else
      await chrome.runtime.sendMessage({ type: 'saveSettings', payload: settings })
  }
  catch {}
}

chromeApi.getShortcut = async () => {
  try {
    return await chrome.runtime.sendMessage({ type: 'getShortcut' })
  }
  catch {
    return ''
  }
}

chromeApi.openShortcuts = () => {
  try {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' })
  }
  catch {}
}
