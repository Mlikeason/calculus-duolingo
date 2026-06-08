// M3 导数 — 17 micro-lessons across 7 lessons.

export const m3 = {
  id: 'm3',
  title: 'M3 · 导数',
  subtitle: '把「变化的快慢」变成数',
  lessons: [
    // ───────────────────────────────────────────────────────────────
    // L1 导数的定义
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm3-l1',
      title: '导数的定义',
      units: [
        {
          id: 'm3-l1-u1',
          title: '平均变化率：两点之间的「斜率」',
          intro: {
            hook: '你从家出发开车 2 小时跑了 140 公里。「平均速度」就是 70 km/h——这就是<strong>平均变化率</strong>：总变化量除以变化所花的时间（或自变量增量）。',
            visual: { type: 'plotter', f: 'x*x', xMin: 0, xMax: 4, yMin: 0, yMax: 12, samplePoints: [[1, 1], [3, 9]] },
            intuition: '函数图像上从 $A(1, 1)$ 走到 $B(3, 9)$，y 长了 8，x 长了 2。「斜率」= $\\dfrac{8}{2} = 4$。这就是从 x=1 到 x=3 这段的<em>平均变化率</em>。',
            formula: { latex: '\\bar{k} = \\frac{f(b) - f(a)}{b - a} = \\frac{\\Delta y}{\\Delta x}', caption: '过两点 $(a, f(a))$ 和 $(b, f(b))$ 的<strong>割线</strong>的斜率。' },
            takeaway: '平均变化率 = 割线斜率 = $\\dfrac{\\Delta y}{\\Delta x}$。'
          },
          exercises: [
            { type: 'fill', prompt: '$f(x) = x^2$ 从 $x = 1$ 到 $x = 3$ 的平均变化率 = ___', answer: '4',
              explain: '$\\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9 - 1}{2} = 4$。' },
            { type: 'choice', prompt: '$f(x) = 2x + 5$ 在任意区间上的平均变化率是？',
              options: ['$0$', '$2$', '$5$', '随区间变化'], answer: 1,
              explain: '一次函数斜率恒定，处处都是 2。算一下：$\\dfrac{(2b+5)-(2a+5)}{b-a} = 2$。' },
            { type: 'fill', prompt: '$f(x) = x^3$ 从 $x = 0$ 到 $x = 2$ 的平均变化率 = ___', answer: '4',
              explain: '$\\dfrac{8 - 0}{2 - 0} = 4$。' },
            { type: 'choice', prompt: '物体位置 $s(t) = 4t^2$（米），$t$ 是秒。从 $t = 1$ 到 $t = 3$ 的平均速度是？',
              options: ['$8$ m/s', '$12$ m/s', '$16$ m/s', '$32$ m/s'], answer: 2,
              explain: '$\\dfrac{s(3) - s(1)}{3 - 1} = \\dfrac{36 - 4}{2} = 16$ m/s。' }
          ]
        },
        {
          id: 'm3-l1-u2',
          title: '让 Δx → 0：割线变切线',
          intro: {
            hook: '「2 小时平均 70 km/h」告诉你大体情况，可<em>那一瞬间</em>你是多少速度呢？办法：把「两点」中间的距离不断收缩，让 B 越来越靠近 A——割线就慢慢转成<strong>那一点的切线</strong>。',
            visual: { type: 'secant-tangent', f: 'x*x', a: 1, initialH: 1.5, xMin: -0.5, xMax: 3.5, yMin: -1, yMax: 9 },
            intuition: '拖动 $h$ 滑块从大变小，红色割线会逐渐贴到绿色虚线（切线）。<strong>瞬时变化率</strong>就是这个极限。',
            formula: { latex: 'f\'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}', caption: '$f\'(a)$ 念作「f prime a」，就是 f 在 a 处的<strong>导数</strong>。' },
            takeaway: '导数 = 平均变化率的极限 = 切线斜率。'
          },
          exercises: [
            { type: 'choice', prompt: '导数 $f\'(a)$ 几何上代表什么？',
              options: ['函数值 $f(a)$', '$f$ 在 $a$ 处切线的斜率', '$f$ 在 $a$ 处的高度', '两点平均高度'], answer: 1,
              explain: '导数 = 切线斜率。这是它最常用的几何意义。' },
            { type: 'choice', prompt: '用定义算 $f(x) = x^2$ 的 $f\'(1)$：极限是 $\\displaystyle \\lim_{h \\to 0} \\dfrac{(1+h)^2 - 1}{h}$。化简后等于？',
              options: ['$h$', '$2 + h$', '$2$', '$1$'], answer: 1,
              explain: '$(1+h)^2 - 1 = 2h + h^2$，除以 $h$ 得 $2 + h$，让 $h \\to 0$ 得 2。' },
            { type: 'fill', prompt: '所以 $f\'(1) = $ ___（接上题）', answer: '2',
              explain: '极限 $\\lim_{h \\to 0}(2 + h) = 2$。' },
            { type: 'truefalse', prompt: '导数和平均变化率是同一个东西。', answer: false,
              explain: '平均变化率是「一段」上的（割线斜率），导数是「一点」的（切线斜率，是平均变化率的极限）。' },
            { type: 'choice', prompt: '$f(x) = 3x + 5$ 的 $f\'(a)$（任意 $a$）等于？',
              options: ['$0$', '$3$', '$5$', '$3a + 5$'], answer: 1,
              explain: '直线的切线就是它自己，斜率永远是 3。' }
          ]
        },
        {
          id: 'm3-l1-u3',
          title: '记号：f\'(x) 和 dy/dx',
          intro: {
            hook: '把「在每个 $x$ 处的导数」打包成一个新函数，这就是<strong>导函数</strong> $f\'(x)$。它跟原函数 $f$ 一样吃 $x$ 吐数——只不过吐的是 $f$ 在那一点的「变化快慢」。',
            visual: { type: 'derivative-slope', f: 'x*x', fLabel: 'f(x) = x²', xMin: -2.5, xMax: 2.5, yMin: -1, yMax: 5, initial: 1 },
            intuition: '上图拖动 $a$ 试试：导数 = 那一点切线斜率。对 $f(x) = x^2$，每个 $a$ 处斜率都等于 $2a$——这就是 $f\'(x) = 2x$，一条规则套所有点。',
            formula: { latex: 'f\'(x), \\quad y\', \\quad \\frac{dy}{dx}, \\quad \\frac{d}{dx}f(x)', caption: '都念同一件事：「f 关于 x 的导数」。$\\dfrac{dy}{dx}$ 是莱布尼茨记号，把它当作整体符号即可。' },
            takeaway: '$f\'(x)$ 是新函数，给每个 $x$ 一个斜率值。'
          },
          exercises: [
            { type: 'choice', prompt: '$f\'(x)$ 和 $f(x)$ 的关系？',
              options: ['是同一个函数', '$f\'$ 给每个 $x$ 一个斜率值', '$f\'$ 是 $f$ 的倒数', '$f\'$ 是 $f$ 的平方'], answer: 1,
              explain: '$f\'(x)$ 是「导函数」——把「在 x 处的导数」做成一个新函数。' },
            { type: 'fill', prompt: '若 $f(x) = x^2$，则 $f\'(x) = $ ___ $\\cdot x$（填一个数）', answer: '2',
              explain: '$f\'(x) = 2x$，所以填 2。下一节会推导公式。' },
            { type: 'truefalse', prompt: '$\\dfrac{dy}{dx}$ 是分数，可以拆成「dy 除以 dx」单独看。', answer: false,
              explain: '它是<em>整体记号</em>，不是真正的分数。但它「像分数」的样子在链式法则里很方便——后面会看到。' },
            { type: 'choice', prompt: '若 $y = 3x + 5$，则 $\\dfrac{dy}{dx}$ 等于？',
              options: ['$0$', '$3$', '$5$', '$3x$'], answer: 1,
              explain: '直线斜率恒为 3，与 $x$ 无关。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L2 切线
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm3-l2',
      title: '切线',
      units: [
        {
          id: 'm3-l2-u1',
          title: '切线 = 割线的极限位置',
          intro: {
            hook: '直观上，切线就是「贴着曲线擦边而过」的直线。严格地说，它是<em>割线在 B → A 时的极限位置</em>。',
            visual: { type: 'secant-tangent', f: 'sin(x)', a: 1, initialH: 1.5, xMin: -1, xMax: 4, yMin: -1.5, yMax: 1.5 },
            intuition: '换个函数 $\\sin x$ 看看。把 h 拖到极小，红色割线就「锁定」在切线上。<em>切线斜率</em>就是函数在那点的导数。',
            formula: { latex: '\\text{切线斜率 } = f\'(a)', caption: '反过来看，导数的几何意义就是切线斜率。' },
            takeaway: '点 + 斜率 = 切线方程。'
          },
          exercises: [
            { type: 'choice', prompt: '若 $f\'(2) = 5$，那么 $f$ 在 $x = 2$ 处切线的斜率是？',
              options: ['$2$', '$5$', '$10$', '$f(2)$'], answer: 1,
              explain: '导数值即切线斜率。' },
            { type: 'truefalse', prompt: '切线和曲线只能相交一次。', answer: false,
              explain: '错。切线只描述「局部贴着」，远处可能再次穿过曲线。比如 $y = \\sin x$ 的切线会被波形多次再切到。' },
            { type: 'choice', prompt: '水平直线 $y = c$ 的切线斜率是？',
              options: ['$c$', '$0$', '$1$', '$+\\infty$'], answer: 1,
              explain: '常函数处处水平，导数恒为 0。' }
          ]
        },
        {
          id: 'm3-l2-u2',
          title: '写出切线方程',
          intro: {
            hook: '知道一个点 $(a, f(a))$ 和它的斜率 $f\'(a)$，就能写出切线方程——就是初中学过的「点斜式」。',
            intuition: '<strong>三步</strong>：① 算 $f(a)$（切点纵坐标）。② 算 $f\'(a)$（切线斜率）。③ 套点斜式。',
            formula: { latex: 'y - f(a) = f\'(a) \\cdot (x - a)', caption: '换成 $y = f\'(a)(x - a) + f(a)$ 也一样。' },
            takeaway: '点斜式 = 一根线由「过哪个点」和「多陡」决定。'
          },
          exercises: [
            { type: 'choice', prompt: '$f(x) = x^2$ 在 $x = 1$ 处的切线方程是？（已知 $f\'(1) = 2$）',
              options: ['$y = 2x$', '$y = 2x - 1$', '$y = x^2 + 1$', '$y = 2x + 1$'], answer: 1,
              explain: '$f(1) = 1$, $f\'(1) = 2$。点斜式：$y - 1 = 2(x - 1)$，即 $y = 2x - 1$。' },
            { type: 'fill', prompt: '$f(x) = x^2$ 在 $x = 0$ 处的切线方程 $y = $ ___', answer: '0',
              explain: '$f(0) = 0$，$f\'(0) = 0$（最低点水平）。所以切线就是 $y = 0$（x 轴）。' },
            { type: 'choice', prompt: '$f(x) = 3x + 5$ 在 $x = 2$ 处的切线方程是？',
              options: ['$y = 3x + 5$', '$y = 11$', '$y = 3x + 11$', '$y = 3$'], answer: 0,
              explain: '直线的切线就是它自己。' },
            { type: 'fill', prompt: '$f(x) = x^2$，$f\'(x) = 2x$。在 $x = 3$ 处的切线方程是 $y = 6x - $ ___', answer: '9',
              explain: '$f(3) = 9$, $f\'(3) = 6$。$y - 9 = 6(x - 3)$，即 $y = 6x - 9$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L3 基本求导公式
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm3-l3',
      title: '基本求导公式',
      units: [
        {
          id: 'm3-l3-u1',
          title: '幂函数：把指数搬下来',
          intro: {
            hook: '用极限定义一个个算太累。前人总结了几条「拆都不用拆」的公式，记住即可。最常用的一条：<strong>幂函数求导</strong>。',
            visual: { type: 'derivative-slope', f: 'x*x*x', fLabel: 'f(x) = x³', xMin: -2, xMax: 2, yMin: -3, yMax: 5, initial: 1 },
            intuition: '上图 $f = x^3$，拖动 $a$ 看斜率：$a = 1$ 处斜率 ≈ 3，$a = 2$ 处 ≈ 12。规律：$f\'(a) = 3a^2$，即<em>把指数 3 搬下来当系数，指数自己减 1</em>。',
            formula: { latex: '(x^n)\' = n \\cdot x^{n - 1}', caption: '对所有实数 $n$ 都成立。$(x)\' = 1$，$(x^2)\' = 2x$，$(x^3)\' = 3x^2$，$(x^{1/2})\' = \\dfrac{1}{2}x^{-1/2}$。' },
            takeaway: '指数搬前面，自减一。'
          },
          exercises: [
            { type: 'fill', prompt: '$(x^5)\' = $ ___ $\\cdot x^4$（填系数）', answer: '5',
              explain: '$(x^n)\' = n x^{n-1}$，n=5。' },
            { type: 'choice', prompt: '$(x^{10})\'$ 等于？',
              options: ['$10 x^{10}$', '$10 x^9$', '$x^9$', '$9 x^{10}$'], answer: 1,
              explain: '指数 10 搬下来，自减 1。' },
            { type: 'fill', prompt: '$(\\sqrt{x})\' = ?$  写成 $\\dfrac{1}{2\\sqrt{x}}$ 即可。$\\sqrt{x} = x^{1/2}$，导数是 $\\dfrac{1}{2}x^{-1/2}$ = ___（写 1/(2sqrt(x))）', answer: ['1/(2sqrt(x))', '1/(2*sqrt(x))', '1/(2sqrtx)'],
              explain: '$x^{-1/2} = \\dfrac{1}{\\sqrt{x}}$，所以 $(\\sqrt{x})\' = \\dfrac{1}{2\\sqrt{x}}$。' },
            { type: 'choice', prompt: '常函数 $f(x) = 7$ 的导数是？',
              options: ['$7$', '$0$', '$1$', '$x$'], answer: 1,
              explain: '常数不变，斜率永远 0。$(c)\' = 0$。' },
            { type: 'fill', prompt: '$\\left(\\dfrac{1}{x}\\right)\' = $ ___ $\\cdot \\dfrac{1}{x^2}$（填一个数，可负）', answer: '-1',
              explain: '$\\dfrac{1}{x} = x^{-1}$，$(x^{-1})\' = -x^{-2} = -\\dfrac{1}{x^2}$。' }
          ]
        },
        {
          id: 'm3-l3-u2',
          title: '三角函数：sin 和 cos 互相切换',
          intro: {
            hook: '$\\sin x$ 的导数？拿 $\\dfrac{\\sin(x+h) - \\sin x}{h}$ 来推会用到 $\\dfrac{\\sin h}{h} \\to 1$。结果出奇地干净——就是 $\\cos x$。',
            visual: { type: 'plotter', f: 'sin(x)', xMin: -6.28, xMax: 6.28, yMin: -1.5, yMax: 1.5 },
            intuition: '$\\sin x$ 在 0 处上升最快（斜率 1），在波峰水平（斜率 0），在下降段斜率负。这条「斜率曲线」恰好是 $\\cos x$。',
            formula: { latex: '(\\sin x)\' = \\cos x, \\quad (\\cos x)\' = -\\sin x, \\quad (\\tan x)\' = \\sec^2 x = \\frac{1}{\\cos^2 x}', caption: 'sin/cos 两条记住即可，tan 用商法则推（后面学）。' },
            takeaway: 'sin → cos，cos → -sin。'
          },
          exercises: [
            { type: 'fill', prompt: '$(\\sin x)\' = $ ___ $x$（填函数名）', answer: ['cos', 'cosine'],
              explain: 'sin 求导得 cos，永远成立。' },
            { type: 'choice', prompt: '$(\\cos x)\'$ 等于？',
              options: ['$\\sin x$', '$-\\sin x$', '$\\cos x$', '$-\\cos x$'], answer: 1,
              explain: '注意有个负号。' },
            { type: 'choice', prompt: '$f(x) = \\sin x$ 在 $x = 0$ 处切线斜率是？',
              options: ['$0$', '$1$', '$-1$', '$\\sin 0$'], answer: 1,
              explain: '$f\'(0) = \\cos 0 = 1$。' },
            { type: 'fill', prompt: '$f(x) = \\cos x$ 在 $x = \\dfrac{\\pi}{2}$ 处的导数 $f\'(\\pi/2) = $ ___', answer: '-1',
              explain: '$f\'(x) = -\\sin x$，$f\'(\\pi/2) = -\\sin(\\pi/2) = -1$。' }
          ]
        },
        {
          id: 'm3-l3-u3',
          title: '指数与对数：e^x 是「自己」',
          intro: {
            hook: '$e^x$ 最神奇的性质：<strong>求导后还是它自己</strong>。这是 $e$ 这个数的本质——也是为什么微积分独爱以 $e$ 为底。',
            visual: { type: 'plotter', f: 'Math.exp(x)', xMin: -2, xMax: 2, yMin: 0, yMax: 8 },
            intuition: '$e^x$ 在每一点的高度 = 那一点的切线斜率。难怪它在描述「增长率正比于当前数量」的现象（人口、放射衰变、复利）时无可替代。',
            formula: { latex: '(e^x)\' = e^x, \\quad (\\ln x)\' = \\frac{1}{x}, \\quad (a^x)\' = a^x \\ln a, \\quad (\\log_a x)\' = \\frac{1}{x \\ln a}', caption: '前两条最常用，后两条只是把 e 换成一般底数。' },
            takeaway: '$e^x$ 不变，$\\ln x$ 变 $1/x$。'
          },
          exercises: [
            { type: 'choice', prompt: '$(e^x)\'$ 等于？',
              options: ['$e$', '$xe^{x-1}$', '$e^x$', '$1$'], answer: 2,
              explain: '$e^x$ 求导还是它自己。这是 $e$ 这个数最本质的特征。' },
            { type: 'fill', prompt: '$(\\ln x)\' = \\dfrac{1}{$ ___ $}$', answer: 'x',
              explain: '$\\dfrac{1}{x}$，这条公式后面会高频出现。' },
            { type: 'choice', prompt: '$f(x) = e^x$ 在 $x = 0$ 处的导数 $f\'(0)$ 等于？',
              options: ['$0$', '$1$', '$e$', '$\\infty$'], answer: 1,
              explain: '$f\'(0) = e^0 = 1$。' },
            { type: 'choice', prompt: '$(2^x)\'$ 等于？',
              options: ['$2^x$', '$x \\cdot 2^{x-1}$', '$2^x \\ln 2$', '$\\ln 2$'], answer: 2,
              explain: '$(a^x)\' = a^x \\ln a$。一般底数比 e 多了一个 $\\ln a$ 系数。' },
            { type: 'fill', prompt: '$(\\ln x)\'$ 在 $x = 2$ 处等于 ___（写成分数）', answer: ['1/2', '0.5'],
              explain: '$\\dfrac{1}{2}$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L4 四则法则
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm3-l4',
      title: '四则法则',
      units: [
        {
          id: 'm3-l4-u1',
          title: '加减法 + 数乘：分别求，相加',
          intro: {
            hook: '导数对「加减」是友善的：两个函数之和的导数，就是它们各自导数之和。系数也可以提到求导外面。',
            intuition: '记忆方法：求导<em>分着做</em>就行。$f + g$ 求导 = $f$ 求导 + $g$ 求导；$cf$ 求导 = $c$ 乘 $f$ 求导。',
            formula: { latex: '(f \\pm g)\' = f\' \\pm g\', \\quad (cf)\' = c \\cdot f\'', caption: '加减和数乘都可以「穿透」求导符号。' },
            takeaway: '加减「拆」，常数「提」。'
          },
          exercises: [
            { type: 'fill', prompt: '$(x^2 + x)\' = $ ___ $x + 1$（填系数）', answer: '2',
              explain: '$(x^2)\' = 2x$，$(x)\' = 1$，相加得 $2x + 1$。' },
            { type: 'choice', prompt: '$(3x^4)\'$ 等于？',
              options: ['$3x^4$', '$12 x^3$', '$3 x^3$', '$4 x^3$'], answer: 1,
              explain: '系数 3 不动，$x^4$ 求导得 $4x^3$，相乘得 $12 x^3$。' },
            { type: 'fill', prompt: '$(x^3 - 2x + 5)\' = $ ___ $x^2 - 2$（填系数）', answer: '3',
              explain: '$3x^2 - 2 + 0 = 3x^2 - 2$。常数 5 求导为 0。' },
            { type: 'choice', prompt: '$f(x) = 2 \\sin x + 3 \\cos x$，则 $f\'(x) = $？',
              options: ['$2 \\cos x + 3 \\sin x$', '$2 \\cos x - 3 \\sin x$', '$-2 \\cos x - 3 \\sin x$', '$2 \\sin x + 3 \\cos x$'], answer: 1,
              explain: '$(\\sin x)\' = \\cos x$, $(\\cos x)\' = -\\sin x$。系数保留：$2 \\cos x - 3 \\sin x$。' },
            { type: 'fill', prompt: '$(e^x + \\ln x)\' = e^x + $ ___（填一个表达式 1/x）', answer: ['1/x'],
              explain: '$(e^x)\' = e^x$, $(\\ln x)\' = 1/x$，相加。' }
          ]
        },
        {
          id: 'm3-l4-u2',
          title: '乘法法则：左导右 + 左右导',
          intro: {
            hook: '$(fg)\'$ 是不是 $f\'g\'$？<strong>不是</strong>。这里有个看似奇怪但很合理的公式：<em>左导右，加 左右导</em>。',
            intuition: '想成「两个工人轮流干」：一会儿 f 在变 g 不动，一会儿 g 在变 f 不动。两件事的总速率加起来。',
            formula: { latex: '(f \\cdot g)\' = f\' \\cdot g + f \\cdot g\'', caption: '念作「f prime g + f g prime」。' },
            takeaway: '乘法求导：左导右 + 左右导。'
          },
          exercises: [
            { type: 'choice', prompt: '$f(x) = x^2 \\sin x$，$f\'(x) = ?$',
              options: ['$2x \\cos x$', '$2x \\sin x + x^2 \\cos x$', '$2x \\sin x - x^2 \\cos x$', '$x^2 \\cos x$'], answer: 1,
              explain: '$f = x^2$, $g = \\sin x$。$f\'g + fg\' = 2x \\sin x + x^2 \\cos x$。' },
            { type: 'choice', prompt: '$(x \\cdot e^x)\'$ 等于？',
              options: ['$e^x$', '$x e^x$', '$e^x + x e^x = (1 + x) e^x$', '$x e^{x-1}$'], answer: 2,
              explain: '$f = x, g = e^x$。$1 \\cdot e^x + x \\cdot e^x = (1 + x) e^x$。' },
            { type: 'truefalse', prompt: '$(fg)\' = f\' \\cdot g\'$。', answer: false,
              explain: '错。这是个常见误区。正确公式是 $f\'g + fg\'$。' },
            { type: 'choice', prompt: '$h(x) = x \\ln x$，$h\'(x) = ?$',
              options: ['$\\ln x$', '$\\dfrac{1}{x}$', '$1 + \\ln x$', '$\\ln x + 1$'], answer: 2,
              explain: '$1 \\cdot \\ln x + x \\cdot \\dfrac{1}{x} = \\ln x + 1$（选项 3 和 4 表达一样，3 写法更标准）。' }
          ]
        },
        {
          id: 'm3-l4-u3',
          title: '除法法则：上导下 - 上下导 / 下²',
          intro: {
            hook: '$\\left(\\dfrac{f}{g}\\right)\'$ 比乘法复杂一点：分子里是「上导下减上下导」，分母是「下的平方」。',
            intuition: '<strong>口诀</strong>：上导下减上下导，全部除以下方平方。注意是<em>减</em>不是加，顺序不可换。',
            formula: { latex: '\\left(\\frac{f}{g}\\right)\' = \\frac{f\' \\cdot g - f \\cdot g\'}{g^2}', caption: 'g ≠ 0 处成立。' },
            takeaway: '除法：(上导下 - 上下导) ÷ 下²。'
          },
          exercises: [
            { type: 'choice', prompt: '$y = \\dfrac{x}{x^2 + 1}$，$y\' = ?$',
              options: ['$\\dfrac{1}{2x}$', '$\\dfrac{1 - x^2}{(x^2 + 1)^2}$', '$\\dfrac{x^2 + 1}{2x}$', '$\\dfrac{1 + x^2}{2x}$'], answer: 1,
              explain: '$f = x$, $g = x^2 + 1$。$f\' = 1, g\' = 2x$。分子 $1 \\cdot (x^2 + 1) - x \\cdot 2x = 1 - x^2$。除以 $(x^2 + 1)^2$。' },
            { type: 'choice', prompt: '用商法则推 $(\\tan x)\'$：$\\tan x = \\dfrac{\\sin x}{\\cos x}$，结果是？',
              options: ['$\\sin^2 x$', '$\\cos^2 x$', '$\\sec^2 x = \\dfrac{1}{\\cos^2 x}$', '$-\\sec^2 x$'], answer: 2,
              explain: '分子 $\\cos x \\cdot \\cos x - \\sin x \\cdot (-\\sin x) = \\cos^2 x + \\sin^2 x = 1$。除以 $\\cos^2 x$ 得 $\\sec^2 x$。' },
            { type: 'truefalse', prompt: '$\\left(\\dfrac{f}{g}\\right)\' = \\dfrac{f\'}{g\'}$。', answer: false,
              explain: '错。常见误区。正确公式带减号、有分母平方。' },
            { type: 'fill', prompt: '$y = \\dfrac{1}{x}$，用商法则验证：$y\' = \\dfrac{0 \\cdot x - 1 \\cdot 1}{x^2} = $ ___（带正负号）', answer: ['-1/x^2', '-1/x²', '-1/(x*x)'],
              explain: '结果是 $-\\dfrac{1}{x^2}$，与幂法则一致。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L5 链式法则
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm3-l5',
      title: '链式法则',
      units: [
        {
          id: 'm3-l5-u1',
          title: '复合函数的求导：链条相乘',
          intro: {
            hook: '$\\sin(3x)$ 的导数？不是 $\\cos(3x)$，也不是 $3 \\cos x$，而是 $3 \\cos(3x)$。多出来的那个 3 是哪来的——这就是<strong>链式法则</strong>。',
            visual: { type: 'composition', g: '3*x', f: 'Math.sin(u)', gLabel: 'g: x→3x', fLabel: 'f: u→sin u', initial: 1 },
            intuition: '把复合函数想成两台串起来的机器：先 $g$ 把 $x$ 变成 $u$，再 $f$ 把 $u$ 变成 $y$。<em>$x$ 变化一点点，$u$ 变多少？再 $u$ 变化一点点，$y$ 又变多少？</em> 把这两个比率乘起来——就是 $y$ 对 $x$ 的变化率。',
            formula: { latex: '\\big(f(g(x))\\big)\' = f\'\\big(g(x)\\big) \\cdot g\'(x)', caption: '莱布尼茨写法：$\\dfrac{dy}{dx} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dx}$ —— 看起来像「分子分母约掉 du」。' },
            takeaway: '外层导数 × 内层导数。'
          },
          exercises: [
            { type: 'choice', prompt: '$y = \\sin(3x)$，$y\' = ?$',
              options: ['$\\cos(3x)$', '$3 \\cos(3x)$', '$3 \\sin(3x)$', '$\\cos(3)$'], answer: 1,
              explain: '外层 $\\sin u$ 求导得 $\\cos u$（再代回 $u = 3x$），内层 $g\'(x) = 3$。相乘得 $3 \\cos(3x)$。' },
            { type: 'choice', prompt: '$y = (2x + 1)^5$，$y\' = ?$',
              options: ['$5 (2x + 1)^4$', '$10 (2x + 1)^4$', '$(2x + 1)^4$', '$5 \\cdot 2x \\cdot (2x + 1)^4$'], answer: 1,
              explain: '外层 $u^5$ 导 $5u^4$，内层 $(2x+1)\' = 2$。相乘：$5 (2x + 1)^4 \\cdot 2 = 10 (2x + 1)^4$。' },
            { type: 'fill', prompt: '$y = e^{2x}$，$y\' = $ ___ $\\cdot e^{2x}$（填系数）', answer: '2',
              explain: '外层 $e^u$ 导自己，内层 $(2x)\' = 2$。所以 $y\' = 2 e^{2x}$。' },
            { type: 'choice', prompt: '$y = \\cos(x^2)$，$y\' = ?$',
              options: ['$-\\sin(x^2)$', '$-2x \\sin(x^2)$', '$2x \\sin(x^2)$', '$-\\sin(2x)$'], answer: 1,
              explain: '外层 $\\cos u$ 导 $-\\sin u$，内层 $(x^2)\' = 2x$。相乘：$-2x \\sin(x^2)$。' }
          ]
        },
        {
          id: 'm3-l5-u2',
          title: '链式连用：剥洋葱',
          intro: {
            hook: '函数可能是三层、四层套。链式法则可以一直用下去——从最外层往里剥，每剥一层就乘上「内层的导数」。',
            intuition: '比如 $\\sin(e^{2x})$ 有<em>三层</em>：sin（外）→ e^... （中）→ 2x（内）。求导：$\\cos(e^{2x}) \\cdot e^{2x} \\cdot 2$。',
            takeaway: '一层一层来，每层导数相乘。'
          },
          exercises: [
            { type: 'choice', prompt: '$y = \\sqrt{x^2 + 1} = (x^2 + 1)^{1/2}$，$y\' = ?$',
              options: ['$\\dfrac{1}{2\\sqrt{x^2 + 1}}$', '$\\dfrac{x}{\\sqrt{x^2 + 1}}$', '$\\dfrac{2x}{\\sqrt{x^2 + 1}}$', '$\\sqrt{2x}$'], answer: 1,
              explain: '外层 $u^{1/2}$ 导 $\\dfrac{1}{2}u^{-1/2}$，内层 $(x^2 + 1)\' = 2x$。相乘：$\\dfrac{2x}{2\\sqrt{x^2+1}} = \\dfrac{x}{\\sqrt{x^2+1}}$。' },
            { type: 'fill', prompt: '$y = \\ln(3x)$，$y\' = $ ___ ÷ x（填一个数）', answer: '1',
              explain: '$\\ln u$ 导 $1/u$，内层 $(3x)\' = 3$。$\\dfrac{1}{3x} \\cdot 3 = \\dfrac{1}{x}$。神奇：跟 $\\ln x$ 一样。' },
            { type: 'choice', prompt: '$y = e^{\\sin x}$，$y\' = ?$',
              options: ['$e^{\\sin x}$', '$e^{\\cos x}$', '$\\cos x \\cdot e^{\\sin x}$', '$\\sin x \\cdot e^{\\cos x}$'], answer: 2,
              explain: '外 $e^u$ 导自己，内 $(\\sin x)\' = \\cos x$。$e^{\\sin x} \\cdot \\cos x$。' },
            { type: 'choice', prompt: '$y = \\sin^2 x = (\\sin x)^2$，$y\' = ?$',
              options: ['$2 \\sin x$', '$2 \\sin x \\cos x = \\sin(2x)$', '$\\cos^2 x$', '$2 \\cos x$'], answer: 1,
              explain: '外 $u^2$ 导 $2u$，内 $(\\sin x)\' = \\cos x$。$2 \\sin x \\cdot \\cos x$，正好是 $\\sin(2x)$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L6 隐函数求导
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm3-l6',
      title: '隐函数求导',
      units: [
        {
          id: 'm3-l6-u1',
          title: '什么是隐函数',
          intro: {
            hook: '$y = x^2$ 这种「y 直接等于 x 的某个表达式」叫<strong>显函数</strong>。但有些关系，比如 $x^2 + y^2 = 25$（圆），y 没办法整齐地写成 x 的函数（一个 x 对两个 y）——这种叫<strong>隐函数</strong>。',
            visual: { type: 'plotter', f: 'Math.sqrt(Math.max(0, 25 - x*x))', xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
            intuition: '$x^2 + y^2 = 25$ 是半径 5 的圆。上图只画了上半圆 $y = \\sqrt{25 - x^2}$，下半圆是 $y = -\\sqrt{25 - x^2}$。圆<em>不是一个函数</em>，但还是一条曲线，每点处都有切线斜率——还是能求导。',
            takeaway: '隐函数：变量 x 和 y 用一个方程绑在一起。'
          },
          exercises: [
            { type: 'truefalse', prompt: '$x^2 + y^2 = 25$ 是一个函数。', answer: false,
              explain: '一个 x（比如 x = 3）对应两个 y（$+4$ 和 $-4$），不满足函数定义。但它仍是一条曲线。' },
            { type: 'choice', prompt: '下面哪个是<em>隐函数</em>表达？',
              options: ['$y = 3x + 1$', '$y = x^2 - 5$', '$x y = 1$', '$y = \\sin x$'], answer: 2,
              explain: '$xy = 1$ 没明确写成 $y = ...$ 形式（虽然可以解出 $y = 1/x$，但<em>形式</em>上是隐式）。其它三个都已写成显式。' },
            { type: 'truefalse', prompt: '所有隐函数都能改写成显函数。', answer: false,
              explain: '不能。比如 $y^5 + xy + x^2 = 0$ 无法用 x 的初等表达式解出 y。' }
          ]
        },
        {
          id: 'm3-l6-u2',
          title: '隐函数求导三步走',
          intro: {
            hook: '不能解出 y，怎么求 $\\dfrac{dy}{dx}$？办法很巧：对方程<em>两边都关于 x 求导</em>，把 y 当作 x 的函数处理（每次对 y 求导都乘上 $\\dfrac{dy}{dx}$，这是链式法则），再把 $\\dfrac{dy}{dx}$ 解出来。',
            intuition: '<strong>三步</strong>：① 两边都对 x 求导。② 凡是 y 求导得 $y\'$（即 $\\dfrac{dy}{dx}$）。③ 把含 $y\'$ 的项移到一边，解出 $y\'$。',
            formula: { latex: '\\text{例：} x^2 + y^2 = 25 \\Rightarrow 2x + 2y \\cdot y\' = 0 \\Rightarrow y\' = -\\frac{x}{y}', caption: '记得对 $y^2$ 求导是 $2y \\cdot y\'$，不要漏 $y\'$。' },
            takeaway: '两边求导 → 解出 $y\'$。'
          },
          exercises: [
            { type: 'fill', prompt: '对 $x^2 + y^2 = 25$ 两边求导，左边变成 $2x + 2y \\cdot $ ___（填 y\' 或 dy/dx）', answer: ['y\'', 'dy/dx', 'yp', 'y prime'],
              explain: '$x^2$ 导得 $2x$，$y^2$ 把 y 看作 x 的函数，链式法则 → $2y \\cdot y\'$。' },
            { type: 'choice', prompt: '由此解出 $y\' = ?$',
              options: ['$-\\dfrac{x}{y}$', '$\\dfrac{x}{y}$', '$-\\dfrac{y}{x}$', '$\\dfrac{y}{x}$'], answer: 0,
              explain: '$2x + 2y y\' = 0 \\Rightarrow y\' = -\\dfrac{x}{y}$。' },
            { type: 'choice', prompt: '上面圆在点 $(3, 4)$ 处切线斜率是？',
              options: ['$\\dfrac{3}{4}$', '$-\\dfrac{3}{4}$', '$-\\dfrac{4}{3}$', '$\\dfrac{4}{3}$'], answer: 1,
              explain: '$y\' = -\\dfrac{x}{y} = -\\dfrac{3}{4}$。' },
            { type: 'fill', prompt: '$xy = 6$，对两边求导得 $y + x y\' = 0$，所以 $y\' = -y / $ ___', answer: 'x',
              explain: '解出 $y\' = -\\dfrac{y}{x}$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L7 高阶导数
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm3-l7',
      title: '高阶导数',
      units: [
        {
          id: 'm3-l7-u1',
          title: '导数的导数：再求一次',
          intro: {
            hook: '$f\'(x)$ 已经是个函数了，那它<em>再求一次导</em>呢？就得到<strong>二阶导数</strong> $f\'\'(x)$。能一直求下去——只要还能求。',
            intuition: '$f$（位置）→ $f\'$（速度）→ $f\'\'$（加速度）→ $f\'\'\'$（急动度）。每多一阶，描述的是「上一层在多快地变化」。',
            formula: { latex: 'f\'\'(x) = (f\'(x))\', \\quad f^{(n)}(x) = \\text{第 } n \\text{ 阶导数}, \\quad \\frac{d^2 y}{dx^2}', caption: '记号 $f\'\'$、$f^{(2)}$、$\\dfrac{d^2 y}{dx^2}$ 都一回事。' },
            takeaway: '高阶导数 = 反复求导。'
          },
          exercises: [
            { type: 'fill', prompt: '$f(x) = x^3$，$f\'(x) = 3x^2$，$f\'\'(x) = $ ___ $x$（填系数）', answer: '6',
              explain: '$(3x^2)\' = 6x$。' },
            { type: 'choice', prompt: '$f\'\'\'(x) = ?$（接上题）',
              options: ['$3$', '$6$', '$0$', '$x$'], answer: 1,
              explain: '$(6x)\' = 6$。' },
            { type: 'fill', prompt: '$f^{(4)}(x) = $ ___（接上题）', answer: '0',
              explain: '常数 6 求导是 0。继续求都是 0。' },
            { type: 'choice', prompt: '$f(x) = e^x$ 的二阶导数 $f\'\'(x)$ 等于？',
              options: ['$0$', '$1$', '$x e^x$', '$e^x$'], answer: 3,
              explain: '$e^x$ 求导永远是它自己。任意阶导数都是 $e^x$。' },
            { type: 'choice', prompt: '$f(x) = \\sin x$ 的 $f\'\'(x)$ 等于？',
              options: ['$\\cos x$', '$-\\cos x$', '$-\\sin x$', '$\\sin x$'], answer: 2,
              explain: '$f\' = \\cos x \\Rightarrow f\'\' = -\\sin x$。这就是为什么 $\\sin x$ 满足 $y\'\' + y = 0$，振动方程的根源。' }
          ]
        },
        {
          id: 'm3-l7-u2',
          title: '物理意义：位置、速度、加速度',
          intro: {
            hook: '物理课上你算过位置-时间图。导数告诉你<em>位置在多快地变</em>——也就是<strong>速度</strong>。再求一次导，得到<strong>加速度</strong>（速度变化的快慢）。',
            visual: { type: 'plotter', f: '0.5 * 9.8 * x * x', xMin: 0, xMax: 3, yMin: 0, yMax: 45 },
            intuition: '上图 $s(t) = \\dfrac{1}{2} g t^2$（自由落体位置，$g \\approx 9.8$）。$s\'(t) = g t$ 是<em>速度</em>（线性增长），$s\'\'(t) = g \\approx 9.8$ 是<em>加速度</em>（常数，重力）。',
            formula: { latex: 'v(t) = s\'(t), \\quad a(t) = v\'(t) = s\'\'(t)', caption: '速度是位置的导，加速度是速度的导（也是位置的二阶导）。' },
            takeaway: '一阶导 = 速度类，二阶导 = 加速度类。'
          },
          exercises: [
            { type: 'choice', prompt: '位置 $s(t) = t^3 - 6t^2 + 9t$，速度 $v(t) = ?$',
              options: ['$3 t^2 - 6t + 9$', '$3 t^2 - 12 t + 9$', '$t^2 - 6t$', '$6t - 12$'], answer: 1,
              explain: '$v = s\' = 3 t^2 - 12 t + 9$。' },
            { type: 'choice', prompt: '上题的加速度 $a(t) = ?$',
              options: ['$6t$', '$6t - 12$', '$3 t^2 - 12$', '$-12$'], answer: 1,
              explain: '$a = v\' = (3 t^2 - 12 t + 9)\' = 6 t - 12$。' },
            { type: 'fill', prompt: '上题中，物体在 $t = 2$ 处的加速度 = ___（写正负号）', answer: '0',
              explain: '$a(2) = 6 \\times 2 - 12 = 0$。这一刻速度的变化率为零，物体即将由减速转向加速。' },
            { type: 'truefalse', prompt: '加速度为 0 时，物体一定静止。', answer: false,
              explain: '加速度为 0 表示「速度此刻不变」，但速度本身可能是任意值。匀速直线运动的加速度就是 0，但物体在动。' },
            { type: 'choice', prompt: '抛物运动 $s(t) = -5 t^2 + 20 t$ 中，加速度 $s\'\'(t) = ?$',
              options: ['$-10 t + 20$', '$-10$', '$-5$', '$20$'], answer: 1,
              explain: '$s\' = -10 t + 20, s\'\' = -10$。常数 $-10$ 就是重力（向下）。' }
          ]
        }
      ]
    }
  ]
};
