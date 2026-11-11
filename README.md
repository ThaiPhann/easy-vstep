# VSTEP Luyện thi – Reading & Listening

Web app luyện thi VSTEP miễn phí, chạy hoàn toàn trên trình duyệt: làm đề có đồng hồ đếm giờ, chấm điểm, xem lại đáp án và theo dõi tiến độ. Không cần tài khoản, không có backend, không gọi API bên thứ ba.

- **Reading:** 2 đề, mỗi đề 4 bài đọc × 10 câu = 40 câu, 60 phút.
- **Listening:** 1 đề, 3 phần với 8/12/15 câu = 35 câu, 40 phút.
- **Writing / Speaking:** hiển thị "Sắp ra mắt".
- Điểm mỗi kỹ năng trên thang 0–10, quy đổi bậc theo điểm trung bình 4 kỹ năng.
- Lịch sử bài làm lưu bằng IndexedDB (Dexie) trên chính trình duyệt của người học.

## Công nghệ

React 19 + TypeScript + Vite, Tailwind CSS v4, React Router, Zustand (theme), Dexie (IndexedDB), Recharts (biểu đồ). Test dữ liệu và logic bằng Vitest.

## Chạy dự án

Yêu cầu Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra (mặc định `http://localhost:5173`).

Các lệnh khác:

```bash
npm run build     # kiểm tra TypeScript và build production vào dist/
npm run preview   # xem thử bản build
npm run test      # chạy test một lần
npm run test:watch
npm run lint
```

## Cấu trúc chính

```
src/
  data/
    types.ts          Kiểu dữ liệu Test, Part, Question, Attempt
    skills.ts         Danh sách 4 kỹ năng và trạng thái
    index.ts          Nạp và tra cứu đề
    scoreTable.ts     Bảng quy đổi điểm (tạm thời)
    reading-01.json   Đề Reading 01
    reading-02.json   Đề Reading 02
    listening-01.json Đề Listening 01 (kèm transcript)
  lib/
    scoring.ts        Chấm điểm, tạo bản ghi bài làm
    scoreConversion.ts Làm tròn 0.5, xếp bậc B1/B2/C1
    db.ts             Dexie: lưu và đọc lịch sử
  pages/             6 trang của app
  components/        Thành phần giao diện dùng chung
public/
  audio/              File MP3 cho phần Listening
  _redirects          Cấu hình SPA cho Cloudflare Pages
```

## Thêm đề mới

1. Tạo file JSON trong `src/data/`, ví dụ `reading-03.json`, theo cấu trúc:

```json
{
  "id": "reading-03",
  "skill": "reading",
  "title": "Đề Reading 03 – Chủ đề",
  "durationMinutes": 60,
  "parts": [
    {
      "id": "r3-p1",
      "partNumber": 1,
      "title": "Bài 1 – Tên bài",
      "text": "Đoạn văn tiếng Anh, các đoạn cách nhau bằng \\n\\n.",
      "questions": [
        {
          "id": "r3-p1-q1",
          "number": 1,
          "question": "Câu hỏi tiếng Anh?",
          "options": [
            { "id": "A", "text": "..." },
            { "id": "B", "text": "..." },
            { "id": "C", "text": "..." },
            { "id": "D", "text": "..." }
          ],
          "answer": "B",
          "explanation": "Giải thích bằng tiếng Việt."
        }
      ]
    }
  ]
}
```

2. Mở `src/data/index.ts` và thêm import vào mảng `tests`:

```ts
import reading03 from './reading-03.json'

export const tests = [reading01, reading02, listening01, reading03] as unknown as Test[]
```

3. Chạy `npm run test`. Test trong `src/data/data.test.ts` sẽ kiểm tra số phần, số câu, số lựa chọn, đáp án hợp lệ và độ dài nội dung. Nếu thêm đề Listening, cập nhật thêm kỳ vọng số câu trong test.

Quy ước dữ liệu:

- Reading: 4 phần, mỗi phần 10 câu, tổng 40 câu, `durationMinutes: 60`.
- Listening: 3 phần với 8/12/15 câu, tổng 35 câu, `durationMinutes: 40`; mỗi phần cần `audioUrl` trỏ tới file trong `public/audio/` và `transcript` (chỉ hiện ở trang kết quả).
- `number` đánh liên tục từ 1 đến hết; `id` câu không trùng; mỗi câu đúng 4 lựa chọn A–D.

### Audio

Các file trong `public/audio/` hiện là bản mẫu tạo bằng text-to-speech từ transcript. Để dùng audio thật, ghi đè file cùng tên (hoặc sửa `audioUrl` trong JSON). Định dạng MP3, nên giữ dung lượng nhỏ để tải nhanh trên di động.

## Bảng quy đổi điểm

`src/data/scoreTable.ts` chứa hai mảng `READING_SCORE_TABLE` và `LISTENING_SCORE_TABLE`, đánh index theo **số câu đúng**:

```ts
READING_SCORE_TABLE[0]  // 0 câu đúng  -> 0.0
READING_SCORE_TABLE[40] // 40 câu đúng -> 10.0
```

Bảng hiện tại là **bảng tạm tuyến tính, làm tròn đến 0.5**, không phải bảng chính thức của Bộ GD&ĐT. Khi có bảng chuẩn, chỉ cần thay giá trị trong hai mảng, giữ nguyên độ dài (Reading 41 phần tử, Listening 36 phần tử).

Điểm từng phần trên trang kết quả tính theo tỉ lệ đúng/sai của phần đó, làm tròn 0.5, dùng để tham khảo chứ không cộng vào điểm tổng.

## Quy đổi 4 kỹ năng

Trang `/quy-doi-diem` nhận điểm 0–10 của Reading, Listening, Writing, Speaking:

1. Tính trung bình cộng 4 điểm.
2. Làm tròn đến 0.5 gần nhất.
3. Xếp bậc: dưới 4.0 chưa đạt bậc 3; 4.0–5.5 Bậc 3 (B1); 6.0–8.0 Bậc 4 (B2); 8.5–10 Bậc 5 (C1).

Công cụ chỉ mang tính tham khảo, không thay thế kết quả thi chính thức.

## Lưu dữ liệu

Mỗi lần nộp bài (hoặc hết giờ), một bản ghi được thêm vào bảng `attempts` trong IndexedDB: `testId`, `skill`, `completedAt`, `answers`, `correctCount`, `score`, `durationSeconds`, `partScores`.

- Không lưu bài đang làm dở; đóng tab giữa chừng sẽ mất câu trả lời.
- Xóa dữ liệu trình duyệt sẽ xóa toàn bộ lịch sử.
- Dữ liệu không rời khỏi thiết bị, không có đồng bộ giữa các máy.

## Triển khai

App là SPA dùng `BrowserRouter`, nên máy chủ phải trả `index.html` cho mọi đường dẫn.

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- File `public/_redirects` (đã có) tự động được copy vào `dist` và xử lý rewrite.

### Vercel

- Import repository, Vercel tự nhận diện Vite (build `npm run build`, output `dist`).
- `vercel.json` (đã có) rewrite mọi đường dẫn về `/index.html`.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Redirect SPA: `/* /index.html 200` (thêm vào `public/_redirects` nếu triển khai Netlify).

## Ghi chú

- Nội dung đề là bản tự soạn, không phải đề thi chính thức của Bộ GD&ĐT.
- Audio mẫu dùng giọng đọc tổng hợp, có thể thay bằng file thật.
- Giao diện tiếng Việt, tối ưu di động từ 375px, có chế độ sáng/tối và lưu lựa chọn theme.
