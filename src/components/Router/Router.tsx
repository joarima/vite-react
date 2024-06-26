import { About } from '@/components/About'
import { Post } from '@/components/Post'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Contact } from '../Contact'
import NewPost from '../NewPost'
import { useAuth } from '../SupabaseAuthProvider'
import { Footer } from './Footer'
import { Header } from './Header'

const Router = () => {
  const { user } = useAuth()
  const isAdmin = !!user

  return (
    <div className="my-14 hidden-scrollbar !font-sans !font-thin">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/new"
            element={isAdmin ? <NewPost /> : <Navigate replace to="/" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:id?" element={<Post />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default Router
