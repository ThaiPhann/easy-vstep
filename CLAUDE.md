## Bộ nhớ dự án

- Tổng quan: `docs-ai/tong-quan.md`
- Quyết định kỹ thuật: `docs-ai/quyet-dinh.md`
- Việc & tiến độ: `docs-ai/viec/ghi-chu-tien-do.md`
- Chạy/thêm đề/deploy: `README.md`
- Quy tắc dùng skill: `AGENTS.md`

Quy ước nhanh:
- App tĩnh, không backend; dữ liệu người học chỉ nằm trong IndexedDB.
- Thêm đề: tạo JSON trong `src/data/`, import vào `src/data/index.ts`, chạy `npm run test`.
- Sửa bảng điểm: chỉ thay giá trị trong `src/data/scoreTable.ts`, giữ nguyên độ dài mảng.
- UI tiếng Việt, mobile-first 375px, dark mode, không popup.
- Trước khi xong: `npm run test` và `npm run build`.
