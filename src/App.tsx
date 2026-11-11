import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ScrollToTop } from './components/ScrollToTop'
import { ThemeSync } from './components/ThemeSync'
import { HomePage } from './pages/HomePage'
import { PracticeListPage } from './pages/PracticeListPage'
import { ProfilePage } from './pages/ProfilePage'
import { ResultPage } from './pages/ResultPage'
import { ScoreConverterPage } from './pages/ScoreConverterPage'
import { TestPage } from './pages/TestPage'

export default function App() {
  return (
    <>
      <ThemeSync />
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/luyen-tap/:skill" element={<PracticeListPage />} />
          <Route path="/ket-qua/:attemptId" element={<ResultPage />} />
          <Route path="/quy-doi-diem" element={<ScoreConverterPage />} />
          <Route path="/ca-nhan" element={<ProfilePage />} />
        </Route>
        <Route path="/lam-bai/:testId" element={<TestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
