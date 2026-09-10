import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Close, Truck } from '../components/icons'
import Breadcrumb from '../components/Breadcrumb'

export default function Cart() {
  const { items, count, subtotal, updateQuantity, removeItem } = useCart()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const shipping = subtotal > 75 ? 0 : 15
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + shipping - discount

  const applyPromo = (e) => {
    e.preventDefault()
    if (promo.trim().toLowerCase() === 'shop10') setPromoApplied(true)
  }

  if (count === 0) {
    return (
      <section className="shell py-24 text-center">
        <h1 className="text-h2">Your cart is empty</h1>
        <p className="mt-2 text-muted">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary mt-6 inline-block">Continue Shopping</Link>
      </section>
    )
  }

  return (
    <section className="shell py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <h1 className="mt-4 text-h2">Your cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.key} className="card flex gap-4 p-4">
              <img src={item.image} alt={item.title} className="h-28 w-24 shrink-0 rounded-xl object-cover bg-smoke" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {item.color && `Color: ${item.color}`} {item.size && `Size: ${item.size}`}
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.key)} className="btn-ghost p-1" aria-label="Remove">
                    <Close className="h-5 w-5 text-muted" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-3 rounded-pill border border-line px-2">
                    <button className="px-2 py-1" onClick={() => updateQuantity(item.key, item.quantity - 1)}>-</button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button className="px-2 py-1" onClick={() => updateQuantity(item.key, item.quantity + 1)}>+</button>
                  </div>
                  <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-muted"><span>Subtotal</span><span className="text-ink">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted"><span>Discount</span><span className="text-ink">-{discount.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted"><span>Shipping</span><span className="text-ink">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-semibold text-ink"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            {shipping === 0 && (
              <p className="mt-4 flex items-center gap-2 text-xs text-green-700">
                <Truck className="h-4 w-4" /> You qualify for free shipping!
              </p>
            )}

            <form onSubmit={applyPromo} className="mt-5 flex gap-2">
              <input className="input" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code (try SHOP10)" />
              <button className="btn-outline shrink-0">Apply</button>
            </form>
            {promoApplied && <p className="mt-2 text-xs text-green-700">Promo applied — 10% off</p>}

            <Link to="/checkout" className="btn-primary mt-5 w-full">Checkout now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
