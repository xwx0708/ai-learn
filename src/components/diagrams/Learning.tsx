/** 梯度下降：损失地形上的小球 */
export function GradientDescentDiagram() {
  // 一条"山谷"曲线
  const path = (() => {
    let d = ''
    for (let i = 0; i <= 300; i++) {
      const x = 30 + i * 1.9
      const t = i / 300
      const y = 200 - Math.exp(-Math.pow((t - 0.62) * 4.2, 2)) * 150 + Math.sin(t * 9) * 8
      d += (i === 0 ? 'M' : 'L') + ` ${x.toFixed(1)} ${y.toFixed(1)}`
    }
    return d
  })()
  const ball = (t: number) => {
    const x = 30 + t * 300 * 1.9
    const y = 200 - Math.exp(-Math.pow((t - 0.62) * 4.2, 2)) * 150 + Math.sin(t * 9) * 8
    return { x, y }
  }
  const steps = [0.12, 0.25, 0.38, 0.5, 0.585].map(ball)
  return (
    <svg viewBox="0 0 640 280" className="w-full" role="img" aria-label="梯度下降示意图">
      <path d={path} fill="none" stroke="hsl(0 0% 4%)" strokeWidth={2} />
      {steps.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y - 10} r={9} fill={i === steps.length - 1 ? 'hsl(345 68% 53%)' : 'white'} stroke="hsl(0 0% 4%)" strokeWidth={1.5} />
          <text x={p.x} y={p.y - 26} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">{i === 0 ? '随机起点' : i === steps.length - 1 ? '谷底' : `第 ${i} 步`}</text>
        </g>
      ))}
      <text x={320} y={255} textAnchor="middle" fontSize={11.5} fill="hsl(0 0% 42%)">横轴：某个参数的取值 ｜ 纵轴：损失（越低越好）。每一步都朝"更下坡"的方向挪一小步。</text>
    </svg>
  )
}

/** 训练三轮流水线 */
export function TrainingLoopDiagram() {
  const step = (x: number, n: string, title: string, sub: string, accent = false) => (
    <g key={n}>
      <rect x={x} y={40} width={130} height={64} rx={3} fill={accent ? 'hsl(345 68% 53%)' : 'white'} stroke="hsl(0 0% 4%)" strokeWidth={1.3} />
      <text x={x + 65} y={63} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={accent ? 'white' : 'hsl(0 0% 4%)'}>{n} {title}</text>
      <text x={x + 65} y={84} textAnchor="middle" fontSize={10} fill={accent ? 'hsl(0 0% 98% / 0.8)' : 'hsl(0 0% 42%)'}>{sub}</text>
    </g>
  )
  const arrow = (x: number) => (
    <line key={x} x1={x} y1={72} x2={x + 24} y2={72} stroke="hsl(0 0% 4%)" strokeWidth={1.3} markerEnd="url(#tarr)" />
  )
  return (
    <svg viewBox="0 0 640 200" className="w-full" role="img" aria-label="训练循环">
      <defs>
        <marker id="tarr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      {step(10, '①', '前向传播', '算预测 → 算损失')}
      {arrow(140)}
      {step(164, '②', '反向传播', '算每个参数的梯度')}
      {arrow(294)}
      {step(318, '③', '更新参数', '梯度 × 学习率', true)}
      <path d="M 383 104 C 383 158, 75 158, 75 108" fill="none" stroke="hsl(345 68% 53%)" strokeWidth={1.3} strokeDasharray="5 4" markerEnd="url(#tarr)" />
      <text x={230} y={172} textAnchor="middle" fontSize={11} fill="hsl(345 68% 53%)">换下一批数据，循环数万到数万亿次</text>
      {step(492, '', '结果', '损失稳步下降')}
      {arrow(448)}
    </svg>
  )
}

/** 过拟合曲线 */
export function OverfitDiagram() {
  const train = (() => {
    let d = ''
    for (let i = 0; i <= 200; i++) {
      const x = 50 + i * 2.6
      const y = 180 - 130 * (1 - Math.exp(-i / 55))
      d += (i === 0 ? 'M' : 'L') + ` ${x.toFixed(1)} ${y.toFixed(1)}`
    }
    return d
  })()
  const val = (() => {
    let d = ''
    for (let i = 0; i <= 200; i++) {
      const x = 50 + i * 2.6
      const drop = 105 * (1 - Math.exp(-i / 45))
      const rise = i > 80 ? (i - 80) * 0.35 : 0
      const y = 180 - drop + rise
      d += (i === 0 ? 'M' : 'L') + ` ${x.toFixed(1)} ${y.toFixed(1)}`
    }
    return d
  })()
  return (
    <svg viewBox="0 0 640 240" className="w-full" role="img" aria-label="过拟合曲线">
      <line x1={50} y1={180} x2={590} y2={180} stroke="hsl(0 0% 80%)" />
      <line x1={50} y1={20} x2={50} y2={180} stroke="hsl(0 0% 80%)" />
      <path d={train} fill="none" stroke="hsl(0 0% 4%)" strokeWidth={2.2} />
      <path d={val} fill="none" stroke="hsl(345 68% 53%)" strokeWidth={2.2} strokeDasharray="6 4" />
      <line x1={258} y1={20} x2={258} y2={180} stroke="hsl(0 0% 60%)" strokeDasharray="3 3" />
      <text x={258} y={14} textAnchor="middle" fontSize={11} fill="hsl(0 0% 42%)">最佳停点</text>
      <text x={500} y={60} fontSize={11.5} fill="hsl(0 0% 4%)" fontWeight={600}>— 训练损失：还在降</text>
      <text x={392} y={150} fontSize={11.5} fill="hsl(345 68% 53%)" fontWeight={600}>-- 验证损失：掉头上升 = 过拟合</text>
      <text x={320} y={225} textAnchor="middle" fontSize={11.5} fill="hsl(0 0% 42%)">横轴：训练时长 ｜ 纵轴：损失</text>
    </svg>
  )
}
