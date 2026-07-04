import { AnimatePresence, motion } from 'framer-motion'
import { FiHeart, FiMoon, FiSun } from 'react-icons/fi'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useMovieApp } from '../context/useMovieApp.js'
import SearchBar from '../components/SearchBar.jsx'

export default function AppShell() {
  const navigate = useNavigate()
  const { favorites, theme, toast, toggleTheme } = useMovieApp()

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          <span className="brand__mark">ME</span>
          <span>
            Movie Explorer
            <small>Streaming discovery</small>
          </span>
        </NavLink>

        <div className="site-header__search">
          <SearchBar defaultValue="" onSubmit={(query) => navigate(`/buscar?q=${encodeURIComponent(query)}`)} />
        </div>

        <nav className="site-nav" aria-label="Principal">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/buscar?q=popular">Popular</NavLink>
          <NavLink to="/favoritos">
            <FiHeart /> {favorites.length}
          </NavLink>
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

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