import { About } from '@/About'
import App from '@/App'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NewPost from './NewPost'
import { useAuth } from './SupabaseAuthProvider'

const Router = () => {
  const { user } = useAuth()
  const isAdmin = !!user

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/new"
          element={isAdmin ? <NewPost /> : <Navigate replace to="/" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/:id?" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
