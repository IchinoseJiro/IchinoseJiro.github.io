// The head script owns theme persistence so switching a theme never remounts the workspace.
import { useSyncExternalStore } from 'react'

export default function useTheme() {
  const store = window.lunrTheme
  return [useSyncExternalStore(store.subscribe, store.getSnapshot), store.setTheme]
}
