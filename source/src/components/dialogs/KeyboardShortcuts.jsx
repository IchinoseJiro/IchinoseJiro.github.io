// Help > Keyboard Shortcuts. Only the editable information uses these commands.
export default function KeyboardShortcuts({ setHelpOpen }) {
  return (
    <div
      className="help-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setHelpOpen(false)
      }}
    >
      <section className="help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title">
        <button className="help-close" onClick={() => setHelpOpen(false)} aria-label="Close help">
          ×
        </button>
        <h2 id="help-title">Portfolio shortcuts</h2>
        <p>
          <kbd>Ctrl</kbd> + <kbd>A</kbd> Select all editor text
        </p>
        <p>
          <kbd>Ctrl</kbd> + <kbd>Z</kbd> Undo · <kbd>Ctrl</kbd> + <kbd>Y</kbd> Redo
        </p>
        <p>
          <kbd>Ctrl</kbd> + <kbd>X</kbd> Cut · <kbd>Ctrl</kbd> + <kbd>C</kbd> Copy · <kbd>Ctrl</kbd>{' '}
          + <kbd>V</kbd> Paste
        </p>
        <p>
          <kbd>Alt</kbd> + <kbd>Z</kbd> Toggle word wrap
        </p>
        <small>
          All edits are local to this page. Reload restores the original portfolio information.
        </small>
      </section>
    </div>
  )
}
