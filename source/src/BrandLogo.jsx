// Reusable LunR Code logo shown in headers, panels, and branding areas.
import './BrandLogo.css'

export default function BrandLogo({ decorative = false, className = '' }) {
// Logo image source. Decorative copies have empty alt text to avoid repeated screen-reader labels.
  return <img className={`brand-logo ${className}`} src="/lunr-code.svg?v=2" width="64" height="64" alt={decorative ? '' : 'LunR Code'} draggable="false" />
}
