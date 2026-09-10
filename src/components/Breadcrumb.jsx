import { Link } from 'react-router-dom'
import { ChevronRight } from './icons'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted">
      {items.map((it, i) => {
        const last = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1">
            {it.to && !last ? (
              <Link to={it.to} className="hover:text-ink">
                {it.label}
              </Link>
            ) : (
              <span className={last ? 'text-ink' : ''}>{it.label}</span>
            )}
            {!last && <ChevronRight className="h-3.5 w-3.5 text-faint" />}
          </span>
        )
      })}
    </nav>
  )
}
