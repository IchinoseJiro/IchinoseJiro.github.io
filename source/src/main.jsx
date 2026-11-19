import PageErrorBoundary from './components/dialogs/PageErrorBoundary.jsx'
// Home page entry point: mounts App into index.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import ThemeProvider from './components/navigation/ThemeProvider.jsx'
import './styles/theme.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PageErrorBoundary>
  </StrictMode>,
)
