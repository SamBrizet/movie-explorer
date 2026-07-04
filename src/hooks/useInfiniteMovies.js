import { useEffect, useMemo, useRef, useState } from 'react'

export function useInfiniteMovies(fetchPage, resetKey) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)
  const observerRef = useRef(null)
  const anchorRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems([])
      setPage(1)
      setHasMore(true)
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [resetKey])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')

      try {
        const response = await fetchPage(page)
        if (cancelled) return

        setItems((current) => {
          const incoming = response.results ?? []
          if (page === 1) return incoming

          const known = new Set(current.map((movie) => movie.id))
          return [...current, ...incoming.filter((movie) => !known.has(movie.id))]
        })
        setUsingFallback(Boolean(response.usingFallback))
        setHasMore(page < (response.total_pages ?? 1))
      } catch {
        if (!cancelled) {
          setError('No fue posible cargar mas peliculas.')
          setHasMore(false)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const timer = window.setTimeout(() => {
      void load()
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [fetchPage, page, resetKey])

  useEffect(() => {
    if (!anchorRef.current || !hasMore) return

    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !loading) {
          setPage((current) => current + 1)
        }
      },
      { rootMargin: '300px 0px' },
    )

    observerRef.current.observe(anchorRef.current)

    return () => observerRef.current?.disconnect()
  }, [hasMore, loading, items.length])

  return useMemo(
    () => ({ anchorRef, error, hasMore, items, loading, usingFallback }),
    [error, hasMore, items, loading, usingFallback],
  )
}