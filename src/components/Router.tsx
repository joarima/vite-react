import { About } from '@/components/About'
import { Post } from '@/components/Post'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import NewPost from './NewPost'
import { useAuth } from './SupabaseAuthProvider'

const Router = () => {
  const { user } = useAuth()
  const isAdmin = !!user

  useEffect(() => {}, [])

  return (
    <div className="my-14 hidden-scrollbar">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/new"
            element={isAdmin ? <NewPost /> : <Navigate replace to="/" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/:id?" element={<Post />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default Router
