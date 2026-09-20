import { NavLink, Link } from 'react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export const NAV = [
  { to: '/', zh: '导览', en: 'ORIENTATION', num: '00' },
  { to: '/basics', zh: '神经网络是什么', en: 'NEURAL NETWORKS', num: '01' },
  { to: '/learning', zh: '学习如何发生', en: 'HOW LEARNING WORKS', num: '02' },
  { to: '/glossary', zh: '核心名词词典', en: 'GLOSSARY', num: '03' },
  { to: '/architectures', zh: '主流架构图鉴', en: 'ARCHITECTURES', num: '04' },
  { to: '/inside', zh: '运作原理深挖', en: 'UNDER THE HOOD', num: '05' },
  { to: '/path', zh: '学习路径与资源', en: 'RESOURCES', num: '06' },
]

function NavItems({ onClick }: { onClick?: () => void }) {
  return (
    <nav className="flex flex-col">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          onClick={onClick}
          className={({ isActive }) =>
            `group flex items-baseline gap-3 border-l-2 px-5 py-3 transition-colors ${
              isActive
                ? 'border-ink bg-background'
                : 'border-transparent hover:border-ink-3 hover:bg-background/60'
            }`
          }
        >
          <span className="font-mono2 text-[11px] text-ink-3 w-5 shrink-0">{item.num}</span>
          <span className="flex flex-col">
            <span className="text-[14px] font-medium text-ink leading-snug">{item.zh}</span>
            <span className="font-mono2 text-[9.5px] tracking-[0.14em] text-ink-3 uppercase">{item.en}</span>
          </span>
        </NavLink>
      ))}
    </nav>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-paper">
      {/* 移动端顶栏 */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-line bg-paper/95 backdrop-blur px-4 h-14">
        <Link to="/" className="font-display font-bold text-lg tracking-tight">AI 原理教室</Link>
        <button onClick={() => setOpen(!open)} aria-label="菜单" className="p-2">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 top-14 bg-paper border-b border-line overflow-auto pb-8">
          <NavItems onClick={() => setOpen(false)} />
        </div>
      )}

      {/* 桌面端固定侧边栏 */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[300px] flex-col border-r border-line bg-sidebar z-30">
        <Link to="/" className="px-5 pt-8 pb-6 block">
          <div className="font-display text-[26px] font-bold leading-tight tracking-tight text-ink">AI 原理教室</div>
          <div className="font-mono2 text-[10px] tracking-[0.18em] text-ink-3 mt-1.5 uppercase">How AI Actually Works</div>
        </Link>
        <div className="h-px bg-line mx-5 mb-4" />
        <div className="flex-1 overflow-auto pb-6">
          <NavItems />
        </div>
        <div className="px-5 py-4 border-t border-line">
          <p className="text-[11px] leading-relaxed text-ink-3">
            内容基准：d2l.ai · Understanding Deep Learning · 3Blue1Brown · The Illustrated Transformer
          </p>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="lg:pl-[300px]">
        <div className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
          {children}
        </div>
      </main>
    </div>
  )
}
