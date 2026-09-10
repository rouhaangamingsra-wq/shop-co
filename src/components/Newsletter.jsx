import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setDone(true)
  }

  return (
    <section className="shell">
      <div className="relative overflow-hidden rounded-card bg-ink px-6 py-14 text-center text-paper sm:px-12 sm:py-20">
        <h2 className="text-h2 text-paper">
          STAY UPTO DATE ABOUT<br className="hidden sm:block" /> OUR LATEST OFFERS
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-paper/70">
          Subscribe to our newsletter to get the newest drops, exclusive deals and style tips.
        </p>
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            className="flex-1 rounded-pill bg-paper px-5 py-3 text-sm text-ink placeholder:text-faint"
          />
          <button type="submit" className="rounded-pill bg-paper px-6 py-3 text-sm font-semibold text-ink hover:bg-smoke">
            {done ? 'Subscribed ✓' : 'Subscribe to Newsletter'}
          </button>
        </form>
      </div>
    </section>
  )
}
