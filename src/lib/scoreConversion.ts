import type { Band } from '../data/types'

/** Làm tròn đến 0.5 gần nhất. */
export function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2
}

export function averageScore(scores: readonly number[]): number {
  if (scores.length === 0) return 0
  return scores.reduce((sum, score) => sum + score, 0) / scores.length
}

export function getBand(score: number): Band {
  if (score < 4) {
    return { level: 'none', label: 'Chưa đạt bậc 3', range: 'Dưới 4.0' }
  }
  if (score <= 5.5) {
    return { level: 'b1', label: 'Bậc 3 (B1)', range: '4.0 – 5.5' }
  }
  if (score <= 8) {
    return { level: 'b2', label: 'Bậc 4 (B2)', range: '6.0 – 8.0' }
  }
  return { level: 'c1', label: 'Bậc 5 (C1)', range: '8.5 – 10' }
}

export function convertFourSkills(scores: readonly number[]): {
  average: number
  rounded: number
  band: Band
} {
  const average = averageScore(scores)
  const rounded = roundToHalf(average)
  return { average, rounded, band: getBand(rounded) }
}
