import { currentProject, projects } from '../../data/projects.js'
// Project gallery page: current personal project, college work, skills, and screenshot viewer.
import { useEffect, useRef, useState } from 'react'
import './Portfolio.css'
import BrandLogo from '../../components/branding/BrandLogo.jsx'
import SocialLinks from '../../components/contact/SocialLinks.jsx'
import { SkillsProvider, SkillsSection, SkillsSidebar } from '../../features/skills/Skills.jsx'
import useViewMode from '../../hooks/useViewMode.js'
import '../../styles/portfolio-shared.css'

const explorerSections = ['projects', currentProject.id, ...projects.map(({ id }) => id), 'skills']

export default function Portfolio() {
  // Gallery display preference and screenshot dialog state.
  const [viewMode] = useViewMode()
  const [preview, setPreview] = useState(null)
  const [activeSection, setActiveSection] = useState('projects')
  const dialogRef = useRef(null)
  const explorerRef = useRef(null)
  const sectionBarRef = useRef(null)
  // Open a project or skill directly using its URL anchor.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1))
      // SkillsProvider centers and highlights skill anchors; keep project anchors here.
      if (!target?.classList.contains('skill-card')) target?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])
  // Follow the last section to reach the reading area below the sticky title.
  useEffect(() => {
    const sections = explorerSections.map((id) => document.getElementById(id))
    let frame
    const updateSection = () => {
      frame = undefined
      const barBottom = Math.max(0, sectionBarRef.current.getBoundingClientRect().bottom)
      const readingLine = barBottom + Math.min(160, (window.innerHeight - barBottom) * 0.25)
      let current = 'projects'

      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= readingLine) current = section.id
      }
      setActiveSection(current)
    }
    const scheduleUpdate = () => {
      if (frame === undefined) frame = requestAnimationFrame(updateSection)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  // Keep the active link visible when the Explorer becomes a horizontal strip.
  useEffect(() => {
    const explorer = explorerRef.current
    const revealActiveLink = () => {
      const link = explorer.querySelector('[aria-current="location"]')
      if (!link || explorer.scrollWidth <= explorer.clientWidth) return
      const row = explorer.getBoundingClientRect()
      const item = link.getBoundingClientRect()
      if (item.left < row.left) explorer.scrollLeft += item.left - row.left
      else if (item.right > row.right) explorer.scrollLeft += item.right - row.right
    }

    revealActiveLink()
    window.addEventListener('resize', revealActiveLink)
    return () => window.removeEventListener('resize', revealActiveLink)
  }, [activeSection])

  useEffect(() => {
    if (preview && !dialogRef.current.open) dialogRef.current.showModal()
  }, [preview])

  return (
    <SkillsProvider>
      <div className={'pg-shell' + (viewMode === 'simple' ? ' gallery-simple' : '')}>
        <a className="pg-skip" href="#projects">
          Skip to projects
        </a>
        {/* Gallery header: branding and return-home link. */}
        <header className="pg-titlebar">
          <a className="pg-brand" href="/" aria-label="Back to Jireh's home page">
            <b>
              <BrandLogo decorative />
            </b>
            <span>
              LunR Code <i>/ Jireh Chantengco</i>
            </span>
          </a>
          <div className="pg-header-actions">
            <a className="pg-home" href="/">
              ← Back to home
            </a>
          </div>
        </header>
        <div className="pg-layout">
          {/* Left activity icon rail. */}
          <aside className="pg-rail" aria-label="Workspace">
            <a href="/" aria-label="Home">
              ⌂
            </a>
            <a href="#projects" className="pg-rail-active" aria-label="Projects">
              ▧
            </a>
            <span aria-hidden="true">⌘</span>
            <span className="pg-rail-bottom" title="LunR Code">
              <BrandLogo />
            </span>
          </aside>
          {/* Explorer: current project, college work, skills, and workspace notes. */}
          <nav ref={explorerRef} className="pg-explorer" aria-label="Project explorer">
            <div className="pg-explorer-title">
              {viewMode === 'simple' ? 'EXPLORE' : 'EXPLORER'} <span>···</span>
            </div>
            <p>⌄ &nbsp; MY PROJECTS</p>
            <a
              className="pg-readme"
              href="#projects"
              aria-current={activeSection === 'projects' ? 'location' : undefined}
            >
              <span>ⓘ</span> {viewMode === 'simple' ? 'Projects' : 'README.md'}
            </a>
            <a
              className="pg-current-link"
              href="#re-spawnpoint"
              aria-current={activeSection === currentProject.id ? 'location' : undefined}
            >
              <span>◉</span> Re-spawnpoint <small>IN PROGRESS</small>
            </a>
            {projects.map((project) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                aria-current={activeSection === project.id ? 'location' : undefined}
              >
                <span style={{ color: project.accent }}>◇</span> {project.folder}
              </a>
            ))}
            <a
              className="pg-skills-link"
              href="#skills"
              aria-current={activeSection === 'skills' ? 'location' : undefined}
            >
              <span>⌘</span> Skills
            </a>
            <div className="pg-explorer-note">
              <span>WORKSPACE NOTES</span>
              <p>
                Building now.
                <br />
                Learning from what came before.
              </p>
              <code>1 current · 2 college</code>
            </div>
            <SkillsSidebar />
          </nav>
          <main className="pg-main" id="projects">
            {/* Sticky title for the project gallery and skills. */}
            <div ref={sectionBarRef} className="pg-section-bar">
              Projects &amp; Skills
            </div>
            <div className="pg-content">
              {/* Gallery introduction and current/college project counts. */}
              <header className="pg-hero">
                <p className="pg-eyebrow">// THE PROJECT WORKSPACE</p>
                <h1>
                  Still building.
                  <br />
                  <span>Always learning.</span>
                  <i aria-hidden="true" />
                </h1>
                <p className="pg-intro">
                  Explore what I’m working on now, alongside the college projects that helped me get
                  started.
                </p>
                <div className="pg-meta">
                  <span>
                    <b>01</b> current project
                  </span>
                  <span>
                    <b>02</b> college projects
                  </span>
                  <span>Ideas → work in progress</span>
                </div>
                <SocialLinks />
              </header>
              {/* Featured current personal project, before the college work. */}
              <section
                className="pg-current"
                id="re-spawnpoint"
                aria-labelledby="current-project-title"
              >
                <div className="pg-section-heading">
                  <div>
                    <p className="pg-eyebrow">// CURRENTLY BUILDING</p>
                    <h2 id="current-project-title">The next chapter.</h2>
                  </div>
                  <span className="pg-progress-badge">In progress</span>
                </div>
                <article className="pg-current-card">
                  <div className="pg-current-image">
                    <button
                      className="pg-image-button"
                      type="button"
                      onClick={() => setPreview(currentProject)}
                      aria-label="Enlarge Re-spawnpoint screenshot"
                    >
                      <img
                        src={currentProject.image}
                        alt={currentProject.alt}
                        width={currentProject.width}
                        height={currentProject.height}
                      />
                      <span>↗ View storefront screenshot</span>
                    </button>
                  </div>
                  <div className="pg-current-info">
                    <p className="pg-eyebrow">PERSONAL PROJECT · OUTSIDE THE CLASSROOM</p>
                    <h3>Re-spawnpoint</h3>
                    <p className="pg-current-focus">A gaming storefront, taking shape.</p>
                    <p>
                      An ongoing personal SaaS project, currently available as a gaming gear
                      storefront preview. I’m continuing to develop it beyond my college work.
                    </p>
                    <ul>
                      <li>Product search, category filters, and sorting</li>
                      <li>Wishlist and shopping bag saved in the browser</li>
                      <li>Responsive storefront for desktop, tablet, and mobile</li>
                    </ul>
                    <div className="pg-tags" aria-label="Current preview technologies">
                      <span>HTML</span>
                      <span>CSS</span>
                      <span>JavaScript</span>
                    </div>
                    <a
                      className="pg-current-visit"
                      href={currentProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit live preview <span aria-hidden="true">↗</span>
                      <span className="pg-sr-only"> (opens in a new tab)</span>
                    </a>
                    <p className="pg-current-note">
                      Frontend demo with sample products and prices. Checkout and newsletter signup
                      are preview-only.
                    </p>
                  </div>
                </article>
              </section>
              {/* College work: COFFEEGO and Autoworld Carwash cards. */}
              <section className="pg-college" aria-labelledby="college-projects-title">
                <div className="pg-section-heading">
                  <div>
                    <p className="pg-eyebrow">// WHERE IT STARTED</p>
                    <h2 id="college-projects-title">College projects</h2>
                    <p>
                      Two websites we created during college, bringing design, code, and databases
                      together.
                    </p>
                  </div>
                </div>
                <div className="pg-projects">
                  {projects.map((project) => (
                    <article
                      className="pg-card"
                      id={project.id}
                      key={project.id}
                      style={{
                        '--project-accent': project.accent,
                        '--entry-delay': `${Number(project.number) * 100}ms`,
                      }}
                    >
                      <div className="pg-card-bar">
                        <span>
                          <b>&lt;/&gt;</b>{' '}
                          {viewMode === 'simple' ? (
                            project.title
                          ) : (
                            <>
                              {project.folder}
                              <i>/</i>index.html
                            </>
                          )}
                        </span>
                        <small>PROJECT {project.number}</small>
                      </div>
                      <div className="pg-card-body">
                        <div className="pg-image-area">
                          <button
                            type="button"
                            className="pg-image-button"
                            onClick={() => setPreview(project)}
                            aria-label={`Enlarge ${project.title} screenshot`}
                          >
                            <img
                              src={project.image}
                              alt={project.alt}
                              width={project.width}
                              height={project.height}
                              loading={project.number === '01' ? 'eager' : 'lazy'}
                            />
                            <span>↗ View full screenshot</span>
                          </button>
                          <p>SCREENSHOT FROM OUR COLLEGE PROJECT</p>
                          <p className="pg-project-note">{project.availability}</p>
                        </div>
                        <div className="pg-project-info">
                          <span className="pg-project-number">PROJECT / {project.number}</span>
                          <h2>{project.title}</h2>
                          <p className="pg-course">{project.course}</p>
                          <p className="pg-description">{project.description}</p>
                          <div className="pg-tags" aria-label="Technologies used">
                            {['HTML', 'CSS', project.database].map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                          <div className="pg-code-note">
                            <span>const</span> project = {'{'}
                            <br />
                            &nbsp; type: <b>'College website'</b>,<br />
                            &nbsp; database: <b>'{project.database}'</b>
                            <br />
                            {'}'}
                          </div>
                          <button
                            className="pg-preview-button"
                            type="button"
                            onClick={() => setPreview(project)}
                          >
                            Explore the screenshot <span>↗</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              {/* Full shared skills grid. */}
              <SkillsSection plain={viewMode === 'simple'} />
              {/* Closing message and return-home link. */}
              <section className="pg-endnote">
                <span aria-hidden="true">
                  <BrandLogo decorative />
                </span>
                <div>
                  <h2>Every project starts with a little curiosity.</h2>
                  <p>Thanks for exploring my work, past and in progress.</p>
                </div>
                <a href="/">Back to my workspace ↗</a>
              </section>
            </div>
          </main>
        </div>
        {/* Gallery status bar and project totals. */}
        <footer className="pg-status">
          <span>⎇ main &nbsp; ◉ 1 in progress · 2 college</span>
          <span>Lowell Jireh P. Chantengco · Project portfolio</span>
          <span className="pg-status-brand">
            <BrandLogo decorative />
            LunR Code
          </span>
        </footer>
        {/* Screenshot viewer shared by current and college projects. */}
        <dialog
          ref={dialogRef}
          className="pg-dialog"
          aria-labelledby="pg-preview-title"
          onClose={() => setPreview(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current.close()
          }}
        >
          {preview && (
            <>
              <div className="pg-dialog-bar">
                <h2 id="pg-preview-title">
                  {preview.title} <span>/ screenshot.png</span>
                </h2>
                <button
                  type="button"
                  onClick={() => dialogRef.current.close()}
                  aria-label="Close screenshot"
                >
                  ×
                </button>
              </div>
              <div className="pg-dialog-image">
                <img
                  src={preview.image}
                  alt={preview.alt}
                  width={preview.width}
                  height={preview.height}
                />
              </div>
            </>
          )}
        </dialog>
      </div>
    </SkillsProvider>
  )
}
