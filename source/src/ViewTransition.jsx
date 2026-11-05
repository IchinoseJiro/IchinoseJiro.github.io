// Short branded transition overlay for View > Simple view / Code view.
import { useEffect, useRef } from 'react'
import BrandLogo from './BrandLogo.jsx'
import './ViewTransition.css'

export default function ViewTransition({ mode, phase }) {
  const dialogRef = useRef(null)
  const label = mode === 'simple' ? 'Simple view' : 'Code view'

  // A native modal sits above all workspace controls and prevents accidental extra clicks.
  // Do not close it during effect cleanup: StrictMode repeats effects in development.
  useEffect(() => {
    if (!dialogRef.current.open) dialogRef.current.showModal()
  }, [])

  return <dialog ref={dialogRef} className={'view-transition ' + (phase === 'ready' ? 'view-transition-ready' : '')} aria-label={'Switching to ' + label} onCancel={event => event.preventDefault()}>
    <div className="view-transition-card">
      <BrandLogo decorative />
      <small className="view-transition-brand">LUNR CODE</small>
      {/* Keep both layout previews decorative; the status below announces the destination. */}
      <div className={'view-transition-preview view-transition-preview-' + mode} aria-hidden="true">{mode === 'simple' ? <><span /><span /><span /></> : <><span>&lt;portfolio&gt;</span><span>&nbsp; const view = 'code';</span><span>&lt;/portfolio&gt;</span></>}</div>
      <p role="status" aria-live="polite" aria-atomic="true">{phase === 'ready' ? label + ' ready' : 'Switching to ' + label + '…'}</p>
      <span className="view-transition-description">{mode === 'simple' ? 'Jireh’s portfolio, easy to explore.' : 'Jireh’s editor-inspired workspace.'}</span>
      <div className="view-transition-progress" aria-hidden="true"><span /></div>
    </div>
  </dialog>
}
