import KeyboardShortcuts from './components/dialogs/KeyboardShortcuts.jsx'
import WindowTitlebar from './features/workspace/WindowTitlebar.jsx'
import ContactCopyButton from './components/contact/ContactCopyButton.jsx'
import useCopyContact from './hooks/useCopyContact.js'
import IntroductionPanel from './features/introduction/IntroductionPanel.jsx'
import useIntroPanel from './features/introduction/useIntroPanel.js'
import TerminalPanel from './features/terminal/TerminalPanel.jsx'
import SplitEditor from './features/editor/SplitEditor.jsx'
import CodeEditor from './features/editor/CodeEditor.jsx'
import EditorTabs from './features/editor/EditorTabs.jsx'
import WorkspaceSidebar from './features/workspace/WorkspaceSidebar.jsx'
import ApplicationMenu from './components/navigation/ApplicationMenu.jsx'
import usePortfolioDocuments from './features/editor/usePortfolioDocuments.js'
import { portfolioUrl } from './utils/portfolioNavigation.js'
// Code view home page: editor window, navigation, tabs, terminal, and introduction panel.
import { useCallback, useEffect, useRef, useState } from 'react'
import './pages/code/CodeView.css'
import './pages/code/Workspace.css'
import SimpleView from './pages/simple/SimpleView.jsx'
import useViewMode from './hooks/useViewMode.js'
import AboutPortfolio from './components/dialogs/AboutPortfolio.jsx'
import WebsiteGuide from './components/dialogs/WebsiteGuide.jsx'
import ViewTransition from './components/navigation/ViewTransition.jsx'
import useViewTransition from './hooks/useViewTransition.js'
import { files, sectionForFile } from './data/profileContent.js'
import BrandLogo from './components/branding/BrandLogo.jsx'
import SocialLinks from './components/contact/SocialLinks.jsx'
import './styles/portfolio-shared.css'

// Responsive rules and top menu names.
const compactLayoutQuery = '(max-width: 1100px), (pointer: coarse) and (max-width: 1366px)'
const menuNames = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']
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
  const [section, setSection] = useState('Explorer')
  const [compactLayout, setCompactLayout] = useState(
    () => window.matchMedia(compactLayoutQuery).matches,
  )
  const [sidebar, setSidebar] = useState(true)
  const [navigationVisible, setNavigationVisible] = useState(true)
  const [query, setQuery] = useState('')
  const { copied, copyContact } = useCopyContact()
  const [openMenu, setOpenMenu] = useState('')
  const [menuAnchor, setMenuAnchor] = useState({})
  const [wordWrap, setWordWrap] = useState(true)
  const [lineNumbers, setLineNumbers] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalText, setTerminalText] = useState(
    'Portfolio terminal ready. Typing only — commands are not executed.',
  )
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
  const highlightRef = useRef(null)
  const numbersRef = useRef(null)
  const toolbarRef = useRef(null)
  const { introPosition, setIntroPosition, startIntroDrag, moveIntroPanel, stopIntroDrag } =
    useIntroPanel(compactLayout, navigationVisible, toolbarRef)
  const {
    documents,
    currentText,
    resetDocuments,
    updateDocument,
    undo,
    redo,
    clipboardAction,
    selectLine,
    duplicateLine,
    toggleComment,
  } = usePortfolioDocuments(active, editorRef, setStatus)

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
    const resetPanel = () => {
      setIntroPosition(null)
      setOpenMenu('')
    }
    window.addEventListener('resize', resetPanel)
    return () => {
      media.removeEventListener('change', adaptLayout)
      window.removeEventListener('resize', resetPanel)
    }
  }, [setIntroPosition])

  useEffect(() => {
    const close = (event) => {
      if (!event.target.closest?.('.menu-root')) setOpenMenu('')
      if (!event.target.closest?.('.intro-panel, .intro-brand-toggle, .website-guide'))
        setIntroOpen(false)
    }
    const escape = (event) => {
      if (event.key === 'Escape' && !event.target.closest?.('.website-guide')) {
        setOpenMenu('')
        setIntroOpen(false)
      }
    }
    const closeOnScroll = (event) => {
      // Simple view has a sticky header: page scrolling must not dismiss its menu mid-click.
      if (document.body.classList.contains('simple-view-page')) return
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
    setMenuAnchor({
      top,
      left: Math.max(8, Math.min(rect.left, viewportWidth - width - 8)),
      width,
      maxHeight: Math.max(80, window.innerHeight - top - 8),
    })
    setOpenMenu((current) => (current === name ? '' : name))
    if (openMenu !== name)
      requestAnimationFrame(() =>
        document
          .querySelector(
            '#application-dropdown [aria-checked="true"], #application-dropdown button',
          )
          ?.focus({ preventScroll: true }),
      )
  }

  // Shared menu rendered in both home-page views.
  const applicationMenuKeys = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      document.querySelector('.menu-trigger.active')?.focus()
      setOpenMenu('')
      return
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const items = Array.from(event.currentTarget.querySelectorAll('button'))
    const current = items.indexOf(document.activeElement)
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
    items[next]?.focus()
  }

  // File tabs, active file selection, and split-editor navigation.
  const setFile = (file) => {
    setIntroOpen(false)
    if (compactLayout) setSidebar(false)
    if (file === secondaryFile) setSecondaryFile(active)
    setActive(file)
    setOpenTabs((tabs) => (tabs.includes(file) ? tabs : [...tabs, file]))
    setOpenMenu('')
    setStatus(`Opened ${file}`)
  }
  const openSplit = () => {
    const next = files.find((file) => file !== active) ?? files[0]
    setSecondaryFile((current) => current || next)
    setOpenTabs((tabs) => (tabs.includes(next) ? tabs : [...tabs, next]))
    setStatus('Split editor opened')
  }
  const openSecondary = (file) => {
    if (!files.includes(file) || file === active) return
    setSecondaryFile(file)
    setOpenTabs((tabs) => (tabs.includes(file) ? tabs : [...tabs, file]))
    setStatus('Opened ' + file + ' in the second editor')
  }
  const handleSecondaryDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.getData('text/portfolio-file')
    if (file) openSecondary(file)
  }
  const closeTab = (file) => {
    const index = openTabs.indexOf(file)
    if (index < 0) return
    const remaining = openTabs.filter((tab) => tab !== file)
    setOpenTabs(remaining)
    if (active === file)
      setActive(remaining.length ? remaining[Math.min(index, remaining.length - 1)] : null)
    if (secondaryFile === file) setSecondaryFile('')
    setStatus('Closed ' + file)
  }
  // Edit menu: restore document text without changing tabs, layout, or intro visibility.
  const restoreOriginalInformation = () => {
    resetDocuments()
    setStatus('Original information restored; your workspace stays in place')
  }
  // Orange Reload control: restore original information and editor state.
  const reload = () => {
    setNavigationVisible(true)
    setSidebar(true)
    setSection('Explorer')
    resetDocuments()
    setOpenTabs(['about.jsx'])
    setSecondaryFile('')
    setIntroOpen(!compactLayout)
    setIntroPosition(null)
    setActive('about.jsx')
    setOpenMenu('')
    setStatus('Portfolio information restored to its original content')
  }
  // Go menu navigation and home-page view switching.
  const goTo = (label) => {
    if (!isSimple) {
      setFile(sectionForFile[label])
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(`simple-${label.toLowerCase()}`)?.scrollIntoView({
      block: 'start',
      behavior: reducedMotion ? 'instant' : 'smooth',
    })
  }
  const changeView = (mode) => {
    startViewTransition(mode)
    setIntroOpen(false)
    setOpenMenu('')
  }
  const toggleNavigation = () => {
    setNavigationVisible(!navigationVisible)
    setSidebar(!navigationVisible)
    if (compactLayout && !navigationVisible) setIntroOpen(false)
  }
  // Commands for File, Edit, Selection, View, Go, Run, Terminal, and Help.
  const menuActions = {
    File: [
      [
        'Portfolio',
        'projects ↗',
        () => {
          window.location.assign(portfolioUrl())
        },
      ],
    ],
    Edit: [
      ['Reload original information', '↻', restoreOriginalInformation],
      ['Undo', 'Ctrl+Z', undo],
      ['Redo', 'Ctrl+Y', redo],
      ['Cut', 'Ctrl+X', () => clipboardAction('cut')],
      ['Copy', 'Ctrl+C', () => clipboardAction('copy')],
      ['Paste', 'Ctrl+V', () => clipboardAction('paste')],
    ],
    Selection: [
      [
        'Select All',
        'Ctrl+A',
        () => {
          editorRef.current?.focus()
          editorRef.current?.select()
          setStatus('Selected editor information')
        },
      ],
      ['Select Line', '', selectLine],
      ['Duplicate Line Up', '', () => duplicateLine('up')],
      ['Duplicate Line Down', '', () => duplicateLine('down')],
      ['Toggle Line Comment', 'Ctrl+/', toggleComment],
    ],
    View: [
      ['Simple view', isSimple ? 'Selected' : '', () => changeView('simple')],
      ['Code view', !isSimple ? 'Selected' : '', () => changeView('code')],
      ...(!isSimple
        ? [
            [
              'Explorer',
              'Ctrl+Shift+E',
              () => {
                setNavigationVisible(true)
                setSidebar(!sidebar)
                setSection('Explorer')
                if (compactLayout && !sidebar) setIntroOpen(false)
              },
            ],
            [
              navigationVisible ? 'Hide left navigation' : 'Show left navigation',
              '',
              toggleNavigation,
            ],
            [`Word Wrap: ${wordWrap ? 'On' : 'Off'}`, 'Alt+Z', () => setWordWrap(!wordWrap)],
            [`Line Numbers: ${lineNumbers ? 'On' : 'Off'}`, '', () => setLineNumbers(!lineNumbers)],
            [
              'Portfolio Preview',
              '',
              () => {
                setFile('about.jsx')
                setStatus('Portfolio preview selected')
              },
            ],
          ]
        : []),
    ],
    Go: [
      ['About', '', () => goTo('About')],
      ['Experience', '', () => goTo('Experience')],
      ...(isSimple ? [['Education', '', () => goTo('Education')]] : []),
      ['Skills', '', () => goTo('Skills')],
      ['Contact', '', () => goTo('Contact')],
    ],
    Run: [
      [
        'Run Portfolio Preview',
        'F5',
        () => {
          setFile('about.jsx')
          setStatus('Portfolio preview is ready')
        },
      ],
      [
        'Open Preview in New Tab',
        '',
        () => {
          window.open(window.location.href, '_blank', 'noopener,noreferrer')
          setStatus('Opened portfolio preview')
        },
      ],
    ],
    Terminal: [
      [
        'New Terminal',
        'Ctrl+`',
        () => {
          setTerminalOpen(true)
          setTerminalText('Portfolio terminal ready. Typing only — commands are not executed.')
          setStatus('Portfolio terminal opened')
        },
      ],
      [
        'Clear Terminal',
        '',
        () => {
          setTerminalText('')
          setTerminalLines([])
          setStatus('Terminal cleared')
        },
      ],
      ['Close Terminal', '', () => setTerminalOpen(false)],
    ],
    Help: [
      ['Website guide', '', () => setGuideOpen(true)],
      ...(!isSimple ? [['Keyboard Shortcuts', '', () => setHelpOpen(true)]] : []),
      ['About this Portfolio', '', () => setAboutOpen(true)],
    ],
  }
  const runMenuAction = (action) => {
    action()
    setOpenMenu('')
  }
  const copyButton = (key, label, value) => (
    <ContactCopyButton
      contactKey={key}
      label={label}
      value={value}
      copied={copied}
      copyContact={copyContact}
    />
  )

  const applicationMenu = (
    <ApplicationMenu
      isSimple={isSimple}
      navigationVisible={navigationVisible}
      toggleNavigation={toggleNavigation}
      menuNames={menuNames}
      openMenu={openMenu}
      toggleMenu={toggleMenu}
      menuAnchor={menuAnchor}
      applicationMenuKeys={applicationMenuKeys}
      menuActions={menuActions}
      viewMode={viewMode}
      runMenuAction={runMenuAction}
    />
  )

  // Render Simple view while retaining the Code view state in App.
  if (isSimple)
    return (
      <>
        <SimpleView
          menu={applicationMenu}
          copyButton={copyButton}
          onAbout={() => setAboutOpen(true)}
        />
        {guideOpen && <WebsiteGuide onClose={closeGuide} />}
        {aboutOpen && <AboutPortfolio onClose={closeAbout} />}
        {viewTransition && <ViewTransition {...viewTransition} />}
      </>
    )
  if (closed)
    return (
      <main className="ide window-closed">
        <section>
          <BrandLogo />
          <h2>LunR Code window closed</h2>
          <p>This closes the portfolio view here. Your browser stays open.</p>
          <button onClick={() => setClosed(false)}>Reopen LunR Code</button>
        </section>
      </main>
    )
  if (minimized)
    return (
      <main className="ide window-minimized">
        <button onClick={() => setMinimized(false)}>
          <BrandLogo decorative /> LunR Code <span>Restore</span>
        </button>
      </main>
    )

  return (
    <main
      className={`ide${maximized ? ' maximized' : ''}${navigationVisible ? '' : ' navigation-hidden'}`}
    >
      {/* Top window bar: Reload, branding, and window controls. */}
      <WindowTitlebar
        reload={reload}
        maximized={maximized}
        setMinimized={setMinimized}
        setMaximized={setMaximized}
        setClosed={setClosed}
      />
      {/* Top application menus. */}
      {applicationMenu}
      {/* Workspace: left icons, Explorer sidebar, and editor. */}
      <div className="workspace">
        <WorkspaceSidebar
          navigationVisible={navigationVisible}
          compactLayout={compactLayout}
          sidebar={sidebar}
          section={section}
          setSidebar={setSidebar}
          setSection={setSection}
          setIntroOpen={setIntroOpen}
          query={query}
          setQuery={setQuery}
          active={active}
          setFile={setFile}
        />
        {/* File tabs, close buttons, split control, and introduction toggle. */}
        <section className="editor-area">
          <EditorTabs
            toolbarRef={toolbarRef}
            openTabs={openTabs}
            active={active}
            setFile={setFile}
            closeTab={closeTab}
            secondaryFile={secondaryFile}
            setSecondaryFile={setSecondaryFile}
            openSplit={openSplit}
            introOpen={introOpen}
            compactLayout={compactLayout}
            setSidebar={setSidebar}
            setIntroOpen={setIntroOpen}
          />
          {/* Selected file: breadcrumb, syntax highlighting, and editable text. */}
          {active ? (
            <>
              <div className="crumb">
                src &nbsp;›&nbsp; {active}{' '}
                <span className="edit-hint">Editable · changes are temporary until Reload</span>
              </div>
              <div className={'overview-grid ' + (secondaryFile ? 'split-open' : '')}>
                <div
                  className={'editor-column' + (active === 'contact.jsx' ? ' contact-active' : '')}
                >
                  <CodeEditor
                    active={active}
                    currentText={currentText}
                    lineNumbers={lineNumbers}
                    numbersRef={numbersRef}
                    highlightRef={highlightRef}
                    wordWrap={wordWrap}
                    editorRef={editorRef}
                    updateDocument={updateDocument}
                  />
                  {active === 'contact.jsx' && (
                    <div className="contact-panel">
                      <p>Copy a contact detail or open a profile in a new tab.</p>
                      {copyButton('email', 'EMAIL', 'ljp.chantengco@gmail.com')}
                      {copyButton('phone', 'PHONE', '+63 919 387 2346')}
                      <SocialLinks />
                    </div>
                  )}
                </div>
                {/* Optional second editor pane and file drop target. */}
                {secondaryFile && (
                  <SplitEditor
                    secondaryFile={secondaryFile}
                    active={active}
                    documents={documents}
                    setSecondaryFile={setSecondaryFile}
                    openSecondary={openSecondary}
                    handleSecondaryDrop={handleSecondaryDrop}
                    updateDocument={updateDocument}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="empty-editor" aria-label="No file open">
              <span className="empty-logo">
                <BrandLogo />
              </span>
            </div>
          )}
          {/* Bottom terminal: typing-only command history and input. */}
          {terminalOpen && (
            <TerminalPanel
              terminalText={terminalText}
              terminalLines={terminalLines}
              terminalInput={terminalInput}
              setTerminalInput={setTerminalInput}
              setTerminalLines={setTerminalLines}
              setTerminalOpen={setTerminalOpen}
            />
          )}
        </section>
      </div>
      {/* Draggable introduction panel with profile and quick navigation. */}
      {introOpen && (
        <IntroductionPanel
          introPosition={introPosition}
          moveIntroPanel={moveIntroPanel}
          stopIntroDrag={stopIntroDrag}
          startIntroDrag={startIntroDrag}
          setIntroOpen={setIntroOpen}
          setGuideOpen={setGuideOpen}
          setFile={setFile}
        />
      )}
      {/* Status bar: branding, branch, editor feedback, and location. */}
      <footer>
        <span className="status-brand">
          <BrandLogo decorative />
          LunR Code
        </span>
        <span>⎇ main</span>
        <span>✓ 0 errors</span>
        <span className="status-message" aria-live="polite">
          {status}
        </span>
        <span className="right">
          Porac, Pampanga &nbsp; · &nbsp; Holy Angel University &nbsp; · &nbsp; Web Development
        </span>
      </footer>
      {/* Help popups: About this Portfolio and keyboard shortcuts. */}
      {/* Brief destination message while switching to Simple view or Code view. */}
      {viewTransition && <ViewTransition {...viewTransition} />}
      {/* Centered instructions with a blurred backdrop; opening this preserves editor state. */}
      {guideOpen && <WebsiteGuide onClose={closeGuide} />}
      {aboutOpen && <AboutPortfolio onClose={closeAbout} />}{' '}
      {helpOpen && <KeyboardShortcuts setHelpOpen={setHelpOpen} />}
    </main>
  )
}
export default App
