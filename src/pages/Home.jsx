import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandStrip from '../components/BrandStrip'
import ProductGrid from '../components/ProductGrid'
import CategoryCard from '../components/CategoryCard'
import ReviewCard from '../components/ReviewCard'
import Newsletter from '../components/Newsletter'
import { ArrowRight, Truck, Refresh, Shield, Heart } from '../components/icons'
import { fetchNewArrivals, fetchTopSelling, fetchCategories } from '../services/productService'
import { sampleReviews } from '../data/mockData'

const stats = [
  { value: '200+', label: 'International Brands' },
  { value: '2,000+', label: 'High-Quality Products' },
  { value: '30,000+', label: 'Happy Customers' },
]

const perks = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $75' },
  { icon: Refresh, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Shield, title: 'Secure Payment', desc: 'Encrypted checkout' },
  { icon: Heart, title: 'Loved by Customers', desc: '4.8/5 average rating' },
]

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([])
  const [topSelling, setTopSelling] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const [na, ts, cats] = await Promise.all([
          fetchNewArrivals(),
          fetchTopSelling(),
          fetchCategories(),
        ])
        if (!active) return
        setNewArrivals(na)
        setTopSelling(ts)
        setCategories(cats)
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-smoke">
        <div className="shell grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="text-hero">
              FIND STUFF<br />THAT YOU<br />NEED.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted">
              Browse through our diverse range of meticulously crafted products, thoughtfully designed
              to celebrate your individuality and cater to your unique taste and lifestyle.
            </p>
            <div className="mt-8">
              <Link to="/shop" className="btn-primary">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-ink sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-card bg-line sm:aspect-[5/5]">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
                alt="Fashion model wearing SHOP.CO clothing"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="absolute bottom-5 left-5 hidden rounded-card bg-paper p-4 shadow-float sm:block">
              <div className="text-xs text-muted">Fashionable &amp; Trendy</div>
              <div className="text-lg font-semibold text-ink">New Season Drop</div>
            </div>
          </div>
        </div>
      </section>

      <BrandStrip />

      {/* NEW ARRIVALS */}
      <section className="shell py-14 lg:py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-h2">New Arrivals</h2>
          <Link to="/shop?filter=new" className="hidden text-sm font-medium text-ink underline underline-offset-4 sm:inline">
            View all
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={newArrivals} loading={loading} columns={4} />
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop?filter=new" className="btn-outline">View all</Link>
        </div>
      </section>

      {/* PERKS STRIP */}
      <section className="border-y border-line bg-smoke">
        <div className="shell grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="flex items-center gap-3">
              <p.icon className="h-7 w-7 text-ink" />
              <div>
                <div className="text-sm font-semibold text-ink">{p.title}</div>
                <div className="text-xs text-muted">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOP SELLING */}
      <section className="shell py-14 lg:py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-h2">Top Selling</h2>
          <Link to="/shop?filter=top" className="hidden text-sm font-medium text-ink underline underline-offset-4 sm:inline">
            View all
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={topSelling} loading={loading} columns={4} />
        </div>
      </section>

      {/* BROWSE BY DRESS STYLE */}
      <section className="bg-smoke py-14 lg:py-20">
        <div className="shell">
          <h2 className="text-h2">Browse by dress style</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {categories[0] && <CategoryCard category={categories[0]} className="h-64 sm:h-80" />}
            {categories[1] && <CategoryCard category={categories[1]} className="h-64 sm:h-80" />}
            {categories[2] && <CategoryCard category={categories[2]} className="h-64 sm:h-80" />}
            {categories[3] && <CategoryCard category={categories[3]} className="h-64 sm:h-80" />}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="shell py-14 lg:py-20">
        <h2 className="text-h2">Our happy customers</h2>
        <div className="mt-8 flex gap-5 overflow-x-auto hide-scrollbar pb-2">
          {sampleReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <Newsletter />
      </section>
    </>
  )
}
