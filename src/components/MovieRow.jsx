import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import MovieCard from './MovieCard.jsx'
import { MovieSkeletonCard } from './MovieSkeletonGrid.jsx'
import SectionHeader from './SectionHeader.jsx'

export default function MovieRow({ action, copy, eyebrow, loading = false, movies = [], ranked = false, title }) {
  const trackRef = useRef(null)

  const scrollByPage = (direction) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <section className={`section container row${ranked ? ' row--ranked' : ''}`}>
      <SectionHeader eyebrow={eyebrow} title={title} copy={copy} action={action}>
        <div className="row__arrows">
          <button type="button" onClick={() => scrollByPage(-1)} aria-label={`${title}: anteriores`}>
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByPage(1)} aria-label={`${title}: siguientes`}>
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </SectionHeader>

      <div className="row__track" ref={trackRef}>
        {loading
          ? Array.from({ length: 7 }, (_, index) => <MovieSkeletonCard key={index} />)
          : movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} rank={ranked ? index + 1 : undefined} />
            ))}
      </div>
    </section>
  )
}
