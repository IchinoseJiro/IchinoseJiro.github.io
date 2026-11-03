// Home-page view switching: briefly show the destination before revealing its layout.
import { useCallback, useEffect, useState } from 'react'

export default function useViewTransition(viewMode, commitMode) {
  const [transition, setTransition] = useState(null)
  const target = transition?.mode

  // Commit only the layout preference; App keeps documents, open tabs, and editor history.
  // Clear both timers if the page unmounts so no delayed work survives navigation.
  useEffect(() => {
    if (!target) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTimer = window.setTimeout(() => {
      commitMode(target)
      setTransition({ mode: target, phase: 'ready' })
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, reducedMotion ? 80 : 1420)
    const finishTimer = window.setTimeout(() => {
      setTransition(null)
      requestAnimationFrame(() => document.querySelector('[data-menu-name="View"]')?.focus({ preventScroll: true }))
    }, reducedMotion ? 160 : 1760)
    return () => { window.clearTimeout(revealTimer); window.clearTimeout(finishTimer) }
  }, [target, commitMode])

  // Selecting the active mode is a no-op; ignore repeated switches during a transition.
  const startTransition = useCallback(next => {
    if (!['simple', 'code'].includes(next) || next === viewMode || target) return
    setTransition({ mode: next, phase: 'loading' })
  }, [viewMode, target])

  return [transition, startTransition]
}
