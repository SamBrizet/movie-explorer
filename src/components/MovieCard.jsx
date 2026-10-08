import { motion } from 'framer-motion'
import { FiHeart, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useMovieApp } from '../context/useMovieApp.js'

export default function MovieCard({ movie, rank }) {
  const { favoriteIds, toggleFavorite } = useMovieApp()
  const isFavorite = favoriteIds.has(movie.id)
  const year = movie.release_date?.slice(0, 4)
  const genre = movie.genres?.[0]

  return (
    <motion.article
      className={`movie-card${rank ? ' movie-card--ranked' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      {rank ? (
        <span className="movie-card__rank" aria-hidden="true">
          {rank}
        </span>
      ) : null}

      <div className="movie-card__frame">
        <Link className="movie-card__poster" to={`/pelicula/${movie.id}`} aria-label={movie.title}>
          {movie.posterUrl ? (
            <img src={movie.posterUrl} alt={`Póster de ${movie.title}`} loading="lazy" />
          ) : (
            <span className="movie-card__noposter">{movie.title}</span>
          )}
          <span className="movie-card__overlay" aria-hidden="true">
            <span>Ver detalles</span>
          </span>
        </Link>

        <span className="movie-card__rating">
          <FiStar aria-hidden="true" /> {movie.vote_average?.toFixed(1)}
        </span>

        <button
          type="button"
          className={`movie-card__favorite${isFavorite ? ' is-active' : ''}`}
          onClick={() => toggleFavorite(movie)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Quitar ${movie.title} de mi lista` : `Agregar ${movie.title} a mi lista`}
        >
          <FiHeart aria-hidden="true" />
        </button>
      </div>

      <div className="movie-card__info">
        <Link to={`/pelicula/${movie.id}`}>
          <h3>{movie.title}</h3>
        </Link>
        <p>
          {year}
          {genre ? ` · ${genre}` : ''}
        </p>
      </div>
    </motion.article>
  )
}