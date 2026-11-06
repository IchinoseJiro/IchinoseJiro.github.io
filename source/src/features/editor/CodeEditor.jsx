// Primary editable code pane; scrolls its highlighted text and line numbers together.
import highlightCode from './highlightCode.jsx'
export default function CodeEditor({
  active,
  currentText,
  lineNumbers,
  numbersRef,
  highlightRef,
  wordWrap,
  editorRef,
  updateDocument,
}) {
  return (
    <>
      <div className="code editor-code">
        {lineNumbers && (
          <div ref={numbersRef} className="numbers" aria-hidden="true">
            {Array.from({ length: Math.max(1, currentText.split('\n').length) }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        )}
        <div className="editor-surface">
          <pre
            ref={highlightRef}
            className={'highlighted-code ' + (wordWrap ? 'wrapped' : '')}
            aria-hidden="true"
          >
            {active.endsWith('.txt') ? currentText : highlightCode(currentText)}
          </pre>
          <textarea
            ref={editorRef}
            className={'code-editor ' + (wordWrap ? 'wrapped' : '')}
            aria-label={'Editable ' + active + ' information'}
            spellCheck="false"
            value={currentText}
            onChange={(e) => updateDocument(active, e.target.value)}
            onScroll={(e) => {
              if (highlightRef.current) {
                highlightRef.current.scrollTop = e.currentTarget.scrollTop
                highlightRef.current.scrollLeft = e.currentTarget.scrollLeft
              }
              if (numbersRef.current) numbersRef.current.scrollTop = e.currentTarget.scrollTop
            }}
          />
        </div>
      </div>
    </>
  )
}
