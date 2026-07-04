import { motion } from 'framer-motion'
import { FiHeart, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useMovieApp } from '../context/useMovieApp.js'

export default function MovieCard({ movie }) {
  const { favoriteIds, toggleFavorite } = useMovieApp()
  const isFavorite = favoriteIds.has(movie.id)

  return (
    <motion.article
      className="movie-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.01 }}
    >
      <button
        type="button"
        className={`movie-card__favorite${isFavorite ? ' is-active' : ''}`}
        onClick={() => toggleFavorite(movie)}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <FiHeart />
      </button>

      <Link className="movie-card__poster" to={`/pelicula/${movie.id}`}>
        <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
      </Link>

      <div className="movie-card__body">
        <div className="movie-card__rating">
          <span>{movie.release_date?.slice(0, 4) ?? 'Estreno'}</span>
          <strong>
            <FiStar /> {movie.vote_average?.toFixed(1)}
          </strong>
        </div>
        <Link to={`/pelicula/${movie.id}`}>
          <h3>{movie.title}</h3>
        </Link>
        <p>{movie.overview}</p>
        <div className="chip-row">
          {movie.genres?.slice(0, 3).map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}