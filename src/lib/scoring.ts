import {
  LISTENING_SCORE_TABLE,
  READING_SCORE_TABLE,
} from '../data/scoreTable'
import type {
  Attempt,
  OptionId,
  PartScore,
  Test,
} from '../data/types'
import { roundToHalf } from './scoreConversion'

export interface ScoreResult {
  correctCount: number
  totalQuestions: number
  score: number
  partScores: PartScore[]
}

function tableScore(table: readonly number[], correct: number): number {
  const index = Math.min(Math.max(Math.trunc(correct), 0), table.length - 1)
  return table[index]
}

export function scoreFromRatio(correct: number, total: number): number {
  if (total <= 0) return 0
  return roundToHalf((correct / total) * 10)
}

export function scoreTest(
  test: Test,
  answers: Record<string, OptionId>,
): ScoreResult {
  const partScores: PartScore[] = test.parts.map((part) => {
    const correct = part.questions.filter(
      (question) => answers[question.id] === question.answer,
    ).length
    return {
      partId: part.id,
      partNumber: part.partNumber,
      title: part.title,
      correct,
      total: part.questions.length,
      score: scoreFromRatio(correct, part.questions.length),
    }
  })

  const correctCount = partScores.reduce((sum, part) => sum + part.correct, 0)
  const totalQuestions = partScores.reduce((sum, part) => sum + part.total, 0)
  const table =
    test.skill === 'reading' ? READING_SCORE_TABLE : LISTENING_SCORE_TABLE

  return {
    correctCount,
    totalQuestions,
    score: tableScore(table, correctCount),
    partScores,
  }
}

export function buildAttempt(
  test: Test,
  answers: Record<string, OptionId>,
  durationSeconds: number,
): Attempt {
  const result = scoreTest(test, answers)
  return {
    testId: test.id,
    skill: test.skill,
    completedAt: Date.now(),
    answers,
    correctCount: result.correctCount,
    score: result.score,
    durationSeconds,
    partScores: result.partScores,
  }
}
