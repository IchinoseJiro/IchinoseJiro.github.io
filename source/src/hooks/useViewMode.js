// Shared view preference: Code view on refresh, with selection remembered during navigation.
import { useCallback, useEffect, useState } from 'react'

// Browser storage key that remembers the selected home-page view.
const storageKey = 'lunr-code:view-mode'
function readMode() {
  try {
    return localStorage.getItem(storageKey) === 'simple' ? 'simple' : 'code'
  } catch {
    return 'code'
  }
}
export default function useViewMode() {
  // A full browser refresh starts in Code view; ordinary page navigation reads the saved selection.
  const [mode, updateMode] = useState(() => {
    const navigation = performance.getEntriesByType('navigation')[0]
    return navigation?.type === 'reload' ? 'code' : readMode()
  })
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, mode)
    } catch {
      /* The view still works without browser storage. */
    }
  }, [mode])
  useEffect(() => {
    const sync = (event) => {
      if (event.key === storageKey) updateMode(readMode())
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  // Accept only the two supported view names, persist the choice, and update React immediately.
  const setMode = useCallback((next) => {
    if (next !== 'simple' && next !== 'code') return
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      /* Mode still works when browser storage is unavailable. */
    }
    updateMode(next)
  }, [])
  return [mode, setMode]
}
