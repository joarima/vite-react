import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'
import { ModeToggle } from './ModeToggle'
import { SignInDialog } from './SignInDialog'
import { useAuth } from './SupabaseAuthProvider'
import { useTheme } from './ThemeProvider'
// https://v0.dev/t/xYHqD5MkVkT
export function Header() {
  const { user } = useAuth()
  const { theme } = useTheme()

  console.log(theme)

  const onLogout = async () => {
    // sign out request
    try {
      const { error } = await await supabase.auth.signOut()

      if (error) {
        throw new Error(error.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90 font-sans font-thin">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          {theme == 'light' || theme == 'system' ? (
            <Link to={'/'} className="flex flex-shrink-0 items-center ml-8">
              <img src="owl.png" className="h-12" />
            </Link>
          ) : (
            <Link to={'/'} className="flex flex-shrink-0 items-center ml-8">
              <img src="owlwhite.png" className="h-12" />
            </Link>
          )}
          <nav className="flex gap-4">
            <Link
              to={'/'}
              className="flex items-center text-sm transition-colors hover:underline"
            >
              Home
            </Link>
            <Link
              to={'/about'}
              className="flex items-center text-sm transition-colors hover:underline"
            >
              About
            </Link>
            {user && (
              <Link
                to={'/new'}
                className="flex items-center text-sm transition-colors hover:underline"
              >
                New
              </Link>
            )}
            <Link
              to={'/contact'}
              className="flex items-center text-sm transition-colors hover:underline"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4 mr-8">
            <ModeToggle />
            {user ? (
              <Button
                className="font-thin"
                variant="outline"
                onClick={() => {
                  onLogout()
                }}
              >
                Logout
              </Button>
            ) : (
              <SignInDialog />
            )}
            {/* for user create */}
            {/* <SignUpDialog /> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
