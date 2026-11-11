import Dexie, { type Table } from 'dexie'
import type { Attempt } from '../data/types'

class VstepDB extends Dexie {
  attempts!: Table<Attempt, number>

  constructor() {
    super('vstep-db')
    this.version(1).stores({
      attempts: '++id, testId, skill, completedAt',
    })
  }
}

export const db = new VstepDB()

export async function saveAttempt(attempt: Attempt): Promise<number> {
  return db.attempts.add(attempt)
}

export async function getAttempt(id: number): Promise<Attempt | undefined> {
  return db.attempts.get(id)
}

export async function getAttempts(): Promise<Attempt[]> {
  return db.attempts.orderBy('completedAt').reverse().toArray()
}
