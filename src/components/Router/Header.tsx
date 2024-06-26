import { useAuth } from '@/components/SupabaseAuthProvider'
import { useTheme } from '@/components/ThemeProvider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'
import { ModeToggle } from './ModeToggle'
import { Search } from './Search'
import { SignInDialog } from './SignInDialog'

type Props = {
  setSearchWord: React.Dispatch<React.SetStateAction<string | undefined>>
}

// https://v0.dev/t/xYHqD5MkVkT
export function Header({ setSearchWord }: Props) {
  const { user } = useAuth()
  const { theme } = useTheme()

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

  const resetSearch = () => {
    setSearchWord(undefined)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90 font-sans font-thin h-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link
            to={'/'}
            className="flex flex-shrink-0 items-center ml-[5px] sm:ml-8"
            onClick={resetSearch}
          >
            {theme == 'light' || theme == 'system' ? (
              <img src="owl.png" className="h-12" />
            ) : (
              <img src="owlwhite.png" className="h-12" />
            )}
          </Link>
          <nav className="flex gap-4">
            <Link
              to={'/'}
              className="flex items-center text-sm transition-colors hover:underline"
              onClick={resetSearch}
            >
              Home
            </Link>
            <Link
              to={'/about'}
              className="flex items-center text-sm transition-colors hover:underline"
              onClick={resetSearch}
            >
              About
            </Link>
            {user && (
              <Link
                to={'/new'}
                className="flex items-center text-sm transition-colors hover:underline"
                onClick={resetSearch}
              >
                New
              </Link>
            )}
            <Link
              to={'/contact'}
              className="flex items-center text-sm transition-colors hover:underline"
              onClick={resetSearch}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4 mr-[5px] sm:mr-8">
            <Search setSearchWord={setSearchWord} />
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
