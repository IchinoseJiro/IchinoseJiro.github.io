// Standalone view dropdown retained for reuse; the current gallery does not display it.
import { useEffect, useRef, useState } from 'react'
import './ViewModeMenu.css'

export default function ViewModeMenu({ mode, onChange }) {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState({})
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  useEffect(() => {
    if (open) menuRef.current?.querySelector('[aria-checked="true"]')?.focus()
  }, [open])
  useEffect(() => {
    const closeOutside = event => { if (!event.target.closest?.('.view-mode-menu')) setOpen(false) }
    const close = () => setOpen(false)
    const scroll = event => { if (!event.target.closest?.('.view-mode-dropdown')) setOpen(false) }
    const escape = event => { if (event.key === 'Escape' && menuRef.current) { setOpen(false); triggerRef.current?.focus() } }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('scroll', scroll, true)
    document.addEventListener('keydown', escape)
    window.addEventListener('resize', close)
    return () => { document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('scroll', scroll, true); document.removeEventListener('keydown', escape); window.removeEventListener('resize', close) }
  }, [])
  const toggle = () => {
    const rect = triggerRef.current.getBoundingClientRect()
    const width = Math.min(250, window.innerWidth - 16)
    const top = rect.bottom + 5
    setAnchor({ top, left: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)), width, maxHeight: Math.max(80, window.innerHeight - top - 8) })
    setOpen(current => !current)
  }
  const keys = event => {
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return
    event.preventDefault()
    const items = Array.from(event.currentTarget.querySelectorAll('button'))
    const index = items.indexOf(document.activeElement)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
    items[next]?.focus()
  }
  return <div className="view-mode-menu"><button ref={triggerRef} type="button" aria-label="View" aria-haspopup="menu" aria-expanded={open} aria-controls={open?'gallery-view-menu':undefined} onClick={toggle} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();if(!open)toggle()}}}>View <span aria-hidden="true">⌄</span></button><span className="view-mode-current">{mode==='simple'?'Simple view':'Code view'}</span>{open && <div ref={menuRef} id="gallery-view-menu" className="view-mode-dropdown" role="menu" aria-label="Display view" style={anchor} onKeyDown={keys}>{['simple','code'].map(value=><button key={value} type="button" role="menuitemradio" aria-checked={mode===value} onClick={()=>{onChange(value);setOpen(false);triggerRef.current?.focus()}}><span>{value==='simple'?'Simple view':'Code view'}</span><small>{mode===value?'✓ Selected':''}</small></button>)}</div>}</div>
}
