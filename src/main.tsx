import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './About.tsx'
import App from './App.tsx'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header'
import AuthProvider from './components/SupabaseAuthProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/:id?" element={<App />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
)
