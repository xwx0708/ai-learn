export default function ChapterHeading({
  num,
  en,
  title,
  lead,
}: {
  num: string
  en: string
  title: string
  lead: string
}) {
  return (
    <header className="mb-12">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono2 text-[12px] tracking-[0.18em] text-accent uppercase">{en}</span>
        <span className="font-mono2 text-[12px] text-ink-3">{num}</span>
      </div>
      <h1 className="font-display text-[34px] sm:text-[44px] font-bold leading-[1.15] tracking-tight text-ink">
        {title}
      </h1>
      <p className="mt-5 text-[15.5px] leading-[1.9] text-ink-2 max-w-[640px]">{lead}</p>
      <div className="mt-8 h-px bg-line" />
    </header>
  )
}
