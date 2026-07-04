import { Link } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useMovieApp } from '../context/useMovieApp.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function FavoritesPage() {
  const { favorites } = useMovieApp()

  useDocumentMeta({
    title: 'Favoritos | Movie Explorer',
    description: 'Tu biblioteca local de peliculas favoritas guardadas con LocalStorage.',
  })

  return (
    <div className="page-stack page-stack--tight">
      <section className="content-section content-section--tight">
        <SectionHeader
          eyebrow="Favoritos"
          title="Tu watchlist personal"
          copy="Guardada localmente para revisar peliculas sin perder el contexto de exploracion."
        />
        {favorites.length === 0 ? (
          <article className="empty-state">
            <h2>Aun no agregaste peliculas.</h2>
            <p>Explora el home o busca un titulo para comenzar tu lista.</p>
            <Link className="button-link" to="/">
              Ir al inicio
            </Link>
          </article>
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </section>
    </div>
  )
}