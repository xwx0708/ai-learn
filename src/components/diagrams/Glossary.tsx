/** 词典内嵌迷你图解 */
export function VizEmbedding() {
  const words = [
    { x: 490, y: 70, w: '国王' }, { x: 520, y: 110, w: '女王' }, { x: 455, y: 105, w: '王子' },
    { x: 150, y: 190, w: '土豆' }, { x: 120, y: 150, w: '红薯' },
    { x: 330, y: 60, w: '巴黎' }, { x: 360, y: 100, w: '伦敦' },
  ]
  return (
    <svg viewBox="0 0 640 240" className="w-full">
      <line x1={40} y1={200} x2={600} y2={200} stroke="hsl(0 0% 88%)" />
      <line x1={40} y1={200} x2={40} y2={20} stroke="hsl(0 0% 88%)" />
      <ellipse cx={490} cy={98} rx={95} ry={55} fill="none" stroke="hsl(345 68% 53%)" strokeDasharray="4 3" />
      <text x={490} y={30} textAnchor="middle" fontSize={10.5} fill="hsl(345 68% 53%)">王室聚成一族</text>
      <ellipse cx={345} cy={82} rx={70} ry={45} fill="none" stroke="hsl(0 0% 60%)" strokeDasharray="4 3" />
      <ellipse cx={138} cy={172} rx={70} ry={42} fill="none" stroke="hsl(0 0% 60%)" strokeDasharray="4 3" />
      {words.map((p) => (
        <g key={p.w}>
          <circle cx={p.x} cy={p.y} r={4} fill="hsl(0 0% 4%)" />
          <text x={p.x + 9} y={p.y + 4} fontSize={12} fontWeight={600}>{p.w}</text>
        </g>
      ))}
      <text x={320} y={228} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">嵌入空间（这里把上千维压成 2 维展示）：意思近 → 距离近</text>
    </svg>
  )
}

export function VizConvolution() {
  const cell = 26
  const grid = (ox: number, oy: number, n: number, hl?: [number, number]) => (
    <g>
      {Array.from({ length: n * n }, (_, i) => {
        const r = Math.floor(i / n), c = i % n
        const on = hl && r >= hl[0] && r < hl[0] + 3 && c >= hl[1] && c < hl[1] + 3
        return <rect key={i} x={ox + c * cell} y={oy + r * cell} width={cell} height={cell}
          fill={on ? 'hsl(345 68% 53% / 0.18)' : 'white'} stroke="hsl(0 0% 75%)" strokeWidth={0.8} />
      })}
      {hl && <rect x={ox + hl[1] * cell} y={oy + hl[0] * cell} width={3 * cell} height={3 * cell}
        fill="none" stroke="hsl(345 68% 53%)" strokeWidth={2} />}
    </g>
  )
  return (
    <svg viewBox="0 0 640 240" className="w-full">
      <text x={85} y={26} textAnchor="middle" fontSize={11.5} fontWeight={600}>输入图片（像素）</text>
      {grid(20, 40, 6, [1, 1])}
      <text x={212} y={120} fontSize={18} fill="hsl(0 0% 4%)">⊛</text>
      <text x={278} y={26} textAnchor="middle" fontSize={11.5} fontWeight={600}>卷积核 3×3</text>
      {grid(240, 70, 3)}
      <text x={212} y={150} fontSize={10.5} fill="hsl(0 0% 42%)" textAnchor="middle">逐格滑动，窗口与核做点积</text>
      <text x={360} y={120} fontSize={16} fill="hsl(0 0% 4%)">=</text>
      <text x={470} y={26} textAnchor="middle" fontSize={11.5} fontWeight={600}>输出特征图</text>
      {grid(430, 60, 4)}
      <rect x={430 + cell} y={60 + cell} width={cell} height={cell} fill="hsl(345 68% 53%)" opacity={0.85} />
      <text x={320} y={222} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">红窗与卷积核点积 → 红格。滑完整张图就得到一张"哪里有该特征"的地图</text>
    </svg>
  )
}

export function VizSelfAttention() {
  const words = ['它', '尝', '起', '来', '很', '甜', '，', '因为', '苹果', '很', '新鲜']
  const ys = 60
  return (
    <svg viewBox="0 0 640 220" className="w-full">
      {words.map((w, i) => (
        <g key={i}>
          <rect x={20 + i * 55} y={ys} width={46} height={34} rx={3}
            fill={i === 0 ? 'hsl(345 68% 53%)' : i === 8 ? 'hsl(0 0% 4%)' : 'white'}
            stroke="hsl(0 0% 4%)" strokeWidth={1.1} />
          <text x={43 + i * 55} y={ys + 22} textAnchor="middle" fontSize={12.5}
            fill={i === 0 || i === 8 ? 'white' : 'hsl(0 0% 4%)'} fontWeight={i === 0 || i === 8 ? 700 : 400}>{w}</text>
        </g>
      ))}
      <path d="M 43 94 C 43 150, 463 150, 463 98" fill="none" stroke="hsl(345 68% 53%)" strokeWidth={2.4} markerEnd="url(#sa-arr)" />
      <path d="M 43 94 C 43 140, 298 145, 298 98" fill="none" stroke="hsl(0 0% 60%)" strokeWidth={1.1} markerEnd="url(#sa-arr)" />
      <path d="M 43 94 C 43 130, 153 132, 153 98" fill="none" stroke="hsl(0 0% 75%)" strokeWidth={1} markerEnd="url(#sa-arr)" />
      <text x={253} y={168} textAnchor="middle" fontSize={11.5} fill="hsl(345 68% 53%)" fontWeight={600}>「它」高度关注「苹果」（粗线 = 注意力权重大）</text>
      <text x={253} y={188} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">每个词都向所有词打分，再按分数加权吸收信息 —— 这就是自注意力</text>
      <defs>
        <marker id="sa-arr" markerWidth="7" markerHeight="7" refX="6" refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 0% 40%)" />
        </marker>
      </defs>
    </svg>
  )
}

export function VizSoftmax() {
  const rows = [
    { w: '"苹果"', s: 4.2, p: 0.86 },
    { w: '"香蕉"', s: 2.1, p: 0.11 },
    { w: '"汽车"', s: 0.5, p: 0.02 },
    { w: '"的"', s: 0.2, p: 0.01 },
  ]
  return (
    <svg viewBox="0 0 640 210" className="w-full">
      {rows.map((r, i) => (
        <g key={r.w}>
          <text x={70} y={48 + i * 44} fontSize={12.5} textAnchor="end">{r.w}</text>
          <rect x={90} y={34 + i * 44} width={r.s * 40} height={18} fill="hsl(0 0% 80%)" />
          <text x={96 + r.s * 40} y={48 + i * 44} fontSize={11} fill="hsl(0 0% 42%)">logit {r.s}</text>
          <text x={300} y={48 + i * 44} fontSize={13} fill="hsl(0 0% 42%)">→</text>
          <rect x={330} y={34 + i * 44} width={r.p * 260} height={18} fill={i === 0 ? 'hsl(345 68% 53%)' : 'hsl(0 0% 4%)'} opacity={i === 0 ? 1 : 0.75} />
          <text x={336 + r.p * 260} y={48 + i * 44} fontSize={11.5} fontWeight={600}>{(r.p * 100).toFixed(0)}%</text>
        </g>
      ))}
      <text x={320} y={200} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">原始分数（logits）→ Softmax → 概率（总和 = 100%），差距被指数放大</text>
    </svg>
  )
}

export function VizTransformerBlock() {
  const layer = (y: number, label: string, sub: string, accent = false) => (
    <g key={label}>
      <rect x={210} y={y} width={220} height={40} rx={3} fill={accent ? 'hsl(345 68% 53%)' : 'white'} stroke="hsl(0 0% 4%)" strokeWidth={1.2} />
      <text x={320} y={y + 18} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={accent ? 'white' : 'hsl(0 0% 4%)'}>{label}</text>
      <text x={320} y={y + 33} textAnchor="middle" fontSize={9.5} fill={accent ? 'hsl(0 0% 98% / 0.8)' : 'hsl(0 0% 42%)'}>{sub}</text>
    </g>
  )
  return (
    <svg viewBox="0 0 640 330" className="w-full">
      <defs>
        <marker id="tb-arr" markerWidth="7" markerHeight="7" refX="6" refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      <rect x={180} y={30} width={280} height={268} rx={4} fill="none" stroke="hsl(0 0% 4%)" strokeWidth={1.4} strokeDasharray="6 4" />
      <text x={320} y={22} textAnchor="middle" fontSize={11} fontWeight={700}>一个 Transformer 块 × 重复几十层</text>
      {layer(48, '多头自注意力', '词与词交换信息', true)}
      {layer(104, '残差 + 层归一化', '稳住信号')}
      {layer(160, '前馈网络 MLP', '每个词独立消化')}
      {layer(216, '残差 + 层归一化', '稳住信号')}
      <line x1={320} y1={88} x2={320} y2={104} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#tb-arr)" />
      <line x1={320} y1={144} x2={320} y2={160} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#tb-arr)" />
      <line x1={320} y1={200} x2={320} y2={216} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#tb-arr)" />
      <text x={500} y={75} fontSize={11} fill="hsl(0 0% 42%)">每个位置都与</text>
      <text x={500} y={91} fontSize={11} fill="hsl(0 0% 42%)">所有位置对话</text>
      <text x={500} y={180} fontSize={11} fill="hsl(0 0% 42%)">存储"事实知识"</text>
      <text x={500} y={196} fontSize={11} fill="hsl(0 0% 42%)">的主要场所</text>
    </svg>
  )
}

export const TERM_VIZ: Record<string, () => React.ReactElement> = {
  embedding: VizEmbedding,
  convolution: VizConvolution,
  'self-attention': VizSelfAttention,
  softmax: VizSoftmax,
  transformer: VizTransformerBlock,
}
