import { describe, expect, it } from 'vitest'
import {
  averageScore,
  convertFourSkills,
  getBand,
  roundToHalf,
} from './scoreConversion'

describe('roundToHalf', () => {
  it('rounds to the nearest 0.5', () => {
    expect(roundToHalf(0)).toBe(0)
    expect(roundToHalf(6.24)).toBe(6)
    expect(roundToHalf(6.25)).toBe(6.5)
    expect(roundToHalf(6.74)).toBe(6.5)
    expect(roundToHalf(6.75)).toBe(7)
    expect(roundToHalf(10)).toBe(10)
  })
})

describe('averageScore', () => {
  it('averages values and handles an empty list', () => {
    expect(averageScore([6, 6.5, 5.5, 6])).toBe(6)
    expect(averageScore([])).toBe(0)
  })
})

describe('getBand', () => {
  it('maps every boundary to the expected band', () => {
    expect(getBand(0).level).toBe('none')
    expect(getBand(3.5).level).toBe('none')
    expect(getBand(4).level).toBe('b1')
    expect(getBand(5.5).level).toBe('b1')
    expect(getBand(6).level).toBe('b2')
    expect(getBand(8).level).toBe('b2')
    expect(getBand(8.5).level).toBe('c1')
    expect(getBand(10).level).toBe('c1')
  })

  it('uses Vietnamese labels', () => {
    expect(getBand(3.5).label).toBe('Chưa đạt bậc 3')
    expect(getBand(4).label).toBe('Bậc 3 (B1)')
    expect(getBand(6).label).toBe('Bậc 4 (B2)')
    expect(getBand(8.5).label).toBe('Bậc 5 (C1)')
  })
})

describe('convertFourSkills', () => {
  it('matches the required example', () => {
    const result = convertFourSkills([6, 6.5, 5.5, 6])
    expect(result.average).toBe(6)
    expect(result.rounded).toBe(6)
    expect(result.band.level).toBe('b2')
    expect(result.band.label).toBe('Bậc 4 (B2)')
  })

  it('rounds the average before choosing a band', () => {
    const result = convertFourSkills([5.5, 5.5, 5.5, 6.5])
    expect(result.average).toBe(5.75)
    expect(result.rounded).toBe(6)
    expect(result.band.level).toBe('b2')
  })
})
