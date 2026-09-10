export default function LoadingSpinner({ label = 'Loading…', className = '' }) {
  return (
    <div className={`flex items-center justify-center py-16 ${className}`}>
      <div className="flex items-center gap-3 text-muted">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-ink" />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  )
}
