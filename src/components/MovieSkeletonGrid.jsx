export default function MovieSkeletonGrid({ count = 6 }) {
  return (
    <div className="movie-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="movie-card movie-card--skeleton">
          <div className="skeleton skeleton--poster"></div>
          <div className="movie-card__body">
            <div className="skeleton skeleton--sm"></div>
            <div className="skeleton skeleton--md"></div>
            <div className="skeleton skeleton--line"></div>
            <div className="skeleton skeleton--line"></div>
          </div>
        </article>
      ))}
    </div>
  )
}