// One category per row. Rotate real cards after each animation so visible cards stay interactive.
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import SkillCard from './SkillCard.jsx'
import './SkillCarousel.css'

export default function SkillCarousel({ group, selectedSkillId, openSkill, registerReveal }) {
  const count = group.skills.length
  const [start, setStart] = useState(0)
  const [visible, setVisible] = useState(1)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const widthRef = useRef(0)
  const motionRef = useRef({ start: 0, visible: 1, animation: null, queue: [] })
  const gestureRef = useRef(null)
  const suppressClickRef = useRef(false)
  const canMove = count > visible
  const ordered = [...group.skills.slice(start), ...group.skills.slice(0, start)]

  const stopMovement = useCallback(() => {
    const motion = motionRef.current
    motion.queue = []
    motion.animation?.cancel()
    motion.animation = null
  }, [])

  const playNext = useCallback(
    function playNext() {
      const motion = motionRef.current
      const track = trackRef.current
      if (!track || motion.animation || !motion.queue.length || count <= motion.visible) return
      const direction = motion.queue.shift()
      const next = (motion.start + direction + count) % count
      const commit = () => {
        motion.start = next
        flushSync(() => setStart(next))
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        commit()
        queueMicrotask(playNext)
        return
      }
      const stride = (track.getBoundingClientRect().width + 12) / motion.visible
      const animation = track.animate(
        [
          { transform: `translateX(${-stride}px)` },
          { transform: `translateX(${-stride - direction * stride}px)` },
        ],
        { duration: 280, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' },
      )
      motion.animation = animation
      animation.finished
        .then(() => {
          if (motion.animation !== animation) return
          commit()
          motion.animation = null
          animation.cancel()
          requestAnimationFrame(playNext)
        })
        .catch(() => {
          // Resizing, revealing a linked skill, or opening a popup can cancel this movement.
        })
    },
    [count],
  )

  const move = (direction) => {
    motionRef.current.queue.push(direction)
    playNext()
  }

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const resize = (width) => {
      if (Math.abs(width - widthRef.current) < 1) return
      widthRef.current = width
      const next = Math.min(count, width >= 740 ? 3 : width >= 460 ? 2 : 1)
      stopMovement()
      motionRef.current.visible = next
      setVisible(next)
      if (next === count) {
        motionRef.current.start = 0
        setStart(0)
      }
    }
    resize(viewport.getBoundingClientRect().width - 12)
    const observer = new ResizeObserver(([entry]) => resize(entry.contentRect.width))
    observer.observe(viewport)
    return () => {
      observer.disconnect()
      stopMovement()
    }
  }, [count, stopMovement])

  useLayoutEffect(
    () =>
      registerReveal(group.skills, (skillId) => {
        stopMovement()
        const position = group.skills.findIndex((skill) => skill.id === skillId)
        const next = count <= motionRef.current.visible ? 0 : position
        motionRef.current.start = next
        setStart(next)
      }),
    [count, group.skills, registerReveal, stopMovement],
  )

  const finishGesture = (event) => {
    const gesture = gestureRef.current
    gestureRef.current = null
    if (!gesture || gesture.id !== event.pointerId) return
    const horizontal = event.clientX - gesture.x
    const vertical = event.clientY - gesture.y
    if (canMove && Math.abs(horizontal) > 45 && Math.abs(horizontal) > Math.abs(vertical) * 1.2) {
      suppressClickRef.current = true
      move(horizontal < 0 ? 1 : -1)
    }
  }

  return (
    <section
      className="skills-group skills-carousel"
      aria-roledescription="carousel"
      aria-label={group.title}
    >
      <header className="skills-carousel-heading">
        <h3>{group.title}</h3>
        {canMove && (
          <div className="skills-carousel-controls">
            <button
              type="button"
              aria-label={'Previous skill in ' + group.title}
              onClick={() => move(-1)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              aria-label={'Next skill in ' + group.title}
              onClick={() => move(1)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </header>
      <div
        className="skills-carousel-viewport"
        ref={viewportRef}
        style={{ '--visible-skills': visible }}
        onPointerDown={(event) => {
          suppressClickRef.current = false
          if (event.pointerType === 'mouse' || !event.isPrimary) return
          gestureRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
        }}
        onPointerMove={(event) => {
          const gesture = gestureRef.current
          if (!gesture || gesture.id !== event.pointerId) return
          if (Math.abs(event.clientX - gesture.x) > 45 && Math.abs(event.clientY - gesture.y) < 35)
            event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerUp={finishGesture}
        onPointerCancel={() => {
          gestureRef.current = null
        }}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return
          suppressClickRef.current = false
          event.preventDefault()
          event.stopPropagation()
        }}
      >
        <div className={'skills-carousel-track' + (canMove ? ' is-looping' : '')} ref={trackRef}>
          {canMove && (
            <SkillCard
              skill={group.skills[(start + count - 1) % count]}
              selected={selectedSkillId === group.skills[(start + count - 1) % count].id}
              duplicate
            />
          )}
          {ordered.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              visible={index < visible}
              selected={selectedSkillId === skill.id}
              onClick={(event) => {
                stopMovement()
                openSkill(skill, event)
              }}
            />
          ))}
        </div>
      </div>
      <p className="skills-carousel-status" role="status" aria-live="polite" aria-atomic="true">
        {ordered
          .slice(0, visible)
          .map((skill) => skill.name)
          .join(', ')}
        . {visible} of {count} skills visible.
      </p>
    </section>
  )
}
