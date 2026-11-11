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
          ? 'flex items-center gap-1 overflow-x-auto border-t border-slate-200 px-3 py-2 dark:border-slate-800 sm:hidden'
          : 'hidden items-center gap-1 sm:flex'
      }
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Bỏ qua điều hướng
      </a>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-teal-700 text-lg font-bold text-white shadow-sm">
              V
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold tracking-tight sm:text-base">
                VSTEP Luyện thi
              </span>
              <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                Reading &amp; Listening miễn phí
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <NavLinks />
            <ThemeToggle />
          </div>
        </div>
        <NavLinks mobile />
      </header>

      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:px-6">
          <p>
            Dự án cá nhân, miễn phí, không cần tài khoản. Tiến độ được lưu trên
            trình duyệt của bạn.
          </p>
          <p className="mt-1">
            Nội dung mẫu tự soạn, không phải đề thi chính thức của Bộ GD&amp;ĐT.
          </p>
        </div>
      </footer>
    </div>
  )
}
