import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { ReviewQuestion } from '../components/ReviewQuestion'
import { SkillBadge } from '../components/SkillBadge'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChartIcon,
  InfoIcon,
} from '../components/icons'
import { getTestById } from '../data'
import { SCORE_TABLE_NOTE } from '../data/scoreTable'
import type { Attempt, Test } from '../data/types'
import { getAttempt } from '../lib/db'
import {
  formatDateTime,
  formatDuration,
  formatScore,
} from '../lib/format'

export function ResultPage() {
  const { attemptId } = useParams()
  const [attempt, setAttempt] = useState<Attempt | undefined>()
  const [test, setTest] = useState<Test | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const id = Number(attemptId)

    async function load() {
      if (!Number.isInteger(id) || id <= 0) {
        setError('Mã bài làm không hợp lệ.')
        setLoading(false)
        return
      }
      try {
        const result = await getAttempt(id)
        if (cancelled) return
        if (!result) {
          setError('Không tìm thấy bài làm này.')
          setLoading(false)
          return
        }
        setAttempt(result)
        setTest(getTestById(result.testId))
        setLoading(false)
      } catch {
        if (cancelled) return
        setError('Không đọc được dữ liệu bài làm trên trình duyệt.')
        setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [attemptId])

  if (loading) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Đang tải kết quả...
        </p>
      </div>
    )
  }

  if (error || !attempt) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-bold">Không xem được kết quả</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error ?? 'Bài làm không tồn tại.'}
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            to="/ca-nhan"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            <ChartIcon className="size-4" />
            Về trang cá nhân
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeftIcon className="size-4" />
            Trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const totalQuestions = attempt.partScores.reduce(
    (sum, part) => sum + part.total,
    0,
  )
  const partLabel = attempt.skill === 'reading' ? 'Bài' : 'Part'
  const skillName = attempt.skill === 'reading' ? 'Reading' : 'Listening'

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/ca-nhan"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="size-4" />
          Trang cá nhân
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <SkillBadge skill={attempt.skill} />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatDateTime(attempt.completedAt)}
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {test?.title ?? `Kết quả ${skillName}`}
        </h1>
      </div>

      <section className="sheet sheet-margin p-6 pl-10 sm:p-8 sm:pl-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Điểm {skillName}
            </p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-6xl font-bold tabular-nums text-teal-700 dark:text-teal-300">
                {formatScore(attempt.score)}
              </span>
              <span className="text-lg text-slate-500 dark:text-slate-400">
                /10
              </span>
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Câu đúng
              </dt>
              <dd className="mt-1 font-mono text-lg font-bold tabular-nums">
                {attempt.correctCount}/{totalQuestions}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Thời gian làm
              </dt>
              <dd className="mt-1 font-mono text-lg font-bold tabular-nums">
                {formatDuration(attempt.durationSeconds)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="parts-heading">
        <h2 id="parts-heading" className="mb-3 text-2xl font-bold">
          Điểm theo từng {attempt.skill === 'reading' ? 'bài' : 'part'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {attempt.partScores.map((part) => (
            <div
              key={part.partId}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold">
                  {partLabel} {part.partNumber}
                </h3>
                <span className="text-sm font-bold text-teal-700 dark:text-teal-300">
                  {formatScore(part.score)}
                </span>
              </div>
              <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                {part.title}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {part.correct}/{part.total} câu đúng
                </span>
                <span>
                  {Math.round((part.correct / part.total) * 100)}%
                </span>
              </div>
              <ProgressBar
                value={part.correct}
                max={part.total}
                label={`${partLabel} ${part.partNumber}`}
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </section>

      {test ? (
        <section aria-labelledby="review-heading" className="space-y-5">
          <div>
            <h2
              id="review-heading"
              className="text-lg font-bold tracking-tight"
            >
              Xem lại đáp án
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Đáp án đúng, lựa chọn của bạn và giải thích cho từng câu.
            </p>
          </div>

          {test.parts.map((part) => {
            const partScore = attempt.partScores.find(
              (score) => score.partId === part.id,
            )
            const paragraphs = part.text
              ? part.text.split(/\n{2,}/).filter(Boolean)
              : []

            return (
              <section
                key={part.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold">
                    {partLabel} {part.partNumber} · {part.title}
                  </h3>
                  <span className="border border-slate-300 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {partScore?.correct ?? 0}/{part.questions.length} câu đúng
                  </span>
                </div>

                {paragraphs.length > 0 ? (
                  <details className="mt-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                    <summary className="cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Xem bài đọc
                    </summary>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                ) : null}

                {part.transcript ? (
                  <details className="mt-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                    <summary className="cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Xem transcript
                    </summary>
                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {part.transcript}
                    </p>
                  </details>
                ) : null}

                <div className="mt-4 space-y-3">
                  {part.questions.map((question) => (
                    <ReviewQuestion
                      key={question.id}
                      question={question}
                      userAnswer={attempt.answers[question.id]}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </section>
      ) : (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
          Không tìm thấy nội dung đề trong dữ liệu hiện tại, nên chỉ hiển thị
          điểm tổng và điểm từng phần.
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to={`/lam-bai/${attempt.testId}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Làm lại đề này
          <ArrowRightIcon className="size-4" />
        </Link>
        <Link
          to={`/luyen-tap/${attempt.skill}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Luyện đề khác
        </Link>
        <Link
          to="/ca-nhan"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ChartIcon className="size-4" />
          Xem tiến độ
        </Link>
      </div>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
        {SCORE_TABLE_NOTE}
      </p>
    </div>
  )
}
