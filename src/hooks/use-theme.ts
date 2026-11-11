import { useEffect, useState } from 'react'

// Light or dark: toggles the `.dark` class on <html>.
export type Mode = 'light' | 'dark'

// Which theme file in src/themes/ is active: sets data-theme on <html>.
// Add a name here when you add a theme file.
export const themes = ['default', 'galazio'] as const
export type Theme = (typeof themes)[number]

function isTheme(value: unknown): value is Theme {
  return themes.includes(value as Theme)
}

// Reads a saved value. Storage can be blocked (e.g. private browsing), so
// any error just means "nothing saved".
function readSaved(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignore: the choice still works for this visit.
  }
}

// Saved mode, or light. (To follow the operating system's setting instead,
// return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
function getInitialMode(): Mode {
  const saved = readSaved('mode')
  if (saved === 'light' || saved === 'dark') return saved
  return 'light'
}

// Saved theme, or the starting theme set on <html data-theme> in index.html.
function getInitialTheme(): Theme {
  const saved = readSaved('theme')
  if (isTheme(saved)) return saved
  const fromHtml = document.documentElement.dataset.theme
  return isTheme(fromHtml) ? fromHtml : 'default'
}

// Light/dark mode and the active theme, both remembered between visits.
export function useTheme() {
  const [mode, setMode] = useState<Mode>(getInitialMode)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
    save('mode', mode)
  }, [mode])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    save('theme', theme)
  }, [theme])

  const toggleMode = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))

  return { mode, toggleMode, theme, setTheme }
}
