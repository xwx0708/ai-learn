import ChapterHeading from '../components/ChapterHeading'
import { ExternalLink } from 'lucide-react'

type Res = { name: string; url: string; by: string; level: string; why: string; kind: string }

const GROUPS: { title: string; desc: string; items: Res[] }[] = [
  {
    title: '视觉直觉 · 先建立画面',
    desc: '不用任何数学，先看懂"它在算什么"。',
    items: [
      { name: '3Blue1Brown 神经网络系列', url: 'https://www.3blue1brown.com/topics/neural-networks', by: 'Grant Sanderson', level: '零基础', why: '全球公认最好的可视化讲解。第 5–7 章逐步推导注意力机制，每集配文字版与交互图。', kind: '视频+图文' },
      { name: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', by: 'Jay Alammar', level: '入门', why: '被 arXiv 论文反复引用的 Transformer 图解圣经，逐层拆解编码器-解码器。', kind: '图文博客' },
      { name: 'LLM Visualization', url: 'https://bbycroft.net/llm', by: 'Brendan Bycroft', level: '入门', why: '在浏览器里 3D 漫游一个真实 GPT 的每一次矩阵运算，可逐层放大。', kind: '交互 3D' },
      { name: 'Transformer Explainer', url: 'https://poloclub.github.io/transformer-explainer/', by: 'Georgia Tech Polo Club', level: '入门', why: '输入一句话，实时看 GPT-2 每一层的数据流动，AAAI-25 收录的教学工具。', kind: '交互网页' },
    ],
  },
  {
    title: '系统教材 · 建立知识骨架',
    desc: '免费、权威、被全球高校采用。',
    items: [
      { name: '动手学深度学习 (d2l.ai)', url: 'https://zh.d2l.ai/', by: '李沐 / Aston Zhang 等', level: '入门→进阶', why: '中文首选教材，500+ 高校采用。CNN/RNN/Transformer/GAN 全覆盖，每章可运行代码，B 站有配套视频。', kind: '教材+代码' },
      { name: 'Understanding Deep Learning', url: 'https://udlbook.github.io/udlbook/', by: 'Simon J.D. Prince', level: '进阶', why: '当下最现代的深度学习教科书，免费 PDF，图例极其精良，覆盖 Transformer、扩散模型、RLHF。', kind: '教材' },
      { name: 'Deep Learning（花书）', url: 'https://www.deeplearningbook.org/', by: 'Goodfellow / Bengio / Courville', level: '进阶→研究', why: '奠基性教材，术语定义的终极权威。适合当字典查，不适合从头读。', kind: '教材' },
      { name: 'Speech and Language Processing (3rd ed.)', url: 'https://web.stanford.edu/~jurafsky/slp3/', by: 'Jurafsky & Martin', level: '进阶', why: 'NLP 领域的标准教科书，免费草稿持续更新，Transformer/LLM 章节详尽。', kind: '教材' },
    ],
  },
  {
    title: '动手实战 · 从零造一个',
    desc: '理解到"能复现"才算真懂。',
    items: [
      { name: 'Neural Networks: Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html', by: 'Andrej Karpathy', level: '会 Python', why: '从手写反向传播开始，一步步造出 GPT 和分词器。被公认为"最清晰的模型内部讲解"。', kind: '视频+代码' },
      { name: 'Build a Large Language Model (From Scratch)', url: 'https://github.com/rasbt/LLMs-from-scratch', by: 'Sebastian Raschka', level: '会 Python', why: '纯 PyTorch 从零预训练+微调一个 GPT，全部代码开源。', kind: '书+仓库' },
      { name: 'Hugging Face LLM Course', url: 'https://huggingface.co/learn/llm-course', by: 'Hugging Face', level: '入门→进阶', why: '工业界标准工具链：分词器、Transformers 库、微调、部署，免费带证书。', kind: '课程' },
      { name: 'Stanford CS336: Language Modeling from Scratch', url: 'https://stanford-cs336.github.io/', by: 'Percy Liang 等', level: '进阶', why: '最完整的"无黑盒"大学课程：数据、分词、架构、训练、对齐全部亲手实现。', kind: '课程' },
    ],
  },
  {
    title: '继续追踪 · 前沿与社区',
    desc: '学完基础后保持更新。',
    items: [
      { name: 'Papers with Code', url: 'https://paperswithcode.com/', by: 'Meta AI', level: '进阶', why: '论文 + 代码 + 排行榜三位一体，查任何任务的当前最佳方法。', kind: '社区' },
      { name: 'Stanford CS25: Transformers United', url: 'https://web.stanford.edu/class/cs25/', by: 'Stanford', level: '进阶', why: 'OpenAI/Anthropic/DeepMind 研究员轮讲的研讨会，教科书还没写的前沿都在这里。', kind: '讲座' },
      { name: '李宏毅机器学习课程', url: 'https://speech.ee.ntu.edu.tw/~hylee/ml/', by: '台湾大学 李宏毅', level: '入门', why: '中文世界最受欢迎的 ML 公开课，讲解生动，每年都有大模型专题更新。', kind: '视频课程' },
    ],
  },
]

export default function Path() {
  return (
    <div>
      <ChapterHeading
        num="第 6 章"
        en="Resources"
        title="学习路径与资源"
        lead="本站是地图，不是终点。以下全部是免费、且被业界反复验证过的权威资源，按“先直觉 → 再系统 → 后动手”的顺序排列。建议一次只深入一个。"
      />
      <div className="space-y-12">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="font-display text-[22px] font-bold text-ink">{g.title}</h2>
            <p className="text-[13px] text-ink-3 mt-1 mb-5">{g.desc}</p>
            <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
              {g.items.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-card p-5 hover:bg-ink transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-[14.5px] text-ink group-hover:text-white leading-snug">{r.name}</div>
                    <ExternalLink size={14} className="shrink-0 mt-1 text-ink-3 group-hover:text-white/70" />
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 font-mono2 text-[10.5px] text-ink-3 group-hover:text-white/60">
                    <span>{r.by}</span><span>·</span><span>{r.kind}</span>
                    <span className="text-accent group-hover:text-accent">{r.level}</span>
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-[1.8] text-ink-2 group-hover:text-white/80">{r.why}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 border border-line bg-card rounded p-6">
        <h3 className="font-display text-lg font-bold mb-3">一条可行的 90 天路径</h3>
        <ol className="space-y-2.5 text-[14px] leading-[1.85] text-ink-2 list-decimal pl-5">
          <li><strong>第 1–2 周</strong>：读完本站第 1–5 章 + 看完 3Blue1Brown 全系列，建立完整直觉。</li>
          <li><strong>第 3–6 周</strong>：跟《动手学深度学习》过一遍 CNN/RNN/注意力/Transformer 章节，跑通示例代码。</li>
          <li><strong>第 7–10 周</strong>：跟 Karpathy 从零写出 microGPT 和分词器——这是质变点。</li>
          <li><strong>第 11–13 周</strong>：用 Hugging Face 课程做一次真实微调，再回头读 UDL 对应章节补理论。</li>
        </ol>
      </section>
    </div>
  )
}
