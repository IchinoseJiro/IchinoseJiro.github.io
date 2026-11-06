// Simple vectors for the toolbox and full cards, tinted by the shared skill record.
function IconShape({ id }) {
  switch (id) {
    case 'html':
      return (
        <>
          <path d="M10 7h28l-3 31-11 4-11-4Z" />
          <path d="M31 15H18l1 8h11l-1 8-5 2-5-2" />
          <text x="24" y="6" fontSize="5">
            HTML
          </text>
        </>
      )
    case 'css':
      return (
        <>
          <path d="M10 7h28l-3 31-11 4-11-4Z" />
          <path d="M17 15h14l-1 8h-9m9 0-1 8-5 2-5-2" />
          <text x="24" y="6" fontSize="5">
            CSS
          </text>
        </>
      )
    case 'javascript':
      return (
        <>
          <rect x="7" y="7" width="34" height="34" rx="4" />
          <text x="25" y="31" fontSize="18">
            JS
          </text>
        </>
      )
    case 'python':
      return (
        <>
          <path d="M24 6h-7a5 5 0 0 0-5 5v9h16v8H12a6 6 0 0 1-6-6v-5a6 6 0 0 1 6-6m12 31h7a5 5 0 0 0 5-5v-9H20v-8h16a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6" />
          <circle cx="19" cy="12" r="1" fill="currentColor" />
          <circle cx="29" cy="36" r="1" fill="currentColor" />
        </>
      )
    case 'java':
      return (
        <>
          <path d="M12 25h23v5a9 9 0 0 1-9 9h-5a9 9 0 0 1-9-9Zm23 1h3a5 5 0 0 1 0 10h-5M8 43h31M22 21c-9-7 9-8 1-15m7 14c-6-4 6-6 2-11" />
        </>
      )
    case 'cpp':
      return (
        <>
          <path d="m24 4 18 10v20L24 44 6 34V14Z" />
          <text x="24" y="29" fontSize="14">
            C++
          </text>
        </>
      )
    case 'react':
      return (
        <>
          <ellipse cx="24" cy="24" rx="20" ry="8" />
          <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </>
      )
    case 'vue':
      return (
        <>
          <path d="M4 9h10l10 17L34 9h10L24 42Z" />
          <path d="M14 9h7l3 5 3-5h7" />
        </>
      )
    case 'angular':
      return (
        <>
          <path d="m24 5 18 7-3 26-15 6-15-6-3-26Z" />
          <path d="m15 33 9-19 9 19m-14-7h10" />
        </>
      )
    case 'node':
      return (
        <>
          <path d="m24 4 18 10v20L24 44 6 34V14Z" />
          <path d="M17 32V16l14 16V16" />
        </>
      )
    case 'express':
      return (
        <>
          <rect x="5" y="9" width="38" height="30" rx="5" />
          <text x="24" y="30" fontSize="18">
            ex
          </text>
        </>
      )
    case 'wix':
      return (
        <>
          <path d="m5 12 6 25 8-22 8 22 6-25m5 3v22" />
          <circle cx="38" cy="8" r="1" fill="currentColor" />
        </>
      )
    case 'mysql':
      return (
        <>
          <ellipse cx="24" cy="10" rx="16" ry="6" />
          <path d="M8 10v26c0 8 32 8 32 0V10M8 22c0 8 32 8 32 0" />
          <text x="24" y="34" fontSize="9">
            SQL
          </text>
        </>
      )
    case 'mongo':
      return (
        <>
          <path d="M24 4C10 17 6 30 24 39 42 30 38 17 24 4Z" />
          <path d="M24 14v30" />
        </>
      )
    case 'pc':
      return (
        <>
          <rect x="5" y="8" width="28" height="23" rx="2" />
          <path d="M19 31v8m-8 0h16" />
          <rect x="37" y="8" width="7" height="31" rx="1" />
          <path d="M39 14h3m-3 5h3" />
        </>
      )
    case 'diagnostics':
      return (
        <>
          <rect x="11" y="11" width="26" height="26" rx="3" />
          <path d="M18 3v8m12-8v8M18 37v8m12-8v8M3 18h8m-8 12h8m26-12h8m-8 12h8M17 25h4l3-7 4 13 3-6" />
        </>
      )
    case 'network':
      return (
        <>
          <rect x="16" y="4" width="16" height="11" rx="2" />
          <path d="M24 15v9M8 33v-9h32v9" />
          <rect x="2" y="33" width="12" height="10" rx="2" />
          <rect x="18" y="33" width="12" height="10" rx="2" />
          <rect x="34" y="33" width="12" height="10" rx="2" />
          <path d="M24 24v9" />
        </>
      )
    case 'typescript':
      return (
        <>
          <rect x="7" y="7" width="34" height="34" rx="4" />
          <text x="24" y="31" fontSize="18">
            TS
          </text>
        </>
      )
    case 'php':
      return (
        <>
          <ellipse cx="24" cy="24" rx="21" ry="14" />
          <text x="24" y="29" fontSize="13">
            php
          </text>
        </>
      )
    case 'c':
    case 'csharp':
      return (
        <>
          <path d="m24 4 18 10v20L24 44 6 34V14Z" />
          <text x="24" y="30" fontSize="18">
            {id === 'c' ? 'C' : 'C#'}
          </text>
        </>
      )
    case 'next':
      return (
        <>
          <circle cx="24" cy="24" r="20" />
          <path d="M16 34V14l20 28M32 14v17" />
        </>
      )
    case 'tailwind':
      return (
        <>
          <path d="M4 21c4-12 14-12 20-5s16 7 20-5c-4 17-15 18-22 10s-14-7-18 0Zm0 13c4-12 14-12 20-5s16 7 20-5c-4 17-15 18-22 10s-14-7-18 0Z" />
        </>
      )
    case 'postgres':
      return (
        <>
          <ellipse cx="24" cy="11" rx="16" ry="7" />
          <path d="M8 11v24c0 10 32 10 32 0V11M8 23c0 9 32 9 32 0" />
          <text x="24" y="35" fontSize="10">
            PG
          </text>
        </>
      )
    case 'canva':
      return (
        <>
          <circle cx="24" cy="24" r="20" />
          <text x="24" y="33" fontSize="26" fontStyle="italic">
            C
          </text>
        </>
      )
    case 'figma':
      return (
        <>
          <rect x="10" y="4" width="14" height="14" rx="7" />
          <rect x="24" y="4" width="14" height="14" rx="7" />
          <rect x="10" y="18" width="14" height="14" rx="7" />
          <circle cx="31" cy="25" r="7" />
          <path d="M24 32H17a7 7 0 1 0 7 7Z" />
        </>
      )
    case 'github':
      return (
        <>
          <path d="M18 43V34c-9 2-9-5-12-6m24 15V33c6-2 9-6 9-13 0-3-1-5-3-7 1-3 0-6-1-8l-8 4h-6l-8-4c-2 2-2 6-1 8-2 2-3 4-3 7 0 7 3 11 9 13" />
        </>
      )
    case 'seo':
      return (
        <>
          <circle cx="20" cy="20" r="13" />
          <path d="m30 30 12 12M12 25l6-7 5 4 6-8m-6 0h6v6" />
        </>
      )
    case 'ethernet':
      return (
        <>
          <path d="M14 5h20v16l-4 4v7H18v-7l-4-4ZM20 5v11m4-11v11m4-11v11M24 32v8a4 4 0 0 0 8 0v-3" />
        </>
      )
    default:
      return (
        <>
          <path d="M27 7a11 11 0 0 0-12 14L5 31a6 6 0 0 0 9 9l10-10A11 11 0 0 0 39 17l-7 7-8-8 7-8Z" />
          <circle cx="10" cy="35" r="1" fill="currentColor" />
        </>
      )
  }
}

// Individual accessible skill icon.
export function SkillIcon({ skill }) {
  return (
    <svg
      className="skill-vector"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: skill.color }}
      aria-hidden="true"
      focusable="false"
    >
      <IconShape id={skill.id} />
    </svg>
  )
}
