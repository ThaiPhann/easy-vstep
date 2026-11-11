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
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-bold">Không tìm thấy kỹ năng</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Đường dẫn không hợp lệ. Hãy quay về trang chủ để chọn Reading hoặc
          Listening.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          <ArrowLeftIcon className="size-4" />
          Về trang chủ
        </Link>
      </div>
    )
  }

  if (!meta.available) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-bold">
          {meta.name} đang được chuẩn bị
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Kỹ năng này sẽ ra mắt sau. Hiện tại bạn có thể luyện Reading và
          Listening.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
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
    <div className="space-y-6">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="size-4" />
          Trang chủ
        </Link>
        <div className="mt-4 flex items-start gap-4">
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
              skill === 'reading'
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300'
                : 'bg-violet-100 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300'
            }`}
          >
            <Icon className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Luyện {meta.name}
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              {meta.description} Làm bài có đồng hồ đếm giờ, nộp bài để xem điểm
              và giải thích từng câu.
            </p>
          </div>
        </div>
      </div>

      <section aria-labelledby="filter-heading" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <h2
            id="filter-heading"
            className="mr-1 text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Chọn phần:
          </h2>
          <button
            type="button"
            onClick={() => setFocusPart(0)}
            aria-pressed={focusPart === 0}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              focusPart === 0
                ? 'bg-teal-700 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
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
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                focusPart === part.partNumber
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {partLabel} {part.partNumber}
            </button>
          ))}
        </div>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
          Chọn một phần để mở đề nhanh từ phần đó. Bài làm vẫn tính giờ và chấm
          điểm cho toàn bộ đề.
        </p>
      </section>

      <section aria-labelledby="tests-heading">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id="tests-heading" className="text-lg font-bold tracking-tight">
            Danh sách đề
          </h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
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
