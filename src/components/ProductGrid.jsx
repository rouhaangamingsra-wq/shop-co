import ProductCard from './ProductCard'
import LoadingSpinner from './LoadingSpinner'

export default function ProductGrid({ products, loading, columns = 4 }) {
  if (loading) return <LoadingSpinner />
  if (!products || products.length === 0) return null
  const cols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }[columns]
  return <div className={`grid ${cols} gap-x-5 gap-y-8`}>{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
}
