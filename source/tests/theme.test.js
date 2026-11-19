// Verify the same early theme store used by both page entries, including blocked storage.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const script = readFileSync(new URL('../public/theme-init.js', import.meta.url), 'utf8')
function boot(saved, blocked = false) {
  const root = { dataset: {}, style: {} }
  const toolbar = {}
  const events = {}
  const storage = new Map([['lunr-code:theme', saved]])
  const window = {
    addEventListener: (name, callback) => {
      events[name] = callback
    },
  }
  runInNewContext(script, {
    window,
    document: { documentElement: root, querySelector: () => toolbar },
    localStorage: {
      getItem: (key) => {
        if (blocked) throw new Error('Storage unavailable')
        return storage.get(key)
      },
      setItem: (key, value) => {
        if (blocked) throw new Error('Storage unavailable')
        storage.set(key, value)
      },
    },
  })
  return { store: window.lunrTheme, root, toolbar, storage, events }
}
test('theme starts dark unless a valid saved light preference exists', () => {
  for (const value of [undefined, 'dark', 'unknown'])
    assert.equal(boot(value).root.dataset.theme, 'dark')
  const { root, toolbar } = boot('light')
  assert.equal(root.dataset.theme, 'light')
  assert.equal(root.style.colorScheme, 'light')
  assert.equal(toolbar.content, '#eef2f6')
})
test('theme selection persists, notifies subscribers, and ignores invalid values', () => {
  const { store, storage, root } = boot('dark')
  let changes = 0
  const unsubscribe = store.subscribe(() => {
    changes++
  })
  store.setTheme('light')
  assert.equal(store.getSnapshot(), 'light')
  assert.equal(storage.get('lunr-code:theme'), 'light')
  assert.equal(root.dataset.theme, 'light')
  store.setTheme('invalid')
  assert.equal(store.getSnapshot(), 'light')
  assert.equal(changes, 1)
  unsubscribe()
  store.setTheme('dark')
  assert.equal(changes, 1)
})
test('cross-tab changes and unavailable storage leave theme switching usable', () => {
  const { store, events } = boot('dark')
  events.storage({ key: 'lunr-code:theme', newValue: 'light' })
  assert.equal(store.getSnapshot(), 'light')
  events.storage({ key: null, newValue: null })
  assert.equal(store.getSnapshot(), 'dark')
  const blocked = boot('light', true)
  assert.equal(blocked.store.getSnapshot(), 'dark')
  blocked.store.setTheme('light')
  assert.equal(blocked.root.dataset.theme, 'light')
})
