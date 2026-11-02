import { useEffect, useRef, useState } from 'react'
import './Portfolio.css'
import BrandLogo from './BrandLogo.jsx'
import SocialLinks from './SocialLinks.jsx'
import { SkillsSection, SkillsSidebar } from './Skills.jsx'
import useViewMode from './useViewMode.js'
import ViewModeMenu from './ViewModeMenu.jsx'

const projects = [
  {
    id: 'coffeego', number: '01', title: 'COFFEEGO', folder: 'coffeego',
    course: 'Advanced Database Systems', database: 'MongoDB',
    description: 'A project under Advanced Database Systems. The website we made uses HTML, CSS, and MongoDB.',
    availability: "Unfortunately, I've lost the copy of our project for this one.",
    image: '/projects/coffeego.png', width: 1897, height: 896,
    alt: 'COFFEEGO college website with an orange navigation bar, coffee bean artwork, and an Order Now button.',
    accent: '#d9a465',
  },
  {
    id: 'autoworld', number: '02', title: 'Autoworld Carwash', folder: 'autoworld-carwash',
    course: 'WebServer', database: 'MySQL',
    description: 'A project under WebServer. The website we made consists of HTML and CSS, with MySQL for the backend.',
    availability: "This one was requested to be dissolved by the owner and didn't approve to let us have a copy.",
    image: '/projects/autoworld-carwash.png', width: 1864, height: 1470,
    alt: 'Autoworld Carwash college website showing a car workshop, a car wash request form, and an About Us section.',
    accent: '#e9868b',
  },
]

export default function Portfolio() {
  const [viewMode, setViewMode] = useViewMode()
  const [preview, setPreview] = useState(null)
  const dialogRef = useRef(null)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1))
      target?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])
  useEffect(() => {
    if (preview && !dialogRef.current.open) dialogRef.current.showModal()
  }, [preview])

  return <div className={'pg-shell'+(viewMode==='simple'?' gallery-simple':'')}>
    <a className="pg-skip" href="#projects">Skip to projects</a>
    <header className="pg-titlebar">
      <a className="pg-brand" href="/" aria-label="Back to Jireh's home page"><b><BrandLogo decorative /></b><span>LunR Code <i>/ Jireh Chantengco</i></span></a>
      <div className="pg-header-actions"><ViewModeMenu mode={viewMode} onChange={setViewMode} /><a className="pg-home" href="/">← Back to home</a></div>
    </header>
    <div className="pg-layout">
      <aside className="pg-rail" aria-label="Workspace"><a href="/" aria-label="Home">⌂</a><a href="#projects" className="pg-rail-active" aria-label="Projects">▧</a><span aria-hidden="true">⌘</span><span className="pg-rail-bottom" title="LunR Code"><BrandLogo /></span></aside>
      <nav className="pg-explorer" aria-label="Project explorer">
        <div className="pg-explorer-title">{viewMode==='simple'?'EXPLORE':'EXPLORER'} <span>···</span></div>
        <p>⌄ &nbsp; COLLEGE-WORK</p>
        <a className="pg-readme" href="#projects"><span>ⓘ</span> {viewMode==='simple'?'Projects':'README.md'}</a>
        {projects.map(project => <a key={project.id} href={`#${project.id}`}><span style={{ color: project.accent }}>◇</span> {project.folder}</a>)}
        <a className="pg-skills-link" href="#skills"><span>⌘</span> Skills</a>
        <SkillsSidebar />
        <div className="pg-explorer-note"><span>WORKSPACE NOTES</span><p>College projects.<br />Real learning, one line at a time.</p><code>2 projects · 2 databases</code></div>
      </nav>
      <main className="pg-main" id="projects">
        <nav className="pg-tabbar" aria-label="Portfolio sections"><a href="#projects"><span><i>ⓘ</i> {viewMode==='simple'?'Projects':'portfolio.md'}</span></a><a className="pg-skills-tab" href="#skills">⌘ &nbsp; Skills</a><small>PROJECT SHOWCASE</small></nav>
        <div className="pg-content">
          <header className="pg-hero">
            <p className="pg-eyebrow">// MY COLLEGE WORK</p>
            <h1>Built in class.<br /><span>Made for the web.</span><i aria-hidden="true" /></h1>
            <p className="pg-intro">A look inside two websites we created during college, bringing design, code, and databases together.</p>
            <div className="pg-meta"><span><b>02</b> projects</span><span>HTML + CSS</span><span>MongoDB / MySQL</span></div>
            <SocialLinks />
          </header>
          <div className="pg-projects">
            {projects.map(project => <article className="pg-card" id={project.id} key={project.id} style={{ '--project-accent': project.accent, '--entry-delay': `${Number(project.number) * 100}ms` }}>
              <div className="pg-card-bar"><span><b>&lt;/&gt;</b> {viewMode==='simple'?project.title:<>{project.folder}<i>/</i>index.html</>}</span><small>PROJECT {project.number}</small></div>
              <div className="pg-card-body">
                <div className="pg-image-area"><button type="button" className="pg-image-button" onClick={() => setPreview(project)} aria-label={`Enlarge ${project.title} screenshot`}><img src={project.image} alt={project.alt} width={project.width} height={project.height} loading={project.number === '01' ? 'eager' : 'lazy'} /><span>↗ View full screenshot</span></button><p>SCREENSHOT FROM OUR COLLEGE PROJECT</p><p className="pg-project-note">{project.availability}</p></div>
                <div className="pg-project-info"><span className="pg-project-number">PROJECT / {project.number}</span><h2>{project.title}</h2><p className="pg-course">{project.course}</p><p className="pg-description">{project.description}</p><div className="pg-tags" aria-label="Technologies used">{['HTML', 'CSS', project.database].map(tech => <span key={tech}>{tech}</span>)}</div><div className="pg-code-note"><span>const</span> project = {'{'}<br />&nbsp; type: <b>'College website'</b>,<br />&nbsp; database: <b>'{project.database}'</b><br />{'}'}</div><button className="pg-preview-button" type="button" onClick={() => setPreview(project)}>Explore the screenshot <span>↗</span></button></div>
              </div>
            </article>)}
          </div>
          <SkillsSection plain={viewMode==='simple'} />
          <section className="pg-endnote"><span aria-hidden="true"><BrandLogo decorative /></span><div><h2>Every project starts with a little curiosity.</h2><p>Thanks for exploring my college work.</p></div><a href="/">Back to my workspace ↗</a></section>
        </div>
      </main>
    </div>
    <footer className="pg-status"><span>⎇ main &nbsp; ✓ 2 projects</span><span>Lowell Jireh P. Chantengco · College portfolio</span><span className="pg-status-brand"><BrandLogo decorative />LunR Code</span></footer>
    <dialog ref={dialogRef} className="pg-dialog" aria-labelledby="pg-preview-title" onClose={() => setPreview(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close() }}>
      {preview && <><div className="pg-dialog-bar"><h2 id="pg-preview-title">{preview.title} <span>/ screenshot.png</span></h2><button type="button" onClick={() => dialogRef.current.close()} aria-label="Close screenshot">×</button></div><div className="pg-dialog-image"><img src={preview.image} alt={preview.alt} width={preview.width} height={preview.height} /></div></>}
    </dialog>
  </div>
}
