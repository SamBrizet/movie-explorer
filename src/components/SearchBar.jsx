import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ defaultValue = '', onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = String(formData.get('query') ?? '').trim()
    onSubmit(query)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <FiSearch aria-hidden="true" />
      <input
        name="query"
        type="search"
        defaultValue={defaultValue}
        placeholder="Buscar películas"
        aria-label="Buscar películas"
      />
    </form>
  )
}