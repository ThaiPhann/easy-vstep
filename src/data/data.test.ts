import { describe, expect, it } from 'vitest'
import { tests } from './index'
import type { Test } from './types'

const expectedPartCounts = {
  reading: [10, 10, 10, 10],
  listening: [8, 12, 15],
} as const

describe('test data', () => {
  it('contains two Reading tests and one Listening test', () => {
    expect(tests.filter((test) => test.skill === 'reading')).toHaveLength(2)
    expect(tests.filter((test) => test.skill === 'listening')).toHaveLength(1)
  })

  it('has unique test ids', () => {
    const ids = tests.map((test) => test.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  for (const test of tests) {
    describe(test.id, () => {
      it('has the right part and question counts', () => {
        const expected = expectedPartCounts[test.skill]
        expect(test.parts).toHaveLength(expected.length)
        expect(test.parts.map((part) => part.questions.length)).toEqual([
          ...expected,
        ])
        expect(test.parts.map((part) => part.partNumber)).toEqual(
          expected.map((_, index) => index + 1),
        )
        expect(test.durationMinutes).toBe(
          test.skill === 'reading' ? 60 : 40,
        )
        expect(
          test.parts.reduce(
            (sum, part) => sum + part.questions.length,
            0,
          ),
        ).toBe(test.skill === 'reading' ? 40 : 35)
      })

      it('has valid questions, options, answers and explanations', () => {
        const allQuestions = test.parts.flatMap((part) => part.questions)
        expect(allQuestions.map((question) => question.number)).toEqual(
          allQuestions.map((_, index) => index + 1),
        )

        const questionIds = allQuestions.map((question) => question.id)
        expect(new Set(questionIds).size).toBe(questionIds.length)

        for (const question of allQuestions) {
          expect(question.question.trim().length).toBeGreaterThan(0)
          expect(question.explanation.trim().length).toBeGreaterThan(20)
          expect(question.question).not.toMatch(/placeholder/i)
          expect(question.explanation).not.toMatch(/placeholder/i)
          expect(question.options).toHaveLength(4)
          expect(question.options.map((option) => option.id)).toEqual([
            'A',
            'B',
            'C',
            'D',
          ])
          expect(['A', 'B', 'C', 'D']).toContain(question.answer)
          expect(
            new Set(question.options.map((option) => option.text)).size,
          ).toBe(4)
          for (const option of question.options) {
            expect(option.text.trim().length).toBeGreaterThan(0)
          }
        }
      })

      it('has readable content for every part', () => {
        for (const part of test.parts) {
          expect(part.title.trim().length).toBeGreaterThan(0)
          expect(part.id.trim().length).toBeGreaterThan(0)

          if (test.skill === 'reading') {
            expect(part.text?.trim().length ?? 0).toBeGreaterThan(1000)
            expect(part.audioUrl).toBeUndefined()
          } else {
            expect(part.audioUrl).toMatch(/^\/audio\/.+\.mp3$/)
            expect(part.transcript?.trim().length ?? 0).toBeGreaterThan(200)
            expect(part.text).toBeUndefined()
          }
        }
      })
    })
  }

  it('keeps reading passages at a reasonable length', () => {
    const readingTests = tests.filter((test) => test.skill === 'reading')
    for (const test of readingTests) {
      for (const part of test.parts) {
        const words = (part.text ?? '').trim().split(/\s+/).length
        expect(words).toBeGreaterThanOrEqual(250)
        expect(words).toBeLessThanOrEqual(500)
      }
    }
  })

  it('has a balanced answer key', () => {
    for (const test of tests) {
      const answers = test.parts.flatMap((part) =>
        part.questions.map((question) => question.answer),
      )
      for (const option of ['A', 'B', 'C', 'D'] as const) {
        const count = answers.filter((answer) => answer === option).length
        expect(count).toBeGreaterThanOrEqual(6)
      }
    }
  })
})

// Giữ import type được dùng để tránh lỗi noUnusedLocals khi mở rộng test.
export type TestFixture = Test
