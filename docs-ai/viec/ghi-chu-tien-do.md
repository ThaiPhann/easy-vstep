# Ghi chú tiến độ

## Đã xong

- 6 trang: trang chủ, luyện tập theo kỹ năng, làm bài, kết quả, quy đổi điểm, cá nhân.
- Reading: 2 đề đầy đủ (4 bài × 10 câu, 60 phút), nội dung tự soạn B1–B2, giải thích tiếng Việt.
- Listening: 1 đề (3 phần, 8/12/15 câu, 40 phút) kèm transcript và 3 file MP3 mẫu.
- Làm bài: đồng hồ đếm ngược, bảng điều hướng câu, đánh dấu câu, nộp bài thủ công và tự nộp khi hết giờ.
- Chấm điểm 0–10, điểm từng phần, xem lại đáp án và giải thích, hiện transcript ở trang kết quả.
- Quy đổi 4 kỹ năng: làm tròn 0.5, xếp bậc B1/B2/C1; ví dụ 6.0/6.5/5.5/6.0 ra 6.0 – B2.
- Lưu lịch sử bằng Dexie/IndexedDB; trang cá nhân có thống kê, biểu đồ Recharts, danh sách bài làm.
- Theme sáng/tối lưu bằng Zustand persist; giao diện tiếng Việt, không popup, không tràn ngang ở 375px.
- 25 test pass (`npm run test`), build pass (`npm run build`).
- README hướng dẫn chạy, thêm đề, bảng điểm, deploy; có `public/_redirects` và `vercel.json`.

## Chưa xong

- Writing và Speaking mới ở trạng thái "Sắp ra mắt".
- Bảng quy đổi điểm vẫn là bảng tạm tuyến tính, chưa phải bảng chính thức.
- Audio Listening là giọng TTS mẫu, chưa có bản thu thật.
- Chưa lazy-load trang cá nhân nên bundle chính còn ~896 kB (269 kB gzip).
- Chưa kiểm tra trên thiết bị thật và Safari/iOS.
- Chưa deploy thử lên Cloudflare Pages hoặc Vercel.
- Không lưu bài đang làm dở (chủ ý, đóng tab là mất câu trả lời).

## Đang vướng

- Không có blocker chặn build hay chặn dùng app.
- Các cách đã thử nhưng không được:
  - `npm run dev -- --host 127.0.0.1 --port 5173`: npm 11 nuốt cờ, Vite báo `Unused args`. Chuyển sang `npx vite --host 127.0.0.1 --port 5173`.
  - Scaffold thẳng vào thư mục tạm bằng `npm create vite`: create-vite tạo sai đường dẫn ngay trong repo. Phải tạo `vstep-temp` rồi copy ra.
  - Ghép audio bằng ffmpeg với file danh sách UTF-8: lỗi `unknown keyword 'file'` do BOM. Ghi danh sách bằng ASCII mới chạy.
  - Sửa tràn ngang ở thẻ đề bằng cách chỉnh `truncate`/`min-w-0` bên trong: không ăn, thẻ vẫn rộng 385px. Phải thêm `min-w-0` vào chính grid item (`article`).
  - Biểu đồ không nối đường khi mỗi kỹ năng chỉ có 1 điểm; `connectNulls` không giải quyết được. Tạm chấp nhận, chỉ hiện điểm rời.
  - Gọi CDP song song cho cùng một tab: tranh nhau viewport, kết quả đo sai (375 thành 401/504). Phải chạy tuần tự.
