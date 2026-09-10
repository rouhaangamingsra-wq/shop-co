import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import ProductGrid from '../components/ProductGrid'
import Breadcrumb from '../components/Breadcrumb'

const sorts = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

const categories = ['T-Shirts', 'Jeans', 'Shirts', 'Hoodies', 'Jackets', 'Shorts', 'Dresses']
const dressStyles = ['Casual', 'Formal', 'Party', 'Gym']
const colors = ['#000000', '#FFFFFF', '#6B7280', '#1E3A8A', '#0EA5E9', '#7C3AED', '#16A34A']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34']

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    sort: 'popular',
    category: '',
    dressStyle: '',
    minPrice: '',
    maxPrice: '',
    color: '',
    size: '',
    page: 1,
  })

  const load = useCallback(async (params) => {
    setLoading(true)
    try {
      const res = await fetchProducts(params)
      setProducts(res.items || res)
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(filters)
  }, [filters, load])

  const update = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value, page: 1 }))
  }

  return (
    <section className="shell py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />
      <h1 className="mt-4 text-h2">Shop</h1>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        {/* FILTERS SIDEBAR */}
        <aside className="w-full shrink-0 space-y-6 lg:w-64">
          <div className="card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-ink">Filters</h3>
              <button
                onClick={() => setFilters({ sort: filters.sort, category: '', dressStyle: '', minPrice: '', maxPrice: '', color: '', size: '', page: 1 })}
                className="text-xs text-muted hover:text-ink"
              >
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="mb-2 text-sm font-semibold">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => update('category', filters.category === c ? '' : c)}
                      className={`chip ${filters.category === c ? 'chip-active' : ''}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Dress Style</h4>
                <div className="flex flex-wrap gap-2">
                  {dressStyles.map((s) => (
                    <button
                      key={s}
                      onClick={() => update('dressStyle', filters.dressStyle === s ? '' : s)}
                      className={`chip ${filters.dressStyle === s ? 'chip-active' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Price</h4>
                <div className="flex items-center gap-2">
                  <input type="number" className="input py-2" placeholder="Min" value={filters.minPrice} onChange={(e) => update('minPrice', e.target.value)} />
                  <span className="text-faint">-</span>
                  <input type="number" className="input py-2" placeholder="Max" value={filters.maxPrice} onChange={(e) => update('maxPrice', e.target.value)} />
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => update('color', filters.color === c ? '' : c)}
                      aria-label={`Color ${c}`}
                      className={`h-7 w-7 rounded-full border-2 ${filters.color === c ? 'border-ink ring-1 ring-ink' : 'border-line'}`}
                      style={{ backgroundColor: c, boxShadow: c === '#FFFFFF' ? 'inset 0 0 0 1px #E6E6E6' : undefined }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => update('size', filters.size === s ? '' : s)}
                      className={`chip ${filters.size === s ? 'chip-active' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-muted">{products.length} products</span>
            <select
              value={filters.sort}
              onChange={(e) => update('sort', e.target.value)}
              className="rounded-pill border border-line bg-paper px-4 py-2 text-sm"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <ProductGrid products={products} loading={loading} columns={4} />
        </div>
      </div>
    </section>
  )
}
