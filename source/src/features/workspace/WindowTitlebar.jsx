// Code-view titlebar: branding, original reload control, and simulated window controls.
import BrandLogo from '../../components/branding/BrandLogo.jsx'
export default function WindowTitlebar({
  reload,
  maximized,
  setMinimized,
  setMaximized,
  setClosed,
}) {
  return (
    <header className="titlebar">
      <button className="titlebar-reload-left" type="button" onClick={reload}>
        ↻ Reload
      </button>
      <div className="titlebar-brand">
        <BrandLogo decorative />
        <span>
          LunR Code <span className="brand-owner">— Jireh Chantengco</span>
        </span>
      </div>
      <div className="titlebar-actions" aria-label="Portfolio window controls">
        <button
          type="button"
          aria-label="Minimize"
          title="Minimize"
          onClick={() => setMinimized(true)}
        >
          −
        </button>
        <button
          type="button"
          aria-label={maximized ? 'Restore window' : 'Maximize window'}
          title="I don't have a purpose"
          onClick={() => setMaximized(!maximized)}
        >
          □
        </button>
        <button
          className="window-close"
          type="button"
          aria-label="Close portfolio window"
          title="Close"
          onClick={() => setClosed(true)}
        >
          ×
        </button>
      </div>
    </header>
  )
}
