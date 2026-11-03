// Help > About this Portfolio popup: photo, branding, biography, and progress note.
import { useEffect } from 'react'
import BrandLogo from './BrandLogo.jsx'

export default function AboutPortfolio({ onClose }) {
// Keep keyboard focus inside the popup, close on Escape, and return focus when dismissed.
  useEffect(() => {
    const previous = document.activeElement
    const panel = document.querySelector('.about-dialog')
    const focusable = () => Array.from(panel?.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]') ?? [])
    focusable()[0]?.focus()
    document.body.classList.add('dialog-open')
    const keys = event => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab') return
      const items = focusable()
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', keys)
    return () => { document.removeEventListener('keydown', keys); document.body.classList.remove('dialog-open'); if (previous?.isConnected) previous.focus() }
  }, [onClose])
  return (<div className="about-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><section className="about-dialog" role="dialog" aria-modal="true" aria-labelledby="about-title">
{/* Popup content: close button, portrait and logo, author credit, blue progress note, and job-search note. */}
      <button className="help-close" onClick={()=>onClose()} aria-label="Close About panel">×</button><div className="about-identity"><img className="about-portrait" src="/images/jireh-portrait.jpg" width="1280" height="960" alt="Lowell Jireh P. Chantengco outdoors among trees" /><div className="about-identity-brand"><div className="about-mark"><BrandLogo /></div><p className="about-kicker">LUNR CODE · PERSONAL PORTFOLIO</p><h2 id="about-title">About LunR Code</h2></div></div><p className="about-credit">Made with care by <strong>Lowell Jireh P. Chantengco</strong> <span>(Jireh)</span>.</p><div className="growth-note"><small>ALWAYS EVOLVING</small><p>This portfolio will always be a work in progress. As I grow as a developer and as a person, it grows with me, one idea, one lesson, and one commit at a time. Expect changes to this website from time to time as I continue learning and improving.</p></div><div className="job-note"><small>OFFICIAL NOTICE</small><p>I am currently looking for a job. Suitable opportunities will be met with enthusiasm, gratitude, and an unusually prompt reply. Coffee may be submitted as supporting documentation.</p></div><button className="about-done" onClick={()=>onClose()}>Sounds good</button>
    </section></div>
  )
}
