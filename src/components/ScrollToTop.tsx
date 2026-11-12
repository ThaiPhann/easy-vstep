import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // Chuyển trang trong SPA: đưa focus về đầu nội dung để screen reader đọc từ đầu.
    const main =
      document.getElementById('main-content') ?? document.querySelector('main')
    main?.focus()
  }, [pathname])

  return null
}
