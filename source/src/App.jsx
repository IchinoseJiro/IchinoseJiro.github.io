// Code view home page: editor window, navigation, tabs, terminal, and introduction panel.
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import './HomeWorkspace.css'
import SimpleView from './SimpleView.jsx'
import useViewMode from './useViewMode.js'
import NavigationHint from './NavigationHint.jsx'
import AboutPortfolio from './AboutPortfolio.jsx'
import WebsiteGuide from './WebsiteGuide.jsx'
import ViewTransition from './ViewTransition.jsx'
import useViewTransition from './useViewTransition.js'
import { initialDocuments, files, sectionForFile } from './profileContent.js'
import BrandLogo from './BrandLogo.jsx'
import SocialLinks from './SocialLinks.jsx'
import { SkillsSidebar } from './Skills.jsx'
import { skillGroups } from './skillsData.js'
import './PortfolioEnhancements.css'

// Responsive rules and top menu names.
const compactLayoutQuery = '(max-width: 1100px), (pointer: coarse) and (max-width: 1366px)'
const menuNames = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']
// Syntax highlighting for comments, strings, keywords, and punctuation.
const codeTokenPattern = /\/\/[^^\n]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[{}()[\].,:;]|=>|[=+*/<>!-]+/g
const codeKeywords = new Set(['const','let','var','function','return','export','default','import','from','if','else','new','true','false','null','undefined','async','await'])
function highlightCode(source) {
  const nodes = []
  let position = 0
  let key = 0
  for (const match of source.matchAll(codeTokenPattern)) {
    const token = match[0]
    const start = match.index
    if (start > position) nodes.push(source.slice(position, start))
    const kind = token.startsWith('//') || token.startsWith('/*') ? 'comment'
      : /^['"`]/.test(token) ? 'string'
      : codeKeywords.has(token) ? 'keyword'
      : /^\d/.test(token) ? 'number'
      : /^[A-Za-z_$]/.test(token) ? 'identifier'
      : 'punctuation'
    nodes.push(<span className={`syntax-${kind}`} key={key++}>{token}</span>)
    position = start + token.length
  }
  if (position < source.length) nodes.push(source.slice(position))
  return nodes
}

function App() {
// View, editor, sidebar, popup, and terminal state, preserved while switching views.
  const [viewMode, setViewMode] = useViewMode()
  // View menu transitions keep App mounted so editor documents and tabs survive.
  const [viewTransition, startViewTransition] = useViewTransition(viewMode, setViewMode)
  const isSimple = viewMode === 'simple'
  const [active, setActive] = useState('about.jsx')
  const [openTabs, setOpenTabs] = useState(['about.jsx'])
  const [secondaryFile, setSecondaryFile] = useState('')
  const [introOpen, setIntroOpen] = useState(() => !window.matchMedia(compactLayoutQuery).matches)
  const [introPosition, setIntroPosition] = useState(null)
  const [section, setSection] = useState('Explorer')
  const [compactLayout, setCompactLayout] = useState(() => window.matchMedia(compactLayoutQuery).matches)
  const [sidebar, setSidebar] = useState(true)
  const [navigationVisible, setNavigationVisible] = useState(true)
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState('')
  const [documents, setDocuments] = useState(() => ({ ...initialDocuments }))
  const [openMenu, setOpenMenu] = useState('')
  const [menuAnchor, setMenuAnchor] = useState({})
  const [wordWrap, setWordWrap] = useState(true)
  const [lineNumbers, setLineNumbers] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalText, setTerminalText] = useState('Portfolio terminal ready. Typing only — commands are not executed.')
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLines, setTerminalLines] = useState([])
  // Introduction > How to use: centered website instructions, also available from Help.
  const [guideOpen, setGuideOpen] = useState(false)
  const closeGuide = useCallback(() => setGuideOpen(false), [])
  const [aboutOpen, setAboutOpen] = useState(false)
  const closeAbout = useCallback(() => setAboutOpen(false), [])
  const [helpOpen, setHelpOpen] = useState(false)
  const [status, setStatus] = useState('Ready')
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [closed, setClosed] = useState(false)
// DOM references and per-file undo/redo history.
  const editorRef = useRef(null)
  const terminalOutputRef = useRef(null)
  const highlightRef = useRef(null)
  const numbersRef = useRef(null)
  const introDragRef = useRef(null)
  const toolbarRef = useRef(null)
  const historyRef = useRef(Object.fromEntries(files.map(file => [file, { past: [], future: [] }])))
  const currentText = documents[active] ?? ''

// Apply the scrolling layout for the selected home-page view.
  useEffect(() => {
    document.body.classList.toggle('home-workspace-page', !isSimple)
    document.body.classList.toggle('simple-view-page', isSimple)
    return () => document.body.classList.remove('home-workspace-page', 'simple-view-page')
  }, [isSimple])

  useEffect(() => {
    const media = window.matchMedia(compactLayoutQuery)
    const adaptLayout = () => {
      setCompactLayout(media.matches)
      setSidebar(!media.matches)
      setIntroPosition(null)
    }
    media.addEventListener('change', adaptLayout)
    const resetPanel = () => { setIntroPosition(null); setOpenMenu('') }
    window.addEventListener('resize', resetPanel)
    return () => {
      media.removeEventListener('change', adaptLayout)
      window.removeEventListener('resize', resetPanel)
    }
  }, [])

  useEffect(() => {
    const close = event => {
      if (!event.target.closest?.('.menu-root')) setOpenMenu('')
      if (!event.target.closest?.('.intro-panel, .intro-brand-toggle, .website-guide')) setIntroOpen(false)
    }
    const escape = event => { if (event.key === 'Escape' && !event.target.closest?.('.website-guide')) { setOpenMenu(''); setIntroOpen(false) } }
    const closeOnScroll = event => {
      if (!event.target.closest?.('.dropdown')) setOpenMenu('')
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', escape)
    document.addEventListener('scroll', closeOnScroll, true)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', escape)
      document.removeEventListener('scroll', closeOnScroll, true)
    }
  }, [])

// Top menu positioning and keyboard navigation.
  const toggleMenu = (name, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    // Use the usable viewport width, excluding the page scrollbar in Simple view.
    const viewportWidth = document.documentElement.clientWidth
    const width = Math.min(288, viewportWidth - 16)
    const top = rect.bottom + 4
    setMenuAnchor({ top, left: Math.max(8, Math.min(rect.left, viewportWidth - width - 8)), width, maxHeight: Math.max(80, window.innerHeight - top - 8) })
    setOpenMenu(current => current === name ? '' : name)
    if (openMenu !== name) requestAnimationFrame(() => document.querySelector('#application-dropdown [aria-checked="true"], #application-dropdown button')?.focus({ preventScroll: true }))
  }

// Shared menu rendered in both home-page views.
  const applicationMenuKeys = event => {
    if (event.key === 'Escape') {
      event.preventDefault(); event.stopPropagation()
      document.querySelector('.menu-trigger.active')?.focus()
      setOpenMenu('')
      return
    }
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return
    event.preventDefault()
    const items = Array.from(event.currentTarget.querySelectorAll('button'))
    const current = items.indexOf(document.activeElement)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
    items[next]?.focus()
  }

  useEffect(() => {
    if (terminalOpen && terminalOutputRef.current) terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight
  }, [terminalLines, terminalText, terminalOpen, viewMode])
// File tabs, active file selection, and split-editor navigation.
  const setFile = (file) => {
    setIntroOpen(false)
    if (compactLayout) setSidebar(false)
    if (file === secondaryFile) setSecondaryFile(active)
    setActive(file)
    setOpenTabs(tabs => tabs.includes(file) ? tabs : [...tabs, file])
    setOpenMenu('')
    setStatus(`Opened ${file}`)
  }
  const openSplit = () => {
    const next = files.find(file => file !== active) ?? files[0]
    setSecondaryFile(current => current || next)
    setOpenTabs(tabs => tabs.includes(next) ? tabs : [...tabs, next])
    setStatus('Split editor opened')
  }
  const openSecondary = file => {
    if (!files.includes(file) || file === active) return
    setSecondaryFile(file)
    setOpenTabs(tabs => tabs.includes(file) ? tabs : [...tabs, file])
    setStatus('Opened '+file+' in the second editor')
  }
  const handleSecondaryDrop = event => {
    event.preventDefault()
    const file = event.dataTransfer.getData('text/portfolio-file')
    if (file) openSecondary(file)
  }
  const closeTab = (file) => {
    const index = openTabs.indexOf(file)
    if (index < 0) return
    const remaining = openTabs.filter(tab => tab !== file)
    setOpenTabs(remaining)
    if (active === file) setActive(remaining.length ? remaining[Math.min(index, remaining.length - 1)] : null)
    if (secondaryFile === file) setSecondaryFile('')
    setStatus('Closed ' + file)
  }
// Orange Reload control: restore original information and editor state.
  const reload = () => {
    setNavigationVisible(true)
    setSidebar(true)
    setSection('Explorer')
    setDocuments({ ...initialDocuments })
    setOpenTabs(['about.jsx'])
    setSecondaryFile('')
    setIntroOpen(!compactLayout)
    setIntroPosition(null)
    historyRef.current = Object.fromEntries(files.map(file => [file, { past: [], future: [] }]))
    setActive('about.jsx')
    setOpenMenu('')
    setStatus('Portfolio information restored to its original content')
  }
// Introduction popup dragging and position handling.
  const startIntroDrag = event => {
    if (event.button !== 0) return
    const panel = event.currentTarget.closest('.intro-panel')
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    introDragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.preventDefault()
  }
  const moveIntroPanel = event => {
    const drag = introDragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const rect = event.currentTarget.getBoundingClientRect()
    const minLeft = compactLayout && navigationVisible ? 54 : 8
    const minTop = Math.max(8, (toolbarRef.current?.getBoundingClientRect().bottom ?? 100) + 8)
    const left = Math.max(minLeft, Math.min(window.innerWidth - rect.width - 8, drag.left + event.clientX - drag.x))
    const top = Math.max(minTop, Math.min(window.innerHeight - rect.height - 8, drag.top + event.clientY - drag.y))
    setIntroPosition({ left, top })
  }
  const stopIntroDrag = event => {
    if (introDragRef.current?.pointerId === event.pointerId) introDragRef.current = null
  }
// Typing, range edits, undo/redo, and editor clipboard actions.
  const updateDocument = (file, value) => {
    const before = documents[file] ?? ''
    if (before !== value) {
      const history = historyRef.current[file]
      history.past.push(before)
      if (history.past.length > 100) history.past.shift()
      history.future = []
    }
    setDocuments(prev => ({ ...prev, [file]: value }))
  }
  const editRange = (start, end, insert, message) => {
    const next = currentText.slice(0, start) + insert + currentText.slice(end)
    updateDocument(active, next)
    requestAnimationFrame(() => {
      if (!editorRef.current) return
      editorRef.current.focus()
      const cursor = start + insert.length
      editorRef.current.setSelectionRange(cursor, cursor)
    })
    setStatus(message)
  }
  const undo = () => {
    const history = historyRef.current[active]
    if (!history?.past.length) return setStatus('Nothing to undo')
    const previous = history.past.pop()
    history.future.push(currentText)
    setDocuments(prev => ({ ...prev, [active]: previous }))
    setStatus('Undo')
    editorRef.current?.focus()
  }
  const redo = () => {
    const history = historyRef.current[active]
    if (!history?.future.length) return setStatus('Nothing to redo')
    const next = history.future.pop()
    history.past.push(currentText)
    setDocuments(prev => ({ ...prev, [active]: next }))
    setStatus('Redo')
    editorRef.current?.focus()
  }
  const clipboardAction = async kind => {
    const editor = editorRef.current
    if (!editor) return
    const start = editor.selectionStart
    const end = editor.selectionEnd
    if (kind === 'copy' || kind === 'cut') {
      if (start === end) return setStatus('Select information in the editor first')
      try { await navigator.clipboard.writeText(currentText.slice(start, end)) } catch { document.execCommand(kind) }
      if (kind === 'cut') editRange(start, end, '', 'Cut selection')
      else setStatus('Copied selection')
      editor.focus()
      return
    }
    try {
      const text = await navigator.clipboard.readText()
      editRange(start, end, text, 'Pasted from clipboard')
    } catch {
      setStatus('Clipboard access was blocked by the browser. Use Ctrl+V in the editor.')
      editor.focus()
    }
  }
// Selection menu commands for editor text.
  const selectLine = () => {
    const editor = editorRef.current
    if (!editor) return
    const start = currentText.lastIndexOf('\n', editor.selectionStart - 1) + 1
    const nextBreak = currentText.indexOf('\n', editor.selectionStart)
    const end = nextBreak < 0 ? currentText.length : nextBreak
    editor.focus()
    editor.setSelectionRange(start, end)
    setStatus('Selected current line')
  }
  const duplicateLine = (direction = 'down') => {
    const editor = editorRef.current
    if (!editor) return
    const start = currentText.lastIndexOf('\n', editor.selectionStart - 1) + 1
    let end = currentText.indexOf('\n', editor.selectionStart)
    if (end < 0) end = currentText.length
    const line = currentText.slice(start, end)
    const insertAt = direction === 'up' ? start : end
    const insertion = direction === 'up' ? `${line}\n` : `\n${line}`
    const next = currentText.slice(0, insertAt) + insertion + currentText.slice(insertAt)
    updateDocument(active, next)
    requestAnimationFrame(() => { editorRef.current?.focus(); editorRef.current?.setSelectionRange(insertAt + insertion.length, insertAt + insertion.length) })
    setStatus(`Duplicated line ${direction}`)
  }
  const toggleComment = () => {
    const editor = editorRef.current
    if (!editor) return
    const start = currentText.lastIndexOf('\n', editor.selectionStart - 1) + 1
    let end = currentText.indexOf('\n', editor.selectionEnd)
    if (end < 0) end = currentText.length
    const line = currentText.slice(start, end)
    const commented = line.split('\n').every(row => row.trimStart().startsWith('//'))
    const transformed = line.split('\n').map(row => commented ? row.replace(/^(\s*)\/\/ ?/, '$1') : row.replace(/^(\s*)/, '$1// ')).join('\n')
    editRange(start, end, transformed, commented ? 'Uncommented selection' : 'Commented selection')
  }
// Go menu navigation and home-page view switching.
  const goTo = label => {
    if (isSimple) document.getElementById(`simple-${label.toLowerCase()}`)?.scrollIntoView({ block: 'start' })
    else setFile(sectionForFile[label])
  }
  const changeView = mode => { startViewTransition(mode); setIntroOpen(false); setOpenMenu('') }
  const toggleNavigation = () => {
    setNavigationVisible(!navigationVisible)
    setSidebar(!navigationVisible)
    if (compactLayout && !navigationVisible) setIntroOpen(false)
  }
// Commands for File, Edit, Selection, View, Go, Run, Terminal, and Help.
  const menuActions = {
    File: [
      ['Portfolio', 'projects ↗', () => { window.location.assign('/portfolio.html') }],
    ],
    Edit: [
      ['Reload original information', '↻', reload], ['Undo', 'Ctrl+Z', undo], ['Redo', 'Ctrl+Y', redo],
      ['Cut', 'Ctrl+X', () => clipboardAction('cut')], ['Copy', 'Ctrl+C', () => clipboardAction('copy')], ['Paste', 'Ctrl+V', () => clipboardAction('paste')],
    ],
    Selection: [
      ['Select All', 'Ctrl+A', () => { editorRef.current?.focus(); editorRef.current?.select(); setStatus('Selected editor information') }],
      ['Select Line', '', selectLine], ['Duplicate Line Up', '', () => duplicateLine('up')], ['Duplicate Line Down', '', () => duplicateLine('down')], ['Toggle Line Comment', 'Ctrl+/', toggleComment],
    ],
    View: [
      ['Simple view', isSimple ? 'Selected' : '', () => changeView('simple')],
      ['Code view', !isSimple ? 'Selected' : '', () => changeView('code')],
      ...(!isSimple ? [
        ['Explorer', 'Ctrl+Shift+E', () => { setNavigationVisible(true); setSidebar(!sidebar); setSection('Explorer'); if (compactLayout && !sidebar) setIntroOpen(false) }],
        [navigationVisible ? 'Hide left navigation' : 'Show left navigation', '', toggleNavigation],
        [`Word Wrap: ${wordWrap ? 'On' : 'Off'}`, 'Alt+Z', () => setWordWrap(!wordWrap)],
        [`Line Numbers: ${lineNumbers ? 'On' : 'Off'}`, '', () => setLineNumbers(!lineNumbers)],
        ['Portfolio Preview', '', () => { setFile('about.jsx'); setStatus('Portfolio preview selected') }],
      ] : []),
    ],
    Go: [
      ['About', '', () => goTo('About')], ['Experience', '', () => goTo('Experience')], ['Skills', '', () => goTo('Skills')], ['Contact', '', () => goTo('Contact')], ...(isSimple ? [['Education', '', () => goTo('Education')]] : []),
    ],
    Run: [
      ['Run Portfolio Preview', 'F5', () => { setFile('about.jsx'); setStatus('Portfolio preview is ready') }],
      ['Open Preview in New Tab', '', () => { window.open(window.location.href, '_blank', 'noopener,noreferrer'); setStatus('Opened portfolio preview') }],
    ],
    Terminal: [
      ['New Terminal', 'Ctrl+`', () => { setTerminalOpen(true); setTerminalText('Portfolio terminal ready. Typing only — commands are not executed.'); setStatus('Portfolio terminal opened') }],
      ['Clear Terminal', '', () => { setTerminalText(''); setTerminalLines([]); setStatus('Terminal cleared') }], ['Close Terminal', '', () => setTerminalOpen(false)],
    ],
    Help: [
      ['Website guide', '', () => setGuideOpen(true)],
      ...(!isSimple ? [['Keyboard Shortcuts', '', () => setHelpOpen(true)]] : []), ['About this Portfolio', '', () => setAboutOpen(true)],
    ],
  }
  const runMenuAction = action => { action(); setOpenMenu('') }
// Copy email or phone and show a temporary confirmation.
  const copyContact = async (key, value) => {
    let success = false
    try { await navigator.clipboard.writeText(value); success = true } catch {
      const field = document.createElement('textarea'); field.value = value; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.appendChild(field); field.focus(); field.select(); success = document.execCommand('copy'); field.remove()
    }
    setCopied(success ? key : 'failed')
    window.setTimeout(() => setCopied(''), 1800)
  }
  const copyButton = (key, label, value) => <button className="contact-copy" type="button" onClick={() => copyContact(key, value)}><span>{label}</span><strong>{value}</strong><small aria-live="polite">{copied === key ? 'Copied!' : copied === 'failed' ? 'Copy unavailable' : 'Click to copy'}</small></button>

  const applicationMenu = <><nav className={'menubar menu-root'+(isSimple?' simple-menubar':'')} aria-label="Application menu">{!isSimple && <button className="navigation-toggle" type="button" onClick={toggleNavigation} aria-label={navigationVisible?'Hide left navigation':'Show left navigation'} title={navigationVisible?'Hide left navigation':'Show left navigation'} aria-expanded={navigationVisible}>◧<span>{navigationVisible?'Hide':'Show'} navigation</span></button>}{(isSimple ? ['File','View','Go','Help'] : menuNames).map(name => <div className="menu-entry" key={name}>
      <button className={'menu-trigger '+(openMenu===name?'active':'')} data-menu-name={name} aria-label={name} type="button" aria-haspopup="true" aria-expanded={openMenu===name} aria-controls={openMenu===name?'application-dropdown':undefined} onClick={event => toggleMenu(name, event)} onKeyDown={event=>{if(event.key==="ArrowDown"){event.preventDefault();if(openMenu!==name)toggleMenu(name,event)}}}>{name}</button>
    </div>)}</nav>
    {openMenu && <div id="application-dropdown" className="dropdown menu-root" role="menu" aria-label={openMenu} style={menuAnchor} onKeyDown={applicationMenuKeys}>{menuActions[openMenu].map(([label, shortcut, action]) => <button type="button" role={openMenu==='View' && ['Simple view','Code view'].includes(label) ? 'menuitemradio' : 'menuitem'} aria-checked={openMenu==='View' && ['Simple view','Code view'].includes(label) ? viewMode===label.split(' ')[0].toLowerCase() : undefined} className="dropdown-item" key={`${openMenu}-${label}`} onClick={() => runMenuAction(action)}><span>{label}</span><small>{shortcut}</small></button>)}</div>}  </>

// Render Simple view while retaining the Code view state in App.
  if (isSimple) return <><SimpleView menu={applicationMenu} copyButton={copyButton} onAbout={()=>setAboutOpen(true)} />{guideOpen && <WebsiteGuide onClose={closeGuide} />}{aboutOpen && <AboutPortfolio onClose={closeAbout} />}{viewTransition && <ViewTransition {...viewTransition} />}</>
  if (closed) return <main className="ide window-closed"><section><BrandLogo /><h2>LunR Code window closed</h2><p>This closes the portfolio view here. Your browser stays open.</p><button onClick={()=>setClosed(false)}>Reopen LunR Code</button></section></main>
  if (minimized) return <main className="ide window-minimized"><button onClick={()=>setMinimized(false)}><BrandLogo decorative /> LunR Code <span>Restore</span></button></main>

  return <main className={`ide${maximized?' maximized':''}${navigationVisible?'':' navigation-hidden'}`}>
{/* Top window bar: Reload, branding, and window controls. */}
    <header className="titlebar">
      <button className="titlebar-reload-left" type="button" onClick={reload}>↻ Reload</button>
      <div className="titlebar-brand"><BrandLogo decorative /><span>LunR Code <span className="brand-owner">— Jireh Chantengco</span></span></div>
      <div className="titlebar-actions" aria-label="Portfolio window controls">
        <button type="button" aria-label="Minimize" title="Minimize" onClick={()=>setMinimized(true)}>−</button>
        <button type="button" aria-label={maximized?'Restore window':'Maximize window'} title="I don't have a purpose" onClick={()=>setMaximized(!maximized)}>□</button>
        <button className="window-close" type="button" aria-label="Close portfolio window" title="Close" onClick={()=>setClosed(true)}>×</button>
      </div>
    </header>
{/* Top application menus. */}
    {applicationMenu}
{/* Workspace: left icons, Explorer sidebar, and editor. */}
    <div className="workspace">
      {navigationVisible && <aside className="activity">{['▤','⌕','⑂','▷','▦'].map((icon,i)=><button aria-label={['Explorer','Search','Source Control','Run','Extensions'][i]} title={['Explorer','Search','Source Control','Run','Extensions'][i]} className={['Explorer','Search','Source Control','Run','Extensions'][i]===section?'chosen':''} key={i} onClick={()=>{if(compactLayout)setIntroOpen(false);setSection(['Explorer','Search','Source Control','Run','Extensions'][i]);setSidebar(current => section === ['Explorer','Search','Source Control','Run','Extensions'][i] ? !current : true)}}>{icon}</button>)}</aside>}
      {navigationVisible && compactLayout && sidebar && <button className="sidebar-backdrop" aria-label="Close file explorer" onClick={()=>setSidebar(false)} />}
      {navigationVisible && sidebar && <aside className="sidebar">
        <div className="sidebar-main">
        <div className="side-title">{section.toUpperCase()} <button aria-label="Close sidebar" onClick={()=>setSidebar(false)}>‹</button></div>
        {section==='Explorer' && <><div className="folder">⌄ &nbsp; JIREH-CHANTENGCO</div>{files.map(f=><button draggable='true' onDragStart={event=>{event.dataTransfer.setData('text/portfolio-file',f);event.dataTransfer.effectAllowed='copy'}} className={'file '+(active===f?'selected':'')} key={f} onClick={()=>setFile(f)}><span>{f==='about.jsx'?'⚛':f==='experience.jsx'?'◈':f==='skills.jsx'?'#':'◇'}</span>{f}</button>)}</>}
        {section==='Search' && <div className="side-content"><input aria-label="Search portfolio files" placeholder="Search files" value={query} onChange={e=>setQuery(e.target.value)}/>{files.filter(f=>f.toLowerCase().includes(query.toLowerCase())).map(f=><button className="file" key={f} onClick={()=>setFile(f)}>{f}</button>)}</div>}
        {section==='Source Control' && <div className="side-content"><b>PORTFOLIO FILES</b><p>Explore and edit the information files in Jireh’s portfolio.</p>{files.map(f=><button className="file" key={f} onClick={()=>setFile(f)}>＋ {f}</button>)}</div>}
        {section==='Run' && <div className="side-content"><b>QUICK NAVIGATION</b>{Object.entries(sectionForFile).map(([name,file])=><button className="file" key={name} onClick={()=>setFile(file)}>▷ {name}</button>)}<small>Use Run → Open Preview in New Tab to view the site.</small></div>}
        {section==='Extensions' && <div className="side-content"><b>SKILLS & TOOLS</b>{skillGroups.map(group=><div key={group.title}><small>{group.title}</small><p>{group.skills.map(skill=>skill.name).join(' · ')}</p></div>)}</div>}
        {section==='Explorer' && <NavigationHint />}
        </div>
        {/* Keep the toolbox and Outline/Timeline together at the bottom of Explorer. */}
        <div className="sidebar-bottom">
        {section==='Explorer' && <SkillsSidebar />}
        <div className="side-foot" aria-label="Workspace sections"><div className="side-foot-row"><span aria-hidden="true">›</span>Outline</div><div className="side-foot-row"><span aria-hidden="true">›</span>Timeline</div></div>
        </div>
      </aside>}
{/* File tabs, close buttons, split control, and introduction toggle. */}
      <section className="editor-area">
        <div className="tabs" ref={toolbarRef}>
          <div className="tab-list" role="tablist" aria-label="Open portfolio files">{openTabs.map(file=><div className="tab-item" key={file}>
            <button role="tab" aria-selected={active===file} className={'tab '+(active===file?'active':'')} onClick={()=>setFile(file)}><span>⚛</span>{file}</button>
            <button className="tab-close" aria-label={'Close '+file} title={'Close '+file} onClick={()=>closeTab(file)}>×</button>
          </div>)}</div>
          <div className="tab-actions"><button type="button" className="split-toggle" title={secondaryFile?"Close split editor":"Split editor"} aria-label={secondaryFile?"Close split editor":"Open split editor"} onClick={()=>{if(secondaryFile)setSecondaryFile("");else openSplit()}}>{secondaryFile?"▣":"◫"}</button><button className="intro-brand-toggle" aria-label="Toggle LunR Code introduction panel" aria-expanded={introOpen} title="LunR Code · Introduction" onClick={()=>{if(compactLayout)setSidebar(false);setIntroOpen(open=>!open)}}><BrandLogo decorative /></button></div>
        </div>
{/* Selected file: breadcrumb, syntax highlighting, and editable text. */}
        {active ? <><div className="crumb">src &nbsp;›&nbsp; {active} <span className="edit-hint">Editable · changes are temporary until Reload</span></div>
        <div className={'overview-grid '+(secondaryFile?'split-open':'')}>
          <div className={'editor-column'+(active==='contact.jsx'?' contact-active':'')}>
            <div className="code editor-code">
              {lineNumbers && <div ref={numbersRef} className="numbers" aria-hidden="true">{Array.from({length:Math.max(1,currentText.split('\n').length)},(_,i)=><span key={i}>{i+1}</span>)}</div>}
              <div className="editor-surface">
                <pre ref={highlightRef} className={'highlighted-code '+(wordWrap?'wrapped':'')} aria-hidden="true">{active.endsWith('.txt') ? currentText : highlightCode(currentText)}</pre>
                <textarea ref={editorRef} className={'code-editor '+(wordWrap?'wrapped':'')} aria-label={'Editable '+active+' information'} spellCheck="false" value={currentText} onChange={e=>updateDocument(active,e.target.value)} onScroll={e=>{if(highlightRef.current){highlightRef.current.scrollTop=e.currentTarget.scrollTop;highlightRef.current.scrollLeft=e.currentTarget.scrollLeft}if(numbersRef.current)numbersRef.current.scrollTop=e.currentTarget.scrollTop}} />
              </div>
            </div>
            {active==='contact.jsx' && <div className="contact-panel"><p>Copy a contact detail or open a profile in a new tab.</p>{copyButton('email','EMAIL','ljp.chantengco@gmail.com')}{copyButton('phone','PHONE','+63 919 387 2346')}<SocialLinks /></div>}
          </div>
{/* Optional second editor pane and file drop target. */}
          {secondaryFile && <section className="secondary-editor" onDragOver={event=>{event.preventDefault();event.dataTransfer.dropEffect='copy'}} onDrop={handleSecondaryDrop} aria-label="Second editor pane">
            <div className="secondary-toolbar"><label htmlFor="secondary-file">SECOND EDITOR</label><select id="secondary-file" value={secondaryFile} onChange={event=>openSecondary(event.target.value)}>{files.filter(file=>file!==active).map(file=><option key={file} value={file}>{file}</option>)}</select><button type="button" onClick={()=>setSecondaryFile('')} aria-label="Close second editor">×</button></div>
            <div className="secondary-editor-surface">
              <pre className="highlighted-code wrapped" aria-hidden="true">{secondaryFile.endsWith('.txt')?documents[secondaryFile]:highlightCode(documents[secondaryFile]??'')}</pre>
              <textarea className="code-editor wrapped" aria-label={'Editable '+secondaryFile+' information'} spellCheck="false" value={documents[secondaryFile]??''} onScroll={event=>{const pre=event.currentTarget.previousElementSibling;if(pre){pre.scrollTop=event.currentTarget.scrollTop;pre.scrollLeft=event.currentTarget.scrollLeft}}} onChange={event=>updateDocument(secondaryFile,event.target.value)} />
            </div>
            <small className="drop-hint">Drag a file from Explorer here to open it in this pane</small>
          </section>}
        </div>
        </> : <div className="empty-editor" aria-label="No file open"><span className="empty-logo"><BrandLogo /></span></div>}
{/* Bottom terminal: typing-only command history and input. */}
        {terminalOpen && <section className="terminal-panel" aria-label="Typing-only terminal">
          <div className="terminal-heading"><strong>TERMINAL</strong><small>CMD STYLE · INPUT ONLY</small><button type="button" onClick={()=>setTerminalOpen(false)} aria-label="Close terminal">×</button></div>
          <div className="terminal-output" aria-live="polite" ref={terminalOutputRef}>{terminalText && <pre className="terminal-entry">{terminalText}</pre>}{terminalLines.map((line,index)=><pre className="terminal-entry" key={index}><span className="terminal-prompt">C:\Portfolio&gt;</span> {line}</pre>)}</div>
          <form className="terminal-input-row" onSubmit={event=>{event.preventDefault();if(terminalInput.trim()){setTerminalLines(lines=>[...lines,terminalInput]);setTerminalInput('')}}}>
            <label htmlFor="terminal-input">C:\Portfolio&gt;</label><input id="terminal-input" autoComplete="off" spellCheck="false" value={terminalInput} onChange={event=>setTerminalInput(event.target.value)} placeholder="Type here — commands will not run" />
          </form>
        </section>}
      </section>
    </div>
{/* Draggable introduction panel with profile and quick navigation. */}
    {introOpen && <aside className="intro-panel" aria-label="Portfolio introduction" style={introPosition ? { left: introPosition.left, top: introPosition.top, right: 'auto' } : undefined} onPointerMove={moveIntroPanel} onPointerUp={stopIntroDrag} onPointerCancel={stopIntroDrag}><button className="intro-close" type="button" aria-label="Close introduction" onClick={()=>setIntroOpen(false)}>×</button><div className="intro-body"><small className="intro-drag-handle" onPointerDown={startIntroDrag} title="Drag to move this panel">⠿ &nbsp; HELLO, WORLD <span>DRAG TO MOVE</span></small><h1>I'm <em>Jireh</em>.</h1><h2>Web developer & lifelong learner.</h2><p>I am Lowell Jireh P. Chantengco, an Information Technology graduate specializing in web development. I enjoy creating responsive websites and solving practical technical problems.</p><button type="button" className="intro-guide-button" onClick={()=>setGuideOpen(true)}><span aria-hidden="true">ⓘ</span> How to use this website</button><div className="cta-row"><button onClick={()=>setFile('experience.jsx')}>My experience ↗</button><button className="secondary" onClick={()=>setFile('contact.jsx')}>Get in touch</button></div><div className="intro-profile"><div className="monogram"><BrandLogo /></div><div><strong>Lowell Jireh P. Chantengco</strong><span>🟢 Open to opportunities</span><small>WEB DEVELOPER · IT SUPPORT</small></div></div></div></aside>}
{/* Status bar: branding, branch, editor feedback, and location. */}
    <footer><span className="status-brand"><BrandLogo decorative />LunR Code</span><span>⎇ main</span><span>✓ 0 errors</span><span className="status-message" aria-live="polite">{status}</span><span className="right">Porac, Pampanga &nbsp; · &nbsp; Holy Angel University &nbsp; · &nbsp; Web Development</span></footer>
{/* Help popups: About this Portfolio and keyboard shortcuts. */}
    {/* Brief destination message while switching to Simple view or Code view. */}
    {viewTransition && <ViewTransition {...viewTransition} />}
    {/* Centered instructions with a blurred backdrop; opening this preserves editor state. */}
    {guideOpen && <WebsiteGuide onClose={closeGuide} />}
    {aboutOpen && <AboutPortfolio onClose={closeAbout} />}    {helpOpen && <div className="help-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setHelpOpen(false)}}><section className="help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title"><button className="help-close" onClick={()=>setHelpOpen(false)} aria-label="Close help">×</button><h2 id="help-title">Portfolio shortcuts</h2><p><kbd>Ctrl</kbd> + <kbd>A</kbd> Select all editor text</p><p><kbd>Ctrl</kbd> + <kbd>Z</kbd> Undo · <kbd>Ctrl</kbd> + <kbd>Y</kbd> Redo</p><p><kbd>Ctrl</kbd> + <kbd>X</kbd> Cut · <kbd>Ctrl</kbd> + <kbd>C</kbd> Copy · <kbd>Ctrl</kbd> + <kbd>V</kbd> Paste</p><p><kbd>Alt</kbd> + <kbd>Z</kbd> Toggle word wrap</p><small>All edits are local to this page. Reload restores the original portfolio information.</small></section></div>}
  </main>
}
export default App
