import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppShell from './layout/AppShell.jsx'
import Loader from './components/Loader.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage.jsx'))
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader screen label="Montando experiencia cinematografica" />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="buscar" element={<SearchPage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="pelicula/:movieId" element={<MovieDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
