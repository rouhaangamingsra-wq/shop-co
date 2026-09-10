import { Search } from './icons'

export default function SearchBar({ value, onChange, onSearch, className = '' }) {
  return (
    <form
      className={`relative flex-1 ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        onSearch?.(value)
      }}
    >
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search for products…"
        aria-label="Search for products"
        className="w-full rounded-pill bg-smoke py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-faint focus:bg-paper focus:ring-2 focus:ring-ink/10"
      />
    </form>
  )
}
