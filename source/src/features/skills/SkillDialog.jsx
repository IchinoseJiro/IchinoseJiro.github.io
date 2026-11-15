// Compact tool descriptions with a lightly blurred backdrop.
import { useLayoutEffect, useRef } from 'react'
import { SkillIcon } from './SkillIcon.jsx'
// Native modal provides background inertness, Escape handling, and keyboard focus containment.
// Position compact details near their trigger, clamped to the viewport; center on phones.
export default function SkillDialog({ panel, onClose }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const dialog = ref.current
    const previous = panel.trigger || document.activeElement
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('skills-dialog-open')
    const position = () => {
      const width = document.documentElement.clientWidth
      const height = window.innerHeight
      const rect = dialog.getBoundingClientRect()
      const anchor = panel.anchor
      const left =
        width <= 600
          ? (width - rect.width) / 2
          : Math.min(width - rect.width - 12, Math.max(12, anchor.right + 12))
      const top =
        width <= 600
          ? (height - rect.height) / 2
          : Math.min(height - rect.height - 12, Math.max(12, anchor.top))
      dialog.style.left = left + 'px'
      dialog.style.top = top + 'px'
    }
    position()
    window.addEventListener('resize', position)
    return () => {
      document.body.classList.remove('skills-dialog-open')
      window.removeEventListener('resize', position)
      // Restore focus after React removes the modal and the page becomes interactive.
      queueMicrotask(() => {
        if (previous?.isConnected) previous.focus({ preventScroll: true })
      })
    }
  }, [panel])
  const outside = (event) => {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onClose()
  }
  return (
    <dialog
      ref={ref}
      className="skill-dialog skill-detail-dialog"
      aria-labelledby="skill-dialog-title"
      onClose={onClose}
      onClick={outside}
    >
      <header className="skill-dialog-header">
        <div>
          <small>SKILL / TOOL</small>
          <h2 id="skill-dialog-title">{panel.skill.name}</h2>
        </div>
        <button
          autoFocus
          type="button"
          className="skill-dialog-close"
          aria-label="Close skill details"
          onClick={onClose}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="m3 3 10 10M13 3 3 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>
      <div className="skill-detail-body">
        <SkillIcon skill={panel.skill} />
        <p>{panel.skill.description}</p>
        {panel.skill.note && <p className="skill-detail-note">{panel.skill.note}</p>}
      </div>
    </dialog>
  )
}
