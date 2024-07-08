import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import  { router } from './router.tsx'
import { RouterProvider } from "react-router-dom";

export function ErrorBoundary() {
      (<div className='h-screen w-screen flex justify-center'>
            rfdwsf
      </div>
      
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)


