/**
 * BẢNG TẠM — tuyến tính, làm tròn đến 0.5.
 *
 * Mỗi mảng được đánh index bằng số câu đúng:
 *   READING_SCORE_TABLE[0]  -> 0.0 điểm khi đúng 0/40
 *   READING_SCORE_TABLE[40] -> 10.0 điểm khi đúng 40/40
 *
 * Khi có bảng chính thức, chỉ cần thay các giá trị trong hai mảng dưới đây.
 * Độ dài phải giữ nguyên: Reading 41 phần tử, Listening 36 phần tử.
 */
export const READING_SCORE_TABLE: readonly number[] = [
  0, 0.5, 0.5, 1, 1, 1.5, 1.5, 2, 2, 2.5,
  2.5, 3, 3, 3.5, 3.5, 4, 4, 4.5, 4.5, 5,
  5, 5.5, 5.5, 6, 6, 6.5, 6.5, 7, 7, 7.5,
  7.5, 8, 8, 8.5, 8.5, 9, 9, 9.5, 9.5, 10,
  10,
]

export const LISTENING_SCORE_TABLE: readonly number[] = [
  0, 0.5, 0.5, 1, 1, 1.5, 1.5, 2, 2.5, 2.5,
  3, 3, 3.5, 3.5, 4, 4.5, 4.5, 5, 5, 5.5,
  5.5, 6, 6.5, 6.5, 7, 7, 7.5, 7.5, 8, 8.5,
  8.5, 9, 9, 9.5, 9.5, 10,
]

export const SCORE_TABLE_NOTE =
  'Bảng quy đổi hiện là bảng tạm tuyến tính, làm tròn đến 0.5. Điểm có thể thay đổi khi cập nhật bảng chính thức.'
