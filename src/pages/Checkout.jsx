import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Breadcrumb from '../components/Breadcrumb'

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const shipping = subtotal > 75 ? 0 : 15
  const total = subtotal + shipping
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.state.trim()) e.state = 'Required'
    if (!form.zip.trim()) e.zip = 'Required'
    if (!form.country.trim()) e.country = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setDone(true)
    clear()
  }

  if (done) {
    return (
      <section className="shell py-24 text-center">
        <h1 className="text-h2">Order placed!</h1>
        <p className="mt-2 text-muted">Thank you, {form.name}. Your order #SHOP-7362 has been received.</p>
      </section>
    )
  }

  return (
    <section className="shell py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="mt-4 text-h2">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <form onSubmit={submit} className="lg:col-span-2 card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Shipping details</h2>
          {['name', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country'].map((field) => (
            <div key={field}>
              <label className="mb-1.5 block text-sm font-medium capitalize">{field}</label>
              <input
                className="input"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field === 'email' ? 'email' : 'text'}
              />
              {errors[field] && <p className="mt-1 text-xs text-red-600">{errors[field]}</p>}
            </div>
          ))}
          <button type="submit" className="btn-primary w-full">Place order</button>
        </form>

        <div className="card h-fit p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <div key={i.key} className="flex justify-between text-muted">
                <span>{i.title} x{i.quantity}</span>
                <span className="text-ink">${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-muted border-t border-line pt-3">
              <span>Subtotal</span><span className="text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span><span className="text-ink">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-ink">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
