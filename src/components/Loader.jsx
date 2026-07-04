export default function Loader({ label = 'Cargando peliculas', screen = false }) {
  return (
    <div className={`loader${screen ? ' loader--screen' : ''}`} role="status" aria-live="polite">
      <span className="loader__ring" aria-hidden="true"></span>
      <p>{label}</p>
    </div>
  )
}