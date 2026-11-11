import { formatTimer } from '../lib/format'
import { ClockIcon } from './icons'

export function Timer({ remainingMs }: { remainingMs: number }) {
  const urgent = remainingMs <= 5 * 60 * 1000

  return (
    <span
      role="timer"
      aria-label={`Thời gian còn lại ${formatTimer(remainingMs)}`}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-sm font-bold tabular-nums ${
        urgent
          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300'
          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
      }`}
    >
      <ClockIcon className="size-4" />
      {formatTimer(remainingMs)}
    </span>
  )
}
