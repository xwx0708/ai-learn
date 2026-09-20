/** 图解通用外框：标题 + 图 + 注释，保持全站一致 */
export default function DiagramFrame({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <figure className="my-8 border border-line bg-card rounded overflow-hidden">
      <figcaption className="px-5 pt-4 pb-3 border-b border-line">
        <div className="font-mono2 text-[11px] tracking-[0.12em] text-ink-3 uppercase">{title}</div>
      </figcaption>
      <div className="p-4 sm:p-6">{children}</div>
      {note && (
        <div className="px-5 pb-4 text-[12.5px] leading-relaxed text-ink-3">{note}</div>
      )}
    </figure>
  )
}
