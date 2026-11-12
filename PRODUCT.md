# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hai nhóm, ưu tiên sinh viên:

- **Sinh viên cần chứng chỉ B1/B2 để tốt nghiệp** — nhóm chính. Tự ôn ở nhà, thường trên điện thoại, cần luyện đề sát cấu trúc thi và biết mình đang ở bậc nào.
- **Người đi làm cần chứng chỉ cho công việc** — nhóm thứ cấp. Học tranh thủ buổi tối/ngày nghỉ, quan tâm thời gian làm bài và tiến bộ qua các lần.

## Product Purpose

Web app luyện thi VSTEP Reading & Listening miễn phí, chạy hoàn toàn trong trình duyệt: làm đề có đếm giờ, chấm điểm, xem lại đáp án và theo dõi tiến độ. Không tài khoản, không backend, không gọi API bên thứ ba.

Thành công: người học hoàn thành được một đề đầy đủ đúng thời lượng, hiểu vì sao sai, và thấy được tiến bộ của mình qua lịch sử.

## Positioning

Miễn phí, không tài khoản, chạy offline — mở là luyện được, dữ liệu chỉ nằm trên máy người học. Đây là thứ các bên luyện thi trả phí không thể nói thật.

## Operating Context

- Trang chủ là điểm vào duy nhất. Người đã làm bài thấy ngay lần làm gần nhất
  (điểm, thời gian, đề) và một nút làm tiếp; người chưa làm thấy nút bắt đầu đề
  Reading đầu tiên. Không có bước giới thiệu, không có trang đăng nhập.
- Tự học tại nhà, thường trên điện thoại, có thể mạng yếu hoặc không mạng.
- Làm bài theo đúng thời lượng thi: Reading 2 đề × (4 bài × 10 câu, 60 phút); Listening 1 đề (8/12/15 câu, 40 phút).
- Sau khi nộp: xem điểm, điểm từng phần, đáp án và giải thích; với Listening nghe lại audio và đọc transcript.
- Dùng trang quy đổi để nhập điểm 4 kỹ năng và xem bậc B1/B2/C1.
- Xem lại lịch sử và biểu đồ ở trang cá nhân.

## Capabilities and Constraints

- Chỉ **Reading + Listening** ở giai đoạn này; Writing/Speaking hiển thị "Sắp ra mắt".
- Đề là JSON trong `src/data/`, thêm đề không phải sửa UI.
- Điểm 0–10 theo bảng tạm tuyến tính trong `src/data/scoreTable.ts`, index = số câu đúng; **chưa chốt bảng chính thức của Bộ GD&ĐT**.
- Điểm từng phần = tỉ lệ đúng làm tròn 0.5, chỉ để tham khảo, không cộng vào điểm tổng.
- Quy đổi 4 kỹ năng: trung bình → làm tròn 0.5 → B1/B2/C1; chỉ hiện bậc khi đủ 4 kỹ năng.
- Bài làm lưu trong IndexedDB (Dexie), chỉ ghi khi nộp hoặc hết giờ; không lưu bài đang làm, đổi tab giữa chừng sẽ mất câu trả lời.
- Không tài khoản, không đồng bộ giữa các máy; xóa dữ liệu trình duyệt là mất lịch sử.
- Đề hiện có là bản tự soạn, không phải đề thi chính thức (README nêu rõ); **chưa chốt có thay bằng đề chính thức hay không**.
- Audio hiện là bản mẫu tạo bằng text-to-speech từ transcript; **chưa chốt thay bằng audio thật**.

## Brand Commitments

- Tên: VSTEP Luyện thi — Reading & Listening.
- Giao diện tiếng Việt, xưng hô trung tính, không popup.
- Mobile-first, dùng tốt từ 375px; có dark mode và lưu lựa chọn theme.
- Không phụ thuộc mạng/CDN khi chạy; icon SVG nội tuyến, font hệ thống.
- Không có ảnh stock, testimonial, hay con số hiệu quả ôn thi. Bằng chứng là
  chính sản phẩm: cấu trúc đề, thời lượng, số câu, điểm và lịch sử có thật của
  người học trên máy này.
- Tiến độ của người đã có bài làm đứng trước phần giới thiệu; không bắt họ đọc
  lại lời chào mỗi lần mở.

## Evidence on Hand

- 2 đề Reading và 1 đề Listening đã soạn đầy đủ, kèm đáp án và giải thích tiếng Việt (`src/data/*.json`).
- Transcript cho mọi phần Listening; file MP3 mẫu trong `public/audio/` (giọng đọc tổng hợp).
- Bộ test dữ liệu và logic chấm điểm (`src/data/data.test.ts`, `src/lib/*.test.ts`).
- **Không có**: khách hàng thật, testimonial, số liệu hiệu quả ôn thi, đánh giá của giáo viên. Không được bịa các nội dung này.

## Product Principles

1. **Luyện được ngay, không ma sát.** Không đăng ký, không mạng, không cấu hình — mở là làm bài.
2. **Trung thực về giới hạn.** Điểm, bậc và đề đều là tham khảo; luôn nói rõ, không hứa kết quả thi thật.
3. **Sát kỳ thi ở phần cốt lõi.** Số phần, số câu, thời lượng và cách chấm phải khớp cấu trúc VSTEP.
4. **Dữ liệu thuộc về người học.** Chỉ lưu trên máy, không gửi đi, không tài khoản.
5. **Điện thoại là mặc định.** Mọi màn hình phải dùng tốt ở 375px, cả sáng và tối.
