import { brands } from '../data/mockData'

export default function BrandStrip() {
  return (
    <section className="border-y border-line bg-paper">
      <div className="shell py-8">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          {brands.map((b) => (
            <span
              key={b}
              className="font-display text-xl font-extrabold tracking-tight text-muted/70 sm:text-2xl"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
