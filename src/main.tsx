import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/Router/Router.tsx'
import AuthProvider from './components/SupabaseAuthProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router />

        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
