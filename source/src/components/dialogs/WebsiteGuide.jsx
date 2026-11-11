// Website instructions: centered modal opened from the introduction panel or Help menu.
import { useEffect, useRef } from 'react'
import BrandLogo from '../branding/BrandLogo.jsx'
import { currentProject } from '../../data/projects.js'
import './WebsiteGuide.css'

export default function WebsiteGuide({ onClose }) {
  const dialogRef = useRef(null)

  // A native modal keeps background controls inactive and traps keyboard focus.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('guide-open')
    return () => document.body.classList.remove('guide-open')
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="website-guide"
      aria-labelledby="website-guide-title"
      aria-describedby="website-guide-description"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {/* Header: LunR Code branding and an always-reachable close control. */}
      <header className="website-guide-header">
        <BrandLogo decorative />
        <div>
          <small>A QUICK TOUR</small>
          <h2 id="website-guide-title">Welcome to LunR Code</h2>
        </div>
        <button
          type="button"
          autoFocus
          className="website-guide-close"
          aria-label="Close website guide"
          onClick={onClose}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path
              d="m3 3 10 10M13 3 3 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>
      <div className="website-guide-content">
        {/* Explain the portfolio and the reason for its editor-inspired appearance. */}
        <p id="website-guide-description">
          This is Jireh’s personal portfolio: a place to explore my background, skills, experience,
          and projects. Its design is inspired by <strong>Visual Studio Code</strong>, the coding
          software developers use to write and edit code.
        </p>
        <p className="website-guide-reassurance">
          You don’t need to know how to code to look around.
        </p>
        {/* Two home-page views, both available from the top View menu. */}
        <section className="website-guide-views" aria-labelledby="guide-view-title">
          <h3 id="guide-view-title">Choose the view that suits you</h3>
          <div>
            <article>
              <span>View → Simple view</span>
              <p>
                A traditional portfolio with readable sections, cards, and a photo. It opens when
                you first visit or refresh the site.
              </p>
            </article>
            <article>
              <span>View → Code view</span>
              <p>An editor-inspired layout with files, tabs, and editable information.</p>
            </article>
          </div>
        </section>
        {/* Practical navigation instructions matching the existing website controls. */}
        <section className="website-guide-steps" aria-labelledby="guide-explore-title">
          <h3 id="guide-explore-title">Make yourself at home</h3>
          <dl>
            <div>
              <dt>Explore my background</dt>
              <dd>
                In Code view, choose About, Experience, Skills, or Contact from the left Explorer.
                Click a tab to return to an open file; × closes that tab.
              </dd>
            </div>
            <div>
              <dt>See my projects</dt>
              <dd>
                Choose <strong>File → Portfolio</strong> for my current {currentProject.title}{' '}
                project and college work. Use Back to home to return.
              </dd>
            </div>
            <div>
              <dt>Try the editor</dt>
              <dd>
                You can type in the information area. Edits are temporary; the orange{' '}
                <strong>Reload</strong> button restores the original information. The terminal is
                for typing only.
              </dd>
            </div>
            <div>
              <dt>Get in touch</dt>
              <dd>
                Open Contact to copy my email or phone, or open LinkedIn and GitHub in a new tab.
              </dd>
            </div>
            <div>
              <dt>On a phone or tablet?</dt>
              <dd>
                Use the top menus by tapping. The LunR Code icon at the top right opens the
                introduction panel. You can reopen this guide through{' '}
                <strong>Help → Website guide</strong>.
              </dd>
            </div>
          </dl>
        </section>
      </div>
      {/* Footer: dismiss the guide without resetting tabs, edited text, or the chosen view. */}
      <footer className="website-guide-footer">
        <span>Close with ×, Escape, or a tap outside the panel.</span>
        <button type="button" onClick={onClose}>
          Got it — let’s explore
        </button>
      </footer>
    </dialog>
  )
}
