import { NavLink } from 'react-router-dom'
import { Close } from './icons'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?filter=sale', label: 'On Sale' },
  { to: '/shop?filter=new', label: 'New Arrivals' },
  { to: '/shop?filter=brands', label: 'Brands' },
]

export default function MobileMenu({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden />
      <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-paper p-6 shadow-float">
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-extrabold tracking-tight">SHOP.CO</span>
          <button onClick={onClose} aria-label="Close menu" className="btn-ghost p-2">
            <Close className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              onClick={onClose}
              className="rounded-pill px-4 py-3 text-base font-medium text-ink hover:bg-smoke"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
