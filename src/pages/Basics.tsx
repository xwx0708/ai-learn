import ChapterHeading from '../components/ChapterHeading'
import { NeuronDiagram, NetworkDiagram, ActivationPlots, HierarchyDiagram } from '../components/diagrams/Basics'
import DiagramFrame from '../components/DiagramFrame'
import WorkedExample from '../components/WorkedExample'
import { Link } from 'react-router'

export default function Basics() {
  return (
    <div>
      <ChapterHeading
        num="第 1 章"
        en="Neural Networks"
        title="神经网络是什么"
        lead="所有现代 AI——无论是聊天、画画还是开车——底层都是同一种东西：神经网络。这一章我们用最小的零件把它拼出来，你会看到它本质上只是一道极其庞大的算术题。"
      />
      <div className="prose-learn">
        <h3>1.1 先忘掉“智能”，想象一台打分机器</h3>
        <p>
          想象你要判断一封邮件是不是垃圾邮件。你可能会列几个线索：有没有“中奖”两个字？发件人是不是陌生地址？
          有没有夸张的全角感叹号？然后给每条线索一个<strong>重要程度</strong>，加权加起来，超过某个分数线就判为垃圾邮件。
        </p>
        <p>
          恭喜你，你刚刚在脑子里建造了一个<strong>神经元（Neuron）</strong>。它做的事就三步：
          接收几个输入数字 → 各自乘上一个权重 → 加起来再过一个“压缩函数”，输出一个数。
        </p>
      </div>

      <DiagramFrame title="图 1-1 · 一个神经元的全部工作" note="输入 x 乘权重 w，加起来加偏置 b，再过激活函数。权重就是'这条线索有多重要'。">
        <NeuronDiagram />
      </DiagramFrame>

      <WorkedExample />

      <div className="prose-learn">
        <p>这里出现了三个本站最重要的名词，先记住它们的白话定义：</p>
        <ul>
          <li><strong>权重（Weight）</strong>：每条输入连线的“重要程度”。学习 = 调整权重。</li>
          <li><strong>偏置（Bias）</strong>：一个额外的常数项，调节神经元的“触发难易度”。</li>
          <li><strong>参数（Parameter）</strong>：权重和偏置的统称。“模型有多少参数”就是“模型有多少个可调的旋钮”。GPT-3 有 1750 亿个。</li>
        </ul>
        <p>
          那个“压缩函数”叫<strong>激活函数（Activation Function）</strong>。它的作用是把任意大小的数压缩到一个范围，
          并且——更关键——引入<strong>非线性</strong>。没有它，无论叠多少层神经元，整体都等价于一层的简单加权求和，
          永远学不会“边缘 → 形状 → 人脸”这种层层抽象。
        </p>
      </div>

      <ActivationPlots />

      <div className="prose-learn">
        <h3>1.2 一层不够，就叠很多层</h3>
        <p>
          单个神经元只能学一条直线式的规则。但把几百个神经元排成一<strong>层</strong>，再把很多层串起来，
          奇迹就发生了：浅层负责琐碎的小特征，深层把浅层的输出组合成越来越抽象的概念。
          这就是“深度学习”里<strong>“深”</strong>字的字面意思——层数很多。
        </p>
      </div>

      <DiagramFrame title="图 1-2 · 一个四层网络（以手写数字识别为例）" note="每两个相邻圆点之间的连线都是一个权重。整个网络只是一个函数：吃进 784 个像素值，吐出 10 个分数。">
        <NetworkDiagram />
      </DiagramFrame>

      <DiagramFrame title="图 1-3 · 层越深，学到的特征越抽象" note="这不是人设计的规则，而是网络在训练中自发形成的分工。">
        <HierarchyDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <div className="callout">
          <strong>一句话总结本章：</strong>神经网络就是一个有着海量可调旋钮（参数）的数学函数。
          “使用 AI”是把输入丢进这个函数算一遍；“训练 AI”是反复微调这些旋钮，让函数算得更准。下一章讲微调到底是怎么进行的。
        </div>

        <h3>1.3 数学基础速览（只需直觉，不需会算）</h3>
        <p>后面章节会反复用到四个数学概念，每个用一句话建立直觉就够了：</p>
        <ul>
          <li><strong>向量（Vector）</strong>：一串数字，如 [0.8, -0.2, 0.5]。在 AI 里，<em>任何东西</em>都会被变成一串数字——词语、图片、声音。向量就是它们的通用形态。</li>
          <li><strong>矩阵乘法（Matrix Multiplication）</strong>：一大批“加权求和”打包一起算。一层神经元的计算本质上就是一次矩阵乘法，GPU 正因为擅长这个而成为 AI 的引擎。</li>
          <li><strong>导数 / 梯度（Derivative / Gradient）</strong>：一个数衡量“把某个旋钮拧大一点，结果会变好还是变差、变化多快”。它是训练的唯一指南针。</li>
          <li><strong>概率（Probability）</strong>：0 到 1 之间的“把握程度”。AI 几乎从不给出绝对答案，它给出的是每个选项的概率。</li>
        </ul>
        <div className="callout-accent">
          如果你只想记住一件事：<strong>AI 的全部工作 = 把万物变成数字（向量）→ 做巨量矩阵乘法 → 输出概率。</strong>
          剩下的所有名词，都是这条主线上的零件。
        </div>
        <p>
          下一章：<Link to="/learning" className="term-inline">学习如何发生</Link>——
          梯度下降和反向传播，AI 史上最重要的两个算法。
        </p>
      </div>
    </div>
  )
}
