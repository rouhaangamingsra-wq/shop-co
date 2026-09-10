import { Link } from 'react-router-dom'
import RatingStars from './RatingStars'
import PriceDisplay from './PriceDisplay'

export default function ProductCard({ product }) {
  const href = `/product/${product.slug || product.id}`
  return (
    <Link to={href} className="group block">
      <div className="card overflow-hidden transition-shadow hover:shadow-float">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-smoke">
          <img
            src={product.images?.[0]}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml;utf8,' +
                encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'><rect width='100%' height='100%' fill='#F2F2F2'/><text x='50%' y='50%' font-family='sans-serif' font-size='20' fill='#B3B3B3' text-anchor='middle'>SHOP.CO</text></svg>`,
                )
            }}
          />
          {product.discountPercentage ? (
            <span className="absolute left-3 top-3 rounded-pill bg-ink px-2.5 py-1 text-xs font-medium text-paper">
              -{product.discountPercentage}%
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="line-clamp-1 text-base font-medium text-ink">{product.title}</h3>
        <div className="mt-1">
          <RatingStars value={product.rating || 0} count={product.reviewCount} size={15} />
        </div>
        <div className="mt-1.5">
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
          />
        </div>
      </div>
    </Link>
  )
}
