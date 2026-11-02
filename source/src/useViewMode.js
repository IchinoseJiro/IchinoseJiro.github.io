import { useEffect, useState } from 'react'

const storageKey = 'lunr-code:view-mode'
function readMode() {
  try { return localStorage.getItem(storageKey) === 'code' ? 'code' : 'simple' } catch { return 'simple' }
}
export default function useViewMode() {
  const [mode, updateMode] = useState(readMode)
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
