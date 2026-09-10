export default function PriceDisplay({ price, originalPrice, discountPercentage, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg font-semibold text-ink">${price}</span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-faint line-through">${originalPrice}</span>
      )}
      {discountPercentage ? (
        <span className="rounded-pill bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
          -{discountPercentage}%
        </span>
      ) : null}
    </div>
  )
}
