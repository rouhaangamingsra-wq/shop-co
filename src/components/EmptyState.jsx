export default function EmptyState({ title = 'Nothing here yet', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-smoke/40 px-6 py-16 text-center">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
