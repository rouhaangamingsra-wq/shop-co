import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import ProductGrid from '../components/ProductGrid'
import Breadcrumb from '../components/Breadcrumb'

export default function Category() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const filter = params.get('filter')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetchProducts({
          dressStyle: ['casual', 'formal', 'party', 'gym'].includes(slug) ? slug : '',
          category: ['t-shirts', 'jeans', 'shirts', 'hoodies', 'jackets', 'shorts', 'dresses'].includes(slug) ? slug.replace('-', ' ') : '',
          newArrival: filter === 'new',
        })
        setProducts(res.items || res)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug, filter])

  const title = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Shop'

  return (
    <section className="shell py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: title }]} />
      <h1 className="mt-4 text-h2">{title}</h1>
      <div className="mt-8">
        <ProductGrid products={products} loading={loading} columns={4} />
      </div>
    </section>
  )
}
