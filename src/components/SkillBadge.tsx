import type { Skill } from '../data/types'

const styles: Record<Skill, string> = {
  reading:
    'border-teal-300 text-teal-700 dark:border-teal-700 dark:text-teal-300',
  listening:
    'border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300',
}

export function SkillBadge({
  skill,
  className = '',
}: {
  skill: Skill
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center border bg-transparent px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${styles[skill]} ${className}`}
    >
      {skill === 'reading' ? 'Reading' : 'Listening'}
    </span>
  )
}
