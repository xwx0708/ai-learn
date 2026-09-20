/** 一个神经元的解剖图 */
export function NeuronDiagram() {
  const inputs = [
    { y: 50, label: 'x₁', w: 'w₁ = 0.7', v: '0.8' },
    { y: 130, label: 'x₂', w: 'w₂ = -0.4', v: '0.5' },
    { y: 210, label: 'x₃', w: 'w₃ = 0.9', v: '1.0' },
  ]
  return (
    <svg viewBox="0 0 720 280" className="w-full" role="img" aria-label="神经元结构图">
      <defs>
        <marker id="narr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      {inputs.map((inp) => (
        <g key={inp.label}>
          <circle cx={60} cy={inp.y} r={24} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.4} />
          <text x={60} y={inp.y + 5} textAnchor="middle" fontSize={14} fontWeight={600}>{inp.label}</text>
          <text x={60} y={inp.y + 42} textAnchor="middle" fontSize={11} fill="hsl(0 0% 42%)">值 {inp.v}</text>
          <line x1={84} y1={inp.y} x2={270} y2={140} stroke="hsl(0 0% 4%)" strokeWidth={1.4} markerEnd="url(#narr)" />
          <rect x={140} y={inp.y === 130 ? 108 : inp.y < 130 ? inp.y + 2 : inp.y - 28} width={86} height={24} rx={3} fill="hsl(0 0% 96%)" stroke="hsl(0 0% 90%)" />
          <text x={183} y={(inp.y === 130 ? 108 : inp.y < 130 ? inp.y + 2 : inp.y - 28) + 16} textAnchor="middle" fontSize={11.5} fill="hsl(345 68% 53%)" fontWeight={600}>{inp.w}</text>
        </g>
      ))}
      <circle cx={320} cy={140} r={52} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.6} />
      <text x={320} y={128} textAnchor="middle" fontSize={13} fontWeight={700}>Σ 加权求和</text>
      <text x={320} y={148} textAnchor="middle" fontSize={11} fill="hsl(0 0% 42%)">+ 偏置 b</text>
      <text x={320} y={166} textAnchor="middle" fontSize={11} fill="hsl(0 0% 42%)">再进激活函数</text>
      <line x1={372} y1={140} x2={480} y2={140} stroke="hsl(0 0% 4%)" strokeWidth={1.4} markerEnd="url(#narr)" />
      <rect x={480} y={112} width={150} height={56} rx={3} fill="hsl(0 0% 4%)" />
      <text x={555} y={135} textAnchor="middle" fontSize={13} fontWeight={600} fill="white">输出 y = 0.83</text>
      <text x={555} y={153} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 98% / 0.7)">一个 0~1 之间的数</text>
      <text x={30} y={262} fontSize={11.5} fill="hsl(0 0% 42%)">y = 激活函数( x₁·w₁ + x₂·w₂ + x₃·w₃ + b ) —— 一个神经元的全部工作</text>
    </svg>
  )
}

/** 三层网络结构图 */
export function NetworkDiagram() {
  const layers = [
    { x: 70, n: 4, name: '输入层', sub: '784 个像素值' },
    { x: 260, n: 5, name: '隐藏层 1', sub: '学边缘、拐角' },
    { x: 450, n: 5, name: '隐藏层 2', sub: '学形状、部件' },
    { x: 640, n: 3, name: '输出层', sub: '0~9 哪个数字' },
  ]
  const ys = (n: number) => Array.from({ length: n }, (_, i) => 60 + (i * 220) / (n - 1))
  return (
    <svg viewBox="0 0 720 340" className="w-full" role="img" aria-label="神经网络层结构">
      {layers.slice(0, -1).map((l, li) => {
        const next = layers[li + 1]
        return ys(l.n).map((y1) =>
          ys(next.n).map((y2) => (
            <line key={`${li}-${y1}-${y2}`} x1={l.x} y1={y1} x2={next.x} y2={y2} stroke="hsl(0 0% 88%)" strokeWidth={1} />
          ))
        )
      })}
      {layers.map((l) =>
        ys(l.n).map((y) => (
          <circle key={`${l.x}-${y}`} cx={l.x} cy={y} r={13} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.3} />
        ))
      )}
      {layers.map((l) => (
        <g key={l.name}>
          <text x={l.x} y={310} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="hsl(0 0% 4%)">{l.name}</text>
          <text x={l.x} y={328} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">{l.sub}</text>
        </g>
      ))}
      <text x={355} y={24} textAnchor="middle" fontSize={11.5} fill="hsl(0 0% 42%)">每条连线都是一个权重 w —— 这张图里有几千个</text>
    </svg>
  )
}

/** 激活函数曲线 */
export function ActivationPlots() {
  const reluPath = 'M 20 110 L 130 110 L 240 20'
  const sigmoidPath = (() => {
    let d = ''
    for (let i = 0; i <= 220; i++) {
      const x = 20 + i
      const t = (i / 220) * 12 - 6
      const y = 110 - (1 / (1 + Math.exp(-t))) * 90
      d += (i === 0 ? 'M' : 'L') + ` ${x} ${y.toFixed(1)}`
    }
    return d
  })()
  const Plot = ({ title, path, note }: { title: string; path: string; note: string }) => (
    <div className="border border-line bg-card rounded p-4">
      <svg viewBox="0 0 260 130" className="w-full">
        <line x1={20} y1={110} x2={240} y2={110} stroke="hsl(0 0% 90%)" />
        <line x1={130} y1={10} x2={130} y2={110} stroke="hsl(0 0% 90%)" />
        <path d={path} fill="none" stroke="hsl(345 68% 53%)" strokeWidth={2.2} />
      </svg>
      <div className="text-[13px] font-bold mt-1">{title}</div>
      <div className="text-[11.5px] text-ink-3 leading-relaxed">{note}</div>
    </div>
  )
  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      <Plot title="ReLU：负数归零，正数原样通过" path={reluPath} note="现代网络的默认选择。简单、快、不易出数值问题。" />
      <Plot title="Sigmoid：把任何数压进 0~1" path={sigmoidPath} note="早期常用，现在主要用于输出概率的最后一层。" />
    </div>
  )
}

/** 特征层次：边缘 → 形状 → 物体 */
export function HierarchyDiagram() {
  const col = (x: number, title: string, items: string[], sub: string) => (
    <g key={title}>
      <rect x={x} y={30} width={200} height={210} rx={3} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.2} />
      <text x={x + 100} y={58} textAnchor="middle" fontSize={13} fontWeight={700}>{title}</text>
      {items.map((it, i) => (
        <g key={it}>
          <rect x={x + 30} y={78 + i * 44} width={140} height={32} rx={2} fill="hsl(0 0% 96%)" stroke="hsl(0 0% 88%)" />
          <text x={x + 100} y={99 + i * 44} textAnchor="middle" fontSize={12}>{it}</text>
        </g>
      ))}
      <text x={x + 100} y={228} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">{sub}</text>
    </g>
  )
  const arrow = (x: number) => (
    <path d={`M ${x} 135 L ${x + 36} 135`} stroke="hsl(0 0% 4%)" strokeWidth={1.4} markerEnd="url(#harr)" />
  )
  return (
    <svg viewBox="0 0 720 260" className="w-full" role="img" aria-label="特征层次图">
      <defs>
        <marker id="harr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      {col(20, '浅层', ['— 横线', '╱ 斜线', '⌒ 弧线'], '像素 → 边缘')}
      {arrow(224)}
      {col(260, '中层', ['◠ 眼睛轮廓', '▲ 鼻尖', '∿ 嘴角'], '边缘 → 部件')}
      {arrow(464)}
      {col(500, '深层', ['☺ 人脸', '✿ 猫', '⌂ 房子'], '部件 → 完整概念')}
    </svg>
  )
}
