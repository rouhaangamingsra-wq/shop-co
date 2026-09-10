import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fetchProduct, fetchReviews } from '../services/productService'
import RatingStars from '../components/RatingStars'
import PriceDisplay from '../components/PriceDisplay'
import Breadcrumb from '../components/Breadcrumb'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ProductDetails() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState({ color: '', size: '', quantity: 1 })
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [p, r] = await Promise.all([fetchProduct(id), fetchReviews(id)])
        setProduct(p)
        setReviews(r)
        setSelected({ ...selected, color: p.colors?.[0] || '', size: p.sizes?.[0] || '' })
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <LoadingSpinner className="py-24" />
  if (!product) return <div className="shell py-24 text-center text-muted">Product not found</div>

  const add = () => {
    if (!selected.size) return setError('Please select a size')
    if (!selected.color) return setError('Please select a color')
    setError('')
    addItem(product, { ...selected, quantity: Number(selected.quantity) })
  }

  const buy = () => {
    add()
    window.location.href = '/cart'
  }

  return (
    <section className="shell py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: product.title }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="flex gap-4">
          <div className="hidden w-20 shrink-0 flex-col gap-3 sm:flex">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt={`${product.title} ${i + 1}`} className="aspect-square rounded-xl object-cover" />
            ))}
          </div>
          <div className="aspect-[4/5] flex-1 overflow-hidden rounded-card bg-smoke">
            <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{product.title}</h1>
          <div className="mt-2">
            <RatingStars value={product.rating} count={product.reviewCount} />
          </div>
          <div className="mt-4">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} discountPercentage={product.discountPercentage} />
          </div>
          <p className="mt-6 text-sm text-muted leading-relaxed">{product.description}</p>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-6 space-y-5 border-t border-line pt-6">
            <div>
              <span className="text-sm font-semibold">Color</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelected({ ...selected, color: c })}
                    className={`h-8 w-8 rounded-full border-2 ${selected.color === c ? 'border-ink ring-1 ring-ink' : 'border-line'}`}
                    style={{ backgroundColor: c, boxShadow: c === '#FFFFFF' ? 'inset 0 0 0 1px #E6E6E6' : undefined }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold">Size</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelected({ ...selected, size: s })}
                    className={`chip ${selected.size === s ? 'chip-active' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold">Quantity</span>
              <div className="mt-2 inline-flex items-center gap-3 rounded-pill border border-line px-2">
                <button className="px-3 py-2 text-lg" onClick={() => setSelected({ ...selected, quantity: Math.max(1, selected.quantity - 1) })}>-</button>
                <span className="min-w-[2ch] text-center text-sm font-medium">{selected.quantity}</span>
                <button className="px-3 py-2 text-lg" onClick={() => setSelected({ ...selected, quantity: selected.quantity + 1 })}>+</button>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button onClick={add} className="btn-primary flex-1">Add to Cart</button>
              <button onClick={buy} className="btn-outline flex-1">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-extrabold">Customer Reviews</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.length === 0 && <p className="text-muted">No reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="card p-5">
              <RatingStars value={r.rating} />
              <p className="mt-2 text-sm font-medium">{r.userName}</p>
              <p className="mt-1 text-sm text-muted">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
