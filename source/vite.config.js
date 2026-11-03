// Build configuration: turns the editable React project into the deployable dist folder.
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Enable React components and development hot reload.
  plugins: [react()],
  // Build both pages together so home and the gallery are published.
  build: {
    rolldownOptions: {
      // main is the home page; portfolio is the separate project gallery.
      input: { main: 'index.html', portfolio: 'portfolio.html' },
    },
  },
})
