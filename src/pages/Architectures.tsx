import ChapterHeading from '../components/ChapterHeading'
import DiagramFrame from '../components/DiagramFrame'
import { ArchTimeline, CNNDiagram, RNNDiagram, DiffusionDiagram, MoEDiagram } from '../components/diagrams/Architectures'
import { VizTransformerBlock } from '../components/diagrams/Glossary'
import { Link } from 'react-router'

function CompareTable() {
  const rows = [
    ['MLP 多层感知机', '一切', '表格数据、基础分类', '不理解顺序和空间', '所有网络的零件'],
    ['CNN 卷积网络', '图像', '视觉、医学影像', '难以处理长距离依赖', '2012–2020 视觉霸主'],
    ['RNN / LSTM', '序列', '早期翻译、语音', '记忆短、无法并行', '已被 Transformer 取代'],
    ['Transformer', '序列+万物', '语言、代码、多模态', '注意力随长度平方变贵', '当前绝对主流'],
    ['扩散模型', '像素/潜空间', '图像视频生成', '生成慢（需几十步）', '图像生成主流'],
    ['MoE 混合专家', '序列', '超大模型推理提速', '训练与负载均衡复杂', '超大模型标配组件'],
  ]
  return (
    <div className="my-8 border border-line rounded overflow-x-auto">
      <table className="w-full text-[13px] min-w-[640px]">
        <thead>
          <tr className="bg-ink text-paper text-left">
            <th className="px-4 py-3 font-medium">架构</th>
            <th className="px-4 py-3 font-medium">输入视角</th>
            <th className="px-4 py-3 font-medium">擅长</th>
            <th className="px-4 py-3 font-medium">短板</th>
            <th className="px-4 py-3 font-medium">地位</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r[0]} className={i % 2 ? 'bg-muted/50' : 'bg-card'}>
              {r.map((c, j) => (
                <td key={j} className={`px-4 py-2.5 leading-relaxed ${j === 0 ? 'font-semibold whitespace-nowrap' : 'text-ink-2'}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Architectures() {
  return (
    <div>
      <ChapterHeading
        num="第 4 章"
        en="Architectures"
        title="主流架构图鉴"
        lead="同样的神经元和训练算法，按不同方式组装，就得到为不同任务而生的架构。这一章巡礼六种主流架构：它们各自解决什么问题、因何崛起、又因何让位。"
      />
      <div className="prose-learn">
        <h3>4.0 六十年的演进主线</h3>
        <p>
          架构史的主线只有一条：<strong>让信息流动得更快、更远、更自由</strong>。
          从单层到百层（残差连接），从逐字处理到全序列并行（注意力），从固定角色到按需分工（MoE）。
        </p>
      </div>

      <DiagramFrame title="图 4-1 · 架构演进时间线" note="每个红点都是一次信息流动方式的革命。2017 年的 Transformer 是目前最后一次范式级变革。">
        <ArchTimeline />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>4.1 CNN：把“放大镜”滑过整张图</h3>
        <p>
          图片有两个天然规律：同一个特征（比如“竖边缘”）可能出现在任何位置；相邻像素关系最紧密。
          <strong>卷积神经网络</strong>把这两条规律直接写进结构：一个小权重窗口（卷积核）在整张图上滑动，
          参数全局共享——所以 CNN 用极少的参数就能处理百万像素的图片。
        </p>
      </div>

      <DiagramFrame title="图 4-2 · CNN 流水线" note="层层卷积 = 层层抽象：边缘 → 纹理 → 部件 → 物体。最后接全连接层输出类别概率。">
        <CNNDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>4.2 RNN / LSTM：按顺序读书的流派</h3>
        <p>
          文字是有顺序的。<strong>循环神经网络</strong>每次只读一个词，把理解压缩进一个叫“隐藏状态”的向量，
          递给下一刻的自己。直觉优雅，但有两个致命伤：
        </p>
        <ul>
          <li><strong>记忆衰减</strong>：读到第 100 个词时，第 1 个词的印象早已模糊（梯度消失）。LSTM 用“门控”缓解，但没根治。</li>
          <li><strong>无法并行</strong>：必须逐词计算，GPU 的并行算力完全用不上，训练慢。</li>
        </ul>
      </div>

      <DiagramFrame title="图 4-3 · RNN 的时间展开" note="同一个单元在时间轴上复用。红色箭头就是那根越来越微弱的“记忆接力棒”。">
        <RNNDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>4.3 Transformer：让任意两个词直接对话</h3>
        <p>
          2017 年《Attention Is All You Need》提出一个激进方案：<strong>扔掉循环，全部用注意力</strong>。
          每个词直接与所有词计算相关度并交换信息——距离再远也一步直达，且所有位置同时计算，GPU 火力全开。
        </p>
        <p>
          Transformer 块只有两种操作，交替重复几十层：<strong>自注意力</strong>（词与词交换信息）和
          <strong>MLP 前馈层</strong>（每个词独立消化信息），辅以残差连接和层归一化保持稳定。
        </p>
      </div>

      <DiagramFrame title="图 4-4 · Transformer 块的内部" note="GPT-3 把这个块重复了 96 次。细节的分步图解在第 5 章。">
        <VizTransformerBlock />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>4.4 扩散模型：从噪声里“雕”出图像</h3>
        <p>
          图像生成走了完全不同的路线。<strong>扩散模型</strong>训练时做一件事：给真实图片逐步加噪，
          让模型学会每一步“去噪一点点”。生成时反过来：从一团纯噪声出发，迭代去噪几十步，一张全新的图浮现出来。
        </p>
      </div>

      <DiagramFrame title="图 4-5 · 扩散模型的双向过程" note="Stable Diffusion 先用 VAE 把图片压缩进潜空间再扩散，省掉约 97% 的算力。">
        <DiffusionDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>4.5 MoE：用“分诊”做出超大模型</h3>
        <p>
          参数越多越聪明，但参数越多每次计算越贵。<strong>混合专家（MoE）</strong>把每层换成几十上百个“专家”小网络，
          配一个路由器：每个 token 只被送去最相关的 2 个专家。于是总参数可以冲到万亿，单次计算却只动用一小部分。
        </p>
      </div>

      <DiagramFrame title="图 4-6 · MoE 路由示意" note="Mixtral 8×7B、DeepSeek-V3 都是 MoE；专家的分工（金融、代码、语言…）是训练中自发形成的。">
        <MoEDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>4.6 一表收束</h3>
      </div>
      <CompareTable />
      <div className="prose-learn">
        <div className="callout-accent">
          <strong>本章一句话：</strong>架构之争的本质是“信息怎么流动”。CNN 靠局部滑窗，RNN 靠顺序接力，
          Transformer 靠全员直连，扩散靠迭代去噪，MoE 靠按需分工。今天的大模型 = Transformer 主干 + MoE 提速 + 扩散（多模态生成）。
        </div>
        <p>
          下一章：<Link to="/inside" className="term-inline">运作原理深挖</Link>——
          把 Transformer 从“一句话输入”到“一个词输出”的每一步拆开，包括注意力机制最详细的分步图解。
        </p>
      </div>
    </div>
  )
}
