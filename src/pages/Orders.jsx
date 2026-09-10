import { Link } from 'react-router-dom'

export default function Orders() {
  return (
    <section className="shell py-16">
      <h1 className="text-h2">My orders</h1>
      <p className="mt-4 text-muted">No orders yet. They will appear here after checkout is wired to Firestore.</p>
      <Link to="/shop" className="btn-primary mt-4 inline-block">Shop now</Link>
    </section>
  )
}
