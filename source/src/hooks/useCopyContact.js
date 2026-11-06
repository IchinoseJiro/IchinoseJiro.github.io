// Shared clipboard action with a single expiring confirmation and timer cleanup.
import { useEffect, useRef, useState } from 'react'
export default function useCopyContact() {
  const [copied, setCopied] = useState('')
  const timerRef = useRef(null)
  useEffect(() => () => clearTimeout(timerRef.current), [])
  // Copy email or phone and show a temporary confirmation.
  const copyContact = async (key, value) => {
    let success = false
    try {
      await navigator.clipboard.writeText(value)
      success = true
    } catch {
      const field = document.createElement('textarea')
      field.value = value
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.focus()
      field.select()
      success = document.execCommand('copy')
      field.remove()
    }
    setCopied(success ? key : 'failed')
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setCopied(''), 1800)
  }

  return { copied, copyContact }
}
