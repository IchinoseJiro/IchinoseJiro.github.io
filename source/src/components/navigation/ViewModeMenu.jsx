// Compact gallery View menu. Theme is shared with the two home-page views.
import { useEffect, useRef, useState } from 'react'
import ThemeSubmenu from './ThemeSubmenu.jsx'
import './ViewModeMenu.css'

export default function ViewModeMenu() {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState({})
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  useEffect(() => {
    if (open) menuRef.current?.querySelector('button')?.focus({ preventScroll: true })
  }, [open])
  useEffect(() => {
    const outside = (event) => {
      if (!event.target.closest?.('.menu-root')) setOpen(false)
    }
    const close = () => setOpen(false)
    const scroll = (event) => {
      if (!event.target.closest?.('.dropdown, .view-mode-dropdown')) setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('scroll', scroll, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('scroll', scroll, true)
      window.removeEventListener('resize', close)
    }
  }, [])
  const toggle = () => {
    const rect = triggerRef.current.getBoundingClientRect()
    const width = Math.min(220, document.documentElement.clientWidth - 16)
    setAnchor({
      top: rect.bottom + 4,
      left: Math.max(8, Math.min(rect.left, document.documentElement.clientWidth - width - 8)),
      width,
      maxHeight: Math.max(44, window.innerHeight - rect.bottom - 12),
    })
    setOpen((current) => !current)
  }
  const keys = (event) => {
    if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
      triggerRef.current.focus()
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      menuRef.current.querySelector('button')?.focus()
    }
  }
  return (
    <div className="view-mode-menu menu-root">
      <button
        ref={triggerRef}
        data-menu-name="View"
        type="button"
        aria-label="View"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? 'gallery-view-menu' : undefined}
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (!open) toggle()
            else menuRef.current?.querySelector('button')?.focus()
          }
        }}
      >
        View
        <svg className="view-menu-chevron" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="m3 4.5 3 3 3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div
          ref={menuRef}
          id="gallery-view-menu"
          className="view-mode-dropdown menu-root"
          role="menu"
          aria-label="View"
          style={anchor}
          onKeyDown={keys}
        >
          <ThemeSubmenu onCloseMenu={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}
