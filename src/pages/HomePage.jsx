import { useCallback, useMemo } from 'react'
import FeaturedHero from '../components/FeaturedHero.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import MovieRow from '../components/MovieRow.jsx'
import MovieSkeletonGrid from '../components/MovieSkeletonGrid.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useMovies } from '../hooks/useMovies.js'
import { getPopularMovies, getTrendingMovies } from '../services/tmdbService.js'

export default function HomePage() {
  const fetchPopular = useCallback(() => getPopularMovies(1), [])
  const fetchTrending = useCallback(() => getTrendingMovies(1), [])
  const popular = useMovies(fetchPopular, 'popular')
  const trending = useMovies(fetchTrending, 'trending')

  useDocumentMeta({
    title: 'Movie Explorer | Descubre películas',
    description: 'Explora estrenos, tendencias y las películas más populares. Guarda tus favoritas en tu lista.',
  })

  const featured = useMemo(
    () => trending.data.filter((movie) => movie.backdropUrl).slice(0, 5),
    [trending.data],
  )
  const topRated = useMemo(
    () => [...popular.data].sort((a, b) => b.vote_average - a.vote_average).slice(0, 10),
    [popular.data],
  )

  return (
    <div className="page">
      {trending.loading ? <div className="featured featured--loading" aria-hidden="true" /> : <FeaturedHero movies={featured} />}

      <MovieRow
        eyebrow="Top 10"
        title="Tendencias de la semana"
        loading={trending.loading}
        movies={trending.data.slice(0, 10)}
        ranked
      />

      <section className="section container">
        <SectionHeader
          eyebrow="Populares"
          title="Lo que todos están viendo"
          action={{ to: '/buscar?q=popular', label: 'Ver todas' }}
        />
        {popular.loading ? <MovieSkeletonGrid count={12} /> : <MovieGrid movies={popular.data.slice(0, 12)} />}
      </section>

      <MovieRow
        eyebrow="Crítica y público"
        title="Mejor valoradas"
        loading={popular.loading}
        movies={topRated}
      />
    </div>
  )
}