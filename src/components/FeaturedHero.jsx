import { useState } from 'react'
import { FiCheck, FiInfo, FiPlus, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useMovieApp } from '../context/useMovieApp.js'

export default function FeaturedHero({ movies }) {
  const [index, setIndex] = useState(0)
  const { favoriteIds, toggleFavorite } = useMovieApp()
  const movie = movies[index]

  if (!movie) return null

  const isFavorite = favoriteIds.has(movie.id)

  return (
    <section className="featured" aria-label="Película destacada">
      <div className="featured__backdrop" key={`backdrop-${movie.id}`}>
        {movie.backdropUrl ? <img src={movie.backdropUrl} alt="" fetchPriority="high" /> : null}
      </div>

      <div className="featured__inner container">
        <div className="featured__content" key={`content-${movie.id}`}>
          <p className="eyebrow">Nº {index + 1} en tendencias esta semana</p>
          <h1>{movie.title}</h1>

          <div className="featured__meta">
            <span className="rating">
              <FiStar aria-hidden="true" /> {movie.vote_average?.toFixed(1)}
            </span>
            <span>{movie.release_date?.slice(0, 4)}</span>
            {movie.genres?.slice(0, 3).map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          <p className="featured__overview">{movie.overview}</p>

          <div className="featured__actions">
            <Link className="btn btn--primary" to={`/pelicula/${movie.id}`}>
              <FiInfo aria-hidden="true" /> Ver detalles
            </Link>
            <button type="button" className="btn btn--ghost" onClick={() => toggleFavorite(movie)} aria-pressed={isFavorite}>
              {isFavorite ? <FiCheck aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
              {isFavorite ? 'En mi lista' : 'Mi lista'}
            </button>
          </div>
        </div>

        <div className="featured__picker" role="group" aria-label="Elegir película destacada">
          {movies.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              className={itemIndex === index ? 'is-active' : ''}
              onClick={() => setIndex(itemIndex)}
              aria-label={`Ver ${item.title}`}
              aria-pressed={itemIndex === index}
            >
              {item.posterUrl ? <img src={item.posterUrl} alt="" loading="lazy" /> : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
