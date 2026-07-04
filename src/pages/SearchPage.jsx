import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import FallbackNotice from '../components/FallbackNotice.jsx'
import Loader from '../components/Loader.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import MovieSkeletonGrid from '../components/MovieSkeletonGrid.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useInfiniteMovies } from '../hooks/useInfiniteMovies.js'
import { getPopularMovies, searchMovies } from '../services/tmdbService.js'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''
  const fetcher = useCallback(
    (page) => (query && query !== 'popular' ? searchMovies(query, page) : getPopularMovies(page)),
    [query],
  )
  const { anchorRef, error, hasMore, items, loading, usingFallback } = useInfiniteMovies(fetcher, query)

  useDocumentMeta({
    title: query ? `Buscar: ${query} | Movie Explorer` : 'Peliculas populares | Movie Explorer',
    description: 'Busqueda de peliculas con scroll infinito, favoritos persistentes y carga progresiva.',
  })

  return (
    <div className="page-stack page-stack--tight">
      <section className="content-section content-section--tight">
        <SectionHeader
          eyebrow="Busqueda"
          title={query && query !== 'popular' ? `Resultados para "${query}"` : 'Catalogo popular con scroll infinito'}
          copy="La lista sigue cargando automaticamente a medida que avanzas en la pantalla."
        />
        {usingFallback ? <FallbackNotice /> : null}
        {items.length > 0 ? <MovieGrid movies={items} /> : null}
        {loading ? (
          items.length > 0 ? <Loader label="Cargando mas peliculas" /> : <MovieSkeletonGrid count={8} />
        ) : null}
        {error ? <p className="status-card">{error}</p> : null}
        {!loading && items.length === 0 ? (
          <article className="empty-state">
            <h2>No encontramos resultados.</h2>
            <p>Prueba con otro titulo o revisa la seccion popular.</p>
          </article>
        ) : null}
        {hasMore ? <div ref={anchorRef} className="infinite-anchor" aria-hidden="true"></div> : null}
      </section>
    </div>
  )
}