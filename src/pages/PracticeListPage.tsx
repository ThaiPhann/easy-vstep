import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { TestCard } from '../components/TestCard'
import {
  ArrowLeftIcon,
  BookIcon,
  HeadphonesIcon,
  InfoIcon,
} from '../components/icons'
import { getTestsBySkill } from '../data'
import { getSkillMeta } from '../data/skills'
import type { Skill } from '../data/types'

export function PracticeListPage() {
  const { skill: skillParam } = useParams()
  const meta = skillParam ? getSkillMeta(skillParam) : undefined
  const [focusPart, setFocusPart] = useState(0)

  if (!meta || (meta.key !== 'reading' && meta.key !== 'listening')) {
    return (
      <div className="mx-auto max-w-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="font-display text-xl font-bold">Không tìm thấy kỹ năng</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Đường dẫn không hợp lệ. Hãy quay về trang chủ để chọn Reading hoặc
          Listening.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          <ArrowLeftIcon className="size-4" />
          Về trang chủ
        </Link>
      </div>
    )
  }

  if (!meta.available) {
    return (
      <div className="mx-auto max-w-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="font-display text-xl font-bold">
          {meta.name} đang được chuẩn bị
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Kỹ năng này sẽ ra mắt sau. Hiện tại bạn có thể luyện Reading và
          Listening.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          <ArrowLeftIcon className="size-4" />
          Về trang chủ
        </Link>
      </div>
    )
  }

  const skill = meta.key as Skill
  const skillTests = getTestsBySkill(skill)
  const Icon = skill === 'reading' ? BookIcon : HeadphonesIcon
  const partLabel = skill === 'reading' ? 'Bài' : 'Part'
  const parts = skillTests[0]?.parts ?? []

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900 hover:decoration-slate-700 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="size-4" />
          Trang chủ
        </Link>
        <div className="mt-5 flex items-start gap-4">
          <span
            className={`grid size-11 shrink-0 place-items-center border ${
              skill === 'reading'
                ? 'border-teal-300 bg-white text-teal-700 dark:border-teal-800 dark:bg-slate-900 dark:text-teal-300'
                : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <Icon className="size-5" />
          </span>
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Luyện {meta.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              {meta.description} Làm bài có đồng hồ đếm giờ, nộp bài để xem điểm
              và giải thích từng câu.
            </p>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="filter-heading"
        className="border-y border-slate-200 dark:border-slate-800"
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2
            id="filter-heading"
            className="mr-1 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
          >
            Chọn phần:
          </h2>
          <button
            type="button"
            onClick={() => setFocusPart(0)}
            aria-pressed={focusPart === 0}
            className={`-mb-px border-b-2 py-2 text-sm transition-colors ${
              focusPart === 0
                ? 'border-teal-700 font-semibold text-slate-900 dark:border-teal-400 dark:text-white'
                : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white'
            }`}
          >
            Tất cả
          </button>
          {parts.map((part) => (
            <button
              key={part.id}
              type="button"
              onClick={() => setFocusPart(part.partNumber)}
              aria-pressed={focusPart === part.partNumber}
              className={`-mb-px border-b-2 py-2 text-sm transition-colors ${
                focusPart === part.partNumber
                  ? 'border-teal-700 font-semibold text-slate-900 dark:border-teal-400 dark:text-white'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white'
              }`}
            >
              {partLabel} {part.partNumber}
            </button>
          ))}
        </div>
        <p className="flex items-start gap-2 border-t border-slate-200 py-2.5 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
          Chọn một phần để mở đề nhanh từ phần đó. Bài làm vẫn tính giờ và chấm
          điểm cho toàn bộ đề.
        </p>
      </section>

      <section aria-labelledby="tests-heading">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 id="tests-heading" className="text-2xl font-bold">
            Danh sách đề
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            {skillTests.length} đề
          </span>
        </div>
        {skillTests.length === 0 ? (
          <EmptyState
            title="Chưa có đề"
            description="Đề cho kỹ năng này đang được chuẩn bị. Hãy quay lại sau."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {skillTests.map((test) => (
              <TestCard
                key={test.id}
                test={test}
                focusPart={focusPart || undefined}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
