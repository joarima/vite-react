import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
          <Route path="/:id?" element={<App />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  </React.StrictMode>
)
