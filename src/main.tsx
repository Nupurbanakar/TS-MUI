import React from 'react'
import ReactDOM from 'react-dom/client'
import NoteKeeper from './NoteKeeper.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NoteKeeper />
  </React.StrictMode>,
)
