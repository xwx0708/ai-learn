import { useState } from 'react'

/** 分词演示 */
export function TokenizeDiagram() {
  const toks = [
    { t: '我', id: 10236 }, { t: '喜欢', id: 8812 }, { t: '学', id: 33109 },
    { t: '习', id: 177 }, { t: 'AI', id: 9927 }, { t: '的', id: 4638 }, { t: '原理', id: 61092 },
  ]
  return (
    <svg viewBox="0 0 720 170" className="w-full">
      <text x={30} y={30} fontSize={11.5} fill="hsl(0 0% 42%)">原文：「我喜欢学习 AI 的原理」</text>
      {toks.map((k, i) => (
        <g key={i}>
          <rect x={30 + i * 95} y={50} width={82} height={40} rx={3} fill={i % 2 ? 'hsl(0 0% 94%)' : 'white'} stroke="hsl(0 0% 4%)" strokeWidth={1.1} />
          <text x={71 + i * 95} y={75} textAnchor="middle" fontSize={13.5} fontWeight={600}>{k.t}</text>
          <text x={71 + i * 95} y={112} textAnchor="middle" fontSize={10.5} fill="hsl(345 68% 53%)" fontFamily="monospace">ID {k.id}</text>
        </g>
      ))}
      <text x={30} y={150} fontSize={10.5} fill="hsl(0 0% 42%)">每个 token 查嵌入表 → 变成一个向量（比如 4096 个数字）。从此模型只见数字，不见文字。</text>
    </svg>
  )
}

/** 自注意力四步图解（Alammar 风格） */
export function AttentionSteps() {
  const words = ['它', '很', '甜']
  const col = (x: number, tag: string) => (
    <text x={x} y={30} textAnchor="middle" fontSize={11} fontWeight={700} fill="hsl(345 68% 53%)">{tag}</text>
  )
  return (
    <svg viewBox="0 0 720 330" className="w-full">
      <defs>
        <marker id="as-arr" markerWidth="7" markerHeight="7" refX="6" refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>

      {/* 输入向量 */}
      <text x={70} y={30} textAnchor="middle" fontSize={11.5} fontWeight={700}>嵌入向量</text>
      {words.map((w, i) => (
        <g key={w}>
          <rect x={40} y={50 + i * 60} width={60} height={40} rx={3} fill="white" stroke="hsl(0 0% 4%)" strokeWidth={1.2} />
          <text x={70} y={75 + i * 60} textAnchor="middle" fontSize={13} fontWeight={600}>{w}</text>
        </g>
      ))}

      {/* Q K V */}
      {[
        { x: 190, tag: 'Q 查询', fill: 'hsl(345 68% 53% / 0.12)' },
        { x: 300, tag: 'K 键', fill: 'hsl(0 0% 94%)' },
        { x: 410, tag: 'V 值', fill: 'hsl(0 0% 94%)' },
      ].map((g) => (
        <g key={g.tag}>
          {col(g.x + 30, g.tag)}
          {words.map((w, i) => (
            <g key={w}>
              <rect x={g.x} y={50 + i * 60} width={60} height={40} rx={3} fill={g.fill} stroke="hsl(0 0% 4%)" strokeWidth={1.1} />
              <text x={g.x + 30} y={74 + i * 60} textAnchor="middle" fontSize={11} fill="hsl(0 0% 30%)">{g.tag[0].toLowerCase()}·{w}</text>
            </g>
          ))}
          {words.map((w, i) => (
            <line key={w} x1={102} y1={70 + i * 60} x2={g.x - 2} y2={70 + i * 60} stroke="hsl(0 0% 60%)" strokeWidth={0.9} markerEnd="url(#as-arr)" />
          ))}
        </g>
      ))}
      <text x={300} y={250} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">每个向量 × 三个不同的权重矩阵 → 三个角色分身</text>

      {/* 分数矩阵 */}
      <g>
        <text x={570} y={30} textAnchor="middle" fontSize={11} fontWeight={700} fill="hsl(345 68% 53%)">Q·Kᵀ 得分 → Softmax</text>
        {[
          [0.05, 0.10, 0.85],
          [0.55, 0.30, 0.15],
          [0.70, 0.20, 0.10],
        ].map((row, i) =>
          row.map((v, j) => (
            <g key={`${i}${j}`}>
              <rect x={510 + j * 42} y={50 + i * 42} width={40} height={40} fill={`hsl(345 68% 53% / ${v * 0.9})`} stroke="hsl(0 0% 80%)" strokeWidth={0.8} />
              <text x={530 + j * 42} y={74 + i * 42} textAnchor="middle" fontSize={10.5} fontWeight={600} fill={v > 0.5 ? 'white' : 'hsl(0 0% 20%)'}>{v.toFixed(2)}</text>
            </g>
          ))
        )}
        {words.map((w, j) => (
          <text key={j} x={530 + j * 42} y={46} textAnchor="middle" fontSize={10} fill="hsl(0 0% 42%)">{w}</text>
        ))}
        {words.map((w, i) => (
          <text key={i} x={504} y={74 + i * 42} textAnchor="end" fontSize={10} fill="hsl(0 0% 42%)">{w}</text>
        ))}
      </g>

      <line x1={470} y1={90} x2={506} y2={90} stroke="hsl(0 0% 4%)" strokeWidth={1.2} markerEnd="url(#as-arr)" />

      <text x={360} y={300} textAnchor="middle" fontSize={11.5} fill="hsl(0 0% 4%)">
        最后一行读法：「甜」把自己理解为 70% 的「它」+ 20% 的「很」+ 10% 的自己 → 再对 V 加权求和
      </text>
      <text x={360} y={320} textAnchor="middle" fontSize={10.5} fill="hsl(0 0% 42%)">
        得分公式：score = Q·Kᵀ / √d，再 Softmax，最后乘 V —— 这就是 Attention(Q,K,V) = softmax(QKᵀ/√d)V
      </text>
    </svg>
  )
}

/** 温度交互演示 */
export function TemperaturePlayground() {
  const [t, setT] = useState(1)
  const logits = [3.0, 1.8, 0.9, 0.2, -0.4]
  const words = ['苹果', '香蕉', '汽车', '的', '跑']
  const exps = logits.map((l) => Math.exp(l / Math.max(t, 0.05)))
  const sum = exps.reduce((a, b) => a + b, 0)
  const probs = exps.map((e) => e / sum)
  return (
    <div className="border border-line rounded bg-card p-5">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono2 text-[11px] tracking-wider text-ink-3 uppercase shrink-0">温度 T = {t.toFixed(2)}</span>
        <input
          type="range" min={0.1} max={2} step={0.05} value={t}
          onChange={(e) => setT(parseFloat(e.target.value))}
          className="flex-1 accent-[hsl(345_68%_53%)]"
        />
        <span className="text-[11px] text-ink-3 shrink-0 w-24 text-right">
          {t < 0.5 ? '保守·接近复读' : t > 1.4 ? '发散·可能离谱' : '均衡'}
        </span>
      </div>
      <div className="space-y-2">
        {words.map((w, i) => (
          <div key={w} className="flex items-center gap-3">
            <span className="w-12 text-right text-[13px]">{w}</span>
            <div className="flex-1 h-5 bg-muted rounded-sm overflow-hidden">
              <div
                className="h-full transition-all duration-150"
                style={{
                  width: `${probs[i] * 100}%`,
                  background: i === 0 ? 'hsl(345 68% 53%)' : 'hsl(0 0% 20%)',
                }}
              />
            </div>
            <span className="w-14 font-mono2 text-[12px] text-ink-2">{(probs[i] * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-ink-3 leading-relaxed">
        拖动滑杆：T 越小，最高分词的概率越接近 100%（输出稳定但呆板）；T 越大，分布越平（有惊喜也可能胡说）。
        这是真实的 Softmax 计算：p = e^(logit/T) / Σe^(logit/T)。
      </p>
    </div>
  )
}

/** 训练管线：预训练 → SFT → RLHF */
export function TrainPipelineDiagram() {
  const stage = (x: number, title: string, sub: string, data: string, cost: string, accent = false) => (
    <g key={title}>
      <rect x={x} y={50} width={190} height={120} rx={4} fill={accent ? 'hsl(345 68% 53%)' : 'white'} stroke="hsl(0 0% 4%)" strokeWidth={1.3} />
      <text x={x + 95} y={78} textAnchor="middle" fontSize={13.5} fontWeight={700} fill={accent ? 'white' : 'hsl(0 0% 4%)'}>{title}</text>
      <text x={x + 95} y={99} textAnchor="middle" fontSize={10} fill={accent ? 'hsl(0 0% 98% / 0.85)' : 'hsl(0 0% 42%)'}>{sub}</text>
      <text x={x + 95} y={126} textAnchor="middle" fontSize={10} fill={accent ? 'hsl(0 0% 98% / 0.85)' : 'hsl(0 0% 42%)'}>{data}</text>
      <text x={x + 95} y={148} textAnchor="middle" fontSize={10.5} fontWeight={600} fill={accent ? 'white' : 'hsl(345 68% 53%)'}>{cost}</text>
    </g>
  )
  return (
    <svg viewBox="0 0 720 230" className="w-full">
      <defs>
        <marker id="tp-arr" markerWidth="7" markerHeight="7" refX="6" refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 0% 4%)" />
        </marker>
      </defs>
      {stage(30, '① 预训练', '预测下一个词', '全网文本 · 数万亿 token', '≈ 99% 的算力', true)}
      {stage(265, '② 监督微调 SFT', '学“像助手一样回答”', '人工编写的问答对', '少量算力')}
      {stage(500, '③ RLHF / DPO', '学“什么回答更好”', '人类偏好排序数据', '少量算力')}
      <line x1={220} y1={110} x2={263} y2={110} stroke="hsl(0 0% 4%)" strokeWidth={1.3} markerEnd="url(#tp-arr)" />
      <line x1={455} y1={110} x2={498} y2={110} stroke="hsl(0 0% 4%)" strokeWidth={1.3} markerEnd="url(#tp-arr)" />
      <text x={360} y={205} textAnchor="middle" fontSize={11} fill="hsl(0 0% 42%)">预训练产出“知识渊博但只会续写”的基础模型；后两步把它塑造成有用的助手</text>
    </svg>
  )
}
