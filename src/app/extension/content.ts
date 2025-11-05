import type { Settings } from './settings.ts';

(function () {
  let overlay: HTMLElement | null = document.querySelector('dimmer-overlay')

  function create() {
    overlay = document.createElement('dimmer-overlay') as HTMLElement
    overlay.style.position = 'fixed'
    overlay.style.zIndex = '2147483647'
    overlay.style.inset = '0'
    overlay.style.pointerEvents = 'none'
    overlay.style.visibility = 'hidden'
    overlay.style.opacity = '0'
    overlay.style.backgroundColor = '#000'
    overlay.style.mixBlendMode = 'multiply'
    document.documentElement.appendChild(overlay)
  }

  async function load() {
    let settings: Settings

    try {
      settings = JSON.parse(localStorage.getItem('dimmer-overlay') || '')
    }
    catch {
      settings = await chrome.runtime.sendMessage({ type: 'getSettings' })
    }

    update(settings)
  }

  function update(settings: Settings) {
    if (!overlay || !document.documentElement.contains(overlay))
      create()

    const mode = settings[settings.url.mode]

    overlay!.style.transitionProperty = 'visibility, opacity'
    overlay!.style.transitionDuration = '0.15s'
    overlay!.style.transitionTimingFunction = 'ease'
    overlay!.style.visibility = settings.url.on ? 'visible' : 'hidden'
    overlay!.style.opacity = settings.url.on ? String(mode.overlay.opacity) : '0'
    overlay!.style.backgroundColor = mode.overlay.color
    overlay!.style.mixBlendMode = mode.overlay.blend
  }

  create()
  load()

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'update') {
      localStorage.setItem('dimmer-overlay', JSON.stringify(message.payload.settings))
      update(message.payload.settings)
    }
  })
})()
