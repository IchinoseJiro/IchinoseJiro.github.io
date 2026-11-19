// Shared View > Theme submenu. Narrow screens expand inside the parent menu.
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useTheme from '../../hooks/useTheme.js'
import ThemeRequestContext from './ThemeRequestContext.js'
import './ThemeSubmenu.css'

export default function ThemeSubmenu({ onCloseMenu }) {
  const [theme] = useTheme()
  const requestTheme = useContext(ThemeRequestContext)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState(null)
  const triggerRef = useRef(null)
  const choicesRef = useRef(null)
  const closeTimerRef = useRef(null)
  const focusChoicesRef = useRef(false)
  const cancelClose = () => clearTimeout(closeTimerRef.current)
  const scheduleClose = () => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => setOpen(false), 180)
  }
  const show = (focus = false) => {
    cancelClose()
    focusChoicesRef.current = focus
    const trigger = triggerRef.current.getBoundingClientRect()
    const width = document.documentElement.clientWidth
    if (width <= 600) {
      setPlacement({ inline: true })
    } else {
      const menuWidth = 188
      const left =
        trigger.right + 4 + menuWidth <= width - 8
          ? trigger.right + 4
          : Math.max(8, trigger.left - menuWidth - 4)
      setPlacement({
        inline: false,
        left,
        top: Math.max(8, Math.min(trigger.top, window.innerHeight - 112)),
        width: menuWidth,
        maxHeight: Math.max(44, window.innerHeight - 16),
      })
    }
    setOpen(true)
    if (open && focus) choicesRef.current?.querySelector('[aria-checked="true"]')?.focus()
  }
  useLayoutEffect(() => {
    if (!open || !placement || !choicesRef.current) return
    if (placement.inline) {
      const parent = triggerRef.current.closest('[role="menu"]')
      const bounds = parent.getBoundingClientRect()
      const bottom = choicesRef.current.getBoundingClientRect().bottom
      if (bottom > bounds.bottom) parent.scrollTop += bottom - bounds.bottom + 4
    }
    if (focusChoicesRef.current) choicesRef.current.querySelector('[aria-checked="true"]')?.focus()
  }, [open, placement])
  useEffect(() => {
    const outside = (event) => {
      if (
        !triggerRef.current?.contains(event.target) &&
        !choicesRef.current?.contains(event.target)
      )
        setOpen(false)
    }
    const resize = () => setOpen(false)
    document.addEventListener('pointerdown', outside)
    window.addEventListener('resize', resize)
    return () => {
      clearTimeout(closeTimerRef.current)
      document.removeEventListener('pointerdown', outside)
      window.removeEventListener('resize', resize)
    }
  }, [])
  const closeSubmenu = () => {
    cancelClose()
    setOpen(false)
    triggerRef.current.focus({ preventScroll: true })
  }
  const keys = (event) => {
    event.stopPropagation()
    if (event.key === 'Escape' || event.key === 'ArrowLeft') {
      event.preventDefault()
      closeSubmenu()
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      const items = [...choicesRef.current.querySelectorAll('button')]
      const current = items.indexOf(document.activeElement)
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : (current + 1) % 2
      items[next].focus()
    } else if (event.key === 'Tab') {
      event.preventDefault()
      onCloseMenu()
      requestAnimationFrame(() => document.querySelector('[data-menu-name="View"]')?.focus())
    }
  }
  const choose = (next) => {
    cancelClose()
    const confirming = requestTheme(next)
    onCloseMenu()
    if (!confirming)
      requestAnimationFrame(() => document.querySelector('[data-menu-name="View"]')?.focus())
  }
  const choices = open && placement && (
    <div
      ref={choicesRef}
      id="theme-choices"
      role="menu"
      aria-label="Theme"
      className={'theme-submenu menu-root dropdown' + (placement.inline ? ' is-inline' : '')}
      style={
        placement.inline
          ? undefined
          : {
              left: placement.left,
              top: placement.top,
              width: placement.width,
              maxHeight: placement.maxHeight,
            }
      }
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
      onKeyDown={keys}
    >
      {['light', 'dark'].map((value) => (
        <button
          key={value}
          type="button"
          role="menuitemradio"
          aria-checked={theme === value}
          className="dropdown-item"
          onClick={() => choose(value)}
        >
          <span>{value === 'light' ? 'Light' : 'Dark'}</span>
          <span aria-hidden="true">{theme === value ? '✓' : ''}</span>
        </button>
      ))}
    </div>
  )
  return (
    <div className="theme-menu-entry">
      <button
        ref={triggerRef}
        type="button"
        role="menuitem"
        className="dropdown-item theme-submenu-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? 'theme-choices' : undefined}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') show()
        }}
        onPointerLeave={scheduleClose}
        onClick={() => show(true)}
        onKeyDown={(event) => {
          if (['ArrowRight', 'Enter', ' '].includes(event.key)) {
            event.preventDefault()
            event.stopPropagation()
            show(true)
          } else if (event.key === 'Escape' && open) {
            event.preventDefault()
            event.stopPropagation()
            closeSubmenu()
          }
        }}
      >
        <span>Theme</span>
        <span aria-hidden="true">›</span>
      </button>
      {placement?.inline ? choices : choices && createPortal(choices, document.body)}
    </div>
  )
}
