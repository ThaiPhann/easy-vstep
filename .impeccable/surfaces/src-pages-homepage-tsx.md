---
version: 1
slug: "src-pages-homepage-tsx"
primary_target: "src/pages/HomePage.tsx"
related_targets: ["src/components/AppLayout.tsx","src/index.css"]
---

# Surface: Trang chủ

Mode: Persuade. Route `/`. Primary target `src/pages/HomePage.tsx`.

## Audience and job

Sinh viên tự ôn VSTEP trên điện thoại, thường buổi tối, có thể không mạng.
Việc: biết mình đang ở đâu (bài gần nhất hoặc chưa có bài) rồi bắt đầu / làm
tiếp một đề Reading hoặc Listening.

## Action

Một hành động chính: làm tiếp đề gần nhất nếu đã có bài, ngược lại bắt đầu đề
Reading đầu tiên. Phụ: mở danh sách đề, quy đổi điểm, xem tiến độ.

## Proof

Cấu trúc đề thật (2 đề Reading, 1 đề Listening; 60/40 phút; số câu), lần làm
gần nhất lấy từ IndexedDB, và giới hạn được nói thẳng: miễn phí, không tài
khoản, lưu trên máy, đề tự soạn.

## Constraints

Không ảnh stock, không testimonial, không số liệu hiệu quả. Font hệ thống,
icon SVG nội tuyến, không CDN. Dark mode bắt buộc. Toàn bộ các trang dùng
chung hệ token mới; trang chủ là nơi hệ đó lên tiếng rõ nhất.

## Chosen direction and memorable moment

Sổ tay ôn thi đang mở: giấy, lề đỏ, tab giấy, mực xanh bút bi, phê đỏ, một
vệt highlight. Khoảnh khắc nhớ: dấu tick đỏ tự vẽ ra khi chạm vào một mục kỹ
năng.

## Direction contract

THESIS: Trang chủ là một trang vở đang mở, tiến độ của người học là dòng đầu
tiên chứ không phải lời chào; từ chối hero gradient với ba thẻ tính năng.

OWN-WORLD: giấy trắng-xanh nhạt với lề đỏ 1px; mực xanh bút bi #23468F là màu
hành động; phê đỏ #C93F36 cho trạng thái và ghi chú; highlight vàng #EFD44D
cho đúng một câu; tiêu đề serif kiểu đề thi in, số liệu và nhãn mono; thẻ là
tờ giấy viền 1px, góc gần vuông, không bóng; tab giấy ở mép trên.

STORY: Người học hiểu trong vài giây: đây là đề VSTEP đúng cấu trúc, miễn phí,
không cần tài khoản; họ thấy mình đang ở đâu và bấm một nút để làm tiếp hoặc
bắt đầu.

FIRST VIEWPORT: Ở 375px, dòng nhỏ ở lề "VỞ ÔN THI · VSTEP", tiêu đề serif hai
dòng, một câu được highlight "miễn phí, không cần đăng nhập", rồi phiếu "lần
làm gần nhất" (hoặc "chưa có bài nào") có lề đỏ và nút chính xanh bút bi rộng
hết cỡ; bên dưới là mục lục kỹ năng đánh số.

FORM: candidate 3 of 7 grounded directions (sổ tay ôn thi); seed:
4f87698387cd3418.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.

## Open

Không có. Bảng điểm chính thức và audio thật vẫn là quyết định của sản phẩm,
không thuộc surface này.
