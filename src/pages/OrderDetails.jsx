import { useParams, Link } from 'react-router-dom'

export default function OrderDetails() {
  const { id } = useParams()
  return (
    <section className="shell py-16">
      <h1 className="text-h2">Order #{id}</h1>
      <p className="mt-4 text-muted">Order details will appear once the backend and Firestore are connected.</p>
      <Link to="/orders" className="btn-outline mt-4 inline-block">Back to orders</Link>
    </section>
  )
}
