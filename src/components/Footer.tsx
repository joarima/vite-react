export function Footer() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <span className="sr-only">title</span>
          </div>
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
              Contact
            </a>
          </nav>
        </div>
      </div>
    </nav>
  )
}
