import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

type Theme = 'dark' | 'light' | 'system'
const storageKey = 'vite-ui-theme'
const defaultTheme = 'system'
const themeAtom = atom<Theme>(
  (localStorage.getItem(storageKey) as Theme) || defaultTheme
)

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      localStorage.setItem(storageKey, theme)
      return
    }

    root.classList.add(theme)
    localStorage.setItem(storageKey, theme)
  }, [theme])

  return {
    theme,
    setTheme,
  }
}
