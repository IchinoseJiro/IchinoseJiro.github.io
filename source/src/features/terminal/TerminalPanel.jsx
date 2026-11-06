// Typing-only terminal: vertical history, input, and automatic scroll to the latest line.
import { useEffect, useRef } from 'react'
export default function TerminalPanel({
  terminalText,
  terminalLines,
  terminalInput,
  setTerminalInput,
  setTerminalLines,
  setTerminalOpen,
}) {
  const terminalOutputRef = useRef(null)
  useEffect(() => {
    const output = terminalOutputRef.current
    if (output) output.scrollTop = output.scrollHeight
  }, [terminalLines, terminalText])
  return (
    <section className="terminal-panel" aria-label="Typing-only terminal">
      <div className="terminal-heading">
        <strong>TERMINAL</strong>
        <small>CMD STYLE · INPUT ONLY</small>
        <button type="button" onClick={() => setTerminalOpen(false)} aria-label="Close terminal">
          ×
        </button>
      </div>
      <div className="terminal-output" aria-live="polite" ref={terminalOutputRef}>
        {terminalText && <pre className="terminal-entry">{terminalText}</pre>}
        {terminalLines.map((line, index) => (
          <pre className="terminal-entry" key={index}>
            <span className="terminal-prompt">C:\Portfolio&gt;</span> {line}
          </pre>
        ))}
      </div>
      <form
        className="terminal-input-row"
        onSubmit={(event) => {
          event.preventDefault()
          if (terminalInput.trim()) {
            setTerminalLines((lines) => [...lines, terminalInput])
            setTerminalInput('')
          }
        }}
      >
        <label htmlFor="terminal-input">C:\Portfolio&gt;</label>
        <input
          id="terminal-input"
          autoComplete="off"
          spellCheck="false"
          value={terminalInput}
          onChange={(event) => setTerminalInput(event.target.value)}
          placeholder="Type here — commands will not run"
        />
      </form>
    </section>
  )
}
