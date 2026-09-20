import { Link } from 'react-router'
import { NAV } from '../components/Layout'

/** 全景图：一个 AI 模型的一生（推理 + 训练两条线） */
function PanoramaDiagram() {
  const box = (x: number, y: number, w: number, label: string, sub: string, accent = false) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={52} rx={3} fill={accent ? 'hsl(345 68% 53%)' : 'white'} stroke="hsl(0 0% 4%)" strokeWidth={1.2} />
      <text x={x + w / 2} y={y + 23} textAnchor="middle" fontSize={13} fontWeight={600} fill={accent ? 'white' : 'hsl(0 0% 4%)'}>{label}</text>
      <text x={x + w / 2} y={y + 40} textAnchor="middle" fontSize={10} fill={accent ? 'hsl(0 0% 98% / 0.85)' : 'hsl(0 0% 42%)'}>{sub}</text>
    </g>
  )
  const arrow = (x1: number, y1: number, x2: number, y2: number, label?: string) => (
    <g key={`${x1}-${y1}-${x2}`}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#arr)" />
      {label && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} textAnchor="middle" fontSize={10} fill="hsl(0 0% 42%)">{label}</text>}
    </g>
  )
  return (
    <svg viewBox="0 0 760 360" className="w-full" role="img" aria-label="AI 全景图">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="hsl(0 0% 4%)" />
        </marker>
        <marker id="arrR" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="hsl(345 68% 53%)" />
        </marker>
      </defs>

      <text x={20} y={24} fontSize={11} fontWeight={700} fill="hsl(0 0% 4%)" letterSpacing={2}>使用时（推理 INFERENCE）</text>
      {box(20, 40, 110, '输入', '文字 / 图片')}
      {box(160, 40, 110, '切分 + 嵌入', '变成数字向量')}
      {box(300, 40, 130, '神经网络', '几十层数学变换')}
      {box(460, 40, 110, '输出概率', '每个答案的可能')}
      {box(600, 40, 110, '答案', '挑一个输出', true)}
      {arrow(130, 66, 160, 66)}
      {arrow(270, 66, 300, 66)}
      {arrow(430, 66, 460, 66)}
      {arrow(570, 66, 600, 66)}

      <text x={20} y={140} fontSize={11} fontWeight={700} fill="hsl(345 68% 53%)" letterSpacing={2}>训练时（TRAINING）—— 模型是这样“学会”的</text>
      {box(20, 158, 110, '海量数据', '书籍 / 网页')}
      {box(160, 158, 110, '预测', '猜下一个词')}
      {box(300, 158, 110, '对照答案', '算损失')}
      {box(440, 158, 130, '反向传播', '算谁错了多少')}
      {box(600, 158, 110, '更新权重', '参数微调')}
      {arrow(130, 184, 160, 184)}
      {arrow(270, 184, 300, 184)}
      {arrow(410, 184, 440, 184)}
      {arrow(570, 184, 600, 184)}
      {/* 循环回边 */}
      <path d="M 655 210 C 655 268, 215 268, 215 214" fill="none" stroke="hsl(345 68% 53%)" strokeWidth={1.4} strokeDasharray="5 4" markerEnd="url(#arrR)" />
      <text x={435} y={288} textAnchor="middle" fontSize={10.5} fill="hsl(345 68% 53%)">重复数万亿次，直到猜得足够准</text>

      <text x={20} y={330} fontSize={11} fill="hsl(0 0% 42%)">
        训练完成后，权重被“冻结”，就变成上面那条推理流水线 —— 你日常用的 AI 只是在使用它，不再学习。
      </text>
    </svg>
  )
}

export default function Home() {
  return (
    <div>
      <header className="mb-14">
        <div className="font-mono2 text-[12px] tracking-[0.2em] text-accent uppercase mb-5">Orientation · 写给零基础的你</div>
        <h1 className="font-display text-[40px] sm:text-[56px] font-bold leading-[1.1] tracking-tight text-ink">
          AI 到底是怎么<br />“想”出来的？
        </h1>
        <p className="mt-6 text-[16px] leading-[1.9] text-ink-2 max-w-[620px]">
          这是一份完整的、不需要任何前置知识的 AI 原理教学。读完后，你会理解今天所有主流 AI——
          从 ChatGPT 到图像生成——背后的共同原理：神经网络、注意力、训练与推理。
          没有黑话轰炸，每个名词都配图解。
        </p>
      </header>

      <section className="border border-line bg-card rounded p-6 sm:p-8 mb-14">
        <h2 className="font-display text-xl font-bold mb-2">一张图看懂 AI 的两条流水线</h2>
        <p className="text-[13px] text-ink-3 mb-6">整个网站就是这张图逐格放大后的样子。</p>
        <PanoramaDiagram />
      </section>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-6">怎么用这份教材</h2>
        <ol className="space-y-4 text-[15px] leading-[1.9] text-ink-2 list-none pl-0">
          <li className="flex gap-4">
            <span className="font-mono2 text-accent font-bold shrink-0">1.</span>
            <span><strong>按顺序读第 1–2 章。</strong>它们建立最核心的直觉：什么是神经网络、它是怎么“学”的。这两章是全站的地基。</span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono2 text-accent font-bold shrink-0">2.</span>
            <span><strong>遇到不懂的名词，随时跳到词典。</strong>词典收录 40+ 个主流关键名词，每个都有一句话定义、通俗类比和图解。</span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono2 text-accent font-bold shrink-0">3.</span>
            <span><strong>第 4–5 章深入架构与原理。</strong>读完前两章后，去看 CNN、Transformer、扩散模型各自长什么样，以及注意力机制一步步在算什么。</span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono2 text-accent font-bold shrink-0">4.</span>
            <span><strong>最后用第 6 章的资源继续深入。</strong>那里列出了业界公认的权威教材与课程，全部免费。</span>
          </li>
        </ol>
      </section>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-6">章节</h2>
        <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
          {NAV.filter((n) => n.to !== '/').map((n) => (
            <Link key={n.to} to={n.to} className="group bg-card p-6 hover:bg-ink transition-colors">
              <div className="font-mono2 text-[11px] text-ink-3 group-hover:text-white/60">{n.num} · {n.en}</div>
              <div className="font-display text-lg font-bold mt-2 text-ink group-hover:text-white">{n.zh}</div>
              <div className="font-mono2 text-[11px] mt-3 text-ink-3 group-hover:text-white/60">→</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border border-line bg-card rounded p-6">
        <h3 className="font-bold text-[15px] mb-3">关于这份教材</h3>
        <p className="text-[13.5px] leading-[1.9] text-ink-2">
          内容以《动手学深度学习》(d2l.ai)、Simon Prince《Understanding Deep Learning》、
          3Blue1Brown 神经网络系列、Jay Alammar《The Illustrated Transformer》等业界公认教材为准确性基准，
          重新改写为零基础可读的中文；所有图解为本站手绘矢量图，不依赖外部图片。
          它是学习地图，不是终点——每个章节末尾都附有继续深入的方向。
        </p>
      </section>
    </div>
  )
}
