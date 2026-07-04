import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MovieContext } from './movieContextObject.js'

const STORAGE_KEYS = {
  favorites: 'movie-explorer-favorites',
  theme: 'movie-explorer-theme',
}

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readStorage(STORAGE_KEYS.favorites, []))
  const [theme, setTheme] = useState(() => readStorage(STORAGE_KEYS.theme, 'dark'))
  const [toast, setToast] = useState({ open: false, message: '' })
  const toastTimer = useRef(null)

  useEffect(() => {
    writeStorage(STORAGE_KEYS.favorites, favorites)
  }, [favorites])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.theme, theme)
    document.documentElement.dataset.theme = theme

    return () => {
      window.clearTimeout(toastTimer.current)
    }
  }, [theme])

  const showToast = useCallback((message) => {
    setToast({ open: true, message })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => {
      setToast({ open: false, message: '' })
    }, 2400)
  }, [])

  const toggleFavorite = useCallback(
    (movie) => {
      setFavorites((current) => {
        const exists = current.some((item) => item.id === movie.id)

        if (exists) {
          showToast('Pelicula eliminada de favoritos')
          return current.filter((item) => item.id !== movie.id)
        }

        showToast('Pelicula agregada a favoritos')
        return [movie, ...current]
      })
    },
    [showToast],
  )

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const favoriteIds = useMemo(() => new Set(favorites.map((movie) => movie.id)), [favorites])

  const value = useMemo(
    () => ({
      favoriteIds,
      favorites,
      showToast,
      theme,
      toast,
      toggleFavorite,
      toggleTheme,
    }),
    [favoriteIds, favorites, showToast, theme, toast, toggleFavorite, toggleTheme],
  )

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}