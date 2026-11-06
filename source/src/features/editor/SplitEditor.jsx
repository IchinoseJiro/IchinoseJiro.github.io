// Optional second editor, file selector, and Explorer drop target.
import { files } from '../../data/profileContent.js'
import highlightCode from './highlightCode.jsx'
export default function SplitEditor({
  secondaryFile,
  active,
  documents,
  setSecondaryFile,
  openSecondary,
  handleSecondaryDrop,
  updateDocument,
}) {
  return (
    <section
      className="secondary-editor"
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'
      }}
      onDrop={handleSecondaryDrop}
      aria-label="Second editor pane"
    >
      <div className="secondary-toolbar">
        <label htmlFor="secondary-file">SECOND EDITOR</label>
        <select
          id="secondary-file"
          value={secondaryFile}
          onChange={(event) => openSecondary(event.target.value)}
        >
          {files
            .filter((file) => file !== active)
            .map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
        </select>
        <button type="button" onClick={() => setSecondaryFile('')} aria-label="Close second editor">
          ×
        </button>
      </div>
      <div className="secondary-editor-surface">
        <pre className="highlighted-code wrapped" aria-hidden="true">
          {secondaryFile.endsWith('.txt')
            ? documents[secondaryFile]
            : highlightCode(documents[secondaryFile] ?? '')}
        </pre>
        <textarea
          className="code-editor wrapped"
          aria-label={'Editable ' + secondaryFile + ' information'}
          spellCheck="false"
          value={documents[secondaryFile] ?? ''}
          onScroll={(event) => {
            const pre = event.currentTarget.previousElementSibling
            if (pre) {
              pre.scrollTop = event.currentTarget.scrollTop
              pre.scrollLeft = event.currentTarget.scrollLeft
            }
          }}
          onChange={(event) => updateDocument(secondaryFile, event.target.value)}
        />
      </div>
      <small className="drop-hint">Drag a file from Explorer here to open it in this pane</small>
    </section>
  )
}
