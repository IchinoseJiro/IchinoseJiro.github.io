export default function NavigationHint({ simple = false, className = '' }) {
  if (simple) return <div className={`sidebar-project-hint ${className}`}><p><small>Projects</small><span>File → Portfolio</span></p><p><small>Editor layout</small><span>View → Code view</span></p></div>
  return <div className={`sidebar-project-hint ${className}`}><p>See my projects: <span>File → Portfolio</span></p><p>Prefer a traditional layout? <span>View → Simple view</span></p></div>
}
