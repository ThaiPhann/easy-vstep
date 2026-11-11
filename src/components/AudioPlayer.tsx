export function AudioPlayer({
  src,
  title,
}: {
  src?: string
  title: string
}) {
  if (!src) {
    return (
      <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
        Phần này chưa có file audio.
      </p>
    )
  }

  return (
    <div>
      <audio
        controls
        preload="metadata"
        src={src}
        aria-label={`Audio: ${title}`}
        className="w-full"
      >
        Trình duyệt của bạn không hỗ trợ phát audio.
      </audio>
      <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        Dùng nút play/pause và thanh tua của trình phát. Audio là bản mẫu, có
        thể thay bằng file thật trong <code>public/audio/</code>.
      </p>
    </div>
  )
}
