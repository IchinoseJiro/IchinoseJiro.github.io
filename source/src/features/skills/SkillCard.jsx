// Shared card content keeps Simple view, carousel cards, and transition copies consistent.
import { SkillIcon } from './SkillIcon.jsx'

export default function SkillCard({ skill, selected, onClick, visible = true, duplicate = false }) {
  const Element = duplicate ? 'div' : 'button'
  return (
    <Element
      type={duplicate ? undefined : 'button'}
      className={'skill-card' + (selected ? ' is-selected' : '')}
      id={duplicate ? undefined : 'skill-' + skill.id}
      style={{ '--skill-accent': skill.color }}
      onClick={duplicate ? undefined : onClick}
      aria-haspopup={duplicate ? undefined : 'dialog'}
      aria-label={duplicate ? undefined : 'Learn about ' + skill.name}
      aria-hidden={duplicate || !visible ? true : undefined}
      inert={duplicate || !visible}
      tabIndex={duplicate || !visible ? -1 : undefined}
    >
      <SkillIcon skill={skill} />
      <span className="skill-card-name">{skill.name}</span>
      <span className="skill-card-hint">Details ↗</span>
    </Element>
  )
}
