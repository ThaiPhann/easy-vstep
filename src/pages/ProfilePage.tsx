import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { EmptyState } from '../components/EmptyState'
import { SkillBadge } from '../components/SkillBadge'
import {
  ArrowRightIcon,
  BookIcon,
  ChartIcon,
  HeadphonesIcon,
  MicIcon,
  PenIcon,
} from '../components/icons'
import { getTestById } from '../data'
import type { Attempt, Skill } from '../data/types'
import { getAttempts } from '../lib/db'
import {
  formatDate,
  formatDateTime,
  formatScore,
} from '../lib/format'
import { averageScore } from '../lib/scoreConversion'

interface ChartPoint {
  label: string
  fullDate: string
  reading: number | null
  listening: number | null
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: ReadonlyArray<{
    name?: string
    value?: number
    color?: string
    payload?: ChartPoint
  }>
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2.5 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <p className="font-semibold text-slate-700 dark:text-slate-200">
        {payload[0]?.payload?.fullDate}
      </p>
      <div className="mt-1 space-y-0.5">
        {payload.map((entry) =>
          entry.value == null ? null : (
            <p
              key={entry.name}
              className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}: {formatScore(entry.value)}
            </p>
          ),
        )}
      </div>
    </div>
  )
}

function averageFor(attempts: Attempt[], skill: Skill): number | null {
  const scores = attempts
    .filter((attempt) => attempt.skill === skill)
    .map((attempt) => attempt.score)
  return scores.length > 0 ? averageScore(scores) : null
}

export function ProfilePage() {
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const result = await getAttempts()
        if (!cancelled) {
          setAttempts(result)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError('Không đọc được lịch sử bài làm trên trình duyệt.')
          setLoading(false)
        }
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const stats = useMemo(() => {
    const reading = averageFor(attempts, 'reading')
    const listening = averageFor(attempts, 'listening')
    return [
      {
        key: 'reading' as const,
        label: 'Reading',
        value: reading,
        count: attempts.filter((attempt) => attempt.skill === 'reading').length,
        icon: BookIcon,
        tone: 'text-sky-700 bg-sky-100 dark:text-sky-300 dark:bg-sky-950/70',
      },
      {
        key: 'listening' as const,
        label: 'Listening',
        value: listening,
        count: attempts.filter((attempt) => attempt.skill === 'listening')
          .length,
        icon: HeadphonesIcon,
        tone: 'text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-950/70',
      },
      {
        key: 'writing' as const,
        label: 'Writing',
        value: null,
        count: 0,
        icon: PenIcon,
        tone: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-950/70',
      },
      {
        key: 'speaking' as const,
        label: 'Speaking',
        value: null,
        count: 0,
        icon: MicIcon,
        tone: 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-950/70',
      },
    ]
  }, [attempts])

  const chartData = useMemo<ChartPoint[]>(() => {
    return [...attempts]
      .sort((a, b) => a.completedAt - b.completedAt)
      .map((attempt) => ({
        label: formatDate(attempt.completedAt),
        fullDate: formatDateTime(attempt.completedAt),
        reading: attempt.skill === 'reading' ? attempt.score : null,
        listening: attempt.skill === 'listening' ? attempt.score : null,
      }))
  }, [attempts])

  const hasReading = attempts.some((attempt) => attempt.skill === 'reading')
  const hasListening = attempts.some(
    (attempt) => attempt.skill === 'listening',
  )

  if (loading) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Đang tải tiến độ...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/40">
        <h1 className="text-xl font-bold text-rose-900 dark:text-rose-100">
          Không tải được tiến độ
        </h1>
        <p className="mt-2 text-sm text-rose-800 dark:text-rose-200">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
          <ChartIcon className="size-4" />
          Tiến độ của bạn
        </div>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Trang cá nhân
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Dữ liệu được lưu trên trình duyệt này. Xóa dữ liệu trình duyệt sẽ xóa
          lịch sử bài làm.
        </p>
      </div>

      {attempts.length === 0 ? (
        <EmptyState
          title="Chưa có bài làm nào"
          description="Hoàn thành một đề Reading hoặc Listening để bắt đầu theo dõi điểm và tiến độ."
          action={
            <Link
              to="/luyen-tap/reading"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Luyện Reading
              <ArrowRightIcon className="size-4" />
            </Link>
          }
        />
      ) : (
        <>
          <section
            aria-labelledby="overview-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2
                  id="overview-heading"
                  className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                >
                  Tổng quan
                </h2>
                <p className="mt-2 text-3xl font-extrabold tracking-tight">
                  {attempts.length}
                  <span className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    bài đã làm
                  </span>
                </p>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                Lưu trên thiết bị
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.key}
                    className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`grid size-8 place-items-center rounded-lg ${stat.tone}`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {stat.label}
                      </span>
                    </div>
                    <p className="mt-2 text-xl font-bold">
                      {stat.value === null ? '—' : formatScore(stat.value)}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {stat.key === 'writing' || stat.key === 'speaking'
                        ? 'Chưa có đề'
                        : `${stat.count} bài`}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          <section
            aria-labelledby="chart-heading"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2
                id="chart-heading"
                className="text-base font-bold tracking-tight"
              >
                Điểm theo thời gian
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Thang 0–10
              </span>
            </div>
            <div
              role="img"
              aria-label="Biểu đồ điểm Reading và Listening theo thời gian"
              className="mt-4 h-64 w-full min-w-0 text-slate-500 dark:text-slate-400"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 8, right: 8, bottom: 0, left: -18 }}
                >
                  <CartesianGrid
                    stroke="#94a3b8"
                    strokeOpacity={0.2}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: 'currentColor' }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                    tick={{ fontSize: 12, fill: 'currentColor' }}
                    tickLine={false}
                    axisLine={false}
                    width={32}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {hasReading ? (
                    <Line
                      type="monotone"
                      dataKey="reading"
                      name="Reading"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      connectNulls
                    />
                  ) : null}
                  {hasListening ? (
                    <Line
                      type="monotone"
                      dataKey="listening"
                      name="Listening"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      connectNulls
                    />
                  ) : null}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section aria-labelledby="history-heading">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2
                id="history-heading"
                className="text-lg font-bold tracking-tight"
              >
                Lịch sử bài làm
              </h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {attempts.length} bài
              </span>
            </div>
            <ul className="space-y-2.5">
              {attempts.map((attempt) => {
                if (!attempt.id) return null
                const test = getTestById(attempt.testId)
                const total = attempt.partScores.reduce(
                  (sum, part) => sum + part.total,
                  0,
                )
                return (
                  <li key={attempt.id}>
                    <Link
                      to={`/ket-qua/${attempt.id}`}
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-800"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <SkillBadge skill={attempt.skill} />
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDateTime(attempt.completedAt)}
                          </span>
                        </div>
                        <h3 className="mt-1.5 truncate text-sm font-semibold">
                          {test?.title ?? attempt.testId}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {attempt.correctCount}/{total} câu đúng
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-lg font-extrabold text-teal-700 dark:text-teal-300">
                          {formatScore(attempt.score)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          /10
                        </p>
                      </div>
                      <ArrowRightIcon className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}
