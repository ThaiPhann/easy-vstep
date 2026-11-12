---
name: VSTEP Luyện thi
description: Luyện thi VSTEP Reading & Listening ngay trên trình duyệt — một cuốn vở ôn thi, không phải một app.
colors:
  ink-blue: "#23468f"
  ink-blue-deep: "#1b3873"
  red-pen: "#c93f36"
  red-pen-soft: "#ae2f27"
  marker-yellow: "#f5e58a"
  paper: "#f3f6f9"
  sheet: "#ffffff"
  ink: "#16283b"
  ink-soft: "#4a6074"
  ink-faint: "#62788c"
  rule-line: "#d4dfe9"
  dark-paper: "#0d1a26"
  dark-sheet: "#16283b"
  dark-rule: "#2a3d50"
typography:
  display:
    fontFamily: "Times New Roman, Noto Serif, Liberation Serif, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "ui-monospace, Cascadia Mono, SFMono-Regular, Consolas, Courier New, monospace"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.12em"
  label-micro:
    fontFamily: "ui-monospace, Cascadia Mono, SFMono-Regular, Consolas, Courier New, monospace"
    fontSize: "0.625rem"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  sheet: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink-blue}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.sheet}"
    padding: "10px 16px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.ink-blue-deep}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.sheet}"
  button-quiet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "8px 12px"
  sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "24px"
  chip-skill:
    backgroundColor: "transparent"
    textColor: "{colors.ink-blue}"
    rounded: "{rounded.sheet}"
    padding: "2px 6px"
    typography: "{typography.label}"
  input:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "8px 12px"
---

# Design System: VSTEP Luyện thi

## Overview

**Creative North Star: "Cuốn vở ôn thi"**

Giao diện là một cuốn vở đang dùng: giấy trắng-xanh, lề đỏ kẻ dọc, tiêu đề viết tay bằng bút mực xanh, chỗ quan trọng gạch chân hoặc tô bằng bút dạ quang. Người học mở trang là thấy bài của mình đã ghi trên giấy, không phải một dashboard thống kê. Mọi thứ cao bằng đúng một lớp giấy — không bóng đổ, không khối nổi, không gradient trang trí.

Khung nhìn lấy từ đề thi in và sổ ghi chép học sinh Việt Nam: chữ serif cho tiêu đề như đầu đề bài đọc, chữ mono cho số liệu và nhãn như số trang, số câu in ở lề. Màu chỉ có ba loại mực — xanh bút bi, đỏ phê bài, vàng dạ quang — trên nền giấy. Màu không dùng để trang trí mà để đánh dấu: đỏ là lề vở và dấu tick, vàng là đúng một cụm từ đáng nhớ mỗi màn.

Chuyển động tối thiểu và có lý do: dấu tick đỏ tự vẽ ra khi trỏ vào một dòng mục lục, giống tay người đánh dấu bài đã làm. Không có hiệu ứng xuất hiện, không parallax, không chuyển cảnh.

**Key Characteristics:**
- Nền giấy xanh nhạt; mọi khối nội dung là một tờ giấy trắng viền 1px, bo góc gần như vuông (2px).
- Ba màu mực: xanh bút bi cho hành động và số liệu, đỏ phê cho lề và dấu đã làm, vàng dạ quang cho một cụm từ mỗi màn.
- Tiêu đề serif, thân bài sans hệ thống, nhãn và số mono viết hoa giãn chữ.
- Không bóng đổ ở trạng thái nghỉ; độ cao duy nhất là đường viền.
- Bố cục một cột ở 375px, thoáng dần lên desktop; không có cột phụ, không sidebar.

## Colors

Bảng màu là ba cây bút trên một tờ giấy — xanh, đỏ, vàng — cộng thang xám-xanh của giấy và mực.

### Primary
- **Ink Blue** (#23468f): mực bút bi. Nút hành động chính, liên kết đang chọn, điểm số, nhãn kỹ năng, viền logo. Đây là màu duy nhất được phép làm nền đặc cho một hành động.
- **Ink Blue Deep** (#1b3873): trạng thái hover/active của mọi nền xanh; không dùng độc lập.

### Secondary
- **Red Pen** (#c93f36): phê bài của giáo viên. Lề đỏ dọc tờ giấy chính, dấu tick "đã làm", nhãn "Sắp ra mắt", lỗi nhập liệu. Luôn mảnh — 1px hoặc nét vẽ tay, không bao giờ là mảng lớn.
- **Red Pen Soft** (#ae2f27): chữ đỏ trên nền sáng khi cần tương phản cao hơn Red Pen.

### Tertiary
- **Marker Yellow** (#f5e58a): bút dạ quang. Chỉ dùng cho đúng một cụm từ mỗi màn, dạng vệt tô nửa dưới dòng chữ. Không dùng làm nền khối, không dùng cho trạng thái.

### Neutral
- **Paper** (#f3f6f9): nền toàn trang; cũng là nền ô nhập liệu phụ và nút phụ.
- **Sheet** (#ffffff): mặt tờ giấy — thẻ đề, thẻ kết quả, khối nội dung.
- **Ink** (#16283b): mực chính cho tiêu đề và thân bài.
- **Ink Soft** (#4a6074): mô tả, nhãn phụ, chú thích dưới tiêu đề.
- **Ink Faint** (#62788c): metadata xa nhất — ngày, số câu, ghi chú chân trang.
- **Rule Line** (#d4dfe9): đường kẻ cấu trúc — viền tờ giấy, đường phân cách giữa các mục.
- **Dark Paper** (#0d1a26) / **Dark Sheet** (#16283b) / **Dark Rule** (#2a3d50): bộ ba thay thế khi bật dark mode; giấy đổi sang xanh đêm, mực xanh sáng lên thành #93aee6, đỏ phê thành #f4b8b3, dạ quang giảm còn 32% độ đục.

### Named Rules
**The Three Pens Rule.** Chỉ có ba màu mực được phép xuất hiện trên giấy: xanh, đỏ, vàng. Nếu một thành phần cần màu thứ tư, nó đang sai — hãy dùng cỡ chữ, độ đậm hoặc đường kẻ thay thế. Ngoại lệ: màu trạng thái ngữ nghĩa (xanh lá cho câu đúng, đỏ cho câu sai, màu bậc B1/B2/C1) được giữ vì ở đó màu mã hoá kết quả, không phải trang trí.

**The Margin Rule.** Lề đỏ chỉ đặt trên tờ giấy chính của mỗi trang (hero trang chủ, phiếu điểm), không đặt trên từng thẻ. Nó đánh dấu "đây là trang vở", không phải vật trang trí lặp lại.

## Typography

**Display Font:** Times New Roman (với Noto Serif, Liberation Serif, Georgia)
**Body Font:** System UI stack (Segoe UI / Roboto / system-ui)
**Label/Mono Font:** System mono stack (Cascadia Mono / Consolas / Courier New)

**Character:** Serif cho tiêu đề gợi cảm giác đề thi in và sách giáo trình; sans hệ thống giữ thân bài trung tính, dễ đọc trên điện thoại; mono viết hoa giãn chữ đóng vai số trang và nhãn lề — ba giọng, không giọng nào để trang trí.

### Hierarchy
- **Display** (700, 2rem → 3rem ở `sm`, line-height 1.12, serif): tiêu đề trang và hero. Tối đa hai dòng ở 375px.
- **Headline** (700, 1.5rem, line-height 1.25, serif): tiêu đề khối lớn — "Mục lục kỹ năng", "Danh sách đề".
- **Title** (700, 1rem, sans): tên đề trong thẻ, tên bài trong danh sách.
- **Body** (400, 1rem, line-height 1.625, sans; tối đa ~65ch): mô tả, giải thích, ghi chú. Không nhỏ hơn 0.875rem cho nội dung đọc.
- **Label** (600, 0.6875rem, letter-spacing 0.12em, mono, UPPERCASE): nhãn lề, metadata trong thẻ, số câu.
- **Micro-label** (600, 0.625rem, letter-spacing 0.14em, mono, UPPERCASE): nhãn phần, nhãn số liệu trên phiếu điểm, dòng chân trang. Không dùng dưới 0.625rem.

### Named Rules
**The Two Voices Rule.** Tiêu đề nói bằng serif, mọi thứ còn lại nói bằng sans hoặc mono. Không dùng serif cho đoạn văn dài, không dùng mono cho câu đọc.

## Layout

Một cột nội dung tối đa 1152px (`max-w-6xl`), padding ngang 16px ở mobile và 24px từ `sm`. Nhịp dọc giữa các khối là 24px, giữa các nhóm lớn là 40–48px. Mọi trang bắt đầu bằng tiêu đề trang, rồi tới tờ giấy chính.

Ở 375px: header cao 64px gồm logo và nút đổi theme; điều hướng chuyển xuống hàng riêng, cuộn ngang nếu cần, gạch chân mục đang chọn. Nội dung một cột, thẻ đề xếp dọc, thông số đề nằm dưới tiêu đề. Từ `sm` (640px): điều hướng lên cùng hàng logo, hero chia hai vùng (tiêu đề và nhãn bậc B1–C1), danh sách đề có thể hai cột; từ `lg` (1024px): bốn thẻ điểm phần trên một hàng.

Tờ giấy chính dùng padding trong 24px và thêm 16px lề trái cho đường kẻ đỏ; ở desktop tăng thành 40px/56px. Các thẻ phụ dùng padding 16–20px, không có lề đỏ.

## Elevation & Depth

Hệ phẳng hoàn toàn ở trạng thái nghỉ: không `box-shadow` cho thẻ, nút, header. Độ cao được biểu diễn bằng **viền 1px + đổi màu nền**, giống các lớp giấy chồng lên nhau chứ không phải các tấm nổi. Chỉ có một ngoại lệ: `--shadow-lg` (0 12px 32px -16px, 28% đục) dành cho popover/tooltip thật sự cần tách khỏi trang.

Dark mode không đảo màu máy móc; nó đổi giấy thành xanh đêm (#16283b) và giữ nguyên vai trò của viền.

### Named Rules
**The One Height Rule.** Nếu một khối cần nổi bật hơn khối bên cạnh, đổi màu nền hoặc đậm viền — không thêm bóng. Chỉ popover được dùng bóng.

## Shapes

Bo góc gần vuông: 2px cho mọi bề mặt (thẻ, nút, ô nhập, nhãn). Đây là cạnh giấy cắt bằng kéo, không phải viên thuốc. Nhãn kỹ năng là hình chữ nhật viền 1px, chữ mono, không phải pill. Dấu "đóng" (`.stamp`) là chữ mono viền 1px nghiêng −1.2°, dùng cho nhãn trạng thái như "Lưu trên thiết bị".

Đường kẻ là hình thức cấu trúc chính: viền tờ giấy, đường ngang phân cách mục, gạch chân tab đang chọn. Không dùng khung kép, không dùng góc bo lớn, không cắt ảnh.

## Components

### Buttons
- **Shape:** chữ nhật 2px, không bóng.
- **Primary:** nền Ink Blue, chữ trắng, padding 10px 16px, chữ 0.875rem đậm; hover sang Ink Blue Deep.
- **Secondary / quiet:** nền trong suốt hoặc Paper, viền Rule Line, chữ Ink; hover đổi viền sang Ink Blue.
- **Focus:** outline 2px Ink Blue, offset 2px, luôn hiển thị khi điều hướng bằng bàn phím.

### Chips
- **Style:** nhãn kỹ năng — viền 1px màu mực, chữ mono 0.6875rem viết hoa giãn chữ, nền trong suốt. Reading dùng Ink Blue, Listening dùng Ink Soft, Sắp ra mắt dùng Red Pen.
- **State:** không có trạng thái chọn; chip chỉ mô tả, không bấm được.

### Cards / Containers
- **Corner Style:** 2px.
- **Background:** Sheet trên nền Paper.
- **Shadow Strategy:** không bóng; xem Elevation.
- **Border:** 1px Rule Line, hover đậm lên màu mực khi cả thẻ là liên kết.
- **Internal Padding:** 16px mobile, 20–24px desktop.

### Inputs / Fields
- **Style:** nền Sheet, viền 1px Rule Line, bo 2px, chữ 1rem; nhãn mono viết hoa nằm trên ô, không dùng placeholder làm nhãn.
- **Focus:** viền đổi sang Ink Blue, không glow.
- **Error:** viền Red Pen và một dòng chú thích đỏ; không rung, không toast.

### Navigation
- Header dính trên cùng, nền Paper, viền dưới 1px. Logo là ô vuông viền xanh chứa chữ "V" serif. Mục đang chọn có gạch chân 2px Ink Blue và chữ đậm; mục thường chỉ đổi màu chữ khi hover. Mobile: hàng điều hướng riêng dưới logo, cuộn ngang.

### Skill Index Row (signature)
Mỗi kỹ năng là một dòng mục lục: ô vuông 1px bên trái chứa dấu tick đỏ vẽ tay, tên kỹ năng bằng serif đậm, thông số đề bằng mono 11px, mũi tên ở cuối. Khi hover/focus, dấu tick tự vẽ ra trong 320ms; khi đã có bài làm, tick đứng sẵn. Kỹ năng chưa có đề hiện ô vuông với dấu × đỏ và nhãn "SẮP RA MẮT" bên phải.

## Do's and Don'ts

### Do:
- **Do** đặt mọi khối nội dung trên một tờ giấy trắng viền 1px Rule Line, bo 2px.
- **Do** dùng mono viết hoa cho mọi nhãn và con số phụ (số câu, thời lượng, ngày).
- **Do** giữ đúng một cụm `marker-hit` mỗi màn.
- **Do** kiểm tra ở 375px trước, cả light và dark, trước khi coi là xong.

### Don't:
- **Don't** thêm bóng đổ, gradient nền, hay kính mờ cho thẻ và header.
- **Don't** dùng pill, bo góc lớn hơn 2px, hay icon trong vòng tròn đặc.
- **Don't** dùng đỏ cho nút hành động chính hoặc cho mảng nền lớn.
- **Don't** dùng ảnh stock, minh họa người, testimonial, hay con số hiệu quả ôn thi — bằng chứng của sản phẩm là đề, điểm và lịch sử thật.
