// Editable documents, bounded undo/redo history, clipboard, and selection commands.
import { useRef, useState } from 'react'
import { files, initialDocuments } from '../../data/profileContent.js'

export default function usePortfolioDocuments(active, editorRef, setStatus) {
  const [documents, setDocuments] = useState(() => ({ ...initialDocuments }))
  const historyRef = useRef(
    Object.fromEntries(files.map((file) => [file, { past: [], future: [] }])),
  )
  const currentText = documents[active] ?? ''
  const resetDocuments = () => {
    setDocuments({ ...initialDocuments })
    historyRef.current = Object.fromEntries(files.map((file) => [file, { past: [], future: [] }]))
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
    setDocuments((prev) => ({ ...prev, [file]: value }))
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
    setDocuments((prev) => ({ ...prev, [active]: previous }))
    setStatus('Undo')
    editorRef.current?.focus()
  }
  const redo = () => {
    const history = historyRef.current[active]
    if (!history?.future.length) return setStatus('Nothing to redo')
    const next = history.future.pop()
    history.past.push(currentText)
    setDocuments((prev) => ({ ...prev, [active]: next }))
    setStatus('Redo')
    editorRef.current?.focus()
  }
  const clipboardAction = async (kind) => {
    const editor = editorRef.current
    if (!editor) return
    const start = editor.selectionStart
    const end = editor.selectionEnd
    if (kind === 'copy' || kind === 'cut') {
      if (start === end) return setStatus('Select information in the editor first')
      try {
        await navigator.clipboard.writeText(currentText.slice(start, end))
      } catch {
        document.execCommand(kind)
      }
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
    requestAnimationFrame(() => {
      editorRef.current?.focus()
      editorRef.current?.setSelectionRange(insertAt + insertion.length, insertAt + insertion.length)
    })
    setStatus(`Duplicated line ${direction}`)
  }
  const toggleComment = () => {
    const editor = editorRef.current
    if (!editor) return
    const start = currentText.lastIndexOf('\n', editor.selectionStart - 1) + 1
    let end = currentText.indexOf('\n', editor.selectionEnd)
    if (end < 0) end = currentText.length
    const line = currentText.slice(start, end)
    const commented = line.split('\n').every((row) => row.trimStart().startsWith('//'))
    const transformed = line
      .split('\n')
      .map((row) =>
        commented ? row.replace(/^(\s*)\/\/ ?/, '$1') : row.replace(/^(\s*)/, '$1// '),
      )
      .join('\n')
    editRange(start, end, transformed, commented ? 'Uncommented selection' : 'Commented selection')
  }

  return {
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
  }
}
