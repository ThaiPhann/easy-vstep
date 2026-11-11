export type Skill = 'reading' | 'listening'

export type OptionId = 'A' | 'B' | 'C' | 'D'

export interface Option {
  id: OptionId
  text: string
}

export interface Question {
  id: string
  number: number
  question: string
  options: Option[]
  answer: OptionId
  explanation: string
}

export interface Part {
  id: string
  partNumber: number
  title: string
  /** Reading passage text. */
  text?: string
  /** Listening audio file under public/audio. */
  audioUrl?: string
  /** Listening transcript, shown only in the result review. */
  transcript?: string
  questions: Question[]
}

export interface Test {
  id: string
  skill: Skill
  title: string
  durationMinutes: number
  parts: Part[]
}

export interface PartScore {
  partId: string
  partNumber: number
  title: string
  correct: number
  total: number
  score: number
}

export interface Attempt {
  id?: number
  testId: string
  skill: Skill
  completedAt: number
  answers: Record<string, OptionId>
  correctCount: number
  score: number
  durationSeconds: number
  partScores: PartScore[]
}

export type BandLevel = 'none' | 'b1' | 'b2' | 'c1'

export interface Band {
  level: BandLevel
  label: string
  range: string
}
