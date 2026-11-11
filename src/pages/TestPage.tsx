import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { AudioPlayer } from '../components/AudioPlayer'
import { QuestionCard } from '../components/QuestionCard'
import { QuestionNavigator } from '../components/QuestionNavigator'
import { ThemeToggle } from '../components/ThemeToggle'
import { Timer } from '../components/Timer'
import {
  ArrowLeftIcon,
  BookIcon,
  HeadphonesIcon,
  InfoIcon,
} from '../components/icons'
import { getTestById } from '../data'
import type { OptionId, Test } from '../data/types'
import { saveAttempt } from '../lib/db'
import { buildAttempt } from '../lib/scoring'

function TestNotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-slate-50 p-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-bold">Không tìm thấy đề</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Đề bạn mở không tồn tại hoặc đã bị xóa khỏi dữ liệu.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          <ArrowLeftIcon className="size-4" />
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}

export function TestPage() {
  const { testId } = useParams()
  const [searchParams] = useSearchParams()
  const test = testId ? getTestById(testId) : undefined

  if (!test) return <TestNotFound />

  const requestedPart = Number(searchParams.get('part'))
  const initialPartNumber = test.parts.some(
    (part) => part.partNumber === requestedPart,
  )
    ? requestedPart
    : (test.parts[0]?.partNumber ?? 1)

  return (
    <TestRunner
      key={test.id}
      test={test}
      initialPartNumber={initialPartNumber}
    />
  )
}

function TestRunner({
  test,
  initialPartNumber,
}: {
  test: Test
  initialPartNumber: number
}) {
  const navigate = useNavigate()
  const totalQuestions = test.parts.reduce(
    (sum, part) => sum + part.questions.length,
    0,
  )
  const durationMs = test.durationMinutes * 60 * 1000
  const partLabel = test.skill === 'reading' ? 'Bài' : 'Part'

  const [answers, setAnswers] = useState<Record<string, OptionId>>({})
  const [flagged, setFlagged] = useState<Set<string>>(() => new Set())
  const [activePartNumber, setActivePartNumber] =
    useState(initialPartNumber)
  const [pendingQuestionId, setPendingQuestionId] = useState<string | null>(
    null,
  )
  const [remainingMs, setRemainingMs] = useState(durationMs)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const submittedRef = useRef(false)
  const startedAtRef = useRef(0)
  const endAtRef = useRef(0)
  const submitRef = useRef<(auto: boolean) => void>(() => {})

  const answeredCount = Object.keys(answers).length
  const activePart =
    test.parts.find((part) => part.partNumber === activePartNumber) ??
    test.parts[0]

  const handleSubmit = useCallback(
    async (auto: boolean) => {
      if (submittedRef.current) return
      submittedRef.current = true
      setShowConfirm(false)
      setIsSubmitting(true)
      setSubmitError(null)

      const maxSeconds = test.durationMinutes * 60
      const elapsed = Math.round(
        (Date.now() - startedAtRef.current) / 1000,
      )
      const durationSeconds = auto
        ? maxSeconds
        : Math.min(maxSeconds, Math.max(1, elapsed))

      try {
        const id = await saveAttempt(
          buildAttempt(test, answers, durationSeconds),
        )
        navigate(`/ket-qua/${id}`, { replace: true })
      } catch {
        submittedRef.current = false
        setIsSubmitting(false)
        setSubmitError(
          'Không lưu được bài làm trên trình duyệt. Vui lòng thử nộp lại.',
        )
      }
    },
    [answers, navigate, test],
  )

  useEffect(() => {
    submitRef.current = (auto) => {
      void handleSubmit(auto)
    }
  }, [handleSubmit])

  useEffect(() => {
    const now = Date.now()
    startedAtRef.current = now
    endAtRef.current = now + durationMs

    const interval = window.setInterval(() => {
      const left = Math.max(0, endAtRef.current - Date.now())
      setRemainingMs(left)
      if (left <= 0) {
        window.clearInterval(interval)
        submitRef.current(true)
      }
    }, 250)

    return () => window.clearInterval(interval)
  }, [durationMs])

  useEffect(() => {
    if (!pendingQuestionId) return
    const element = document.getElementById(`q-${pendingQuestionId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setPendingQuestionId(null)
    }
  }, [pendingQuestionId, activePartNumber])

  function requestSubmit() {
    if (isSubmitting) return
    if (answeredCount < totalQuestions) {
      setShowConfirm(true)
      return
    }
    void handleSubmit(false)
  }

  function selectAnswer(questionId: string, optionId: OptionId) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }))
  }

  function toggleFlag(questionId: string) {
    setFlagged((current) => {
      const next = new Set(current)
      if (next.has(questionId)) next.delete(questionId)
      else next.add(questionId)
      return next
    })
  }

  function goToQuestion(partNumber: number, questionId: string) {
    setActivePartNumber(partNumber)
    setPendingQuestionId(questionId)
  }

  if (!activePart) {
    return <TestNotFound />
  }

  const paragraphs = activePart.text
    ? activePart.text.split(/\n{2,}/).filter(Boolean)
    : []

  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
          <Link
            to={`/luyen-tap/${test.skill}`}
            aria-label="Thoát bài làm"
            title="Thoát bài làm"
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeftIcon className="size-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{test.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {answeredCount}/{totalQuestions} câu
            </p>
          </div>
          <Timer remainingMs={remainingMs} />
          <ThemeToggle className="max-sm:hidden" />
          <button
            type="button"
            onClick={requestSubmit}
            disabled={isSubmitting}
            className="shrink-0 rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
          >
            {isSubmitting ? 'Đang lưu...' : 'Nộp bài'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
        {showConfirm ? (
          <div
            role="alert"
            className="mb-4 flex flex-col gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>
              <strong>Còn {totalQuestions - answeredCount} câu chưa trả lời.</strong>{' '}
              Bạn vẫn muốn nộp bài?
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-amber-300 bg-white px-3 py-2 font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-100 dark:hover:bg-slate-800"
              >
                Tiếp tục làm
              </button>
              <button
                type="button"
                onClick={() => void handleSubmit(false)}
                disabled={isSubmitting}
                className="rounded-lg bg-amber-700 px-3 py-2 font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
              >
                Vẫn nộp bài
              </button>
            </div>
          </div>
        ) : null}

        {submitError ? (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200"
          >
            {submitError}
          </div>
        ) : null}

        <QuestionNavigator
          test={test}
          answers={answers}
          flagged={flagged}
          activePartNumber={activePartNumber}
          onSelect={goToQuestion}
        />

        <div className="mt-4">
          <div
            role="tablist"
            aria-label="Chọn phần"
            className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {test.parts.map((part) => (
              <button
                key={part.id}
                type="button"
                role="tab"
                aria-selected={part.partNumber === activePartNumber}
                onClick={() => setActivePartNumber(part.partNumber)}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  part.partNumber === activePartNumber
                    ? 'bg-teal-700 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {partLabel} {part.partNumber}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-20">
            {test.skill === 'reading' ? (
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
                <div className="flex items-start gap-2.5">
                  <BookIcon className="mt-0.5 size-5 shrink-0 text-sky-600 dark:text-sky-400" />
                  <div>
                    <h2 className="text-base font-bold leading-snug">
                      {activePart.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {activePart.questions.length} câu hỏi
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {paragraphs.length > 0 ? (
                    paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">
                      Bài đọc chưa có nội dung.
                    </p>
                  )}
                </div>
              </article>
            ) : (
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                <div className="flex items-start gap-2.5">
                  <HeadphonesIcon className="mt-0.5 size-5 shrink-0 text-violet-600 dark:text-violet-400" />
                  <div>
                    <h2 className="text-base font-bold leading-snug">
                      {activePart.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {activePart.questions.length} câu hỏi
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <AudioPlayer
                    key={activePart.audioUrl}
                    src={activePart.audioUrl}
                    title={activePart.title}
                  />
                </div>
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                  <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
                  Nghe audio rồi chọn đáp án. Transcript chỉ hiện ở trang kết
                  quả.
                </p>
              </article>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold">
                {partLabel} {activePart.partNumber}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {activePart.questions.length} câu
              </span>
            </div>
            {activePart.questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                selected={answers[question.id]}
                flagged={flagged.has(question.id)}
                onSelect={(optionId) =>
                  selectAnswer(question.id, optionId)
                }
                onToggleFlag={() => toggleFlag(question.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
