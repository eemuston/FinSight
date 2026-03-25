import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UserContextProvider } from './contexts/UserContext.tsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>
  </UserContextProvider>,
)
