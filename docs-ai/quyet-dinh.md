# Quyết định kỹ thuật

- **SPA tĩnh, không backend** — miễn phí, không tài khoản, dễ deploy.
- **IndexedDB (Dexie) thay vì localStorage** — lưu được danh sách bài làm có cấu trúc.
- **Đề là JSON trong `src/data/` + test kiểm tra** — thêm đề không cần sửa UI.
- **Bảng điểm tạm tuyến tính** — chưa có bảng chính thức; thay giá trị, giữ nguyên độ dài mảng (Reading 41, Listening 36).
- **Điểm từng phần theo tỉ lệ, làm tròn 0.5** — chỉ để tham khảo, không cộng vào điểm tổng.
- **Trung bình 4 kỹ năng làm tròn 0.5 rồi mới xếp bậc** — tránh lệch ở ranh giới 5.5/6.0.
- **Chỉ lưu bài khi nộp/hết giờ** — không làm phức tạp bằng resume bài đang làm.
- **Trang làm bài có layout riêng** — tập trung, không bị header/footer che.
- **Lọc phần ở trang luyện tập chỉ để mở nhanh** — bài vẫn tính giờ và chấm toàn đề.
- **Không hiện bậc VSTEP cho một kỹ năng** — bậc chỉ có ý nghĩa khi đủ 4 kỹ năng.
- **Audio native + transcript chỉ ở trang kết quả** — không lộ đáp án khi đang làm.
- **Theme Zustand persist + script inline trong `index.html`** — tránh nháy sai màu khi tải.
- **Icon SVG nội tuyến, font hệ thống** — không phụ thuộc mạng/CDN.
- **Vitest chỉ ở dev** — không tăng bundle production.
- **Rewrite SPA cho Cloudflare/Vercel** — `BrowserRouter` cần trả `index.html` cho mọi route.
