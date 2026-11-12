import type { OptionId, Test } from '../data/types'
import { ListIcon } from './icons'

export function QuestionNavigator({
  test,
  answers,
  flagged,
  activePartNumber,
  onSelect,
}: {
  test: Test
  answers: Record<string, OptionId>
  flagged: Set<string>
  activePartNumber: number
  onSelect: (partNumber: number, questionId: string) => void
}) {
  const total = test.parts.reduce(
    (sum, part) => sum + part.questions.length,
    0,
  )
  const answered = Object.keys(answers).length
  const partLabel = test.skill === 'reading' ? 'Bài' : 'Part'

  return (
    <section
      aria-label="Bảng điều hướng câu hỏi"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ListIcon className="size-4 text-teal-600 dark:text-teal-400" />
          <h2 className="text-sm font-bold">Bảng câu hỏi</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Đã làm <span className="font-semibold text-slate-700 dark:text-slate-200">{answered}</span>/{total}
          {' · '}Đánh dấu{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {flagged.size}
          </span>
        </p>
      </div>

      <div className="mt-3 space-y-3">
        {test.parts.map((part) => (
          <div key={part.id}>
            <h3
              className={`mb-1.5 truncate text-xs font-semibold ${
                part.partNumber === activePartNumber
                  ? 'text-teal-700 dark:text-teal-300'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {partLabel} {part.partNumber} · {part.title}
            </h3>
            <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
              {part.questions.map((question) => {
                const isAnswered = Boolean(answers[question.id])
                const isFlagged = flagged.has(question.id)
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => onSelect(part.partNumber, question.id)}
                    aria-label={`Câu ${question.number}${
                      isAnswered ? ', đã trả lời' : ', chưa trả lời'
                    }${isFlagged ? ', đã đánh dấu' : ''}`}
                    className={`relative grid size-8 place-items-center rounded-lg text-xs font-semibold transition ${
                      isAnswered
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    } ${
                      isFlagged
                        ? 'ring-2 ring-amber-500 ring-offset-1 ring-offset-white dark:ring-offset-slate-900'
                        : ''
                    }`}
                  >
                    {question.number}
                    {isFlagged ? (
                      <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-amber-500" />
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 bg-teal-600" />
          Đã trả lời
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 bg-slate-200 dark:bg-slate-700" />
          Chưa trả lời
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full ring-2 ring-amber-500" />
          Đánh dấu
        </span>
      </div>
    </section>
  )
}
