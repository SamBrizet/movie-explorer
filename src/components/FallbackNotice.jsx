export default function FallbackNotice() {
  return (
    <div className="fallback-notice" role="status">
      Mostrando dataset de respaldo. Agrega <code>VITE_TMDB_API_KEY</code> para consumir TMDB en tiempo real.
    </div>
  )
}