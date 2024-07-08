import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from '../src/board/Board.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
)
