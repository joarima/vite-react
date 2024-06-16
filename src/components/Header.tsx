import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { SignInDialog } from './SignInDialog'
import { useAuth } from './SupabaseAuthProvider'
// https://v0.dev/t/xYHqD5MkVkT
export function Header() {
  const { user } = useAuth()

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
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <a href="#" className="flex flex-shrink-0 items-center ml-8">
            <img src="owl.png" className="h-12" />
          </a>
          <nav className="flex gap-4">
            <a
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Home
            </a>
            <a
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              About
            </a>
            <a
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Services
            </a>
            <a
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4 mr-8">
            {user ? (
              <Button
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
