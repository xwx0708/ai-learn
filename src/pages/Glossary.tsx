import { useMemo, useState } from 'react'
import ChapterHeading from '../components/ChapterHeading'
import { TERMS, CATEGORIES, TERM_MAP, type Term } from '../data/glossary'
import { TERM_VIZ } from '../components/diagrams/Glossary'
import { Search, ChevronDown } from 'lucide-react'

function TermCard({ term, open, onToggle, onJump }: {
  term: Term
  open: boolean
  onToggle: () => void
  onJump: (id: string) => void
}) {
  return (
    <div className={`border rounded transition-colors ${open ? 'border-ink bg-card' : 'border-line bg-card hover:border-ink-3'}`}>
      <button onClick={onToggle} className="w-full text-left px-5 py-4 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-display text-[17px] font-bold text-ink">{term.zh}</span>
            <span className="font-mono2 text-[11px] text-ink-3">{term.en}</span>
            <span className="font-mono2 text-[10px] tracking-wider text-accent uppercase">{term.cat}</span>
          </div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{term.one}</p>
        </div>
        <ChevronDown size={16} className={`shrink-0 mt-1.5 text-ink-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-line/70">
          <div className="grid sm:grid-cols-[88px_1fr] gap-y-3 gap-x-4 mt-4 text-[13.5px] leading-[1.85]">
            <div className="font-mono2 text-[10.5px] tracking-wider text-accent uppercase pt-0.5">类比</div>
            <div className="text-ink-2">{term.analogy}</div>
            <div className="font-mono2 text-[10.5px] tracking-wider text-accent uppercase pt-0.5">展开</div>
            <div className="text-ink-2">{term.detail}</div>
            {TERM_VIZ[term.id] && (
              <>
                <div className="font-mono2 text-[10.5px] tracking-wider text-accent uppercase pt-0.5">图解</div>
                <div className="border border-line rounded bg-white p-3">{TERM_VIZ[term.id]()}</div>
              </>
            )}
            {term.related.length > 0 && (
              <>
                <div className="font-mono2 text-[10.5px] tracking-wider text-accent uppercase pt-0.5">相关</div>
                <div className="flex flex-wrap gap-2">
                  {term.related.map((rid) => {
                    const r = TERM_MAP.get(rid)
                    return r ? (
                      <button
                        key={rid}
                        onClick={() => onJump(rid)}
                        className="text-[12px] border border-line rounded-full px-3 py-1 hover:border-ink hover:bg-ink hover:text-paper transition-colors"
                      >
                        {r.zh}
                      </button>
                    ) : null
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Glossary() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('全部')
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const list = useMemo(() => {
    const kw = q.trim().toLowerCase()
    return TERMS.filter((t) => {
      if (cat !== '全部' && t.cat !== cat) return false
      if (!kw) return true
      return (
        t.zh.toLowerCase().includes(kw) ||
        t.en.toLowerCase().includes(kw) ||
        t.one.toLowerCase().includes(kw) ||
        t.detail.toLowerCase().includes(kw)
      )
    })
  }, [q, cat])

  const toggle = (id: string) =>
    setOpenIds((s) => {
      const n = new Set(s)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })

  const jump = (id: string) => {
    setOpenIds((s) => new Set(s).add(id))
    requestAnimationFrame(() => {
      document.getElementById(`term-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  return (
    <div>
      <ChapterHeading
        num="第 3 章"
        en="Glossary"
        title="核心名词词典"
        lead={`收录 ${TERMS.length} 个主流关键名词。每个词条三层结构：一句话定义 → 通俗类比 → 技术展开。读正文时遇到黑话，来这里查；词条之间的“相关”链接会带你织出知识网络。`}
      />

      <div className="sticky top-14 lg:top-0 z-20 bg-paper/95 backdrop-blur py-4 -mx-1 px-1">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索名词，如：注意力 / attention / 嵌入…"
            className="w-full border border-line bg-card rounded pl-10 pr-4 py-2.5 text-[14px] outline-none focus:border-ink transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-[12px] rounded-full px-3.5 py-1.5 border transition-colors ${
                cat === c ? 'bg-ink text-paper border-ink' : 'border-line text-ink-2 hover:border-ink-3'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="text-[12px] text-ink-3 mb-4 font-mono2">{list.length} / {TERMS.length} 条</div>

      <div className="space-y-3">
        {list.map((t) => (
          <div key={t.id} id={`term-${t.id}`}>
            <TermCard term={t} open={openIds.has(t.id)} onToggle={() => toggle(t.id)} onJump={jump} />
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center py-16 text-ink-3 text-[14px]">
            没有匹配的名词。试试英文，或换个关键词。
          </div>
        )}
      </div>
    </div>
  )
}
