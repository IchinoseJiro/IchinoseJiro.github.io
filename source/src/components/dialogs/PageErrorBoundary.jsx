// A readable recovery screen replaces a blank page if React cannot render either entry point.
import { Component } from 'react'

export default class PageErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main
        style={{
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          padding: 24,
          boxSizing: 'border-box',
          background: '#181b20',
          color: '#dbeaf4',
          fontFamily: 'Segoe UI, sans-serif',
        }}
      >
        <section
          style={{ maxWidth: 480, padding: 28, border: '1px solid #527991', borderRadius: 12 }}
        >
          <p style={{ color: '#7dcfff' }}>LunR Code</p>
          <h1>This page couldn’t finish loading.</h1>
          <p>Please load the latest version of Jireh’s portfolio.</p>
          <button
            type="button"
            style={{
              padding: '12px 18px',
              background: '#176f9e',
              color: '#fff',
              border: '1px solid #91d8ff',
              borderRadius: 7,
              cursor: 'pointer',
              fontSize: 16,
            }}
            onClick={() => {
              const url = new URL(window.location.href)
              url.searchParams.set('v', Date.now().toString(36))
              window.location.replace(url.href)
            }}
          >
            Reload latest version
          </button>
          <p>
            <a href="/" style={{ color: '#7dcfff' }}>
              Back to home
            </a>
          </p>
        </section>
      </main>
    )
  }
}
