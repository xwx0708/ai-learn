import ChapterHeading from '../components/ChapterHeading'
import DiagramFrame from '../components/DiagramFrame'
import { TokenizeDiagram, AttentionSteps, TemperaturePlayground, TrainPipelineDiagram } from '../components/diagrams/Inside'
import { Link } from 'react-router'

export default function Inside() {
  return (
    <div>
      <ChapterHeading
        num="第 5 章"
        en="Under the Hood"
        title="运作原理深挖"
        lead="把你发给 ChatGPT 的一句话，从输入到回答的每一步拆开：分词、嵌入、几十层注意力、逐个词生成。这一章信息密度最高，建议读慢一点——它是整份教材的核心。"
      />
      <div className="prose-learn">
        <h3>5.1 第一步：把文字切成 token</h3>
        <p>
          模型从不"读"文字。它先把句子切成 <strong>token</strong>（比字大、比词小的碎片），
          每个 token 查表得到一个编号。中文常见字一般 1~2 个 token，英文单词平均 0.75 个词/token。
        </p>
      </div>

      <DiagramFrame title="图 5-1 · 分词：文字 → 编号" note="ID 是示意值。真实词表通常有 5 万～25 万个 token。">
        <TokenizeDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>5.2 第二步：嵌入——给每个 token 一个坐标</h3>
        <p>
          每个 token 编号去<strong>嵌入表</strong>里查出一个向量（比如 4096 维）。这个向量不是随机的：
          训练让意思相近的词坐标相近，<strong>语义被编码成了几何关系</strong>。
          再加上<strong>位置编码</strong>（告诉模型每个词在第几位），输入就准备完毕了。
        </p>
        <div className="callout">
          嵌入表本身就是巨量参数：词表 15 万 × 4096 维 ≈ 6 亿参数，仅这一张表就超过很多小模型的全部参数。
        </div>

        <h3>5.3 核心：自注意力一步步在算什么</h3>
        <p>
          这是全站最重要的一张图。以「它 很 甜」三个词为例，每个词向量先复制出三个分身：
        </p>
        <ul>
          <li><strong>Q（查询）</strong>：我在找什么样的信息？</li>
          <li><strong>K（键）</strong>：我能提供什么信息？（自我标签）</li>
          <li><strong>V（值）</strong>：我实际携带的内容是什么？</li>
        </ul>
        <p>
          然后每个词的 Q 和所有词的 K 做点积得到<strong>相关度分数</strong>，Softmax 归一成权重，
          最后按权重对所有词的 V <strong>加权求和</strong>——得到每个词"吸收了上下文之后"的新向量。
        </p>
      </div>

      <DiagramFrame title="图 5-2 · 自注意力四步：分身 → 打分 → 归一 → 汇总" note="真实模型中每个向量有上千维；这里每个格子代表一个完整的向量运算。">
        <AttentionSteps />
      </DiagramFrame>

      <div className="prose-learn">
        <p>还有三件事让注意力真正强大：</p>
        <ul>
          <li><strong>多头</strong>：同时跑几十上百组独立的 Q/K/V，每组学一种关系（语法、指代、语义……），最后拼接。GPT-3 每层 96 个头。</li>
          <li><strong>堆叠</strong>：一个注意力块后面接 MLP 块，组成一层；GPT-3 叠了 96 层。越深的层，词向量吸收的上下文越抽象（从"它指苹果"到"这是一句文学描写"）。</li>
          <li><strong>掩码</strong>：生成式模型里，每个词只能看到自己和左边的词（右边被掩码屏蔽），防止"偷看答案"。这让训练可以并行预测每个位置的下一个词。</li>
        </ul>

        <h3>5.4 出口：从向量到一个词</h3>
        <p>
          96 层加工后，最后一个位置的向量被投影到词表大小的 <strong>logits</strong>（每个候选词一个原始分数），
          经 Softmax 变成概率分布。然后——不是选最大概率的词，而是<strong>按概率抽奖</strong>（采样）。
          温度就是抽奖的"混乱度旋钮"：
        </p>
      </div>

      <div className="my-8">
        <div className="font-mono2 text-[11px] tracking-[0.12em] text-ink-3 uppercase mb-3 px-1">交互 · 亲手转动温度旋钮</div>
        <TemperaturePlayground />
      </div>

      <div className="prose-learn">
        <p>
          抽中一个词，就把它接到输入末尾，<strong>整个流程重跑一遍</strong>抽下一个词——如此循环，一个个词往外蹦。
          你看到的"AI 正在输入"的打字机效果，就是这个逐词循环的真实反映。
        </p>
        <div className="callout">
          <strong>为什么长对话会变慢/变贵？</strong>每生成一个词都要处理整个上下文。工程上用
          <strong>KV 缓存</strong>（把已算过的 K、V 存起来复用）避免重复计算，但缓存随上下文长度线性增长——
          这就是上下文窗口既贵又有限的原因。
        </div>

        <h3>5.5 它是怎么被训练出来的</h3>
        <p>
          以上讲的是"使用"。而模型能力的来源是三段式训练管线：
        </p>
      </div>

      <DiagramFrame title="图 5-3 · 从海量文本到聊天助手的三段管线" note="ChatGPT = GPT 基础模型 + SFT + RLHF。后两步算力不到 1%，却决定了它是'续写机'还是'助手'。">
        <TrainPipelineDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>5.6 为什么会"幻觉"</h3>
        <p>
          理解了原理，幻觉就不再神秘：模型的训练目标是<strong>"生成高概率的文字序列"</strong>，而不是"说真话"。
          它知道"巴黎是法国首都"的概率很高，不是因为核实过，而是因为语料里这句话高频出现。
          遇到低频或矛盾的知识，它照样会流畅地编下去。对策是 <strong>RAG</strong>（先检索再回答）、
          要求引用来源、低温度——以及你自己的核实。
        </p>
        <div className="callout-accent">
          <strong>本章一句话：</strong>文字 → token → 向量 → 几十层"注意力交换信息 + MLP 消化" → 概率分布 → 逐词采样输出。
          能力来自预训练，性格来自微调与 RLHF，可靠性的短板（幻觉）来自"学概率而非学真相"的根本目标。
        </div>
        <p>
          最后一章：<Link to="/path" className="term-inline">学习路径与资源</Link>——继续深入的权威书单与课程。
        </p>
      </div>
    </div>
  )
}
