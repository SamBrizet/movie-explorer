import { AnimatePresence, motion } from 'framer-motion'
import { FiFilm, FiHeart, FiHome, FiMoon, FiSun, FiTrendingUp } from 'react-icons/fi'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useMovieApp } from '../context/useMovieApp.js'
import SearchBar from '../components/SearchBar.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

export default function AppShell() {
  const navigate = useNavigate()
  const { favorites, theme, toast, toggleTheme } = useMovieApp()

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner container">
          <NavLink className="brand" to="/" aria-label="Movie Explorer, inicio">
            <span className="brand__mark" aria-hidden="true">
              <FiFilm />
            </span>
            <span className="brand__name">
              Movie<em>Explorer</em>
            </span>
          </NavLink>

          <div className="site-header__search">
            <SearchBar defaultValue="" onSubmit={(query) => navigate(`/buscar?q=${encodeURIComponent(query)}`)} />
          </div>

          <nav className="site-nav" aria-label="Principal">
            <NavLink className="nav-secondary" to="/" end>
              <FiHome aria-hidden="true" /> <span className="nav-label">Inicio</span>
            </NavLink>
            <NavLink className="nav-secondary" to="/buscar?q=popular">
              <FiTrendingUp aria-hidden="true" /> <span className="nav-label">Populares</span>
            </NavLink>
            <NavLink to="/favoritos" aria-label={`Mi lista: ${favorites.length}`}>
              <FiHeart aria-hidden="true" /> <span className="nav-label">Mi lista</span>
              <span className="nav-count" aria-hidden="true">
                {favorites.length}
              </span>
            </NavLink>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <SiteFooter />

      <AnimatePresence>
        {toast.open ? (
          <motion.div
            className="toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}