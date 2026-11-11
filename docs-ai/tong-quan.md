# Tổng quan dự án

Web app luyện thi VSTEP Reading & Listening, chạy hoàn toàn trên trình duyệt, miễn phí, không backend.

## Công nghệ
- React 19 + TypeScript + Vite 8, React Router 7 (BrowserRouter)
- Tailwind CSS v4 (@tailwindcss/vite), không thư viện UI
- Zustand (theme), Dexie 4 (IndexedDB), Recharts 3 (biểu đồ)
- Vitest cho test dữ liệu và logic

## Trang
| Đường dẫn | Nội dung |
|---|---|
| `/` | Giới thiệu, chọn kỹ năng |
| `/luyen-tap/:skill` | Danh sách đề, lọc theo phần |
| `/lam-bai/:testId` | Làm bài, đếm giờ, nộp bài |
| `/ket-qua/:attemptId` | Điểm, điểm phần, xem lại đáp án |
| `/quy-doi-diem` | Quy đổi 4 kỹ năng, xếp bậc |
| `/ca-nhan` | Thống kê, biểu đồ, lịch sử |

## Dữ liệu & chấm điểm
- 2 đề Reading (4 bài × 10 câu, 60 phút), 1 đề Listening (8/12/15 câu, 40 phút) trong `src/data/*.json`.
- Điểm 0–10 theo bảng tạm `src/data/scoreTable.ts`, index = số câu đúng.
- Điểm từng phần = tỉ lệ đúng làm tròn 0.5, không cộng vào điểm tổng.
- Quy đổi 4 kỹ năng: trung bình → làm tròn 0.5 → B1/B2/C1.

## Lưu trữ
- Bài làm lưu trong IndexedDB (bảng `attempts`), chỉ lưu khi nộp hoặc hết giờ.
- Không tài khoản, không đồng bộ; xóa dữ liệu trình duyệt là mất lịch sử.

## Lệnh
`npm install` · `npm run dev` · `npm run test` · `npm run build` · `npm run preview`

## Giới hạn hiện tại
- Writing/Speaking chưa có; audio là TTS mẫu.
- Bundle chính ~896 kB (269 kB gzip), chưa lazy-load.
- Chưa deploy thực tế, chưa test trên iOS/Safari.
