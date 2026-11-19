// Runs in the document head before page styles load. Both React entries share this store.
;(function () {
  const key = 'lunr-code:theme'
  const listeners = new Set()
  let theme = 'dark'
  try {
    if (localStorage.getItem(key) === 'light') theme = 'light'
  } catch {
    // Theme selection still works when browser storage is unavailable.
  }
  function apply(next) {
    theme = next
    document.documentElement.dataset.theme = next
    document.documentElement.style.colorScheme = next
    document.documentElement.style.backgroundColor = next === 'light' ? '#f6f8fb' : '#1e1e1e'
    const toolbar = document.querySelector('meta[name="theme-color"]')
    if (toolbar) toolbar.content = next === 'light' ? '#eef2f6' : '#1e1e1e'
    for (const listener of listeners) listener()
  }
  window.lunrTheme = {
    getSnapshot: () => theme,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    setTheme(next) {
      if (next !== 'light' && next !== 'dark') return
      try {
        localStorage.setItem(key, next)
      } catch {
        // Keep the current session usable without persistent storage.
      }
      apply(next)
    },
  }
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null)
      apply(event.newValue === 'light' ? 'light' : 'dark')
  })
  apply(theme)
})()
