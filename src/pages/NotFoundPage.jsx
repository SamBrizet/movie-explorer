import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function NotFoundPage() {
  useDocumentMeta({
    title: '404 | Movie Explorer',
    description: 'Pagina no encontrada dentro de Movie Explorer.',
  })

  return (
    <section className="empty-state empty-state--page">
      <p className="eyebrow">404</p>
      <h1>Esta funcion no esta en cartelera.</h1>
      <p>Regresa al home o revisa tus favoritos guardados.</p>
      <div className="detail-actions">
        <Link className="button-link" to="/">
          Volver al inicio
        </Link>
        <Link className="button-link button-link--ghost" to="/favoritos">
          Ver favoritos
        </Link>
      </div>
    </section>
  )
}