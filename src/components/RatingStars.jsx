import { Star } from './icons'

export default function RatingStars({ value = 0, count, size = 16, className = '' }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center text-ink">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            filled={i < full + (half ? 1 : 0)}
            style={{ width: size, height: size }}
            className={i < full ? 'text-ink' : i === full && half ? 'text-ink' : 'text-faint'}
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-sm text-muted">
          {value.toFixed(1)} <span className="text-faint">({count})</span>
        </span>
      )}
    </div>
  )
}
