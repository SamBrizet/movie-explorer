import { useContext } from 'react'
import { MovieContext } from './movieContextObject.js'

export function useMovieApp() {
  const context = useContext(MovieContext)

  if (!context) {
    throw new Error('useMovieApp debe usarse dentro de MovieProvider')
  }

  return context
}