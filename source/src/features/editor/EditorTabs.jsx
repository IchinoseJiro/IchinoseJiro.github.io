// Open-file tabs, close buttons, split toggle, and introduction toggle.
import BrandLogo from '../../components/branding/BrandLogo.jsx'
export default function EditorTabs({
  toolbarRef,
  openTabs,
  active,
  setFile,
  closeTab,
  secondaryFile,
  setSecondaryFile,
  openSplit,
  introOpen,
  compactLayout,
  setSidebar,
  setIntroOpen,
}) {
  return (
    <>
      <div className="tabs" ref={toolbarRef}>
        <div className="tab-list" role="tablist" aria-label="Open portfolio files">
          {openTabs.map((file) => (
            <div className="tab-item" key={file}>
              <button
                role="tab"
                aria-selected={active === file}
                className={'tab ' + (active === file ? 'active' : '')}
                onClick={() => setFile(file)}
              >
                <span>⚛</span>
                {file}
              </button>
              <button
                className="tab-close"
                aria-label={'Close ' + file}
                title={'Close ' + file}
                onClick={() => closeTab(file)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="tab-actions">
          <button
            type="button"
            className="split-toggle"
            title={secondaryFile ? 'Close split editor' : 'Split editor'}
            aria-label={secondaryFile ? 'Close split editor' : 'Open split editor'}
            onClick={() => {
              if (secondaryFile) setSecondaryFile('')
              else openSplit()
            }}
          >
            {secondaryFile ? '▣' : '◫'}
          </button>
          <button
            className="intro-brand-toggle"
            aria-label="Toggle LunR Code introduction panel"
            aria-expanded={introOpen}
            title="LunR Code · Introduction"
            onClick={() => {
              if (compactLayout) setSidebar(false)
              setIntroOpen((open) => !open)
            }}
          >
            <BrandLogo decorative />
          </button>
        </div>
      </div>
    </>
  )
}
