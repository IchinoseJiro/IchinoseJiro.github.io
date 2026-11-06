// Draggable introduction positioning, constrained below the editor toolbar.
import { useRef, useState } from 'react'
export default function useIntroPanel(compactLayout, navigationVisible, toolbarRef) {
  const [introPosition, setIntroPosition] = useState(null)
  const introDragRef = useRef(null)
  // Introduction popup dragging and position handling.
  const startIntroDrag = (event) => {
    if (event.button !== 0) return
    const panel = event.currentTarget.closest('.intro-panel')
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    introDragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.preventDefault()
  }
  const moveIntroPanel = (event) => {
    const drag = introDragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const rect = event.currentTarget.getBoundingClientRect()
    const minLeft = compactLayout && navigationVisible ? 54 : 8
    const minTop = Math.max(8, (toolbarRef.current?.getBoundingClientRect().bottom ?? 100) + 8)
    const left = Math.max(
      minLeft,
      Math.min(window.innerWidth - rect.width - 8, drag.left + event.clientX - drag.x),
    )
    const top = Math.max(
      minTop,
      Math.min(window.innerHeight - rect.height - 8, drag.top + event.clientY - drag.y),
    )
    setIntroPosition({ left, top })
  }
  const stopIntroDrag = (event) => {
    if (introDragRef.current?.pointerId === event.pointerId) introDragRef.current = null
  }

  return { introPosition, setIntroPosition, startIntroDrag, moveIntroPanel, stopIntroDrag }
}
