import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'company',
    links: ['about', 'features', 'works', 'career'],
  },
  {
    title: 'help',
    links: ['customer support', 'delivery details', 'terms & conditions', 'privacy policy'],
  },
  {
    title: 'faq',
    links: ['account', 'manage deliveries', 'orders', 'payments'],
  },
  {
    title: 'resources',
    links: ['development tutorial', 'how to - blog', 'youtube playlist'],
  },
]

const socials = ['Instagram', 'Twitter', 'LinkedIn', 'Facebook']
const payments = ['VISA', 'MASTERCARD', 'PAYPAL', 'APPLE PAY', 'GPAY']

export default function Footer() {
  return (
    <footer className="bg-paper">
      <div className="shell py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="font-display text-2xl font-extrabold tracking-tight">SHOP.CO</div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <span
                  key={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-xs font-semibold text-ink hover:border-ink"
                  aria-label={s}
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold capitalize text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link to="/shop" className="text-sm text-muted hover:text-ink">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-sm text-muted">Shop.co © 2000–2026, All Rights Reserved</p>
          <div className="flex flex-wrap items-center gap-3">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-md border border-line px-2.5 py-1 text-[11px] font-semibold text-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
