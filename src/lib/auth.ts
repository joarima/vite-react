import { Session, User } from '@supabase/supabase-js'
import { atom, useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { supabase } from './supabase'

const userAtom = atom<User | null>(null)
const sessionAtom = atom<Session | null>(null)

export function useAuth() {
  const [user, setUser] = useAtom(userAtom)
  const [session, setSession] = useAtom(sessionAtom)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user || null)
      }
    )

    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) {
        throw error
      }

      setSession(session)
      setUser(session?.user || null)
    }

    setData()

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const isLoggedIn = useMemo(() => {
    return !!user
  }, [user])

  return {
    user,
    session,
    isLoggedIn,
  }
}
