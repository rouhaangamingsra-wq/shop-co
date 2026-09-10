import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { Cart, User, Menu, Search } from './icons'
import SearchBar from './SearchBar'
import MobileMenu from './MobileMenu'

const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?filter=sale', label: 'On Sale' },
  { to: '/shop?filter=new', label: 'New Arrivals' },
  { to: '/shop?filter=brands', label: 'Brands' },
]

export default function Header() {
  const { user } = useAuth()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const onSearch = (term) => {
    navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="shell">
        <div className="flex h-16 items-center gap-4 lg:h-20">
          <button className="lg:hidden btn-ghost p-2" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight lg:text-3xl">
            SHOP.CO
          </Link>

          <nav className="ml-6 hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto hidden flex-1 max-w-md md:block">
            <SearchBar value={q} onChange={setQ} onSearch={onSearch} />
          </div>

          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <button
              className="btn-ghost p-2 md:hidden"
              aria-label="Search"
              onClick={() => {
                const term = window.prompt('Search products')
                if (term) onSearch(term)
              }}
            >
              <Search className="h-6 w-6" />
            </button>
            <Link to="/cart" className="btn-ghost relative p-2" aria-label="Cart">
              <Cart className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-pill bg-ink px-1 text-[11px] font-semibold text-paper">
                  {count}
                </span>
              )}
            </Link>
            <Link to={user ? '/account' : '/login'} className="btn-ghost p-2" aria-label="Account">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.name} className="h-7 w-7 rounded-full object-cover" />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">
                  {user ? (user.name?.[0] || 'U').toUpperCase() : <User className="h-5 w-5" />}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
