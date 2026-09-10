// Lightweight inline SVG icons (stroke-based, inherit currentColor).
export const Search = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)
export const Cart = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="9" cy="21" r="1.4" />
    <circle cx="18" cy="21" r="1.4" />
    <path d="M2.5 3h2l2.2 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21.5 7H6" />
  </svg>
)
export const User = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
)
export const Menu = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)
export const Close = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const Star = ({ filled = false, half = false, ...p }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...p}>
    {half && <path d="M12 2.5v19" stroke="none" fill="currentColor" opacity="0" />}
    <path d="M12 2.5l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 18.9 5.9 21.6l1.4-6.8L2.2 9.6l6.9-.8L12 2.5z" />
  </svg>
)
export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)
export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const Heart = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
)
export const Truck = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M1 3h13v13H1zM14 8h4l3 3v5h-7" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
)
export const Refresh = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
  </svg>
)
export const Shield = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3z" />
  </svg>
)
