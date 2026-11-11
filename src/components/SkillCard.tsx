import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import type { SkillMeta } from '../data/skills'
import {
  ArrowRightIcon,
  BookIcon,
  HeadphonesIcon,
  MicIcon,
  PenIcon,
} from './icons'

const icons: Record<
  SkillMeta['key'],
  ComponentType<{ className?: string }>
> = {
  reading: BookIcon,
  listening: HeadphonesIcon,
  writing: PenIcon,
  speaking: MicIcon,
}

const accents: Record<
  SkillMeta['accent'],
  { icon: string; hover: string; badge: string }
> = {
  sky: {
    icon: 'bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300',
    hover:
      'hover:border-sky-300 hover:shadow-sky-100/60 dark:hover:border-sky-800 dark:hover:shadow-black/20',
    badge: 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300',
  },
  violet: {
    icon: 'bg-violet-100 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300',
    hover:
      'hover:border-violet-300 hover:shadow-violet-100/60 dark:hover:border-violet-800 dark:hover:shadow-black/20',
    badge:
      'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300',
  },
  amber: {
    icon: 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
    hover: '',
    badge:
      'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  },
  rose: {
    icon: 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300',
    hover: '',
    badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
  },
}

export function SkillCard({ skill }: { skill: SkillMeta }) {
  const Icon = icons[skill.key]
  const accent = accents[skill.accent]
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid size-12 place-items-center rounded-2xl ${accent.icon}`}
        >
          <Icon className="size-6" />
        </span>
        {skill.available ? (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${accent.badge}`}
          >
            Sẵn sàng
          </span>
        ) : (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${accent.badge}`}
          >
            Sắp ra mắt
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold tracking-tight">
          {skill.name}{' '}
          <span className="font-medium text-slate-500 dark:text-slate-400">
            · {skill.vietnamese}
          </span>
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {skill.description}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
        <span className="font-medium text-slate-500 dark:text-slate-400">
          {skill.detail}
        </span>
        {skill.available ? (
          <span className="inline-flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-300">
            Vào luyện
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        ) : (
          <span className="font-medium text-slate-400 dark:text-slate-500">
            Đang chuẩn bị
          </span>
        )}
      </div>
    </>
  )

  if (skill.available && skill.path) {
    return (
      <Link
        to={skill.path}
        className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 ${accent.hover}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <div
      aria-disabled="true"
      className="flex cursor-not-allowed flex-col rounded-2xl border border-slate-200 bg-white p-5 opacity-75 dark:border-slate-800 dark:bg-slate-900"
    >
      {content}
    </div>
  )
}
