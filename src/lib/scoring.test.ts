import { describe, expect, it } from 'vitest'
import { tests } from '../data'
import type { OptionId, Test } from '../data/types'
import { buildAttempt, scoreFromRatio, scoreTest } from './scoring'

function readingTest(): Test {
  const test = tests.find((item) => item.skill === 'reading')
  if (!test) throw new Error('Missing reading test fixture')
  return test
}

function listeningTest(): Test {
  const test = tests.find((item) => item.skill === 'listening')
  if (!test) throw new Error('Missing listening test fixture')
  return test
}

function allCorrectAnswers(test: Test): Record<string, OptionId> {
  return Object.fromEntries(
    test.parts.flatMap((part) =>
      part.questions.map((question) => [question.id, question.answer]),
    ),
  )
}

describe('scoreFromRatio', () => {
  it('returns a 0-10 score rounded to 0.5', () => {
    expect(scoreFromRatio(0, 10)).toBe(0)
    expect(scoreFromRatio(5, 10)).toBe(5)
    expect(scoreFromRatio(10, 10)).toBe(10)
    expect(scoreFromRatio(1, 3)).toBe(3.5)
    expect(scoreFromRatio(0, 0)).toBe(0)
  })
})

describe('scoreTest', () => {
  it('gives 10 for a perfect reading test', () => {
    const test = readingTest()
    const result = scoreTest(test, allCorrectAnswers(test))
    expect(result.correctCount).toBe(40)
    expect(result.totalQuestions).toBe(40)
    expect(result.score).toBe(10)
    expect(result.partScores).toHaveLength(4)
    expect(result.partScores.every((part) => part.correct === 10)).toBe(true)
  })

  it('gives 10 for a perfect listening test', () => {
    const test = listeningTest()
    const result = scoreTest(test, allCorrectAnswers(test))
    expect(result.correctCount).toBe(35)
    expect(result.score).toBe(10)
    expect(result.partScores.map((part) => part.correct)).toEqual([
      8, 12, 15,
    ])
  })

  it('gives 0 when nothing is answered', () => {
    const test = readingTest()
    const result = scoreTest(test, {})
    expect(result.correctCount).toBe(0)
    expect(result.score).toBe(0)
    expect(result.partScores.every((part) => part.correct === 0)).toBe(true)
  })

  it('treats wrong and unanswered questions as incorrect', () => {
    const test = readingTest()
    const firstQuestion = test.parts[0].questions[0]
    const wrongOption = (['A', 'B', 'C', 'D'] as const).find(
      (option) => option !== firstQuestion.answer,
    )!
    const result = scoreTest(test, {
      [firstQuestion.id]: wrongOption,
    })
    expect(result.correctCount).toBe(0)
  })
})

describe('buildAttempt', () => {
  it('builds a complete attempt record', () => {
    const test = readingTest()
    const attempt = buildAttempt(test, allCorrectAnswers(test), 1234)
    expect(attempt.testId).toBe(test.id)
    expect(attempt.skill).toBe('reading')
    expect(attempt.correctCount).toBe(40)
    expect(attempt.score).toBe(10)
    expect(attempt.durationSeconds).toBe(1234)
    expect(attempt.completedAt).toBeTypeOf('number')
    expect(attempt.partScores).toHaveLength(4)
    expect(attempt.id).toBeUndefined()
  })
})
