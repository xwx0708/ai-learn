/** 一个可亲手验算的完整神经元计算例子 */
export default function WorkedExample() {
  const rows = [
    { clue: '出现“中奖”字样', x: '1（有）', w: '0.9', prod: '0.9' },
    { clue: '陌生发件人', x: '1（是）', w: '0.6', prod: '0.6' },
    { clue: '包含附件', x: '0（没有）', w: '0.3', prod: '0' },
  ]
  return (
    <div className="my-8 border border-line rounded overflow-hidden">
      <div className="bg-ink text-paper px-5 py-3 font-mono2 text-[11px] tracking-[0.12em] uppercase">
        亲手验算一次 · 垃圾邮件判定
      </div>
      <div className="bg-card p-5 overflow-x-auto">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="text-left text-ink-3 border-b border-line">
              <th className="py-2 pr-4 font-medium">线索</th>
              <th className="py-2 pr-4 font-medium">输入 x</th>
              <th className="py-2 pr-4 font-medium">权重 w</th>
              <th className="py-2 font-medium">x × w</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.clue} className="border-b border-line/60">
                <td className="py-2.5 pr-4">{r.clue}</td>
                <td className="py-2.5 pr-4 font-mono2">{r.x}</td>
                <td className="py-2.5 pr-4 font-mono2 text-accent">{r.w}</td>
                <td className="py-2.5 font-mono2">{r.prod}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 font-mono2 text-[13px] leading-[2] bg-muted border border-line rounded px-4 py-3">
          加权和 = 0.9 + 0.6 + 0 = <strong>1.5</strong>，偏置 b = -0.8<br />
          1.5 + (-0.8) = 0.7 → Sigmoid(0.7) ≈ <strong className="text-accent">0.67</strong> → 67% 概率是垃圾邮件
        </div>
        <p className="mt-3 text-[12.5px] text-ink-3 leading-relaxed">
          权重 0.9、0.6、0.3 和偏置 -0.8 不是程序员写的，而是训练出来的——下一章你会看到它们如何被自动找到。
        </p>
      </div>
    </div>
  )
}
