// Anchored skill details and full proficiency chart, using the shared ordered dataset.
import { useLayoutEffect, useRef } from 'react'
import { allSkills, skillGroups } from '../../data/skillsData.js'
import { SkillIcon } from './SkillIcon.jsx'
// Native modal provides background inertness, Escape handling, and keyboard focus containment.
// Position compact details near their trigger, clamped to the viewport; center on phones.
export default function SkillDialog({ panel, onClose }) {
  const ref = useRef(null)
  const chart = panel.type === 'chart'
  useLayoutEffect(() => {
    const dialog = ref.current
    const previous = document.activeElement
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('skills-dialog-open')
    const position = () => {
      if (chart) return
      const width = document.documentElement.clientWidth
      const height = window.innerHeight
      const rect = dialog.getBoundingClientRect()
      const anchor = panel.anchor
      const left =
        width <= 600
          ? (width - rect.width) / 2
          : Math.min(width - rect.width - 12, Math.max(12, anchor.right + 12))
      const top =
        width <= 600
          ? (height - rect.height) / 2
          : Math.min(height - rect.height - 12, Math.max(12, anchor.top))
      dialog.style.left = left + 'px'
      dialog.style.top = top + 'px'
    }
    position()
    window.addEventListener('resize', position)
    return () => {
      document.body.classList.remove('skills-dialog-open')
      window.removeEventListener('resize', position)
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
  }, [chart, panel])
  const outside = (event) => {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onClose()
  }
  return (
    <dialog
      ref={ref}
      className={'skill-dialog ' + (chart ? 'skill-chart-dialog' : 'skill-detail-dialog')}
      aria-labelledby="skill-dialog-title"
      onClose={onClose}
      onClick={outside}
    >
      <header className="skill-dialog-header">
        <div>
          {chart ? (
            <>
              <small>MY TOOLBOX</small>
              <h2 id="skill-dialog-title">Self-assessed skill proficiency</h2>
            </>
          ) : (
            <>
              <small>SKILL / TOOL</small>
              <h2 id="skill-dialog-title">{panel.skill.name} proficiency</h2>
            </>
          )}
        </div>
        <button
          autoFocus
          type="button"
          className="skill-dialog-close"
          aria-label={chart ? 'Close proficiency chart' : 'Close skill details'}
          onClick={onClose}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
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
      {chart ? (
        <ProficiencyChart />
      ) : (
        <div className="skill-detail-body">
          <SkillIcon skill={panel.skill} />
          <p>{panel.skill.description}</p>
          <div className="skill-rating-label">
            <span>Self-assessed proficiency</span>
            <strong>{panel.skill.score} / 10</strong>
          </div>
          <meter
            className="skill-detail-meter"
            min="0"
            max="10"
            value={panel.skill.score}
            aria-label={panel.skill.name + ' self-assessed proficiency'}
          >
            {panel.skill.score} out of 10
          </meter>
          <small className="skill-rating-note">
            A personal rating, rather than a verified test result.
          </small>
        </div>
      )}
    </dialog>
  )
}

// All skill values remain numeric and visible; CSS bars use a fixed 0–10 scale.
function ProficiencyChart() {
  return (
    <div className="skill-chart-content">
      <p>
        My personal ratings on a scale from 0 to 10. These are self-assessments, not verified test
        results.
      </p>
      <div className="skill-chart-axis" aria-hidden="true">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
      {skillGroups.map((group) => (
        <section className="skill-chart-group" key={group.title} aria-label={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.skills.map((skill) => (
              <li className="skill-chart-row" key={skill.id} data-skill-id={skill.id}>
                <span className="skill-chart-name">
                  <SkillIcon skill={skill} />
                  {skill.name}
                </span>
                <span className="skill-chart-track" aria-hidden="true">
                  <span style={{ width: skill.score * 10 + '%', background: skill.color }} />
                </span>
                <span className="skill-chart-value">
                  {skill.score}
                  <span className="skill-sr-only"> / 10</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="skill-chart-footnote">
        {allSkills.length} skills · Category order matches the toolbox.
      </p>
    </div>
  )
}
