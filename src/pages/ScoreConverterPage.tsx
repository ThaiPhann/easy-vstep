import { useState } from 'react'
import { InfoIcon } from '../components/icons'
import type { BandLevel } from '../data/types'
import { convertFourSkills } from '../lib/scoreConversion'
import { formatScore } from '../lib/format'

const fields = [
  { key: 'reading', label: 'Reading', hint: 'Đọc hiểu' },
  { key: 'listening', label: 'Listening', hint: 'Nghe hiểu' },
  { key: 'writing', label: 'Writing', hint: 'Viết' },
  { key: 'speaking', label: 'Speaking', hint: 'Nói' },
] as const

type FieldKey = (typeof fields)[number]['key']

const bandStyles: Record<
  BandLevel,
  { card: string; badge: string; dot: string }
> = {
  none: {
    card: 'border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40',
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-200',
    dot: 'bg-rose-500',
  },
  b1: {
    card: 'border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40',
    badge: 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-200',
    dot: 'bg-sky-500',
  },
  b2: {
    card: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40',
    badge:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200',
    dot: 'bg-emerald-500',
  },
  c1: {
    card: 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40',
    badge:
      'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200',
    dot: 'bg-amber-500',
  },
}

export function ScoreConverterPage() {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    reading: '',
    listening: '',
    writing: '',
    speaking: '',
  })

  const entries = fields.map((field) => ({
    ...field,
    raw: values[field.key],
  }))
  const allFilled = entries.every((entry) => entry.raw.trim() !== '')
  const numbers = entries.map((entry) => Number(entry.raw))
  const invalid =
    allFilled &&
    numbers.some(
      (value) => !Number.isFinite(value) || value < 0 || value > 10,
    )
  const result =
    allFilled && !invalid ? convertFourSkills(numbers) : undefined

  function updateValue(key: FieldKey, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Quy đổi điểm 4 kỹ năng
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Nhập điểm từng kỹ năng trên thang 0–10. Điểm trung bình được làm tròn
          đến 0.5 gần nhất để xác định bậc.
        </p>
      </div>

      <section className="rounded border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            const id = `score-${field.key}`
            const raw = values[field.key]
            const number = Number(raw)
            const fieldInvalid =
              raw.trim() !== '' &&
              (!Number.isFinite(number) || number < 0 || number > 10)

            return (
              <div key={field.key}>
                <label
                  htmlFor={id}
                  className="flex items-baseline justify-between gap-2 text-sm font-semibold"
                >
                  <span>{field.label}</span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    {field.hint}
                  </span>
                </label>
                <input
                  id={id}
                  type="number"
                  min={0}
                  max={10}
                  step={0.5}
                  inputMode="decimal"
                  autoComplete="off"
                  value={raw}
                  onChange={(event) =>
                    updateValue(field.key, event.target.value)
                  }
                  placeholder="VD: 6.0"
                  aria-invalid={fieldInvalid}
                  aria-describedby={
                    fieldInvalid ? `${id}-error` : undefined
                  }
                  className={`mt-1.5 w-full rounded-sm border bg-white px-3 py-2.5 text-sm transition placeholder:text-slate-500 focus:border-teal-700 dark:bg-slate-950 dark:placeholder:text-slate-400 ${
                    fieldInvalid
                      ? 'border-rose-400'
                      : 'border-slate-500 dark:border-slate-500'
                  }`}
                />
                {fieldInvalid ? (
                  <p
                    id={`${id}-error`}
                    className="mt-1 text-xs text-rose-600 dark:text-rose-400"
                  >
                    Nhập điểm từ 0 đến 10.
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
          {result ? (
            <div
              className={`rounded-2xl border p-5 ${bandStyles[result.band.level].card}`}
              aria-live="polite"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Điểm trung bình (làm tròn 0.5)
                  </p>
                  <p className="mt-1 font-mono text-4xl font-bold tabular-nums">
                    {formatScore(result.rounded)}
                    <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">
                      /10
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-none border border-current px-2.5 py-1 text-sm font-bold ${bandStyles[result.band.level].badge}`}
                  >
                    <span
                      className={`size-2 rounded-full ${bandStyles[result.band.level].dot}`}
                    />
                    {result.band.label}
                  </span>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Khoảng điểm: {result.band.range}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
              {invalid
                ? 'Điểm phải nằm trong khoảng 0 đến 10.'
                : 'Nhập đủ 4 điểm để xem điểm trung bình và bậc tương ứng.'}
            </p>
          )}
        </div>
      </section>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p className="flex items-start gap-2">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-teal-400" />
          <span>
            Ví dụ: 6.0 / 6.5 / 5.5 / 6.0 có trung bình 6.0, tương ứng Bậc 4
            (B2). Công cụ chỉ mang tính tham khảo, không thay thế kết quả chính
            thức.
          </span>
        </p>
      </div>
    </div>
  )
}
