// Reusable LinkedIn and GitHub profile links that open in new tabs.
import './SocialLinks.css'
import { contact } from '../../data/profileContent.js'

export default function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social profiles">
      {/* LinkedIn profile button; edit the address in profileContent.js. */}
      <a
        href={contact.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile (opens in a new tab)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span>LinkedIn</span>
        <small>↗</small>
      </a>
      {/* GitHub profile button; edit the address in profileContent.js. */}
      <a
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile (opens in a new tab)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 20v-3c-4 1-4-2-5-2m11 5v-4c3-1 4-3 4-6 0-1-1-2-1-3 0-1 0-2-1-3l-4 2h-2L7 4C6 5 6 6 6 7c-1 1-1 2-1 3 0 3 1 5 4 6v4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>GitHub</span>
        <small>↗</small>
      </a>
    </div>
  )
}
