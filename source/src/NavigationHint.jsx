// Orange instruction box for finding projects and switching home-page views.
export default function NavigationHint({ simple = false, className = '' }) {
// Simple view instructions point back to Code view; the default instructions point to Simple view.
  if (simple) return <div className={`sidebar-project-hint ${className}`}><p><small>See my projects:</small><span>File → Portfolio</span></p><p><small>Prefer the editor layout?</small><span>View → Code view</span></p></div>
  return <div className={`sidebar-project-hint ${className}`}><p>See my projects: <span>File → Portfolio</span></p><p>Prefer a traditional layout? <span>View → Simple view</span></p></div>
}
