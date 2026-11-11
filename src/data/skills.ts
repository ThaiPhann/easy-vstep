import type { Skill } from './types'

export type SkillKey = Skill | 'writing' | 'speaking'

export interface SkillMeta {
  key: SkillKey
  name: string
  vietnamese: string
  description: string
  detail: string
  available: boolean
  path?: string
  accent: 'sky' | 'violet' | 'amber' | 'rose'
}

export const SKILLS: SkillMeta[] = [
  {
    key: 'reading',
    name: 'Reading',
    vietnamese: 'Đọc hiểu',
    description: '4 bài đọc, 40 câu hỏi trắc nghiệm.',
    detail: '60 phút',
    available: true,
    path: '/luyen-tap/reading',
    accent: 'sky',
  },
  {
    key: 'listening',
    name: 'Listening',
    vietnamese: 'Nghe hiểu',
    description: '3 phần, 35 câu hỏi trắc nghiệm.',
    detail: '40 phút',
    available: true,
    path: '/luyen-tap/listening',
    accent: 'violet',
  },
  {
    key: 'writing',
    name: 'Writing',
    vietnamese: 'Viết',
    description: 'Luyện viết theo cấu trúc đề VSTEP.',
    detail: 'Sắp ra mắt',
    available: false,
    accent: 'amber',
  },
  {
    key: 'speaking',
    name: 'Speaking',
    vietnamese: 'Nói',
    description: 'Luyện nói theo các chủ đề thường gặp.',
    detail: 'Sắp ra mắt',
    available: false,
    accent: 'rose',
  },
]

export function getSkillMeta(key: string): SkillMeta | undefined {
  return SKILLS.find((skill) => skill.key === key)
}
