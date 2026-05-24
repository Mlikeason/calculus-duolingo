// M1 预备知识 — Duolingo-style micro-lessons.
// Each unit: intro (hook → visual → intuition → formula/takeaway) + ~5 exercises.

export const m1 = {
  id: 'm1',
  title: 'M1 · 预备知识',
  subtitle: '先把工具收拾齐',
  lessons: [
    // ───────────────────────────────────────────────────────────────
    // L1 函数与图像
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm1-l1',
      title: '函数与图像',
      units: [
        {
          id: 'm1-l1-u1',
          title: '什么是函数',
          intro: {
            hook: '想象一台自动售货机：投一枚硬币按一个按钮，它一定吐出同一样东西。<strong>函数</strong>就是这种机器——给它一个 x，它按一条固定规则吐出一个 y，永远不会今天给苹果明天给橘子。',
            visual: { type: 'function-machine', f: '2*x + 1', label: 'f(x) = 2x+1', initial: 2 },
            intuition: '上面的机器把每个 x 拿来 <em>乘 2 再加 1</em>。x = 2 进去，5 出来；x = 3 进去，7 出来。规则不变，结果由 x 决定。',
            formula: { latex: 'f(x) = 2x + 1', caption: '读作「f 的 x 等于 2x 加 1」。f 是机器的名字，x 是输入，等号右边是规则。' },
            takeaway: '函数 = 一条规则 + 每个输入只对应一个输出。'
          },
          exercises: [
            { type: 'choice', prompt: '如果 $f(x) = 2x + 1$，那么 $f(3)$ 是多少？', options: ['5', '6', '7', '8'], answer: 2,
              explain: '把 3 代进规则：$2 \\times 3 + 1 = 7$。' },
            { type: 'truefalse', prompt: '同一个 x 可以让函数吐出两个不同的 y。', answer: false,
              explain: '函数的关键就是「每个输入只对应一个输出」。一个输入两个输出，就不是函数。' },
            { type: 'fill', prompt: '若 $g(x) = x^2$，则 $g(-3) = $ ___', answer: '9',
              explain: '$(-3)^2 = 9$，负号被平方消掉。' },
            { type: 'choice', prompt: '下面哪个 <em>不是</em> 函数？',
              options: ['每个学生对应他的学号', '每个手机号对应一个机主', '每个人对应他喜欢的所有水果', '每个圆对应它的面积'],
              answer: 2,
              explain: '「喜欢的所有水果」可能有好几个，不是一个输入对一个输出。其它三个都是一对一或多对一。' },
            { type: 'fill', prompt: '若 $f(x) = 3x - 2$，要让 $f(x) = 10$，那么 $x = $ ___', answer: '4',
              explain: '$3x - 2 = 10 \\Rightarrow 3x = 12 \\Rightarrow x = 4$。' }
          ]
        },
        {
          id: 'm1-l1-u2',
          title: '把函数画出来',
          intro: {
            hook: '一个函数有无数个 (x, f(x)) 配对。把每一对当成一个坐标点放到平面上，连起来就是<strong>函数的图像</strong>——一张可以一眼看懂的「输入对输出」地图。',
            visual: { type: 'plotter', f: 'x*x', xMin: -3, xMax: 3, yMin: -1, yMax: 9, showPoint: true, initialX: 1 },
            intuition: '上面拖动滑块，蓝点就在 $y = x^2$ 的曲线上跑。x 决定横坐标，f(x) 决定纵坐标。整条曲线是「所有可能配对」的合集。',
            takeaway: '图像让你「看」函数：哪里上升、哪里下降、最高点在哪，一眼就清楚。'
          },
          exercises: [
            { type: 'choice', prompt: '图像上的一个点 $(2, 7)$ 意味着什么？',
              options: ['$f(7) = 2$', '$f(2) = 7$', '$x$ 和 $y$ 一样', '没有意义'], answer: 1,
              explain: '点 $(x, y)$ 总是表示「输入 x，输出 y」，所以 $f(2) = 7$。' },
            { type: 'truefalse', prompt: '一条竖直直线和函数图像最多只能交于一个点。', answer: true,
              explain: '这就是「垂直线检验法」——若交两点，说明同一个 x 对应了两个 y，那就不是函数。' },
            { type: 'fill', prompt: '若 $f(x) = x^2$，则点 $(-2, $ ___$)$ 在图像上。', answer: '4',
              explain: '$f(-2) = (-2)^2 = 4$，所以图像穿过 $(-2, 4)$。' },
            { type: 'choice', prompt: '$y = x$ 这条函数的图像是什么样的？',
              options: ['一条水平直线', '一条 45° 斜上去的直线', '一条向下的抛物线', '一个圆'],
              answer: 1, explain: '每个 x 都对应同样的 y，连起来正是过原点、斜率 1 的对角线。' },
            { type: 'choice', prompt: '哪条曲线 <em>不能</em> 是函数的图像？',
              options: ['一条直线', '一个完整的圆', '一条抛物线', '一段折线'],
              answer: 1, explain: '完整的圆上，同一个 x 对应上下两个 y，违反「一个输入一个输出」。' }
          ]
        },
        {
          id: 'm1-l1-u3',
          title: '定义域与值域',
          intro: {
            hook: '机器不是万能的：投硬币的机器不收纸币，吐饮料的机器不会吐汉堡。函数也一样——<strong>定义域</strong>是它「肯接收」的所有 x，<strong>值域</strong>是它「会吐出」的所有 y。',
            visual: { type: 'domain-range', f: 'sqrt(x)', xMin: -1, xMax: 6, yMin: -1, yMax: 3, domain: [0, 4], range: [0, 2] },
            intuition: '上图是 $f(x) = \\sqrt{x}$ 在 $[0, 4]$ 上的样子。横向蓝带是允许的输入范围（定义域），纵向绿带是它实际能产生的输出范围（值域）。',
            takeaway: '定义域看横轴，值域看纵轴。'
          },
          exercises: [
            { type: 'choice', prompt: '函数 $f(x) = \\sqrt{x}$ 的定义域是？',
              options: ['全体实数', '$x \\ge 0$', '$x > 0$', '$x \\le 0$'], answer: 1,
              explain: '负数没有实数平方根，但 $\\sqrt{0} = 0$ 是允许的，所以 $x \\ge 0$。' },
            { type: 'choice', prompt: '函数 $f(x) = \\dfrac{1}{x}$ 的定义域是？',
              options: ['全体实数', '$x \\ne 0$', '$x > 0$', '$x \\ge 0$'], answer: 1,
              explain: '除数不能为 0，其它都可以。' },
            { type: 'truefalse', prompt: '$f(x) = x^2$ 的值域是全体实数。', answer: false,
              explain: '$x^2$ 永远 $\\ge 0$，所以值域是 $[0, +\\infty)$，不会出现负数。' },
            { type: 'fill', prompt: '$f(x) = x^2 + 1$ 的值域是 $[$ ___$, +\\infty)$', answer: '1',
              explain: '$x^2$ 最小是 0，加 1 后最小是 1。' },
            { type: 'choice', prompt: '函数 $f(x) = \\sqrt{x - 2}$ 的定义域是？',
              options: ['$x \\ge 0$', '$x \\ge 2$', '$x \\le 2$', '$x > 2$'], answer: 1,
              explain: '根号里要 $\\ge 0$，即 $x - 2 \\ge 0$，所以 $x \\ge 2$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L2 复合函数与反函数
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm1-l2',
      title: '复合函数与反函数',
      units: [
        {
          id: 'm1-l2-u1',
          title: '复合函数（机器串机器）',
          intro: {
            hook: '把两台机器接在一起：第一台把 x 变成 u，第二台再把 u 变成 y。整体就是一台新机器，把 x 直接变成 y。这就是<strong>复合函数</strong>。',
            visual: { type: 'composition', g: 'x + 1', f: 'u*u', gLabel: 'g: x→x+1', fLabel: 'f: u→u²', initial: 2 },
            intuition: '上面 $g$ 先给 x 加 1，得到 $u$；$f$ 再把 $u$ 平方。整体是 $f(g(x)) = (x+1)^2$。<em>顺序不能错</em>：先 g 再 f，写作 $f \\circ g$，注意要从右往左读。',
            formula: { latex: '(f \\circ g)(x) = f(g(x))', caption: '先做 g，再把结果送给 f。' },
            takeaway: '复合就是流水线，顺序决定一切。'
          },
          exercises: [
            { type: 'choice', prompt: '若 $g(x) = x + 1$，$f(u) = u^2$，则 $f(g(2)) = $？',
              options: ['5', '9', '4', '7'], answer: 1,
              explain: '$g(2) = 3$，再 $f(3) = 3^2 = 9$。' },
            { type: 'fill', prompt: '$g(x) = 2x$，$f(u) = u + 3$，则 $f(g(5)) = $ ___', answer: '13',
              explain: '$g(5) = 10$，$f(10) = 13$。' },
            { type: 'truefalse', prompt: '$f \\circ g$ 和 $g \\circ f$ 一般是同一个函数。', answer: false,
              explain: '顺序不同结果通常不同。比如 $g(x)=x+1, f(u)=u^2$：$f(g(x))=(x+1)^2$，$g(f(x))=x^2+1$，完全不一样。' },
            { type: 'choice', prompt: '若 $f(u) = \\sqrt{u}$，$g(x) = x - 4$，则 $(f \\circ g)(x)$ 是？',
              options: ['$\\sqrt{x} - 4$', '$\\sqrt{x - 4}$', '$x - 4$', '$(\\sqrt{x} - 4)^2$'], answer: 1,
              explain: '先做 $g$ 得 $x - 4$，再放进 $f$ 取根号，得 $\\sqrt{x - 4}$。' },
            { type: 'fill', prompt: '若 $f(g(x)) = (x + 1)^2$，$g(x) = x + 1$，则 $f(u) = $ ___（用 u 表示）', answer: ['u^2', 'u*u', 'u**2'],
              explain: '$g$ 把 x 变 u；外层把 u 平方，所以 $f(u) = u^2$。' }
          ]
        },
        {
          id: 'm1-l2-u2',
          title: '反函数（倒着走）',
          intro: {
            hook: '正向：摄氏度 → 华氏度。反向：华氏度 → 摄氏度。<strong>反函数</strong>就是「把机器倒过来跑」：原来吃 x 吐 y，现在吃 y 吐回 x。',
            visual: { type: 'inverse-mirror', f: '2*x + 1', fInv: '(x - 1) / 2', fLabel: 'f(x)=2x+1', fInvLabel: 'f⁻¹(x)=(x-1)/2' },
            intuition: '$f$ 把 x 乘 2 加 1。反过来想：要还原 x，把 y 减 1 再除 2。所以 $f^{-1}(y) = (y - 1)/2$。一来一回，等于什么都没做：$f^{-1}(f(x)) = x$。',
            formula: { latex: 'f^{-1}(f(x)) = x \\quad \\text{以及} \\quad f(f^{-1}(y)) = y', caption: '正向再反向，回到起点。' },
            takeaway: '反函数 = 还原操作。注意 $f^{-1}$ 不是「1 除以 f」。'
          },
          exercises: [
            { type: 'choice', prompt: '$f(x) = x + 5$ 的反函数是？',
              options: ['$f^{-1}(y) = y + 5$', '$f^{-1}(y) = y - 5$', '$f^{-1}(y) = 5 - y$', '$f^{-1}(y) = 1/(y+5)$'], answer: 1,
              explain: '正向加 5，反向就减 5。' },
            { type: 'fill', prompt: '$f(x) = 3x$ 的反函数是 $f^{-1}(y) = y / $ ___', answer: '3',
              explain: '乘 3 的反操作是除以 3。' },
            { type: 'truefalse', prompt: '$f^{-1}(x)$ 就是 $\\dfrac{1}{f(x)}$。', answer: false,
              explain: '记号 $f^{-1}$ 指反函数，不是倒数。比如 $f(x) = x + 1$ 的反函数是 $x - 1$，不是 $\\dfrac{1}{x+1}$。' },
            { type: 'fill', prompt: '$f(x) = 2x + 1$，则 $f^{-1}(5) = $ ___', answer: '2',
              explain: '问的是「f 把谁送到了 5」。$2x + 1 = 5 \\Rightarrow x = 2$。' },
            { type: 'choice', prompt: '什么样的函数<em>没有</em>反函数？',
              options: ['每个 x 对应不同 y 的函数', '同一个 y 被多个 x 共用的函数', '一直递增的函数', '一直递减的函数'], answer: 1,
              explain: '若 $f(2) = f(3) = 7$，倒过来给 7 该输出 2 还是 3？没法定，所以没反函数。一对一才有反函数。' }
          ]
        },
        {
          id: 'm1-l2-u3',
          title: '反函数的图像（沿 y=x 翻折）',
          intro: {
            hook: '反函数把每对 $(x, y)$ 翻成 $(y, x)$。在坐标系里，这就是把图像沿着 $y = x$ 这条对角线对折——左右镜像。',
            visual: { type: 'inverse-mirror', f: 'x*x*x', fInv: 'Math.cbrt(x)', fLabel: 'y=x³', fInvLabel: 'y=∛x', xMin: -2, xMax: 2, yMin: -2, yMax: 2 },
            intuition: '虚线是 $y = x$。蓝色 $y = x^3$ 经过 $(1, 1), (2, 8)$；绿色 $y = \\sqrt[3]{x}$ 经过 $(1, 1), (8, 2)$。x 和 y 互换了，图像也就被翻了。',
            takeaway: '原函数图像 ←→ 反函数图像，关于 $y = x$ 镜像。'
          },
          exercises: [
            { type: 'choice', prompt: '若点 $(2, 7)$ 在 $f$ 的图像上，那么 $f^{-1}$ 的图像上有哪个点？',
              options: ['$(2, 7)$', '$(7, 2)$', '$(-2, -7)$', '$(0, 0)$'], answer: 1,
              explain: '反函数把 $(x, y)$ 变成 $(y, x)$。' },
            { type: 'truefalse', prompt: '$f$ 和 $f^{-1}$ 的图像关于 $y = x$ 对称。', answer: true,
              explain: '这是定义的几何形式——把图翻过去就行。' },
            { type: 'fill', prompt: '$f$ 的定义域是 $[0, 5]$，那 $f^{-1}$ 的<strong>值域</strong>是 ___（用区间写）', answer: ['[0,5]', '[0, 5]'],
              explain: '反过来：原函数的定义域 = 反函数的值域。' },
            { type: 'choice', prompt: '$f^{-1}$ 的定义域来自 $f$ 的什么？',
              options: ['$f$ 的定义域', '$f$ 的值域', '$f$ 的零点', '$y = x$ 这条线'], answer: 1,
              explain: '反函数吃 $f$ 吐出的东西，所以它的定义域就是 $f$ 的值域。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L3 三角函数
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm1-l3',
      title: '三角函数',
      units: [
        {
          id: 'm1-l3-u1',
          title: '弧度：用半径量角',
          intro: {
            hook: '为什么数学家不用度数（90°、180°）而用<strong>弧度</strong>？因为弧度是「自然单位」——它直接拿圆的半径当尺子量弧长，后面的微积分公式会因此干净得像水晶。',
            visual: { type: 'unit-circle', initial: 1 },
            intuition: '半径为 1 的圆上，从 x 轴开始走过的<em>弧长</em>就是<em>弧度</em>。走半圈是 $\\pi$ 个半径长（即 180°），走完一整圈是 $2\\pi$（360°）。',
            formula: { latex: '180° = \\pi \\text{ rad}, \\quad 360° = 2\\pi \\text{ rad}', caption: '记住这两个换算就够了。' },
            takeaway: '弧度 = 弧长 ÷ 半径。一圈 = 2π。'
          },
          exercises: [
            { type: 'fill', prompt: '$90°$ 等于多少弧度？请写成 $\\pi$ 的倍数。形如 $\\dfrac{\\pi}{?}$，写 ___ ', answer: ['pi/2', 'π/2', 'pi / 2'],
              explain: '$180° = \\pi$，所以 $90° = \\pi / 2$。' },
            { type: 'choice', prompt: '$60°$ 等于多少弧度？',
              options: ['$\\pi / 3$', '$\\pi / 4$', '$\\pi / 6$', '$\\pi / 2$'], answer: 0,
              explain: '$180° = \\pi$，所以 $60° = \\pi/3$。' },
            { type: 'truefalse', prompt: '走完整整一圈，对应弧度是 $\\pi$。', answer: false,
              explain: '一圈是 $2\\pi$，半圈才是 $\\pi$。' },
            { type: 'choice', prompt: '$\\pi / 4$ 弧度等于多少度？',
              options: ['30°', '45°', '60°', '90°'], answer: 1,
              explain: '$\\pi$ = 180°，那 $\\pi/4$ = $180°/4 = 45°$。' },
            { type: 'fill', prompt: '半径 $r = 2$，弧长 $s = 6$。圆心角是多少弧度？___', answer: '3',
              explain: '弧度 = 弧长 / 半径 = 6 / 2 = 3。' }
          ]
        },
        {
          id: 'm1-l3-u2',
          title: 'sin 与 cos（单位圆的横纵坐标）',
          intro: {
            hook: '在半径为 1 的圆上，从 x 轴正方向逆时针转出角度 θ，落在的那个点就是 $(\\cos θ, \\sin θ)$。<strong>cos 是横坐标，sin 是纵坐标</strong>——就这么简单。',
            visual: { type: 'unit-circle', initial: 0.785 },
            intuition: '拖动滑块看：当 $θ = 0$，点在 $(1, 0)$，所以 $\\cos 0 = 1, \\sin 0 = 0$。当 $θ = π/2$（90°），点跑到 $(0, 1)$，所以 $\\cos(π/2) = 0, \\sin(π/2) = 1$。',
            formula: { latex: '(\\cos θ,\\ \\sin θ) = \\text{单位圆上转 } θ \\text{ 后落点的坐标}', caption: '横是 cos，纵是 sin。' },
            takeaway: 'sin/cos 是「投影」，永远在 -1 到 1 之间。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\sin 0$ 等于多少？', options: ['0', '1', '-1', '不存在'], answer: 0,
              explain: '$\\theta = 0$ 时点在 $(1, 0)$，纵坐标是 0。' },
            { type: 'choice', prompt: '$\\cos(\\pi)$ 等于多少？', options: ['1', '0', '-1', '$\\pi$'], answer: 2,
              explain: '$\\theta = \\pi$（180°）时点在 $(-1, 0)$，横坐标是 -1。' },
            { type: 'fill', prompt: '$\\sin(\\pi/2) = $ ___', answer: '1',
              explain: '90° 时点跑到 $(0, 1)$，纵坐标 1。' },
            { type: 'truefalse', prompt: '$\\sin θ$ 可以等于 1.5。', answer: false,
              explain: 'sin 是单位圆上的纵坐标，永远在 $[-1, 1]$ 之间。' },
            { type: 'choice', prompt: '若 $\\cos θ = 1$，那么 $θ$ 最可能是？',
              options: ['$0$', '$\\pi / 2$', '$\\pi$', '$2\\pi / 3$'], answer: 0,
              explain: '横坐标等于 1 只发生在点 $(1, 0)$，即 $θ = 0$（或 $2\\pi$ 整数倍）。' }
          ]
        },
        {
          id: 'm1-l3-u3',
          title: '正弦曲线（从转圈变成波浪）',
          intro: {
            hook: '让 θ 沿 x 轴一直增大，每个 θ 配上它的 $\\sin θ$，把这些点连起来——你会得到一条波浪。这就是 <strong>正弦曲线</strong>，自然界中弹簧振动、声波、电流交流都是这个形状。',
            visual: { type: 'plotter', f: 'sin(x)', xMin: -6.28, xMax: 6.28, yMin: -1.5, yMax: 1.5, showPoint: true, initialX: 1 },
            intuition: '拖动滑块，看 x 走到哪里时函数取到 1、-1 或 0。每隔 $2\\pi$ 波形完整重复一次——这叫<em>周期性</em>。',
            formula: { latex: '\\sin(θ + 2\\pi) = \\sin θ', caption: 'cos 也是，周期都是 $2\\pi$。' },
            takeaway: '正弦/余弦图像是周期为 $2\\pi$、振幅为 1 的波。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\sin x$ 的最大值是多少？', options: ['0', '1', '$\\pi$', '$+\\infty$'], answer: 1,
              explain: '波峰高度就是 1。' },
            { type: 'truefalse', prompt: '$\\cos x$ 的周期是 $\\pi$。', answer: false,
              explain: 'cos 的周期也是 $2\\pi$，不是 $\\pi$。' },
            { type: 'fill', prompt: '$\\sin(2\\pi) = $ ___', answer: '0',
              explain: '走完整一圈又回到 $(1, 0)$，纵坐标是 0。' },
            { type: 'choice', prompt: '$\\sin x$ 和 $\\cos x$ 的图像有什么关系？',
              options: ['完全相同', '镜像', '$\\cos$ 是 $\\sin$ 左移 $\\pi / 2$', '两者无关'], answer: 2,
              explain: '$\\cos x = \\sin(x + \\pi/2)$。把正弦波向左推 90°，就成了余弦波。' }
          ]
        },
        {
          id: 'm1-l3-u4',
          title: '一条最该记的恒等式',
          intro: {
            hook: '单位圆的方程是 $x^2 + y^2 = 1$。把 $(x, y) = (\\cos θ, \\sin θ)$ 代进去，立刻得到三角函数里最重要的等式。',
            visual: { type: 'unit-circle', initial: 0.6 },
            intuition: '不管 θ 多少，单位圆上的点离原点都正好 1。这就是这条恒等式的几何来源——勾股定理在单位圆上的化身。',
            formula: { latex: '\\sin^2 θ + \\cos^2 θ = 1', caption: '万能恒等式。' },
            takeaway: '$\\sin^2 + \\cos^2 = 1$，永远成立。'
          },
          exercises: [
            { type: 'choice', prompt: '若 $\\sin θ = 0.6$（θ 在第一象限），那 $\\cos θ$ 是？',
              options: ['0.4', '0.6', '0.8', '1.2'], answer: 2,
              explain: '$\\cos^2 θ = 1 - 0.36 = 0.64$，开根 $\\cos θ = 0.8$（第一象限取正）。' },
            { type: 'fill', prompt: '若 $\\cos θ = 0$，则 $\\sin^2 θ = $ ___', answer: '1',
              explain: '代入：$\\sin^2 θ + 0 = 1$。' },
            { type: 'truefalse', prompt: '$\\sin^2 θ + \\cos^2 θ$ 的值随 θ 变化。', answer: false,
              explain: '永远等于 1，跟 θ 无关。' },
            { type: 'choice', prompt: '$\\sin^2 θ$ 的最大值是？',
              options: ['$\\pi$', '$1$', '$2$', '$\\sqrt{2}$'], answer: 1,
              explain: 'sin 最大是 1，平方还是 1。' },
            { type: 'fill', prompt: '$1 - \\sin^2 θ = $ ___ θ（用 cos 写）', answer: ['cos^2', 'cos²', 'cos*cos'],
              explain: '把恒等式 $\\sin^2 + \\cos^2 = 1$ 移项即得 $1 - \\sin^2 = \\cos^2$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L4 指数与对数
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm1-l4',
      title: '指数与对数',
      units: [
        {
          id: 'm1-l4-u1',
          title: '指数函数：成倍增长',
          intro: {
            hook: '银行年利率 10%，本金 1 块。第 1 年变 1.1 块，第 2 年再 ×1.1 变 1.21 块……第 30 年呢？$1.1^{30} \\approx 17.4$ 块。<strong>指数函数</strong> $y = a^x$ 描述的就是「每隔一段时间乘上同一个倍数」的增长。',
            visual: { type: 'plotter', f: 'Math.pow(2, x)', xMin: -3, xMax: 4, yMin: -1, yMax: 16, showPoint: true, initialX: 2 },
            intuition: '上图是 $y = 2^x$。看它怎么飞起来：x 每加 1，y 就翻一倍。这种「自我加速」的速度是线性函数永远赶不上的。',
            formula: { latex: 'y = a^x \\quad (a > 0,\\ a \\ne 1)', caption: 'a 是底数。$a > 1$ 上升，$0 < a < 1$ 下降。' },
            takeaway: '指数 = 倍数累乘。比例式增长。'
          },
          exercises: [
            { type: 'fill', prompt: '$2^3 = $ ___', answer: '8',
              explain: '$2 \\times 2 \\times 2 = 8$。' },
            { type: 'fill', prompt: '$2^0 = $ ___', answer: '1',
              explain: '约定俗成：任何非零数的 0 次幂都是 1。' },
            { type: 'choice', prompt: '$2^{-2}$ 等于多少？',
              options: ['$-4$', '$0$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{2}$'], answer: 2,
              explain: '$a^{-n} = \\dfrac{1}{a^n}$，所以 $2^{-2} = 1/4$。' },
            { type: 'truefalse', prompt: '$y = 2^x$ 可以取到负数。', answer: false,
              explain: '$a > 0$ 时，$a^x$ 永远 $> 0$，图像在 x 轴上方。' },
            { type: 'choice', prompt: '$y = (1/2)^x$ 的图像是？',
              options: ['一直上升', '一直下降', '先升后降', '水平直线'], answer: 1,
              explain: '底数 $0 < a < 1$ 时，x 越大 y 越小，图像下降。' }
          ]
        },
        {
          id: 'm1-l4-u2',
          title: '对数：问「乘了几次」',
          intro: {
            hook: '指数问的是「乘 30 次得多少」（$1.1^{30} = ?$）。<strong>对数</strong>反过来问：「乘几次能到这个数？」比如 $1.1^? = 17.4$，答案约 30。对数就是指数的<em>反函数</em>。',
            visual: { type: 'exp-log', base: Math.E },
            intuition: '蓝线 $y = e^x$ 和绿线 $y = \\ln x$ 关于虚线 $y = x$ 对称——这是反函数图像的标志。$\\log_a y$ 念作「以 a 为底 y 的对数」，意思是「a 的几次方等于 y」。',
            formula: { latex: 'y = a^x \\iff x = \\log_a y', caption: '指数和对数等价描述同一件事。' },
            takeaway: '$\\log$ 是「求指数」的操作。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\log_2 8 = $ ___（因为 $2^? = 8$）', answer: '3',
              explain: '$2^3 = 8$，所以 $\\log_2 8 = 3$。' },
            { type: 'fill', prompt: '$\\log_{10} 100 = $ ___', answer: '2',
              explain: '$10^2 = 100$。' },
            { type: 'choice', prompt: '$\\log_a 1$ 等于？',
              options: ['$0$', '$1$', '$a$', '没有意义'], answer: 0,
              explain: '$a^0 = 1$ 对所有 $a > 0$ 成立，所以 $\\log_a 1 = 0$。' },
            { type: 'truefalse', prompt: '可以求 $\\log_2(-4)$。', answer: false,
              explain: '没有任何实数次幂能让正底数变负数，所以 $\\log_a$ 的定义域是 $x > 0$。' },
            { type: 'choice', prompt: '若 $\\log_3 x = 4$，那 $x = $？',
              options: ['$7$', '$12$', '$64$', '$81$'], answer: 3,
              explain: '$x = 3^4 = 81$。' }
          ]
        },
        {
          id: 'm1-l4-u3',
          title: 'e 与自然对数（先认个脸）',
          intro: {
            hook: '所有底数里，有一个最特殊：$e \\approx 2.71828$。它从「连续复利」「自然增长」中自然冒出来，是微积分世界的母语。以 $e$ 为底的对数叫 <strong>自然对数</strong>，写成 $\\ln x$。',
            visual: { type: 'exp-log', base: Math.E },
            intuition: '为什么是 $e$ 而不是 2 或 10？后面学到导数你会看到：$y = e^x$ 是唯一一个「自己等于自己导数」的函数。先把这个名字和这个图像在脑子里挂上号就行。',
            formula: { latex: 'e \\approx 2.71828, \\quad \\ln x = \\log_e x', caption: '物理、金融、生物里所有「自然增长」的语言都用 e。' },
            takeaway: '$e$ 是微积分的「自然」底数。$\\ln x$ 就是「以 e 为底的 log」。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\ln 1 = $ ___', answer: '0',
              explain: '$e^0 = 1$，所以 $\\ln 1 = 0$。' },
            { type: 'fill', prompt: '$\\ln e = $ ___', answer: '1',
              explain: '$e^1 = e$，所以 $\\ln e = 1$。' },
            { type: 'truefalse', prompt: '$\\ln x$ 在 $x = 0$ 处有定义。', answer: false,
              explain: '没有任何 $e^?$ 等于 0，所以 $\\ln 0$ 不存在。当 $x \\to 0^+$ 时 $\\ln x \\to -\\infty$。' },
            { type: 'choice', prompt: '$e$ 的近似值最接近？',
              options: ['$1.41$', '$2.72$', '$3.14$', '$3.71$'], answer: 1,
              explain: '$e \\approx 2.71828$，常和 $\\pi \\approx 3.14$ 一起出现。' },
            { type: 'choice', prompt: '$\\ln x$ 和 $e^x$ 互为什么？',
              options: ['相同函数', '反函数', '倒数', '导数'], answer: 1,
              explain: '$y = e^x \\iff x = \\ln y$，正是反函数的关系。' }
          ]
        }
      ]
    }
  ]
};
