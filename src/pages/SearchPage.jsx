import { useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
  const { anchorRef, error, hasMore, items, loading } = useInfiniteMovies(fetcher, query)

  useDocumentMeta({
    title: query ? `Buscar: ${query} | Movie Explorer` : 'Peliculas populares | Movie Explorer',
    description: 'Busqueda de peliculas con scroll infinito, favoritos persistentes y carga progresiva.',
  })

  return (
    <div className="page page--inner">
      <section className="section container">
        <SectionHeader
          eyebrow={query && query !== 'popular' ? 'Búsqueda' : 'Catálogo'}
          title={query && query !== 'popular' ? `Resultados para "${query}"` : 'Películas populares'}
          copy="Sigue bajando para descubrir más títulos."
        />
        {items.length > 0 ? <MovieGrid movies={items} /> : null}
        {loading ? (
          items.length > 0 ? <Loader label="Cargando más películas" /> : <MovieSkeletonGrid count={12} />
        ) : null}
        {error ? <p className="status-card">{error}</p> : null}
        {!loading && items.length === 0 ? (
          <article className="empty-state">
            <h2>No encontramos resultados.</h2>
            <p>Prueba con otro título o explora las películas populares.</p>
            <Link className="btn btn--primary" to="/buscar?q=popular">
              Ver populares
            </Link>
          </article>
        ) : null}
        {hasMore ? <div ref={anchorRef} className="infinite-anchor" aria-hidden="true"></div> : null}
      </section>
    </div>
  )
}