import { useEffect, useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRightIcon,
  BookIcon,
  CalculatorIcon,
  ChartIcon,
  HeadphonesIcon,
  InfoIcon,
  MicIcon,
  PenIcon,
  XIcon,
} from '../components/icons'
import { getTestById, getTestsBySkill } from '../data'
import { SKILLS } from '../data/skills'
import type { Attempt, Skill } from '../data/types'
import { getAttempts } from '../lib/db'
import { formatDateTime, formatScore } from '../lib/format'

const skillIcons: Record<string, ComponentType<{ className?: string }>> = {
  reading: BookIcon,
  listening: HeadphonesIcon,
  writing: PenIcon,
  speaking: MicIcon,
}

const skillNames: Record<Skill, string> = {
  reading: 'Reading',
  listening: 'Listening',
}

const steps = [
  'Chọn đề rồi làm đúng 60 phút với Reading hoặc 40 phút với Listening, như thi thật.',
  'Nộp bài — hoặc để đồng hồ chạy hết — để xem điểm, đáp án và giải thích từng câu.',
  'Điểm và lịch sử nằm trên máy này. Xóa dữ liệu trình duyệt là mất, không đồng bộ được sang máy khác.',
]

const monoLabel =
  'font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400'

function testFacts(skill: Skill): string {
  const first = getTestsBySkill(skill)[0]
  if (!first) return ''
  const questions = first.parts.reduce(
    (sum, part) => sum + part.questions.length,
    0,
  )
  const unit = skill === 'reading' ? 'bài' : 'phần'
  return `${first.parts.length} ${unit} · ${questions} câu · ${first.durationMinutes} phút`
}

function lastAttemptNote(attempt: Attempt): string {
  const total = attempt.partScores.reduce((sum, part) => sum + part.total, 0)
  return `${formatDateTime(attempt.completedAt)} · ${attempt.correctCount}/${total} câu đúng`
}

export function HomePage() {
  const [attempts, setAttempts] = useState<Attempt[] | null>(null)
  const [readError, setReadError] = useState(false)

  useEffect(() => {
    let cancelled = false

    getAttempts()
      .then((result) => {
        if (!cancelled) setAttempts(result)
      })
      .catch(() => {
        if (!cancelled) setReadError(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const counts = useMemo(() => {
    const map: Record<Skill, number> = { reading: 0, listening: 0 }
    for (const attempt of attempts ?? []) map[attempt.skill] += 1
    return map
  }, [attempts])

  const latest = attempts?.[0]
  const firstReading = getTestsBySkill('reading')[0]

  return (
    <div className="space-y-10 sm:space-y-12">
      <section
        aria-labelledby="home-heading"
        className="sheet sheet-margin px-6 py-7 pl-10 sm:px-10 sm:py-10 sm:pl-14"
      >
        <div className="flex items-start justify-between gap-4">
          <h1
            id="home-heading"
            className="text-[2rem] font-bold leading-[1.12] sm:text-5xl"
          >
            Ôn luyện VSTEP ngay trên trình duyệt.
          </h1>
          <span
            className={`hidden shrink-0 pt-2 sm:block ${monoLabel}`}
          >
            B1 – C1
          </span>
        </div>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-200 sm:text-lg">
          Reading và Listening <span className="marker-hit">miễn phí</span>,
          không cần đăng nhập. {getTestsBySkill('reading').length} đề Reading và{' '}
          {getTestsBySkill('listening').length} đề Listening, đúng cấu trúc và
          thời lượng thi.
        </p>

        <div className="mt-7 border-t border-slate-200 pt-5 dark:border-slate-800">
          {readError ? (
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Không đọc được sổ bài làm trên trình duyệt này. Bạn vẫn có thể mở
              đề mới và làm bài bình thường.
            </p>
          ) : attempts === null ? (
            <p
              role="status"
              className="text-sm text-slate-600 dark:text-slate-300"
            >
              Đang mở sổ…
            </p>
          ) : latest ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className={monoLabel}>Lần làm gần nhất</p>
                <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-mono text-4xl font-bold tabular-nums text-teal-700 dark:text-teal-300">
                    {formatScore(latest.score)}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    /10
                  </span>
                  <span className="min-w-0 truncate text-sm font-semibold">
                    {getTestById(latest.testId)?.title ?? latest.testId}
                  </span>
                </p>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {lastAttemptNote(latest)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                <Link
                  to={`/luyen-tap/${latest.skill}`}
                  className="inline-flex items-center justify-center gap-2 bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  Luyện {skillNames[latest.skill]} tiếp
                  <ArrowRightIcon className="size-4" />
                </Link>
                <Link
                  to={`/ket-qua/${latest.id}`}
                  className="text-center text-xs font-semibold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-700 dark:text-teal-300 dark:decoration-teal-700 dark:hover:decoration-teal-300 sm:text-right"
                >
                  Xem lại bài này
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={monoLabel}>Lần làm gần nhất</p>
                <p className="mt-1.5 font-display text-xl font-bold">
                  Chưa có bài nào trong sổ.
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Đề Reading đầu tiên: {testFacts('reading')}.
                </p>
              </div>
              {firstReading ? (
                <Link
                  to={`/lam-bai/${firstReading.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  Bắt đầu Reading
                  <ArrowRightIcon className="size-4" />
                </Link>
              ) : null}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <Link
              to="/ca-nhan"
              className="inline-flex items-center gap-1.5 font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700 dark:text-slate-300 dark:decoration-slate-600 dark:hover:decoration-slate-300"
            >
              <ChartIcon className="size-3.5" />
              Tiến độ và lịch sử
            </Link>
            <Link
              to="/quy-doi-diem"
              className="inline-flex items-center gap-1.5 font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700 dark:text-slate-300 dark:decoration-slate-600 dark:hover:decoration-slate-300"
            >
              <CalculatorIcon className="size-3.5" />
              Quy đổi điểm 4 kỹ năng
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="skills-heading">
        <div className="flex items-end justify-between gap-3">
          <h2 id="skills-heading" className="text-2xl font-bold sm:text-3xl">
            Mục lục kỹ năng
          </h2>
          <span className={`pb-1 ${monoLabel}`}>
            {SKILLS.filter((skill) => skill.available).length}/4 mở
          </span>
        </div>

        <ul className="mt-4 border-y border-slate-200 dark:border-slate-800">
          {SKILLS.map((skill) => {
            const Icon = skillIcons[skill.key]
            const done = counts[skill.key as Skill] ?? 0

            if (skill.available && skill.path) {
              return (
                <li
                  key={skill.key}
                  className="border-b border-slate-200 last:border-b-0 dark:border-slate-800"
                >
                  <Link
                    to={skill.path}
                    className="group flex items-center gap-4 py-4 transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center border ${
                        done > 0
                          ? 'border-teal-700 bg-teal-50 text-teal-700 dark:border-teal-500 dark:bg-teal-950/40 dark:text-teal-300'
                          : 'border-slate-300 bg-white text-teal-700 group-hover:border-teal-600 dark:border-slate-600 dark:bg-slate-900 dark:text-teal-300'
                      }`}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4 overflow-visible"
                      >
                        <path
                          d="M3 11.5 7.5 16 17.5 3"
                          className={`ink-tick ${done > 0 ? 'ink-tick-done' : ''}`}
                        />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <Icon className="size-3.5 shrink-0 self-center text-slate-500 dark:text-slate-400" />
                        <span className="font-display text-lg font-bold leading-tight">
                          {skill.name}
                        </span>
                        <span className="truncate text-sm text-slate-500 dark:text-slate-400">
                          · {skill.vietnamese}
                        </span>
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                        {testFacts(skill.key as Skill)}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-300 sm:text-sm">
                      <span className="hidden sm:inline">Vào luyện</span>
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              )
            }

            return (
              <li
                key={skill.key}
                className="flex items-center gap-4 border-b border-slate-200 py-4 last:border-b-0 dark:border-slate-800"
              >
                <span className="grid size-6 shrink-0 place-items-center border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  <XIcon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <Icon className="size-3.5 shrink-0 self-center text-slate-500 dark:text-slate-400" />
                    <span className="font-display text-lg font-bold leading-tight text-slate-500 dark:text-slate-400">
                      {skill.name}
                    </span>
                    <span className="truncate text-sm text-slate-500 dark:text-slate-400">
                      · {skill.vietnamese}
                    </span>
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                    Chưa có đề
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-rose-600 dark:text-rose-300">
                  Sắp ra mắt
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      <section
        aria-labelledby="how-heading"
        className="grid gap-6 md:grid-cols-5 md:gap-8"
      >
        <div className="md:col-span-3">
          <h2 id="how-heading" className="text-2xl font-bold sm:text-3xl">
            Một lượt ôn diễn ra thế này
          </h2>
          <ol className="mt-4 border-t border-slate-200 dark:border-slate-800">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 border-b border-slate-200 py-3.5 dark:border-slate-800"
              >
                <span className="mt-0.5 font-mono text-xs font-bold tabular-nums text-rose-600 dark:text-rose-300">
                  {index + 1}.
                </span>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <Link
          to="/quy-doi-diem"
          className="sheet group flex flex-col justify-between gap-5 p-5 transition-colors hover:border-teal-600"
        >
          <div>
            <h2 className="text-xl font-bold">Quy đổi điểm 4 kỹ năng</h2>
            <p className={`mt-1 ${monoLabel}`}>Công cụ · miễn phí</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Nhập điểm Reading, Listening, Writing, Speaking để tính trung
              bình và xem bậc B1/B2/C1 tương ứng.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-300">
            Mở công cụ
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      <p className="flex items-start gap-2 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
        <span>
          Điểm 0–10 đang tính theo bảng tạm trong sản phẩm, chưa phải bảng
          chính thức của Bộ GD&amp;ĐT. Đề tự soạn, audio là bản đọc mẫu. Chỉ
          dùng để ôn tập.
        </span>
      </p>
    </div>
  )
}
