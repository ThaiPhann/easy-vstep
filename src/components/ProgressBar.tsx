export function ProgressBar({
  value,
  max,
  label,
  className = '',
  barClassName = 'bg-teal-600',
}: {
  value: number
  max: number
  label: string
  className?: string
  barClassName?: string
}) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={`h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all ${barClassName}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
