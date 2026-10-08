import { useEffect, useState } from 'react'
import { FiArrowLeft, FiCheck, FiClock, FiPlus, FiStar } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import MovieRow from '../components/MovieRow.jsx'
import { useMovieApp } from '../context/useMovieApp.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { getMovieDetail, getSimilarMovies } from '../services/tmdbService.js'

function formatRuntime(minutes) {
  if (!minutes) return null
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return hours > 0 ? `${hours} h ${rest} min` : `${rest} min`
}

export default function MovieDetailPage() {
  const { movieId } = useParams()
  const { favoriteIds, toggleFavorite } = useMovieApp()
  const [movie, setMovie] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)

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
      <section className="empty-state empty-state--page container">
        <h1>No encontramos esta película.</h1>
        <Link className="btn btn--primary" to="/">
          Volver al inicio
        </Link>
      </section>
    )
  }

  const isFavorite = favoriteIds.has(movie.id)
  const year = movie.release_date?.slice(0, 4)

  return (
    <div className="page">
      <section className="detail">
        <div className="detail__backdrop" aria-hidden="true">
          {movie.backdropUrl ? <img src={movie.backdropUrl} alt="" fetchPriority="high" /> : null}
        </div>

        <div className="detail__inner container">
          <Link className="back-link" to="/">
            <FiArrowLeft aria-hidden="true" /> Volver
          </Link>

          <div className="detail__layout">
            <div className="detail__poster">
              {movie.posterUrl ? <img src={movie.posterUrl} alt={`Póster de ${movie.title}`} /> : null}
            </div>

            <div className="detail__content">
              <h1>{movie.title}</h1>
              {movie.tagline ? <p className="detail__tagline">{movie.tagline}</p> : null}

              <div className="detail__meta">
                <span className="rating">
                  <FiStar aria-hidden="true" /> {movie.vote_average?.toFixed(1)}
                </span>
                {year ? <span>{year}</span> : null}
                {formatRuntime(movie.runtime) ? (
                  <span>
                    <FiClock aria-hidden="true" /> {formatRuntime(movie.runtime)}
                  </span>
                ) : null}
              </div>

              <div className="chip-row">
                {movie.genres?.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>

              <div className="detail__synopsis">
                <h2>Sinopsis</h2>
                <p>{movie.overview}</p>
              </div>

              <div className="detail__actions">
                <button type="button" className="btn btn--primary" onClick={() => toggleFavorite(movie)} aria-pressed={isFavorite}>
                  {isFavorite ? <FiCheck aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                  {isFavorite ? 'En mi lista' : 'Agregar a mi lista'}
                </button>
                <Link className="btn btn--ghost" to="/favoritos">
                  Ver mi lista
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 ? <MovieRow eyebrow="Similares" title="También te puede gustar" movies={similar} /> : null}
    </div>
  )
}