import { useEffect, useState } from 'react'
import { FiClock, FiHeart, FiStar } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import FallbackNotice from '../components/FallbackNotice.jsx'
import Loader from '../components/Loader.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useMovieApp } from '../context/useMovieApp.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { getMovieDetail, getSimilarMovies } from '../services/tmdbService.js'

export default function MovieDetailPage() {
  const { movieId } = useParams()
  const { favoriteIds, toggleFavorite } = useMovieApp()
  const [movie, setMovie] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useDocumentMeta({
    title: movie ? `${movie.title} | Movie Explorer` : 'Detalle | Movie Explorer',
    description: movie?.overview ?? 'Detalle de pelicula con titulos similares y favoritos.',
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      const [detail, related] = await Promise.all([getMovieDetail(movieId), getSimilarMovies(movieId)])

      if (cancelled) return

      setMovie(detail)
      setSimilar(related.results)
      setUsingFallback(Boolean(detail.usingFallback || related.usingFallback))
      setLoading(false)
    }

    const timer = window.setTimeout(() => {
      void load()
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [movieId])

  if (loading) {
    return <Loader screen label="Cargando detalle de la pelicula" />
  }

  if (!movie) {
    return (
      <section className="empty-state empty-state--page">
        <h1>No encontramos esta pelicula.</h1>
        <Link className="button-link" to="/">
          Volver al inicio
        </Link>
      </section>
    )
  }

  return (
    <div className="page-stack page-stack--tight">
      <section className="detail-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(5,8,15,.4), rgba(5,8,15,.96)), url(${movie.backdropUrl})` }}>
        <div className="detail-hero__content">
          <p className="eyebrow">Detalle</p>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>

          <div className="detail-meta">
            <span><FiStar /> {movie.vote_average?.toFixed(1)}</span>
            <span><FiClock /> {movie.runtime} min</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
          </div>

          <div className="chip-row">
            {movie.genres?.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          <div className="detail-actions">
            <button type="button" className="button-link" onClick={() => toggleFavorite(movie)}>
              <FiHeart /> {favoriteIds.has(movie.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
          </div>
        </div>
      </section>

      {usingFallback ? <FallbackNotice /> : null}

      <section className="content-section content-section--tight">
        <SectionHeader eyebrow="Similares" title="Mas titulos para continuar la sesion" copy="Recomendaciones relacionadas para mantener el tono visual y narrativo." />
        <MovieGrid movies={similar} />
      </section>
    </div>
  )
}