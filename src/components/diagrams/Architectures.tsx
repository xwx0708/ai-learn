/** 架构页图解 */

export function ArchTimeline() {
  const items = [
    { y: '1958', t: '感知机', d: '第一个可学习的神经元' },
    { y: '1986', t: '反向传播普及', d: '深层网络可以训练了' },
    { y: '1998', t: 'LeNet', d: 'CNN 识别手写数字' },
    { y: '2012', t: 'AlexNet', d: '深度学习革命爆发' },
    { y: '2014', t: 'GAN / 注意力', d: '生成与对齐的新思路' },
    { y: '2015', t: 'ResNet', d: '残差连接，百层网络' },
    { y: '2017', t: 'Transformer', d: '注意力即一切' },
    { y: '2020', t: 'GPT-3 / 扩散', d: '规模与生成的新时代' },
    { y: '2022+', t: 'ChatGPT / MoE / Agent', d: '大模型时代' },
  ]
  return (
    <svg viewBox="0 0 720 250" className="w-full">
      <line x1={40} y1={125} x2={700} y2={125} stroke="hsl(0 0% 4%)" strokeWidth={1.4} />
      {items.map((it, i) => {
        const x = 60 + i * 78
        const up = i % 2 === 0
        return (
          <g key={it.y}>
            <line x1={x} y1={125} x2={x} y2={up ? 72 : 178} stroke="hsl(0 0% 70%)" />
            <circle cx={x} cy={125} r={4.5} fill={i >= 6 ? 'hsl(345 68% 53%)' : 'hsl(0 0% 4%)'} />
            <text x={x} y={up ? 30 : 226} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="hsl(0 0% 4%)">{it.y}</text>
            <text x={x} y={up ? 62 : 194} textAnchor="middle" fontSize={10.5} fontWeight={600} fill="hsl(345 68% 53%)">{it.t}</text>
            <text x={x} y={up ? 46 : 210} fontSize={9.5} fill="hsl(0 0% 42%)" textAnchor="middle">{it.d}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** CNN 流水线：卷积 → 池化 → 分类 */
export function CNNDiagram() {
  const feat = (x: number, n: number, size: number) => (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x - i * 7} y={110 - size / 2 - i * 7} width={size} height={size} rx={2}
          fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.1} />
      ))}
    </g>
  )
  return (
    <svg viewBox="0 0 720 240" className="w-full">
      <defs>
        <marker id="cn-arr" markerWidth="7" markerHeight="7" refX="6" refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      <rect x={30} y={60} width={100} height={100} rx={3} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.3} />
      <text x={80} y={115} textAnchor="middle" fontSize={24}>🐱</text>
      <text x={80} y={185} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">输入图片</text>
      <line x1={140} y1={110} x2={185} y2={110} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#cn-arr)" />
      <text x={162} y={98} textAnchor="middle" fontSize={9.5} fill="hsl(0 0% 42%)">卷积</text>
      {feat(240, 4, 96)}
      <text x={240} y={230} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">特征图 ×32：边缘/纹理</text>
      <line x1={290} y1={110} x2={335} y2={110} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#cn-arr)" />
      <text x={312} y={98} textAnchor="middle" fontSize={9.5} fill="hsl(0 0% 42%)">卷积+池化</text>
      {feat(390, 4, 56)}
      <text x={390} y={230} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">特征图 ×64：部件/形状</text>
      <line x1={430} y1={110} x2={475} y2={110} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#cn-arr)" />
      <text x={452} y={98} textAnchor="middle" fontSize={9.5} fill="hsl(0 0% 42%)">展平</text>
      {[70, 100, 130, 160].map((y) => (
        <circle key={y} cx={510} cy={y} r={9} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.1} />
      ))}
      <text x={510} y={230} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">全连接层</text>
      <line x1={525} y1={115} x2={565} y2={115} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#cn-arr)" />
      <rect x={570} y={80} width={120} height={70} rx={3} fill="hsl(0 0% 4%)" />
      <text x={630} y={106} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="white">猫 92%</text>
      <text x={630} y={126} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 98% / 0.7)">狗 6% · 其他 2%</text>
    </svg>
  )
}

/** RNN 展开图 */
export function RNNDiagram() {
  const steps = ['我', '爱', '深', '度', '学', '习']
  return (
    <svg viewBox="0 0 720 230" className="w-full">
      <defs>
        <marker id="rn-arr" markerWidth="7" markerHeight="7" refX="6" refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      {steps.map((w, i) => {
        const x = 60 + i * 110
        return (
          <g key={i}>
            <rect x={x} y={90} width={60} height={60} rx={30} fill={i === 3 ? 'hsl(345 68% 53% / 0.12)' : 'white'} stroke="hsl(0 0% 4%)" strokeWidth={1.4} />
            <text x={x + 30} y={126} textAnchor="middle" fontSize={14} fontWeight={700}>A</text>
            <text x={x + 30} y={78} textAnchor="middle" fontSize={12.5} fontWeight={600}>{w}</text>
            <line x1={x + 30} y1={82} x2={x + 30} y2={88} stroke="hsl(0 0% 4%)" strokeWidth={1} markerEnd="url(#rn-arr)" />
            <text x={x + 30} y={180} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">h{i}（记忆）</text>
            {i < steps.length - 1 && (
              <line x1={x + 60} y1={120} x2={x + 110} y2={120} stroke="hsl(345 68% 53%)" strokeWidth={1.6} markerEnd="url(#rn-arr)" />
            )}
          </g>
        )
      })}
      <text x={360} y={215} textAnchor="middle" fontSize={11} fill="hsl(0 0% 42%)">同一个单元 A 按时间步复用；红色连线 = 记忆传递。问题：传到后面，前面的记忆已经模糊了。</text>
    </svg>
  )
}

/** 扩散模型：加噪与去噪 */
export function DiffusionDiagram() {
  const frame = (x: number, noise: number, label: string) => (
    <g key={label}>
      <rect x={x} y={60} width={86} height={86} rx={3} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.2} />
      {noise >= 1 ? (
        <text x={x + 43} y={110} textAnchor="middle" fontSize={26}>🐱</text>
      ) : (
        Array.from({ length: Math.round((1 - noise) * 60 + 14) }, (_, i) => (
          <circle key={i} cx={x + 8 + ((i * 37) % 70)} cy={68 + ((i * 53) % 70)} r={1.6 + (1 - noise) * 1.2} fill="hsl(0 0% 45%)" />
        ))
      )}
      {noise === 0.5 && <text x={x + 43} y={112} textAnchor="middle" fontSize={22} opacity={0.5}>🐱</text>}
      <text x={x + 43} y={168} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">{label}</text>
    </g>
  )
  return (
    <svg viewBox="0 0 720 230" className="w-full">
      <defs>
        <marker id="df-arr" markerWidth="7" markerHeight="7" refX="6" refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      {frame(40, 1, '真实图片')}
      {frame(190, 0.5, '加点噪')}
      {frame(340, 0.15, '很多噪')}
      {frame(490, 0, '纯噪声')}
      {[126, 276, 426].map((x) => (
        <line key={x} x1={x} y1={103} x2={x + 60} y2={103} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#df-arr)" />
      ))}
      <text x={320} y={30} textAnchor="middle" fontSize={11.5} fontWeight={600}>训练：让模型学会逆转这条"加噪链"</text>
      <path d="M 533 190 C 533 215, 83 215, 83 190" fill="none" stroke="hsl(345 68% 53%)" strokeWidth={1.6} markerEnd="url(#df-arr)" />
      <text x={320} y={222} textAnchor="middle" fontSize={11} fill="hsl(345 68% 53%)" fontWeight={600}>生成：从纯噪声出发，每步去一点噪，几十步后一张新图诞生（方向反过来）</text>
    </svg>
  )
}

/** MoE 路由 */
export function MoEDiagram() {
  const experts = [0, 1, 2, 3, 4, 5]
  return (
    <svg viewBox="0 0 720 260" className="w-full">
      <defs>
        <marker id="moe-arr" markerWidth="7" markerHeight="7" refX="6" refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      <rect x={40} y={100} width={110} height={60} rx={3} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.3} />
      <text x={95} y={125} textAnchor="middle" fontSize={12.5} fontWeight={600}>token</text>
      <text x={95} y={143} textAnchor="middle" fontSize={10} fill="hsl(0 0% 42%)">「金融危机」</text>
      <rect x={230} y={100} width={110} height={60} rx={3} fill="hsl(0 0% 4%)" />
      <text x={285} y={125} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="white">路由器</text>
      <text x={285} y={143} textAnchor="middle" fontSize={10} fill="hsl(0 0% 98% / 0.7)">选 Top-2 专家</text>
      <line x1={150} y1={130} x2={228} y2={130} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#moe-arr)" />
      {experts.map((i) => {
        const y = 30 + i * 40
        const active = i === 1 || i === 3
        return (
          <g key={i}>
            <line x1={340} y1={130} x2={430} y2={y + 18} stroke={active ? 'hsl(345 68% 53%)' : 'hsl(0 0% 85%)'} strokeWidth={active ? 1.8 : 1} markerEnd={active ? 'url(#moe-arr)' : undefined} />
            <rect x={432} y={y} width={130} height={34} rx={3} fill={active ? 'hsl(345 68% 53% / 0.12)' : 'white'} stroke={active ? 'hsl(345 68% 53%)' : 'hsl(0 0% 70%)'} strokeWidth={1.2} />
            <text x={497} y={y + 21} textAnchor="middle" fontSize={11} fill={active ? 'hsl(0 0% 4%)' : 'hsl(0 0% 55%)'}>
              专家 {i + 1}{i === 1 ? '（金融）' : i === 3 ? '（术语）' : ''}
            </text>
          </g>
        )
      })}
      <line x1={562} y1={77} x2={630} y2={130} stroke="hsl(345 68% 53%)" strokeWidth={1.6} markerEnd="url(#moe-arr)" />
      <line x1={562} y1={157} x2={630} y2={132} stroke="hsl(345 68% 53%)" strokeWidth={1.6} markerEnd="url(#moe-arr)" />
      <rect x={632} y={106} width={70} height={48} rx={3} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.3} />
      <text x={667} y={134} textAnchor="middle" fontSize={11.5} fontWeight={600}>输出</text>
      <text x={360} y={248} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">8 个专家只用 2 个 → 总参数巨大，单次计算量却很小</text>
    </svg>
  )
}
