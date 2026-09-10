import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import ProductGrid from '../components/ProductGrid'
import Breadcrumb from '../components/Breadcrumb'

export default function SearchResults() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetchProducts({ search: q })
        setProducts(res.items || res)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [q])

  return (
    <section className="shell py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: `Search: "${q}"` }]} />
      <h1 className="mt-4 text-h2">Search results</h1>
      <p className="mt-2 text-muted">{products.length} found for &quot;{q}&quot;</p>
      <div className="mt-8">
        <ProductGrid products={products} loading={loading} columns={4} />
      </div>
    </section>
  )
}
