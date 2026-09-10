import { Link } from 'react-router-dom'

export default function CategoryCard({ category, className = '' }) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group relative block overflow-hidden rounded-card bg-smoke ${className}`}
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
        <span className="text-lg font-semibold text-paper">{category.name}</span>
        <span className="rounded-pill bg-paper px-3 py-1 text-xs font-medium text-ink">Shop</span>
      </div>
    </Link>
  )
}
