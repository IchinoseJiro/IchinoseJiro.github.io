import { useEffect, useState } from 'react'

const storageKey = 'lunr-code:view-mode'
function readMode() {
  try { return localStorage.getItem(storageKey) === 'simple' ? 'simple' : 'code' } catch { return 'code' }
}
export default function useViewMode() {
  const [mode, updateMode] = useState(() => {
    const navigation = performance.getEntriesByType('navigation')[0]
    return navigation?.type === 'reload' ? 'code' : readMode()
  })
  useEffect(() => {
    try { localStorage.setItem(storageKey, mode) } catch { /* The view still works without browser storage. */ }
  }, [mode])
  useEffect(() => {
    const sync = event => { if (event.key === storageKey) updateMode(readMode()) }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  const setMode = next => {
    if (next !== 'simple' && next !== 'code') return
    try { localStorage.setItem(storageKey, next) } catch { /* Mode still works when browser storage is unavailable. */ }
    updateMode(next)
  }
  return [mode, setMode]
}
