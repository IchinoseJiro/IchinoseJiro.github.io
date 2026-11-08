// Default to Simple view on arrival or refresh, with continuity between portfolio pages.
import { useCallback, useEffect, useState } from 'react'

const storageKey = 'lunr-code:view-mode'
const galleryPath = '/portfolio.html'

function initialMode() {
  const navigation = performance.getEntriesByType('navigation')[0]
  if (navigation?.type === 'reload' || !document.referrer) return 'simple'

  // The view choice carries only when following a link between home and the gallery.
  const previous = new URL(document.referrer)
  const fromCompanionPage =
    window.location.pathname === galleryPath
      ? previous.pathname === '/' || previous.pathname === '/index.html'
      : previous.pathname === galleryPath

  if (previous.origin !== window.location.origin || !fromCompanionPage) return 'simple'

  try {
    return sessionStorage.getItem(storageKey) === 'code' ? 'code' : 'simple'
  } catch {
    return 'simple'
  }
}

export default function useViewMode() {
  const [mode, updateMode] = useState(initialMode)

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, mode)
    } catch {
      /* The view still works without browser storage. */
    }
  }, [mode])

  const setMode = useCallback((next) => {
    if (next === 'simple' || next === 'code') updateMode(next)
  }, [])

  return [mode, setMode]
}
