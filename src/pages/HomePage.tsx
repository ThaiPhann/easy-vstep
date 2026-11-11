import { Link } from 'react-router-dom'
import { SkillCard } from '../components/SkillCard'
import {
  ArrowRightIcon,
  CalculatorIcon,
  ChartIcon,
  ClockIcon,
  ListIcon,
} from '../components/icons'
import { getTestsBySkill } from '../data'
import { SKILLS } from '../data/skills'

export function HomePage() {
  const readingCount = getTestsBySkill('reading').length
  const listeningCount = getTestsBySkill('listening').length

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-sky-50 p-6 shadow-sm dark:border-teal-900/60 dark:from-teal-950/40 dark:via-slate-900 dark:to-sky-950/30 sm:p-10">
        <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-900/70 dark:text-teal-200">
          Miễn phí · Không cần đăng nhập
        </span>
        <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Ôn luyện VSTEP ngay trên trình duyệt
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          Làm đề Reading và Listening đúng cấu trúc, có đồng hồ đếm giờ, chấm
          điểm và xem lại từng câu. Tiến độ được lưu trên thiết bị của bạn.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/luyen-tap/reading"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            Bắt đầu luyện Reading
            <ArrowRightIcon className="size-4" />
          </Link>
          <Link
            to="/quy-doi-diem"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <CalculatorIcon className="size-4" />
            Quy đổi điểm 4 kỹ năng
          </Link>
        </div>

        <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-white/80 p-3 ring-1 ring-slate-200/70 dark:bg-slate-900/70 dark:ring-slate-800">
            <dt className="text-xs text-slate-500 dark:text-slate-400">
              Đề Reading
            </dt>
            <dd className="mt-0.5 text-xl font-bold">{readingCount}</dd>
          </div>
          <div className="rounded-xl bg-white/80 p-3 ring-1 ring-slate-200/70 dark:bg-slate-900/70 dark:ring-slate-800">
            <dt className="text-xs text-slate-500 dark:text-slate-400">
              Đề Listening
            </dt>
            <dd className="mt-0.5 text-xl font-bold">{listeningCount}</dd>
          </div>
          <div className="rounded-xl bg-white/80 p-3 ring-1 ring-slate-200/70 dark:bg-slate-900/70 dark:ring-slate-800">
            <dt className="text-xs text-slate-500 dark:text-slate-400">
              Lưu tiến độ
            </dt>
            <dd className="mt-0.5 text-xl font-bold">Trên máy</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="skills-heading">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2
              id="skills-heading"
              className="text-xl font-bold tracking-tight sm:text-2xl"
            >
              Chọn kỹ năng
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Reading và Listening đã sẵn sàng. Writing và Speaking sẽ ra mắt
              sau.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.key} skill={skill} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          to="/quy-doi-diem"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-800 md:col-span-2"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300">
              <CalculatorIcon className="size-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold tracking-tight">
                Quy đổi điểm 4 kỹ năng
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Nhập điểm Reading, Listening, Writing, Speaking để tính điểm
                trung bình và xem bậc tương ứng.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 dark:text-teal-300">
                Mở công cụ
                <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Cách hoạt động
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-2.5">
              <ListIcon className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-teal-400" />
              Chọn đề và làm bài có đếm giờ.
            </li>
            <li className="flex gap-2.5">
              <ClockIcon className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-teal-400" />
              Nộp bài hoặc hết giờ để xem kết quả.
            </li>
            <li className="flex gap-2.5">
              <ChartIcon className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-teal-400" />
              Theo dõi điểm và lịch sử ở trang cá nhân.
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
