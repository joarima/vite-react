import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header'
import Router from './components/Router.tsx'
import AuthProvider from './components/SupabaseAuthProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Header />
      <Router />
      <Footer />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
)
