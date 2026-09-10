import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-6xl font-extrabold text-ink">404</h1>
      <p className="mt-4 text-xl text-muted">Page not found</p>
      <p className="mt-2 text-sm text-muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-8">Back home</Link>
    </section>
  )
}
