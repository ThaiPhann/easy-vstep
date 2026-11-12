import { Link, NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/quy-doi-diem', label: 'Quy đổi điểm' },
  { to: '/ca-nhan', label: 'Cá nhân' },
]

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      aria-label="Điều hướng chính"
      className={
        mobile
          ? 'flex items-stretch gap-4 overflow-x-auto border-t border-slate-200 px-4 dark:border-slate-800 sm:hidden'
          : 'hidden items-stretch gap-5 sm:flex'
      }
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `-mb-px border-b-2 px-0.5 text-sm transition-colors ${
              mobile ? 'py-2.5' : 'py-5'
            } ${
              isActive
                ? 'border-teal-700 font-semibold text-slate-900 dark:border-teal-400 dark:text-white'
                : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Bỏ qua điều hướng
      </a>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 focus-visible:outline-offset-4"
          >
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center border border-teal-700 bg-white font-display text-lg font-bold leading-none text-teal-700 dark:border-teal-400 dark:bg-slate-900 dark:text-teal-300"
            >
              V
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold leading-tight sm:text-lg">
                VSTEP Luyện thi
              </span>
              <span className="block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Reading &amp; Listening · miễn phí
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <NavLinks />
            <ThemeToggle />
          </div>
        </div>
        <NavLinks mobile />
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12"
      >
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-4 py-7 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
          <p>
            Dự án cá nhân, miễn phí, không cần tài khoản. Tiến độ được lưu trên
            trình duyệt của bạn.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Nội dung tự soạn · không phải đề chính thức
          </p>
        </div>
      </footer>
    </div>
  )
}
