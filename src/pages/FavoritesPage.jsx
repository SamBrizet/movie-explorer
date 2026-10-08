import { FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useMovieApp } from '../context/useMovieApp.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function FavoritesPage() {
  const { favorites } = useMovieApp()

  useDocumentMeta({
    title: 'Mi lista | Movie Explorer',
    description: 'Tu biblioteca de películas favoritas, guardada en este dispositivo.',
  })

  return (
    <div className="page page--inner">
      <section className="section container">
        <SectionHeader
          eyebrow="Mi lista"
          title={favorites.length > 0 ? `${favorites.length} ${favorites.length === 1 ? 'película guardada' : 'películas guardadas'}` : 'Tu lista está vacía'}
          copy="Se guarda en este dispositivo para que no pierdas lo que quieres ver."
        />
        {favorites.length === 0 ? (
          <article className="empty-state">
            <span className="empty-state__icon" aria-hidden="true">
              <FiHeart />
            </span>
            <h2>Aún no agregaste películas.</h2>
            <p>Toca el corazón de cualquier póster para guardarla aquí.</p>
            <Link className="btn btn--primary" to="/">
              Explorar películas
            </Link>
          </article>
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </section>
    </div>
  )
}