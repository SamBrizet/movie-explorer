import { FiFilm } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <div className="site-footer__brand">
          <span className="brand">
            <span className="brand__mark" aria-hidden="true">
              <FiFilm />
            </span>
            <span className="brand__name">
              Movie<em>Explorer</em>
            </span>
          </span>
          <p>Descubre estrenos, tendencias y clásicos. Guarda tus favoritos y arma tu próxima maratón.</p>
        </div>

        <nav className="site-footer__links" aria-label="Enlaces del sitio">
          <h2>Explorar</h2>
          <Link to="/">Inicio</Link>
          <Link to="/buscar?q=popular">Populares</Link>
          <Link to="/favoritos">Mi lista</Link>
        </nav>

        <div className="site-footer__credits">
          <h2>Datos</h2>
          <p>Información de películas proporcionada por TMDB. Este producto utiliza la API de TMDB pero no está avalado ni certificado por TMDB.</p>
        </div>
      </div>

      <p className="site-footer__legal container">© {new Date().getFullYear()} Movie Explorer · Proyecto de portafolio</p>
    </footer>
  )
}
