import ChapterHeading from '../components/ChapterHeading'
import DiagramFrame from '../components/DiagramFrame'
import { GradientDescentDiagram, TrainingLoopDiagram, OverfitDiagram } from '../components/diagrams/Learning'
import { Link } from 'react-router'

export default function Learning() {
  return (
    <div>
      <ChapterHeading
        num="第 2 章"
        en="How Learning Works"
        title="学习如何发生"
        lead="上一章说‘训练就是调旋钮’。这一章回答：几万亿个旋钮，没人知道正确答案在哪，机器是怎么找到它们的？答案只有两个算法——梯度下降和反向传播。它们简单到可以写在一张便利贴上，却撑起了整个 AI 产业。"
      />
      <div className="prose-learn">
        <h3>2.1 先量化“错得多离谱”：损失函数</h3>
        <p>
          学习的前提是知道“现在有多差”。<strong>损失函数（Loss）</strong>把模型的预测和正确答案之间的差距压成一个数：
          预测越离谱，损失越大。垃圾邮件例子里，模型说“67% 是垃圾”而真相是“100% 是”，损失就反映那 33% 的差距。
        </p>
        <p>
          分类任务的标准损失叫<strong>交叉熵（Cross-Entropy）</strong>：模型给正确答案的概率越高，交叉熵越低。
          语言模型训练的全过程，就是不停地降低“预测下一个词”的交叉熵——预测得越准，说明它越“懂”语言的规律。
        </p>

        <h3>2.2 下山：梯度下降</h3>
        <p>
          现在想象一个海拔地图：<strong>横轴是某个参数的取值，纵轴是损失</strong>。我们的目标是找到海拔最低的谷底。
          问题是雾太大（参数有几万亿个，没人能画出整张地图），只能看清脚下。
        </p>
        <p>
          对策朴素得惊人：每到一个位置，算一下<strong>脚下哪个方向最陡（梯度）</strong>，朝反方向迈一小步，重复。
          这就是<strong>梯度下降（Gradient Descent）</strong>。步长由<strong>学习率（Learning Rate）</strong>控制——
          它是整个训练中最关键的旋钮。
        </p>
      </div>

      <DiagramFrame title="图 2-1 · 梯度下降：大雾下山法" note="真实网络的几万亿个参数意味着这是几万亿维空间里的下山——人脑无法想象，但数学规则完全一样。">
        <GradientDescentDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <div className="callout">
          <strong>学习率的矛盾：</strong>步子太大，会在谷底两边反复横跳甚至飞出山谷（损失爆炸）；
          步子太小，训练慢到不可接受。现代训练通常“先热身、后衰减”——开头小步试探，中期大步快跑，收尾小步微调。
        </div>

        <h3>2.3 追责：反向传播</h3>
        <p>
          梯度下降需要知道“每个参数对损失的影响”，也就是每个参数的梯度。几万亿个参数，怎么算？
          <strong>反向传播（Backpropagation）</strong>：从最终的损失出发，沿计算路径<strong>倒着</strong>走一遍，
          用微积分的链式法则，把“总误差”逐层分摊到每个参数头上。
        </p>
        <p>
          它没有任何神秘之处——就是链式法则的高效执行。但正是它让“训练几百亿参数”从数学可能变成工程现实。
          PyTorch 等框架里的<strong>自动微分（Autograd）</strong>会自动完成这一切：研究者只写前向逻辑，梯度自动算好。
        </p>
      </div>

      <DiagramFrame title="图 2-2 · 一次训练迭代的三步" note="这就是“训练”的全部。把这个循环跑上万亿次，每次换一小批（Batch）数据，就是今天所有大模型的诞生过程。">
        <TrainingLoopDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>2.4 学习的敌人：过拟合</h3>
        <p>
          训练太久、数据太少，模型会从“学规律”堕落成“背答案”——训练集上表现完美，换新数据就翻车。
          这叫<strong>过拟合（Overfitting）</strong>。判断方法：留一部分数据<strong>不参与训练</strong>（验证集），
          看模型在它上面的表现。
        </p>
      </div>

      <DiagramFrame title="图 2-3 · 过拟合的标志性曲线" note="对策：更多数据、Dropout（随机让神经元缺席）、权重衰减、在验证损失回升前停止训练（早停）。">
        <OverfitDiagram />
      </DiagramFrame>

      <div className="prose-learn">
        <h3>2.5 从“学会”到“会用”</h3>
        <p>
          训练结束后，权重被冻结保存成一个文件——这就是你下载到的“模型”。此后它只进行<strong>前向传播</strong>
          （推理），不再更新权重。所以：你用 ChatGPT 聊天时，它并没有在“学习”你；它只是在用训练好的那堆数字做算术。
        </p>
        <div className="callout-accent">
          <strong>本章一句话：</strong>训练 = 用损失衡量错误 → 用反向传播分摊责任 → 用梯度下降微调参数，循环万亿次。
          AI 的“智能”不来自任何神秘机制，而是这个简单循环在巨大规模下产生的统计奇迹。
        </div>
        <p>
          下一章：<Link to="/glossary" className="term-inline">核心名词词典</Link>——
          40+ 个主流名词，每个配类比和图解；也可以跳到 <Link to="/architectures" className="term-inline">主流架构图鉴</Link> 看它们如何组装成完整模型。
        </p>
      </div>
    </div>
  )
}
