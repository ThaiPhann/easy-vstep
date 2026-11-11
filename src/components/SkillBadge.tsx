import type { Skill } from '../data/types'

const styles: Record<Skill, string> = {
  reading:
    'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300',
  listening:
    'bg-violet-100 text-violet-800 dark:bg-violet-950/70 dark:text-violet-300',
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
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[skill]} ${className}`}
    >
      {skill === 'reading' ? 'Reading' : 'Listening'}
    </span>
  )
}
