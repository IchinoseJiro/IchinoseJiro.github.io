// Compact email/phone control and its copy confirmation, shared by both views.
export default function ContactCopyButton({ contactKey: key, label, value, copied, copyContact }) {
  return (
    <button className="contact-copy" type="button" onClick={() => copyContact(key, value)}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small aria-live="polite">
        {copied === key ? 'Copied!' : copied === 'failed' ? 'Copy unavailable' : 'Click to copy'}
      </small>
    </button>
  )
}
