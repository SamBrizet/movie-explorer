import { startTransition, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import FallbackNotice from '../components/FallbackNotice.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import MovieSkeletonGrid from '../components/MovieSkeletonGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useMovies } from '../hooks/useMovies.js'
import { getPopularMovies, getTrendingMovies } from '../services/tmdbService.js'

export default function HomePage() {
  const navigate = useNavigate()
  const fetchPopular = useCallback(() => getPopularMovies(1), [])
  const fetchTrending = useCallback(() => getTrendingMovies(1), [])
  const popular = useMovies(fetchPopular, 'popular')
  const trending = useMovies(fetchTrending, 'trending')

  useDocumentMeta({
    title: 'Movie Explorer | Descubre peliculas',
    description: 'Explora cine popular, tendencias y favoritos con una experiencia tipo Netflix + Apple TV.',
  })

  const usingFallback = popular.meta.usingFallback || trending.meta.usingFallback

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <p className="eyebrow">Movie discovery</p>
          <h1>Peliculas populares, tendencias y detalle premium en una sola vista.</h1>
          <p>
            Una experiencia de exploracion visual inspirada en Netflix y Apple TV, con favoritos,
            dark mode, skeleton loading e infinite scroll.
          </p>
          <SearchBar
            onSubmit={(query) => {
              startTransition(() => {
                navigate(`/buscar?q=${encodeURIComponent(query)}`)
              })
            }}
          />
        </div>

        <div className="hero-panel__visual">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1500&q=80"
            alt="Sala de cine inmersiva"
          />
        </div>
      </section>

      {usingFallback ? <FallbackNotice /> : null}

      <section className="content-section">
        <SectionHeader
          eyebrow="Trending"
          title="Lo que esta marcando la conversacion esta semana"
          copy="Titulos con mejor momentum para una portada con lenguaje de streaming real."
        />
        {trending.loading ? <MovieSkeletonGrid /> : <MovieGrid movies={trending.data.slice(0, 6)} />}
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="Popular"
          title="Blockbusters y favoritos de audiencia"
          copy="Curaduria orientada a posters grandes, detalles legibles y navegacion simple."
        />
        {popular.loading ? <MovieSkeletonGrid /> : <MovieGrid movies={popular.data.slice(0, 6)} />}
      </section>
    </div>
  )
}