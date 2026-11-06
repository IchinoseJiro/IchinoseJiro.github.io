// Activity rail, file Explorer, search, and the bottom skills toolbox.
import NavigationHint from '../../components/navigation/NavigationHint.jsx'
import { SkillsSidebar } from '../skills/Skills.jsx'
import { files, sectionForFile } from '../../data/profileContent.js'
import { skillGroups } from '../../data/skillsData.js'
export default function WorkspaceSidebar({
  navigationVisible,
  compactLayout,
  sidebar,
  section,
  setSidebar,
  setSection,
  setIntroOpen,
  query,
  setQuery,
  active,
  setFile,
}) {
  return (
    <>
      {navigationVisible && (
        <aside className="activity">
          {['▤', '⌕', '⑂', '▷', '▦'].map((icon, i) => (
            <button
              aria-label={['Explorer', 'Search', 'Source Control', 'Run', 'Extensions'][i]}
              title={['Explorer', 'Search', 'Source Control', 'Run', 'Extensions'][i]}
              className={
                ['Explorer', 'Search', 'Source Control', 'Run', 'Extensions'][i] === section
                  ? 'chosen'
                  : ''
              }
              key={i}
              onClick={() => {
                if (compactLayout) setIntroOpen(false)
                setSection(['Explorer', 'Search', 'Source Control', 'Run', 'Extensions'][i])
                setSidebar((current) =>
                  section === ['Explorer', 'Search', 'Source Control', 'Run', 'Extensions'][i]
                    ? !current
                    : true,
                )
              }}
            >
              {icon}
            </button>
          ))}
        </aside>
      )}
      {navigationVisible && compactLayout && sidebar && (
        <button
          className="sidebar-backdrop"
          aria-label="Close file explorer"
          onClick={() => setSidebar(false)}
        />
      )}
      {navigationVisible && sidebar && (
        <aside className="sidebar">
          <div className="sidebar-main">
            <div className="side-title">
              {section.toUpperCase()}{' '}
              <button aria-label="Close sidebar" onClick={() => setSidebar(false)}>
                ‹
              </button>
            </div>
            {section === 'Explorer' && (
              <>
                <div className="folder">⌄ &nbsp; JIREH-CHANTENGCO</div>
                {files.map((f) => (
                  <button
                    draggable="true"
                    onDragStart={(event) => {
                      event.dataTransfer.setData('text/portfolio-file', f)
                      event.dataTransfer.effectAllowed = 'copy'
                    }}
                    className={'file ' + (active === f ? 'selected' : '')}
                    key={f}
                    onClick={() => setFile(f)}
                  >
                    <span>
                      {f === 'about.jsx'
                        ? '⚛'
                        : f === 'experience.jsx'
                          ? '◈'
                          : f === 'skills.jsx'
                            ? '#'
                            : '◇'}
                    </span>
                    {f}
                  </button>
                ))}
              </>
            )}
            {section === 'Search' && (
              <div className="side-content">
                <input
                  aria-label="Search portfolio files"
                  placeholder="Search files"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {files
                  .filter((f) => f.toLowerCase().includes(query.toLowerCase()))
                  .map((f) => (
                    <button className="file" key={f} onClick={() => setFile(f)}>
                      {f}
                    </button>
                  ))}
              </div>
            )}
            {section === 'Source Control' && (
              <div className="side-content">
                <b>PORTFOLIO FILES</b>
                <p>Explore and edit the information files in Jireh’s portfolio.</p>
                {files.map((f) => (
                  <button className="file" key={f} onClick={() => setFile(f)}>
                    ＋ {f}
                  </button>
                ))}
              </div>
            )}
            {section === 'Run' && (
              <div className="side-content">
                <b>QUICK NAVIGATION</b>
                {Object.entries(sectionForFile).map(([name, file]) => (
                  <button className="file" key={name} onClick={() => setFile(file)}>
                    ▷ {name}
                  </button>
                ))}
                <small>Use Run → Open Preview in New Tab to view the site.</small>
              </div>
            )}
            {section === 'Extensions' && (
              <div className="side-content">
                <b>SKILLS & TOOLS</b>
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <small>{group.title}</small>
                    <p>{group.skills.map((skill) => skill.name).join(' · ')}</p>
                  </div>
                ))}
              </div>
            )}
            {section === 'Explorer' && <NavigationHint />}
          </div>
          {/* Keep the toolbox and Outline/Timeline together at the bottom of Explorer. */}
          <div className="sidebar-bottom">
            {section === 'Explorer' && <SkillsSidebar />}
            <div className="side-foot" aria-label="Workspace sections">
              <div className="side-foot-row">
                <span aria-hidden="true">›</span>Outline
              </div>
              <div className="side-foot-row">
                <span aria-hidden="true">›</span>Timeline
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
