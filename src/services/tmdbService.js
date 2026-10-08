import axios from 'axios'
import { mockGenres, mockMovies } from '../data/mockTmdb.js'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  params: {
    api_key: API_KEY,
    language: 'es-ES',
  },
})

function chunkMovies(items, page = 1, pageSize = 12) {
  const start = (page - 1) * pageSize
  const results = items.slice(start, start + pageSize)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  return {
    page,
    results,
    total_pages: totalPages,
    total_results: items.length,
  }
}

function mapMovie(movie) {
  return {
    ...movie,
    posterUrl: movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : '',
    backdropUrl: movie.backdrop_path ? `${BACKDROP_BASE_URL}${movie.backdrop_path}` : '',
    genres: movie.genre_ids?.map((genreId) => mockGenres[genreId]).filter(Boolean) ?? movie.genres ?? [],
  }
}

function mapMovieDetail(movie) {
  return {
    ...mapMovie(movie),
    runtime: movie.runtime ?? 128,
    status: movie.status ?? 'Released',
    tagline: movie.tagline ?? 'Una historia para ver en pantalla grande.',
  }
}

function fallbackFilter(query) {
  return mockMovies.filter((movie) => {
    if (!query) return true
    return `${movie.title} ${movie.overview}`.toLowerCase().includes(query.toLowerCase())
  })
}

async function fetchFromApi(path, params = {}) {
  if (!API_KEY) {
    throw new Error('MISSING_TMDB_KEY')
  }

  const { data } = await client.get(path, { params })
  return data
}

export async function getPopularMovies(page = 1) {
  try {
    const data = await fetchFromApi('/movie/popular', { page })
    return { ...data, results: data.results.map(mapMovie), usingFallback: false }
  } catch {
    return {
      ...chunkMovies([...mockMovies].sort((a, b) => b.vote_average - a.vote_average), page),
      results: chunkMovies([...mockMovies].sort((a, b) => b.vote_average - a.vote_average), page).results.map(mapMovie),
      usingFallback: true,
    }
  }
}

export async function getTrendingMovies(page = 1) {
  try {
    const data = await fetchFromApi('/trending/movie/week', { page })
    return { ...data, results: data.results.map(mapMovie), usingFallback: false }
  } catch {
    return {
      ...chunkMovies([...mockMovies].sort((a, b) => b.id - a.id), page),
      results: chunkMovies([...mockMovies].sort((a, b) => b.id - a.id), page).results.map(mapMovie),
      usingFallback: true,
    }
  }
}

export async function searchMovies(query, page = 1) {
  try {
    const data = await fetchFromApi('/search/movie', { query, page, include_adult: false })
    return { ...data, results: data.results.map(mapMovie), usingFallback: false }
  } catch {
    const filtered = fallbackFilter(query)
    return {
      ...chunkMovies(filtered, page),
      results: chunkMovies(filtered, page).results.map(mapMovie),
      usingFallback: true,
    }
  }
}

export async function getMovieDetail(movieId) {
  try {
    const data = await fetchFromApi(`/movie/${movieId}`)
    return { ...mapMovieDetail(data), usingFallback: false }
  } catch {
    const fallback = mockMovies.find((movie) => String(movie.id) === String(movieId)) ?? mockMovies[0]
    return { ...mapMovieDetail(fallback), usingFallback: true }
  }
}

export async function getSimilarMovies(movieId) {
  try {
    const data = await fetchFromApi(`/movie/${movieId}/similar`)
    return { ...data, results: data.results.map(mapMovie), usingFallback: false }
  } catch {
    const source = mockMovies.find((movie) => String(movie.id) === String(movieId))
    const others = mockMovies.filter((movie) => movie.id !== Number(movieId))
    const related = others.filter((movie) => source?.genre_ids?.some((genreId) => movie.genre_ids.includes(genreId)))
    const rest = others.filter((movie) => !related.includes(movie))
    const fallback = [...related, ...rest].slice(0, 8)
    return { page: 1, results: fallback.map(mapMovie), total_pages: 1, total_results: fallback.length, usingFallback: true }
  }
}

export function isTmdbConfigured() {
  return Boolean(API_KEY)
}