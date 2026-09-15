import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore — react-helmet-async v2 compatible with React 19 at runtime
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* @ts-ignore */}
    <HelmetProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    {/* @ts-ignore */}
    </HelmetProvider>
  </StrictMode>,
)
