import type { OptionId, Question } from '../data/types'
import { FlagIcon } from './icons'

export function QuestionCard({
  question,
  selected,
  flagged,
  onSelect,
  onToggleFlag,
}: {
  question: Question
  selected?: OptionId
  flagged: boolean
  onSelect: (optionId: OptionId) => void
  onToggleFlag: () => void
}) {
  const inputName = `question-${question.id}`

  return (
    <section
      id={`q-${question.id}`}
      aria-labelledby={`q-${question.id}-text`}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex min-w-0 items-start gap-2.5 text-base font-semibold leading-relaxed">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {question.number}
          </span>
          <span id={`q-${question.id}-text`}>{question.question}</span>
        </h3>
        <button
          type="button"
          onClick={onToggleFlag}
          aria-pressed={flagged}
          aria-label={`${flagged ? 'Bỏ đánh dấu' : 'Đánh dấu'} câu ${question.number}`}
          title={flagged ? 'Bỏ đánh dấu câu này' : 'Đánh dấu câu này'}
          className={`grid size-9 shrink-0 place-items-center rounded-lg border transition ${
            flagged
              ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
              : 'border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <FlagIcon className="size-4" />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {question.options.map((option) => {
          const isSelected = selected === option.id
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 has-[:focus-visible]:ring-offset-1 dark:has-[:focus-visible]:ring-offset-slate-900 ${
                isSelected
                  ? 'border-teal-500 bg-teal-50 dark:border-teal-600 dark:bg-teal-950/40'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/60'
              }`}
            >
              <input
                type="radio"
                name={inputName}
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-md text-xs font-bold ${
                  isSelected
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {option.id}
              </span>
              <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {option.text}
              </span>
            </label>
          )
        })}
      </div>
    </section>
  )
}
