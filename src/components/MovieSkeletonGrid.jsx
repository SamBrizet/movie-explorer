export function MovieSkeletonCard() {
  return (
    <article className="movie-card movie-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--poster"></div>
      <div className="movie-card__info">
        <div className="skeleton skeleton--md"></div>
        <div className="skeleton skeleton--sm"></div>
      </div>
    </article>
  )
}

export default function MovieSkeletonGrid({ count = 6 }) {
  return (
    <div className="movie-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <MovieSkeletonCard key={index} />
      ))}
    </div>
  )
}