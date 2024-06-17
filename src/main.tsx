import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/Router.tsx'
import AuthProvider from './components/SupabaseAuthProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />

      <Toaster />
    </AuthProvider>
  </React.StrictMode>
)
