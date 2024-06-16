import { Button } from '@/components/ui/button'
// https://v0.dev/t/xYHqD5MkVkT
export function Header() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <a href="#" className="flex items-center">
            <img src="owl.png" className="h-12" />
            <span className="sr-only">Acme Inc</span>
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
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
