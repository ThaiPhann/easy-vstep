import type { OptionId, Question } from '../data/types'
import { CheckIcon, InfoIcon, XIcon } from './icons'

export function ReviewQuestion({
  question,
  userAnswer,
}: {
  question: Question
  userAnswer?: OptionId
}) {
  const isCorrect = userAnswer === question.answer
  const isUnanswered = !userAnswer

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-2.5">
        <span
          className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
            isCorrect
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300'
              : 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300'
          }`}
        >
          {question.number}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-relaxed">
            {question.question}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
            {isCorrect ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                <CheckIcon className="size-3" />
                Trả lời đúng
              </span>
            ) : isUnanswered ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Chưa trả lời
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 font-semibold text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
                <XIcon className="size-3" />
                Trả lời sai
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        {question.options.map((option) => {
          const isAnswer = option.id === question.answer
          const isUser = option.id === userAnswer
          return (
            <div
              key={option.id}
              className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 text-sm ${
                isAnswer
                  ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                  : isUser
                    ? 'border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40'
                    : 'border-slate-100 dark:border-slate-800'
              }`}
            >
              <span
                className={`grid size-5 shrink-0 place-items-center rounded text-xs font-bold ${
                  isAnswer
                    ? 'bg-emerald-600 text-white'
                    : isUser
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {option.id}
              </span>
              <span className="min-w-0 flex-1 leading-relaxed">
                {option.text}
              </span>
              <span className="shrink-0 text-xs font-semibold">
                {isAnswer ? (
                  <span className="text-emerald-700 dark:text-emerald-300">
                    Đáp án đúng
                  </span>
                ) : isUser ? (
                  <span className="text-rose-700 dark:text-rose-300">
                    Bạn chọn
                  </span>
                ) : null}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-sm leading-relaxed text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-teal-400" />
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">
            Giải thích:{' '}
          </span>
          {question.explanation}
        </p>
      </div>
    </article>
  )
}
