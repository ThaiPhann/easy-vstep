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
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-800">
      <div className="flex items-center justify-between gap-3">
        <SkillBadge skill={test.skill} />
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <ClockIcon className="size-4" />
          {test.durationMinutes} phút
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight">
        {test.title}
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        {test.parts.length} {test.skill === 'reading' ? 'bài đọc' : 'phần'} ·{' '}
        {totalQuestions} câu hỏi
      </p>

      <ul className="mt-4 space-y-2">
        {visibleParts.map((part) => (
          <li
            key={part.id}
            className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {part.partNumber}
            </span>
            <span className="min-w-0 flex-1 truncate">{part.title}</span>
            <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
              {part.questions.length} câu
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <Link
          to={href}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
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
