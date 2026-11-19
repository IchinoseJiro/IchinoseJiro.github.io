import SkillDialog from './SkillDialog.jsx'
import SkillCard from './SkillCard.jsx'
import SkillCarousel from './SkillCarousel.jsx'
import { SkillIcon } from './SkillIcon.jsx'
import { portfolioUrl, getSkillDestination } from '../../utils/portfolioNavigation.js'
// Shared skills UI. All category and item ordering comes directly from skillsData.js.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import { allSkills, skillGroups } from '../../data/skillsData.js'
import './Skills.css'
import './SkillsInteractions.css'

const SkillsContext = createContext(null)

// Share a single description popup between the gallery sidebar and skills section.
export function SkillsProvider({ children }) {
  const [panel, setPanel] = useState(null)
  const [selectedSkillId, setSelectedSkillId] = useState('')
  const revealersRef = useRef(new Map())
  const registerReveal = useCallback((skills, reveal) => {
    for (const skill of skills) revealersRef.current.set(skill.id, reveal)
    return () => {
      for (const skill of skills) {
        if (revealersRef.current.get(skill.id) === reveal) revealersRef.current.delete(skill.id)
      }
    }
  }, [])
  const close = useCallback(() => setPanel(null), [])
  // Code-view links and gallery toolbox clicks point to the same main-content card.
  const revealSkill = useCallback((skill) => {
    // Commit the carousel position before measuring the target or opening its anchored popup.
    flushSync(() => {
      revealersRef.current.get(skill.id)?.(skill.id)
      setSelectedSkillId(skill.id)
    })
    const card = document.getElementById('skill-' + skill.id)
    if (!card) return null
    card.scrollIntoView({ block: 'center', behavior: 'instant' })
    card.focus({ preventScroll: true })
    return card
  }, [])
  useEffect(() => {
    const revealHash = () => {
      const { skill, openDetails } = getSkillDestination(window.location, allSkills)
      if (!skill) return
      const card = revealSkill(skill)
      // Explicit detail links also work when opened directly or from an older bookmark.
      if (card && openDetails) {
        const rect = card.getBoundingClientRect()
        setPanel({
          skill,
          trigger: card,
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
    const target = (fromSidebar && revealSkill(skill)) || event.currentTarget
    setSelectedSkillId(skill.id)
    const rect = target.getBoundingClientRect()
    setPanel({
      skill,
      trigger: target,
      anchor: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
    })
  }
  return (
    <SkillsContext.Provider value={{ openSkill, selectedSkillId, registerReveal }}>
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
      <a className="skills-see-all" href={context ? '#skills' : portfolioUrl('skills')}>
        Explore all skills ↗
      </a>
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
function SkillsGrid({ plain = false, toolboxLink = false, carousel = false }) {
  const { openSkill, selectedSkillId, registerReveal } = useContext(SkillsContext)
  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-title">
      <div className="skills-section-heading">
        <div>
          <p className="skills-eyebrow">{plain ? 'SKILLS & TOOLS' : '// SKILLS.JSON'}</p>
          <h2 id="skills-title">My toolbox, always growing.</h2>
        </div>
        {toolboxLink && (
          <a className="skills-toolbox-link" href={portfolioUrl('skills')}>
            Explore full toolbox ↗
          </a>
        )}
      </div>
      <p className="skills-intro">
        {toolboxLink
          ? 'A preview of each category. Select a skill to learn what it is used for, or explore the full toolbox for the complete collection.'
          : 'Explore the categories below. Select any skill or tool to learn what it is used for.'}
      </p>
      <div className={'skills-groups-grid' + (carousel ? ' is-carousel-layout' : '')}>
        {skillGroups.map((group) =>
          carousel ? (
            <SkillCarousel
              key={group.title}
              group={group}
              selectedSkillId={selectedSkillId}
              openSkill={openSkill}
              registerReveal={registerReveal}
            />
          ) : (
            <section className="skills-group" key={group.title} aria-label={group.title}>
              <h3>{group.title}</h3>
              <div className="skills-card-grid">
                {(toolboxLink ? group.skills.slice(0, 2) : group.skills).map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    selected={selectedSkillId === skill.id}
                    onClick={(event) => openSkill(skill, event)}
                  />
                ))}
              </div>
            </section>
          ),
        )}
      </div>
    </section>
  )
}
