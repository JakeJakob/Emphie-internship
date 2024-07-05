import React from 'react'
import ReactDOM from 'react-dom/client'
import Start from './admin-panel/start-page.tsx'
import Tournament from './admin-panel/tournament-page.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Start />
    <Tournament />
  </React.StrictMode>,
)
