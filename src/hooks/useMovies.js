import { useEffect, useState } from 'react'

export function useMovies(fetcher, key) {
  const [state, setState] = useState({ data: [], loading: true, error: '', meta: {} })

  useEffect(() => {
    let cancelled = false

    async function load() {
      setState((current) => ({ ...current, loading: true, error: '' }))

      try {
        const response = await fetcher()
        if (!cancelled) {
          setState({
            data: response.results ?? [],
            loading: false,
            error: '',
            meta: { usingFallback: Boolean(response.usingFallback) },
          })
        }
      } catch {
        if (!cancelled) {
          setState({ data: [], loading: false, error: 'No pudimos cargar peliculas.', meta: {} })
        }
      }
    }

    const timer = window.setTimeout(() => {
      void load()
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [fetcher, key])

  return state
}