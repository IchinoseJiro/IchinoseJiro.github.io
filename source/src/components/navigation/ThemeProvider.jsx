// Confirms intentional dark-to-light changes without remounting either workspace.
import { useLayoutEffect, useRef, useState } from 'react'
import ThemeRequestContext from './ThemeRequestContext.js'
import useTheme from '../../hooks/useTheme.js'
import './ThemeConfirmation.css'

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useTheme()
  const [pending, setPending] = useState(false)
  const dialogRef = useRef(null)
  const returnRef = useRef(null)
  const dismissingRef = useRef(false)
  const requestTheme = (next) => {
    if (next === 'light' && theme === 'dark') {
      returnRef.current = document.querySelector('[data-menu-name="View"]')
      setPending(true)
      return true
    }
    setTheme(next)
    return false
  }
  const dismiss = (confirm = false) => {
    if (dismissingRef.current) return
    dismissingRef.current = true
    const finish = () => {
      if (confirm) setTheme('light')
      setPending(false)
      dismissingRef.current = false
      requestAnimationFrame(() => {
        if (returnRef.current?.isConnected) returnRef.current.focus({ preventScroll: true })
      })
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish()
    else {
      const exit = dialogRef.current.animate(
        [
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(4px)' },
        ],
        { duration: 120, easing: 'ease-in', fill: 'forwards' },
      )
      exit.finished.then(finish, finish)
    }
  }
  useLayoutEffect(() => {
    if (pending && !dialogRef.current.open) {
      dialogRef.current.showModal()
      dialogRef.current.querySelector('.theme-cancel').focus()
    }
  }, [pending])
  return (
    <ThemeRequestContext.Provider value={requestTheme}>
      {children}
      {pending && (
        <dialog
          ref={dialogRef}
          className="theme-confirmation"
          aria-labelledby="theme-confirmation-title"
          aria-describedby="theme-confirmation-description"
          onCancel={(event) => {
            event.preventDefault()
            dismiss()
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return
            const rect = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              dismiss()
          }}
        >
          <header className="theme-confirmation-heading">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 7V5a3 3 0 0 1 6 0v2M7 10H3m18 0h-4M7 15H3m18 0h-4M8 19l-3 3m11-3 3 3M12 8v12M7 12a5 5 0 0 1 10 0v3a5 5 0 0 1-10 0z" />
            </svg>
            <span>THEME / DEBUG CHECK</span>
          </header>
          <h2 id="theme-confirmation-title">Light Mode? That's Debuggable.</h2>
          <p id="theme-confirmation-description">
            Warning: Switching to light mode may attract bugs. Are you sure you want to proceed?
          </p>
          <div className="theme-confirmation-actions">
            <button type="button" className="theme-confirm" onClick={() => dismiss(true)}>
              Yes, I'll Debug Them
            </button>
            <button autoFocus type="button" className="theme-cancel" onClick={() => dismiss()}>
              No, Keep the Bugs Away
            </button>
          </div>
          <small>No bugs were harmed in the making of this website.</small>
        </dialog>
      )}
    </ThemeRequestContext.Provider>
  )
}
