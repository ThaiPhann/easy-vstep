import listening01 from './listening-01.json'
import reading01 from './reading-01.json'
import reading02 from './reading-02.json'
import type { Skill, Test } from './types'

// JSON được kiểm tra cấu trúc bằng src/data/data.test.ts.
export const tests = [reading01, reading02, listening01] as unknown as Test[]

export function getTestById(id: string): Test | undefined {
  return tests.find((test) => test.id === id)
}

export function getTestsBySkill(skill: Skill): Test[] {
  return tests.filter((test) => test.skill === skill)
}
