import PageErrorBoundary from './components/dialogs/PageErrorBoundary.jsx'
// Gallery entry point: mounts Portfolio into portfolio.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import Portfolio from './pages/portfolio/Portfolio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageErrorBoundary>
      <Portfolio />
    </PageErrorBoundary>
  </StrictMode>,
)
