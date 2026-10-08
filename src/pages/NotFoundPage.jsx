import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function NotFoundPage() {
  useDocumentMeta({
    title: '404 | Movie Explorer',
    description: 'Pagina no encontrada dentro de Movie Explorer.',
  })

  return (
    <section className="empty-state empty-state--page container">
      <p className="eyebrow">Error 404</p>
      <h1>Esta función no está en cartelera.</h1>
      <p>Vuelve al inicio o revisa las películas que guardaste en tu lista.</p>
      <div className="empty-state__actions">
        <Link className="btn btn--primary" to="/">
          Volver al inicio
        </Link>
        <Link className="btn btn--ghost" to="/favoritos">
          Ver mi lista
        </Link>
      </div>
    </section>
  )
}