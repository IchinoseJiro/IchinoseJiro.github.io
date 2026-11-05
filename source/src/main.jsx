import PageErrorBoundary from './PageErrorBoundary.jsx'
// Home page entry point: mounts App into index.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode><PageErrorBoundary>
    <App />
  </PageErrorBoundary></StrictMode>,
)
