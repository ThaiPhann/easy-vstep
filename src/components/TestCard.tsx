import { Link } from 'react-router-dom'
import type { Test } from '../data/types'
import { ArrowRightIcon, ClockIcon } from './icons'
import { SkillBadge } from './SkillBadge'

export function TestCard({
  test,
  focusPart,
}: {
  test: Test
  focusPart?: number
}) {
  const totalQuestions = test.parts.reduce(
    (sum, part) => sum + part.questions.length,
    0,
  )
  const selectedPart = focusPart
    ? test.parts.find((part) => part.partNumber === focusPart)
    : undefined
  const visibleParts = selectedPart ? [selectedPart] : test.parts
  const partLabel = test.skill === 'reading' ? 'Bài' : 'Part'
  const href = `/lam-bai/${test.id}${focusPart ? `?part=${focusPart}` : ''}`

  return (
    <article className="sheet flex min-w-0 flex-col p-5 transition-colors hover:border-teal-600">
      <div className="flex items-center justify-between gap-3">
        <SkillBadge skill={test.skill} />
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          <ClockIcon className="size-3.5" />
          {test.durationMinutes} phút
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-bold leading-snug">
        {test.title}
      </h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        {test.parts.length} {test.skill === 'reading' ? 'bài đọc' : 'phần'} ·{' '}
        {totalQuestions} câu hỏi
      </p>

      <ul className="mt-4 border-t border-slate-200 dark:border-slate-800">
        {visibleParts.map((part) => (
          <li
            key={part.id}
            className="flex items-center gap-2.5 border-b border-slate-200 py-2 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300"
          >
            <span className="w-4 shrink-0 font-mono text-xs font-bold tabular-nums text-rose-600 dark:text-rose-300">
              {part.partNumber}
            </span>
            <span className="min-w-0 flex-1 truncate">{part.title}</span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
              {part.questions.length} câu
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <Link
          to={href}
          className="inline-flex w-full items-center justify-center gap-2 bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        >
          {selectedPart
            ? `Bắt đầu từ ${partLabel} ${selectedPart.partNumber}`
            : 'Bắt đầu làm bài'}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </article>
  )
}
