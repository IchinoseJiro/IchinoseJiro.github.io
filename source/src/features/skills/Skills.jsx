import SkillDialog from './SkillDialog.jsx'
import { SkillIcon } from './SkillIcon.jsx'
import { portfolioUrl, getSkillDestination } from '../../utils/portfolioNavigation.js'
// Shared skills UI. All category and item ordering comes directly from skillsData.js.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { allSkills, skillGroups } from '../../data/skillsData.js'
import './Skills.css'
import './SkillsInteractions.css'

const SkillsContext = createContext(null)

// Share a single skill popup or chart between the gallery sidebar and skills section.
export function SkillsProvider({ children }) {
  const [panel, setPanel] = useState(null)
  const [selectedSkillId, setSelectedSkillId] = useState('')
  const close = useCallback(() => setPanel(null), [])
  // Code-view links and gallery toolbox clicks point to the same main-content card.
  const revealSkill = useCallback((skill) => {
    const card = document.getElementById('skill-' + skill.id)
    if (!card) return null
    setSelectedSkillId(skill.id)
    card.scrollIntoView({ block: 'center', behavior: 'instant' })
    card.focus({ preventScroll: true })
    return card
  }, [])
  useEffect(() => {
    const revealHash = () => {
      const { skill, openDetails } = getSkillDestination(window.location, allSkills)
      if (!skill) return
      const card = revealSkill(skill)
      // A Simple-view toolbox link explicitly requests this skill's details on arrival.
      if (card && openDetails) {
        const rect = card.getBoundingClientRect()
        setPanel({
          type: 'detail',
          skill,
          anchor: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
        })
      }
    }
    const frame = requestAnimationFrame(revealHash)
    window.addEventListener('hashchange', revealHash)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', revealHash)
    }
  }, [revealSkill])
  const openSkill = (skill, event, fromSidebar = false) => {
    const target = fromSidebar ? revealSkill(skill) : event.currentTarget
    setSelectedSkillId(skill.id)
    const rect = (target || event.currentTarget).getBoundingClientRect()
    setPanel({
      type: 'detail',
      skill,
      anchor: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
    })
  }
  const openChart = () => setPanel({ type: 'chart' })
  return (
    <SkillsContext.Provider value={{ openSkill, openChart, selectedSkillId }}>
      {children}
      {panel && createPortal(<SkillDialog panel={panel} onClose={close} />, document.body)}
    </SkillsContext.Provider>
  )
}

// Preserve the same flat dataset order in every toolbox, with no priority reshuffling.
export function SkillsSidebar() {
  const context = useContext(SkillsContext)
  return (
    <section className="skills-sidebar" aria-label="Skills toolbox">
      <h3>SKILLS / TOOLBOX</h3>
      <div className="skills-mini-grid">
        {allSkills.map((skill) =>
          context ? (
            <button
              type="button"
              key={skill.id}
              className="skill-mini"
              title={skill.name}
              aria-label={skill.name}
              aria-haspopup="dialog"
              onClick={(event) => context.openSkill(skill, event, true)}
            >
              <SkillIcon skill={skill} />
              <span>{skill.name}</span>
            </button>
          ) : (
            <a
              key={skill.id}
              className="skill-mini"
              href={portfolioUrl('skill-' + skill.id)}
              title={skill.name}
              aria-label={skill.name}
            >
              <SkillIcon skill={skill} />
              <span>{skill.name}</span>
            </a>
          ),
        )}
      </div>
      {context ? (
        <button type="button" className="skills-see-all" onClick={context.openChart}>
          View proficiency chart ↗
        </button>
      ) : (
        <a className="skills-see-all" href={portfolioUrl('skills')}>
          Explore all skills ↗
        </a>
      )}
    </section>
  )
}

// Simple view uses its own provider; the gallery shares one with its Explorer toolbox.
export function SkillsSection(props) {
  const context = useContext(SkillsContext)
  return context ? (
    <SkillsGrid {...props} />
  ) : (
    <SkillsProvider>
      <SkillsGrid {...props} />
    </SkillsProvider>
  )
}
function SkillsGrid({ plain = false, toolboxLink = false }) {
  // Re-emphasize the gallery link each time a Simple-view skill is selected.
  const [toolboxClicks, setToolboxClicks] = useState(0)
  const [attentionSkill, setAttentionSkill] = useState('')
  const gridRef = useRef(null)
  const toolboxButtonRef = useRef(null)
  // Bring the highlighted destination below the sticky header when lower skills are clicked.
  useLayoutEffect(() => {
    if (!toolboxLink || !toolboxClicks || !toolboxButtonRef.current) return
    const rect = toolboxButtonRef.current.getBoundingClientRect()
    const headerBottom =
      document.querySelector('.simple-header')?.getBoundingClientRect().bottom ?? 0
    if (rect.top >= headerBottom + 16 && rect.bottom <= window.innerHeight - 16) return
    window.scrollTo({
      top: Math.max(0, window.scrollY + rect.top - headerBottom - 24),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }, [toolboxLink, toolboxClicks])
  // The blur is visual only: all skills remain clickable and any outside click dismisses it.
  useEffect(() => {
    if (!attentionSkill) return
    const dismiss = (event) => {
      // Keep the selected destination intact until the link's navigation completes.
      if (event.target.closest?.('.skills-toolbox-link') && gridRef.current?.contains(event.target))
        return
      const card = event.target.closest?.('.skill-card')
      if (card && gridRef.current?.contains(card)) return
      setAttentionSkill('')
    }
    const escape = (event) => {
      if (event.key === 'Escape') setAttentionSkill('')
    }
    document.addEventListener('click', dismiss, true)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('click', dismiss, true)
      document.removeEventListener('keydown', escape)
    }
  }, [attentionSkill])
  const { openSkill, openChart, selectedSkillId } = useContext(SkillsContext)
  const highlightedSkill = toolboxLink ? attentionSkill : selectedSkillId
  return (
    <section
      ref={gridRef}
      className={'skills-section' + (attentionSkill ? ' toolbox-attention-active' : '')}
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="skills-section-heading">
        <div>
          <p className="skills-eyebrow">{plain ? 'SKILLS & TOOLS' : '// SKILLS.JSON'}</p>
          <h2 id="skills-title">My toolbox, always growing.</h2>
        </div>
        {toolboxLink ? (
          <a
            ref={toolboxButtonRef}
            key={toolboxClicks}
            className={
              'skills-chart-button skills-toolbox-link' + (attentionSkill ? ' is-highlighted' : '')
            }
            href={portfolioUrl(
              attentionSkill ? 'skill-' + attentionSkill : 'skills',
              attentionSkill,
            )}
          >
            <span aria-hidden="true">↗</span> Explore full toolbox
          </a>
        ) : (
          <button
            type="button"
            className="skills-chart-button"
            onClick={openChart}
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">▥</span> View proficiency chart
          </button>
        )}
      </div>
      <p className="skills-intro">
        {toolboxLink
          ? 'Select a skill to highlight it, then explore the full toolbox for details and the proficiency chart.'
          : 'Select a skill for its description and self-assessed proficiency.'}
      </p>
      {attentionSkill &&
        createPortal(<div className="simple-toolbox-blur" aria-hidden="true" />, document.body)}
      {skillGroups.map((group) => (
        <div className="skills-group" key={group.title}>
          <h3>
            <span aria-hidden="true">⌄</span> {group.title}
          </h3>
          <div className="skills-card-grid">
            {group.skills.map((skill) => (
              <button
                type="button"
                className={'skill-card' + (highlightedSkill === skill.id ? ' is-selected' : '')}
                id={'skill-' + skill.id}
                key={skill.id}
                style={{ '--skill-accent': skill.color }}
                onClick={(event) => {
                  if (toolboxLink) {
                    setToolboxClicks((count) => count + 1)
                    setAttentionSkill(skill.id)
                  } else openSkill(skill, event)
                }}
                aria-haspopup={toolboxLink ? undefined : 'dialog'}
                aria-pressed={toolboxLink ? attentionSkill === skill.id : undefined}
                aria-label={
                  toolboxLink
                    ? 'Highlight ' + skill.name + ' and explore full toolbox'
                    : 'View ' + skill.name + ' proficiency details'
                }
              >
                <SkillIcon skill={skill} />
                <span className="skill-card-name">{skill.name}</span>
                <span className="skill-card-score">
                  {skill.score} / 10{' '}
                  <small>
                    {toolboxLink
                      ? attentionSkill === skill.id
                        ? 'Selected · Explore toolbox ↗'
                        : 'Explore toolbox ↗'
                      : highlightedSkill === skill.id
                        ? 'Selected · Details ↗'
                        : 'Details ↗'}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
