// M5 微分方程 — 15 micro-lessons across 6 lessons.

export const m5 = {
  id: 'm5',
  title: 'M5 · 微分方程',
  subtitle: '让变化自己讲故事',
  lessons: [
    // ───────────────────────────────────────────────────────────────
    // L1 什么是微分方程
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm5-l1',
      title: '什么是微分方程',
      units: [
        {
          id: 'm5-l1-u1',
          title: '含导数的方程',
          intro: {
            hook: '普通方程求的是一个<em>数</em>（$x^2 = 4$，求 $x$）。<strong>微分方程</strong>求的是一个<em>函数</em>——它告诉你「导数和函数自身之间的关系」，让你从这条线索还原出整个函数。',
            visual: { type: 'plotter', f: 'Math.exp(x)', xMin: -2, xMax: 2, yMin: 0, yMax: 7 },
            intuition: '比如 $y\' = y$：「导数等于自己」。什么函数满足？$e^x$！它的导数就是它自己。微分方程描述的是<em>变化的规律</em>，解出来的是满足这条规律的完整函数。',
            formula: { latex: 'y\' = f(x, y)', caption: '最一般的一阶微分方程：导数由 $x$ 和 $y$ 共同决定。' },
            takeaway: '微分方程 = 含导数的方程，求的是函数而非数。'
          },
          exercises: [
            { type: 'choice', prompt: '下面哪个是微分方程？',
              options: ['$x^2 + 3x = 0$', '$y\' = 2x$', '$\\sin x = 0.5$', '$e^x = 7$'], answer: 1,
              explain: '只有 $y\' = 2x$ 含有导数，是微分方程。其它都是普通方程。' },
            { type: 'truefalse', prompt: '微分方程的解是一个数。', answer: false,
              explain: '解是一个<em>函数</em>。比如 $y\' = 2x$ 的解是 $y = x^2 + C$，是一整族曲线。' },
            { type: 'choice', prompt: '$y\' = y$ 的一个解是？',
              options: ['$y = x$', '$y = x^2$', '$y = e^x$', '$y = \\ln x$'], answer: 2,
              explain: '$(e^x)\' = e^x$，导数等于自己，完美满足。' },
            { type: 'fill', prompt: '$y\' = 3$，两边积分得 $y = $ ___ $+ C$', answer: ['3x'],
              explain: '常数的积分是 $3x + C$。' },
            { type: 'choice', prompt: '微分方程 $y\'\' + y = 0$ 的阶数是？',
              options: ['一阶', '二阶', '三阶', '零阶'], answer: 1,
              explain: '最高阶导数是 $y\'\'$（二阶），所以是二阶微分方程。' }
          ]
        },
        {
          id: 'm5-l1-u2',
          title: '通解与特解',
          intro: {
            hook: '$y\' = 2x$ 的解是 $y = x^2 + C$。$C$ 可以是任何常数，所以这是一<em>族</em>曲线。这叫<strong>通解</strong>。如果再给一个条件（比如 $y(0) = 1$），就能锁定 $C = 1$，得到唯一的那一条——这叫<strong>特解</strong>。',
            visual: { type: 'plotter', f: 'x*x', xMin: -2, xMax: 2, yMin: -1, yMax: 5 },
            intuition: '想象一叠平行的抛物线（$y = x^2, x^2 + 1, x^2 + 2, \\ldots$）。它们都满足 $y\' = 2x$。给定一个初始点，就从这一叠里挑出唯一的一条。',
            formula: { latex: '\\text{通解} = F(x) + C, \\quad \\text{特解} = F(x) + c_0 \\text{（由初始条件定）}', caption: '一阶方程的通解有一个常数 $C$，二阶有两个（$C_1, C_2$）。' },
            takeaway: '通解带 $C$（一族曲线），初始条件锁定 $C$ 得特解（一条曲线）。'
          },
          exercises: [
            { type: 'choice', prompt: '$y\' = 2x$ 的通解是？',
              options: ['$y = 2x$', '$y = x^2$', '$y = x^2 + C$', '$y = 2$'], answer: 2,
              explain: '积分得 $x^2$，别忘加 $C$。' },
            { type: 'fill', prompt: '若 $y = x^2 + C$ 且 $y(0) = 3$，则 $C = $ ___', answer: '3',
              explain: '$0^2 + C = 3 \\Rightarrow C = 3$。' },
            { type: 'choice', prompt: '一阶微分方程的通解含几个任意常数？',
              options: ['零个', '一个', '两个', '看情况'], answer: 1,
              explain: '一阶积一次，产生一个 $C$。二阶积两次，两个常数。' },
            { type: 'truefalse', prompt: '通解包含了所有的特解。', answer: true,
              explain: '每个 $C$ 的值对应一条特解，通解是它们的全体。' },
            { type: 'fill', prompt: '$y\' = \\cos x$，通解 $y = \\sin x + C$。若 $y(\\pi/2) = 0$，则 $C = $ ___', answer: '-1',
              explain: '$\\sin(\\pi/2) + C = 0 \\Rightarrow 1 + C = 0 \\Rightarrow C = -1$。' }
          ]
        },
        {
          id: 'm5-l1-u3',
          title: '初始条件与初值问题',
          intro: {
            hook: '「水温 80°C，室温 20°C，问 10 分钟后水温多少？」这种问题天然就是<strong>初值问题</strong>（IVP）：一个微分方程 + 一个起始状态。',
            intuition: '微分方程描述规律（「温度下降的速率正比于温差」），初始条件给出起点（「此刻 80°C」）。两者合在一起，未来就完全确定了——这就是数学里的<em>确定性</em>。',
            formula: { latex: '\\begin{cases} y\' = f(x, y) \\\\ y(x_0) = y_0 \\end{cases}', caption: '方程 + 初始点 = 初值问题。唯一解。' },
            takeaway: '微分方程定规律，初始条件定起点，二者合一定未来。'
          },
          exercises: [
            { type: 'choice', prompt: '初值问题需要哪两样东西？',
              options: ['两个方程', '一个方程 + 一个初始条件', '两个初始条件', '一个方程 + 一个终止条件'], answer: 1,
              explain: '一个微分方程告诉你变化规律，一个初始条件告诉你从哪开始。' },
            { type: 'fill', prompt: '$y\' = y$，$y(0) = 5$。通解 $y = Ce^x$，代入初始条件得 $C = $ ___', answer: '5',
              explain: '$y(0) = Ce^0 = C = 5$。所以 $y = 5e^x$。' },
            { type: 'choice', prompt: '$y\' = -2y$，$y(0) = 10$ 的特解是？',
              options: ['$y = 10 e^{2x}$', '$y = 10 e^{-2x}$', '$y = -2 e^{10x}$', '$y = 10 - 2x$'], answer: 1,
              explain: '通解 $y = Ce^{-2x}$。$y(0) = C = 10$。所以 $y = 10 e^{-2x}$。' },
            { type: 'truefalse', prompt: '给定初始条件后，初值问题的解是唯一的（在一般条件下）。', answer: true,
              explain: '这是微分方程理论的基本定理（存在唯一性定理）。规律 + 起点 → 唯一轨迹。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L2 可分离变量
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm5-l2',
      title: '可分离变量',
      units: [
        {
          id: 'm5-l2-u1',
          title: '把 x 和 y 分开',
          intro: {
            hook: '如果方程能写成 $g(y)\\,dy = f(x)\\,dx$——左边只含 $y$，右边只含 $x$——那两边分别积分就行了。这叫<strong>分离变量法</strong>，是最直接的解法。',
            visual: { type: 'plotter', f: 'Math.exp(0.5*x*x)', xMin: -2, xMax: 2, yMin: 0, yMax: 7 },
            intuition: '例：$y\' = xy$。改写成 $\\dfrac{dy}{y} = x\\,dx$。左边积 $\\ln|y|$，右边积 $\\dfrac{x^2}{2}$。得 $\\ln|y| = \\dfrac{x^2}{2} + C$，即 $y = Ae^{x^2/2}$。',
            formula: { latex: '\\frac{dy}{dx} = f(x) \\cdot g(y) \\implies \\frac{dy}{g(y)} = f(x)\\,dx \\implies \\int \\frac{dy}{g(y)} = \\int f(x)\\,dx', caption: '分离 → 两边积 → 解出 $y$。' },
            takeaway: '能分离的就分离，两边各自积分。'
          },
          exercises: [
            { type: 'choice', prompt: '$y\' = 3x^2$ 怎么分离变量？',
              options: ['$dy = 3x^2\\,dx$', '$\\dfrac{dy}{y} = 3x^2\\,dx$', '$y\\,dy = 3x\\,dx$', '无法分离'], answer: 0,
              explain: '右边只含 $x$，左边 $dy$ 已经只含 $y$，直接 $dy = 3x^2\\,dx$。' },
            { type: 'fill', prompt: '上题两边积分：$y = x^3 + $ ___', answer: 'C',
              explain: '$\\int dy = \\int 3x^2\\,dx \\Rightarrow y = x^3 + C$。' },
            { type: 'choice', prompt: '$y\' = \\dfrac{x}{y}$ 分离后是？',
              options: ['$y\\,dy = x\\,dx$', '$\\dfrac{dy}{dx} = xy$', '$dy = \\dfrac{x}{y}$', '无法分离'], answer: 0,
              explain: '两边乘 $y$：$y\\,dy = x\\,dx$。' },
            { type: 'fill', prompt: '接上题：$\\int y\\,dy = \\int x\\,dx$ 得 $\\dfrac{y^2}{2} = \\dfrac{x^2}{2} + C$，化简得 $y^2 = x^2 + $ ___（用 $K$ 代替 $2C$）', answer: 'K',
              explain: '两边乘 2，$2C$ 还是任意常数，记作 $K$。' },
            { type: 'truefalse', prompt: '$y\' = x + y$ 可以用分离变量法。', answer: false,
              explain: '$x + y$ 不能写成 $f(x) \\cdot g(y)$ 的乘积形式，无法分离。需要别的方法。' }
          ]
        },
        {
          id: 'm5-l2-u2',
          title: '分离变量实战',
          intro: {
            hook: '来练几道完整的分离变量题，从分离到积分到解出 $y$。',
            intuition: '<strong>步骤</strong>：① 把 $y\'$ 写成 $dy/dx$。② 移项使左边只有 $y$ 和 $dy$，右边只有 $x$ 和 $dx$。③ 两边积分。④ 解出 $y$（如果能的话）。⑤ 有初始条件就代入求 $C$。',
            takeaway: '熟练后分离变量几乎是条件反射。'
          },
          exercises: [
            { type: 'choice', prompt: '$y\' = 2y$，通解是？',
              options: ['$y = 2x + C$', '$y = Ce^{2x}$', '$y = e^{2x}$', '$y = C \\cdot 2^x$'], answer: 1,
              explain: '$\\dfrac{dy}{y} = 2\\,dx$，积分 $\\ln|y| = 2x + C_1$，解出 $y = Ce^{2x}$（$C = \\pm e^{C_1}$）。' },
            { type: 'fill', prompt: '$y\' = -y$，$y(0) = 4$。特解 $y = $ ___', answer: ['4e^(-x)', '4e^{-x}', '4*e^(-x)'],
              explain: '通解 $y = Ce^{-x}$，$y(0) = C = 4$。' },
            { type: 'choice', prompt: '$y\' = y^2$，分离后 $\\dfrac{dy}{y^2} = dx$，积分得？',
              options: ['$\\ln y = x + C$', '$-\\dfrac{1}{y} = x + C$', '$\\dfrac{y^2}{2} = x + C$', '$y = x + C$'], answer: 1,
              explain: '$\\int y^{-2}\\,dy = \\dfrac{y^{-1}}{-1} = -\\dfrac{1}{y}$。' },
            { type: 'choice', prompt: '接上题，解出 $y = $？',
              options: ['$\\dfrac{1}{x + C}$', '$-\\dfrac{1}{x + C}$', '$\\dfrac{1}{C - x}$', 'B 和 C 等价'], answer: 3,
              explain: '$-\\dfrac{1}{y} = x + C$，$y = -\\dfrac{1}{x + C} = \\dfrac{1}{C_1 - x}$（令 $C_1 = -C$）。' },
            { type: 'fill', prompt: '$x\\,y\' = y$，分离变量后 $\\dfrac{dy}{y} = \\dfrac{dx}{x}$，积分得 $\\ln|y| = \\ln|x| + C$，化简 $y = $ ___ $\\cdot x$（填常数符号）', answer: ['A', 'C', 'K', 'k'],
              explain: '$\\ln|y| - \\ln|x| = C$，即 $|y/x| = e^C$，所以 $y = Ax$（$A$ 为任意非零常数）。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L3 一阶线性微分方程
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm5-l3',
      title: '一阶线性微分方程',
      units: [
        {
          id: 'm5-l3-u1',
          title: '标准形式',
          intro: {
            hook: '$y\' + P(x)\\,y = Q(x)$ 叫<strong>一阶线性方程</strong>——$y$ 和 $y\'$ 都只出现一次（线性）。它比分离变量更广：$y\' = x + y$（无法分离）就是一阶线性方程（$P = -1, Q = x$）。',
            intuition: '关键识别法：方程里 $y$ 和 $y\'$ 都是一次的（没有 $y^2$、$yy\'$ 等），并且能整理成 $y\' + P(x)y = Q(x)$ 的形式。$Q = 0$ 时叫<em>齐次</em>，$Q \\ne 0$ 叫<em>非齐次</em>。',
            formula: { latex: 'y\' + P(x)\\,y = Q(x)', caption: '标准形式。先把方程化成这个样子再用公式。' },
            takeaway: '$y\' + Py = Q$ 是一阶线性方程的标准形式。'
          },
          exercises: [
            { type: 'choice', prompt: '下面哪个是一阶线性方程？',
              options: ['$y\' = y^2$', '$y\' + 2y = x$', '$yy\' = 1$', '$y\'\' + y = 0$'], answer: 1,
              explain: '$y\' + 2y = x$：$P = 2, Q = x$，$y$ 和 $y\'$ 都一次，一阶。$y^2$ 不行（非线性），$yy\'$ 不行（非线性），$y\'\'$ 不行（二阶）。' },
            { type: 'fill', prompt: '把 $y\' = 3y + x$ 化成标准形式：$y\' + ($ ___ $)y = x$', answer: '-3',
              explain: '移项：$y\' - 3y = x$，所以 $P = -3$。' },
            { type: 'truefalse', prompt: '$y\' + 2xy = 0$ 是齐次线性方程。', answer: true,
              explain: '$Q(x) = 0$，是齐次的。这个还能用分离变量法解。' },
            { type: 'choice', prompt: '$y\' = e^x - y$ 的标准形式 $y\' + Py = Q$ 中，$P$ 和 $Q$ 分别是？',
              options: ['$P = 1, Q = e^x$', '$P = -1, Q = e^x$', '$P = e^x, Q = -1$', '$P = -1, Q = -e^x$'], answer: 0,
              explain: '移项：$y\' + y = e^x$，所以 $P = 1, Q = e^x$。' }
          ]
        },
        {
          id: 'm5-l3-u2',
          title: '积分因子法',
          intro: {
            hook: '一阶线性方程有一个万能解法：找一个<strong>积分因子</strong> $\\mu(x) = e^{\\int P\\,dx}$，乘到方程两边，左边就变成 $(\\mu y)\'$，然后一积就出来了。',
            intuition: '为什么 $\\mu = e^{\\int P\\,dx}$ 能生效？因为 $\\mu\' = P\\mu$。乘到 $y\' + Py = Q$ 两边：$\\mu y\' + P\\mu y = \\mu Q$，左边恰好是 $(\\mu y)\'$（乘法法则反过来）。于是 $(\\mu y)\' = \\mu Q$，两边积分即得。',
            formula: { latex: 'y = \\frac{1}{\\mu(x)} \\left[ \\int \\mu(x)\\,Q(x)\\,dx + C \\right], \\quad \\mu(x) = e^{\\int P(x)\\,dx}', caption: '看起来复杂，但步骤是固定的：算 $\\mu$ → 算 $\\int \\mu Q\\,dx$ → 除以 $\\mu$。' },
            takeaway: '积分因子 $\\mu = e^{\\int P\\,dx}$，把方程变成一步可积。'
          },
          exercises: [
            { type: 'fill', prompt: '$y\' + 2y = 0$ 的积分因子 $\\mu = e^{\\int 2\\,dx} = $ ___', answer: ['e^(2x)', 'e^{2x}', 'e^2x'],
              explain: '$\\int 2\\,dx = 2x$，$\\mu = e^{2x}$。' },
            { type: 'choice', prompt: '$y\' + y = e^x$ 的积分因子是？',
              options: ['$e^x$', '$e^{-x}$', '$x$', '$\\ln x$'], answer: 0,
              explain: '$P = 1$，$\\mu = e^{\\int 1\\,dx} = e^x$。' },
            { type: 'choice', prompt: '上题乘以 $\\mu = e^x$ 后，左边变成 $(e^x y)\'$，右边是 $e^{2x}$。积分得 $e^x y = \\dfrac{1}{2}e^{2x} + C$，所以 $y = $？',
              options: ['$\\dfrac{1}{2}e^x + Ce^x$', '$\\dfrac{1}{2}e^{2x} + C$', '$\\dfrac{1}{2}e^x + Ce^{-x}$', '$e^{2x} + C$'], answer: 2,
              explain: '除以 $e^x$：$y = \\dfrac{1}{2}e^x + Ce^{-x}$。' },
            { type: 'truefalse', prompt: '积分因子法只能解线性方程。', answer: true,
              explain: '它是专门为 $y\' + Py = Q$ 这种线性结构设计的。非线性方程用不了。' },
            { type: 'choice', prompt: '$y\' - y = 0$（$P = -1$），积分因子 $\\mu = e^{\\int -1\\,dx} = e^{-x}$。$(e^{-x} y)\' = 0$，积分得 $y = $？',
              options: ['$Ce^x$', '$Ce^{-x}$', '$e^x + C$', '$0$'], answer: 0,
              explain: '$e^{-x} y = C$，$y = Ce^x$。正是 $y\' = y$ 的通解。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L4 经典增长模型
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm5-l4',
      title: '经典增长模型',
      units: [
        {
          id: 'm5-l4-u1',
          title: '指数增长：人口与复利',
          intro: {
            hook: '「增长率正比于当前数量」——这句话翻译成数学就是 $y\' = ky$。解出来是 $y = y_0 e^{kt}$。<strong>指数增长</strong>就是这么来的。',
            visual: { type: 'plotter', f: 'Math.exp(0.5*x)', xMin: -1, xMax: 6, yMin: 0, yMax: 20, showPoint: true, initialX: 2 },
            intuition: '细菌每小时翻一倍（$k = \\ln 2 \\approx 0.693$），初始 100 个。$y = 100 \\cdot 2^t$。2 小时 400 个，10 小时 10 万个。指数增长开始慢，后来爆炸——「复利效应」就是这个原理。',
            formula: { latex: 'y\' = ky \\implies y = y_0 e^{kt}', caption: '$k > 0$ 增长，$k < 0$ 衰减。$y_0$ 是初始值。' },
            takeaway: '$y\' = ky$ → 指数增长/衰减，取决于 $k$ 的正负。'
          },
          exercises: [
            { type: 'fill', prompt: '初始人口 $y_0 = 1000$，增长率 $k = 0.05$/年。$y(t) = 1000 e^{$ ___ $\\cdot t}$', answer: '0.05',
              explain: '直接代入公式。' },
            { type: 'choice', prompt: '上题中 $t = 20$ 年后人口约多少？（$e^1 \\approx 2.72$）',
              options: ['$1050$', '$2000$', '$2720$', '$7389$'], answer: 2,
              explain: '$y(20) = 1000 e^{1} \\approx 2720$。' },
            { type: 'truefalse', prompt: '银行的连续复利公式 $A = Pe^{rt}$ 就是 $y\' = ry$ 的解。', answer: true,
              explain: '本金 $P$，年利率 $r$，连续复利 → $A\' = rA$，解就是 $A = Pe^{rt}$。' },
            { type: 'choice', prompt: '若 $k < 0$，$y = y_0 e^{kt}$ 描述的是？',
              options: ['加速增长', '匀速增长', '指数衰减', '周期振荡'], answer: 2,
              explain: '$k < 0$ 时 $e^{kt} \\to 0$，函数递减趋向 0。' },
            { type: 'fill', prompt: '「翻倍时间」：令 $y_0 e^{kt} = 2y_0$，解得 $t = \\dfrac{\\ln 2}{k}$。若 $k = 0.1$/年，翻倍约需 ___ 年（取整数）', answer: '7',
              explain: '$\\ln 2 \\approx 0.693$，$0.693 / 0.1 \\approx 6.93$，约 7 年。这就是「72 法则」的来源。' }
          ]
        },
        {
          id: 'm5-l4-u2',
          title: '指数衰减：半衰期与冷却',
          intro: {
            hook: '放射性元素的衰变、药物在体内的代谢、热咖啡的降温——都遵循 $y\' = -ky$（$k > 0$）。衰减到一半所需的时间叫<strong>半衰期</strong>。',
            visual: { type: 'plotter', f: '100 * Math.exp(-0.1*x)', xMin: 0, xMax: 30, yMin: 0, yMax: 110 },
            intuition: '碳-14 的半衰期约 5730 年。初始 100 克 → 5730 年后 50 克 → 11460 年后 25 克。永远减半，永远不到零——这就是指数衰减的特征。',
            formula: { latex: 't_{1/2} = \\frac{\\ln 2}{k}', caption: '半衰期公式。与初始值无关——不管从多少开始，减半的时间总一样。' },
            takeaway: '指数衰减：等时间减等比例，与起点无关。'
          },
          exercises: [
            { type: 'fill', prompt: '半衰期 $t_{1/2} = \\dfrac{\\ln 2}{k}$。若 $k = 0.01$/分钟，半衰期约 ___ 分钟（取整数）', answer: '69',
              explain: '$\\ln 2 / 0.01 = 69.3$，约 69 分钟。' },
            { type: 'choice', prompt: '初始 200 mg 药物，半衰期 4 小时。8 小时后剩多少？',
              options: ['$100$ mg', '$50$ mg', '$25$ mg', '$0$ mg'], answer: 1,
              explain: '8 小时 = 2 个半衰期。$200 \\to 100 \\to 50$。' },
            { type: 'truefalse', prompt: '半衰期越短，衰减越快。', answer: true,
              explain: '半衰期短 → $k$ 大 → 衰减快。' },
            { type: 'choice', prompt: '牛顿冷却定律说：温差的衰减率正比于温差本身。设温差 $u = T - T_{\\text{env}}$，微分方程是？',
              options: ['$u\' = ku$', '$u\' = -ku$', '$u\' = k$', '$u\' = -k/u$'], answer: 1,
              explain: '温差在缩小，所以 $u\' = -ku$（$k > 0$）。温差指数衰减。' },
            { type: 'fill', prompt: '咖啡 80°C，室温 20°C，$k = 0.05$/min。10 分钟后温差 $u = 60 e^{-0.5} \\approx 60 \\times 0.607 \\approx $ ___°C（取整数），温度约 $20 + $ ___$= $ ___°C', answer: ['36', '56'],
              explain: '$u(10) = 60 e^{-0.5} \\approx 36.4$°C，温度 ≈ $20 + 36 = 56$°C。' }
          ]
        },
        {
          id: 'm5-l4-u3',
          title: 'Logistic 模型：有天花板的增长',
          intro: {
            hook: '纯指数增长没有尽头，但现实中资源有限——地球装不下无限人口。<strong>Logistic 方程</strong>在 $y\' = ky$ 里加了一个「刹车项」：$y\' = ky(1 - y/M)$。$M$ 是<strong>环境容量</strong>（天花板）。',
            visual: { type: 'plotter', f: '100 / (1 + 9 * Math.exp(-0.5*x))', xMin: -2, xMax: 20, yMin: 0, yMax: 110 },
            intuition: '上图是典型的 S 形曲线。开始时 $y$ 远小于 $M$，$1 - y/M \\approx 1$，几乎是纯指数增长。接近 $M$ 时，$1 - y/M \\to 0$，增速放缓，最终趋近 $M$。',
            formula: { latex: 'y\' = ky\\left(1 - \\frac{y}{M}\\right), \\quad y(t) = \\frac{M}{1 + Ae^{-kt}}', caption: '$A$ 由初始条件确定。S 曲线在 $y = M/2$ 处增速最快（拐点）。' },
            takeaway: 'Logistic = 指数增长 + 容量限制 → S 形曲线。'
          },
          exercises: [
            { type: 'choice', prompt: '当 $y$ 很小（远小于 $M$），$y\' \\approx $？',
              options: ['$0$', '$ky$', '$kM$', '$k$'], answer: 1,
              explain: '$y \\ll M$ 时 $1 - y/M \\approx 1$，$y\' \\approx ky$，回到纯指数增长。' },
            { type: 'choice', prompt: '当 $y = M$ 时，$y\' = $？',
              options: ['$kM$', '$0$', '$-kM$', '$k$'], answer: 1,
              explain: '$y\' = kM(1 - M/M) = kM \\cdot 0 = 0$。到达天花板后不再增长。' },
            { type: 'fill', prompt: 'S 曲线的拐点（增速最快的地方）在 $y = M / $ ___ 处', answer: '2',
              explain: '可以证明增速在 $y = M/2$ 处取到最大值。' },
            { type: 'truefalse', prompt: 'Logistic 模型的最终状态是 $y \\to M$。', answer: true,
              explain: '$t \\to \\infty$ 时 $e^{-kt} \\to 0$，$y \\to \\dfrac{M}{1 + 0} = M$。' },
            { type: 'choice', prompt: '一个岛上最多养 1000 只兔子（$M = 1000$），初始 100 只。下面哪个描述了兔子数量？',
              options: ['永远是 100', '先快后慢，最终趋近 1000', '一直加速增长', '线性增长到 1000'], answer: 1,
              explain: '典型的 Logistic 行为：S 形曲线，从 100 增长到 1000 然后趋稳。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L5 二阶常系数线性方程
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm5-l5',
      title: '二阶常系数线性方程',
      units: [
        {
          id: 'm5-l5-u1',
          title: '特征方程：猜 e^{rx}',
          intro: {
            hook: '二阶常系数方程 $y\'\' + ay\' + by = 0$ 长得很对称。大胆猜解是 $y = e^{rx}$，代进去消掉 $e^{rx}$，就得到一个关于 $r$ 的<strong>特征方程</strong>。',
            intuition: '代 $y = e^{rx}$：$r^2 e^{rx} + ar e^{rx} + b e^{rx} = 0$。除掉 $e^{rx}$（永远不为 0），剩下 $r^2 + ar + b = 0$——一个普通二次方程！解出 $r$，就解出了微分方程。',
            formula: { latex: 'y\'\' + ay\' + by = 0 \\implies r^2 + ar + b = 0', caption: '特征方程。根 $r$ 的类型（两实根、重根、复根）决定了解的形态。' },
            takeaway: '猜 $e^{rx}$ → 把微分方程变成代数方程。'
          },
          exercises: [
            { type: 'choice', prompt: '$y\'\' - 3y\' + 2y = 0$ 的特征方程是？',
              options: ['$r^2 - 3r + 2 = 0$', '$r^2 + 3r + 2 = 0$', '$r^2 - 3r - 2 = 0$', '$2r^2 - 3r = 0$'], answer: 0,
              explain: '系数照搬：$r^2$ 对 $y\'\'$，$-3r$ 对 $-3y\'$，$+2$ 对 $+2y$。' },
            { type: 'fill', prompt: '上题特征方程 $r^2 - 3r + 2 = (r - 1)(r - 2) = 0$，根是 $r_1 = 1$ 和 $r_2 = $ ___', answer: '2',
              explain: '因式分解直接得出。' },
            { type: 'choice', prompt: '两个不同实根 $r_1, r_2$ 时通解是？',
              options: ['$y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$', '$y = (C_1 + C_2 x) e^{r_1 x}$', '$y = C_1 \\cos(r_1 x)$', '$y = C e^{(r_1 + r_2)x}$'], answer: 0,
              explain: '两个独立的指数解叠加。' },
            { type: 'fill', prompt: '所以 $y\'\' - 3y\' + 2y = 0$ 的通解是 $y = C_1 e^{x} + C_2 e^{$ ___ $x}$', answer: '2',
              explain: '$r_1 = 1, r_2 = 2$，代入通解公式。' },
            { type: 'truefalse', prompt: '二阶方程的通解含两个任意常数。', answer: true,
              explain: '二阶积两次，产生两个 $C$。需要两个初始条件（如 $y(0), y\'(0)$）才能确定特解。' }
          ]
        },
        {
          id: 'm5-l5-u2',
          title: '重根与复根',
          intro: {
            hook: '特征方程的判别式 $\\Delta = a^2 - 4b$：正数给两个实根，零给重根，负数给复根。三种情况对应三种解的形态。',
            intuition: '<strong>重根</strong> $r_1 = r_2 = r$：一个 $e^{rx}$ 不够，再乘个 $x$，通解 $y = (C_1 + C_2 x)e^{rx}$。<br><strong>复根</strong> $r = \\alpha \\pm \\beta i$：解变成三角函数！$y = e^{\\alpha x}(C_1 \\cos \\beta x + C_2 \\sin \\beta x)$。振荡出现了。',
            formula: { latex: '\\Delta > 0: \\; C_1 e^{r_1 x} + C_2 e^{r_2 x} \\quad | \\quad \\Delta = 0: \\; (C_1 + C_2 x)e^{rx} \\quad | \\quad \\Delta < 0: \\; e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)', caption: '三种情况，背下来就够用。' },
            takeaway: '两实根 → 两指数，重根 → 乘 $x$，复根 → 三角振荡。'
          },
          exercises: [
            { type: 'choice', prompt: '$y\'\' - 4y\' + 4y = 0$，特征方程 $r^2 - 4r + 4 = (r - 2)^2 = 0$，通解是？',
              options: ['$C_1 e^{2x} + C_2 e^{-2x}$', '$(C_1 + C_2 x) e^{2x}$', '$C e^{4x}$', '$C_1 \\cos 2x + C_2 \\sin 2x$'], answer: 1,
              explain: '重根 $r = 2$，用重根公式。' },
            { type: 'choice', prompt: '$y\'\' + 4y = 0$，特征方程 $r^2 + 4 = 0$，$r = \\pm 2i$。通解是？',
              options: ['$C_1 e^{2x} + C_2 e^{-2x}$', '$(C_1 + C_2 x) e^{2x}$', '$C_1 \\cos 2x + C_2 \\sin 2x$', '$e^{2x}(C_1 \\cos x + C_2 \\sin x)$'], answer: 2,
              explain: '纯虚根 $\\alpha = 0, \\beta = 2$。$e^{0 \\cdot x} = 1$，只剩三角部分。' },
            { type: 'truefalse', prompt: '复根意味着解中出现振荡（sin/cos）。', answer: true,
              explain: '复根 → 三角函数 → 振荡。这就是弹簧、电路里交流信号的数学来源。' },
            { type: 'choice', prompt: '$y\'\' + 2y\' + 5y = 0$，$r = -1 \\pm 2i$（$\\alpha = -1, \\beta = 2$），通解是？',
              options: ['$e^{-x}(C_1 \\cos 2x + C_2 \\sin 2x)$', '$e^{2x}(C_1 \\cos x + C_2 \\sin x)$', '$C_1 e^{-x} + C_2 e^{-5x}$', '$C_1 \\cos 2x + C_2 \\sin 2x$'], answer: 0,
              explain: '$\\alpha = -1$ 给衰减包络 $e^{-x}$，$\\beta = 2$ 给振荡频率。' },
            { type: 'fill', prompt: '上题的解会振荡，但振幅被 $e^{-x}$ 逐渐压到 ___', answer: '0',
              explain: '$e^{-x} \\to 0$，振荡被衰减包络「压死」。这叫<em>阻尼振动</em>。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L6 弹簧与振动
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm5-l6',
      title: '弹簧与振动',
      units: [
        {
          id: 'm5-l6-u1',
          title: '简谐运动',
          intro: {
            hook: '弹簧挂个重物拉一下松手，它会上下振。牛顿第二定律 + 胡克定律给出 $mx\'\' = -kx$，即 $x\'\' + \\omega^2 x = 0$（$\\omega^2 = k/m$）。特征方程根是 $\\pm \\omega i$——纯虚根，纯振荡。',
            visual: { type: 'plotter', f: 'Math.cos(2*x)', xMin: 0, xMax: 6.28, yMin: -1.5, yMax: 1.5, showPoint: true, initialX: 0 },
            intuition: '上图 $x(t) = \\cos 2t$ 就是一个简谐运动。$\\omega = 2$ 是<em>角频率</em>（决定振多快），振幅 1（拉了多远），永远不停——因为没有阻力。',
            formula: { latex: 'x\'\' + \\omega^2 x = 0 \\implies x = A\\cos(\\omega t + \\varphi)', caption: '$A$ 是振幅，$\\omega$ 是角频率，$\\varphi$ 是初相位。周期 $T = 2\\pi / \\omega$。' },
            takeaway: '$x\'\' = -\\omega^2 x$ → 简谐振动，sin/cos 是它的母语。'
          },
          exercises: [
            { type: 'choice', prompt: '弹簧常数 $k = 8$，质量 $m = 2$。角频率 $\\omega = $？',
              options: ['$2$', '$4$', '$\\sqrt{2}$', '$16$'], answer: 0,
              explain: '$\\omega = \\sqrt{k/m} = \\sqrt{8/2} = \\sqrt{4} = 2$。' },
            { type: 'fill', prompt: '上题的振动周期 $T = 2\\pi / \\omega = $ ___（用 $\\pi$ 写）', answer: ['pi', 'π'],
              explain: '$T = 2\\pi / 2 = \\pi$。' },
            { type: 'truefalse', prompt: '简谐运动的频率取决于振幅（拉得越远振得越快）。', answer: false,
              explain: '频率只由 $k/m$ 决定，与振幅无关。这是简谐运动的神奇之处。' },
            { type: 'choice', prompt: '若 $x(0) = 3$（初始拉开 3 cm）且 $x\'(0) = 0$（松手），$\\omega = 1$，则 $x(t) = $？',
              options: ['$3\\sin t$', '$3\\cos t$', '$3e^{-t}$', '$\\cos 3t$'], answer: 1,
              explain: '初始有位移、无速度 → $\\cos$ 形式，振幅 3。' },
            { type: 'choice', prompt: '$y\'\' + y = 0$ 的通解是？',
              options: ['$C_1 e^x + C_2 e^{-x}$', '$C_1 \\cos x + C_2 \\sin x$', '$(C_1 + C_2 x)e^x$', '$C_1 x + C_2$'], answer: 1,
              explain: '特征方程 $r^2 + 1 = 0$，$r = \\pm i$。纯虚根 → cos + sin。' }
          ]
        },
        {
          id: 'm5-l6-u2',
          title: '阻尼振动',
          intro: {
            hook: '现实里弹簧总会停下来——因为有摩擦（<strong>阻尼</strong>）。加上阻尼力 $-c x\'$，方程变成 $mx\'\' + cx\' + kx = 0$。特征根变成复数 $\\alpha \\pm \\beta i$，$\\alpha < 0$——振荡被 $e^{\\alpha t}$ 逐渐压平。',
            visual: { type: 'plotter', f: 'Math.exp(-0.3*x) * Math.cos(2*x)', xMin: 0, xMax: 12, yMin: -1.2, yMax: 1.2 },
            intuition: '上图：$e^{-0.3t} \\cos 2t$。每一个波峰都比上一个矮——这就是阻尼振动。$\\alpha = -0.3$ 控制「多快停下来」，$\\beta = 2$ 控制「振多快」。',
            formula: { latex: 'mx\'\' + cx\' + kx = 0 \\implies x = e^{\\alpha t}(C_1 \\cos\\beta t + C_2 \\sin\\beta t)', caption: '$\\alpha = -c/(2m) < 0$（衰减），$\\beta = \\sqrt{k/m - (c/2m)^2}$（振荡频率变慢了一点）。' },
            takeaway: '阻尼 = 振荡 × 指数衰减。现实世界没有永远不停的振动。'
          },
          exercises: [
            { type: 'choice', prompt: '阻尼振动中，振幅随时间怎样变化？',
              options: ['不变', '线性减小', '指数减小', '先增后减'], answer: 2,
              explain: '被 $e^{\\alpha t}$（$\\alpha < 0$）包络，指数衰减。' },
            { type: 'truefalse', prompt: '阻尼越大（$c$ 越大），振动消失得越快。', answer: true,
              explain: '$\\alpha = -c/(2m)$，$c$ 越大 $|\\alpha|$ 越大，衰减越快。' },
            { type: 'choice', prompt: '若阻尼太大（$c^2 > 4mk$），会怎样？',
              options: ['振得更快', '不振了，直接衰减回零', '爆炸', '保持不变'], answer: 1,
              explain: '判别式变正，两个实根（都是负的），解变成两个指数衰减相加——没有振荡。这叫<em>过阻尼</em>。' },
            { type: 'fill', prompt: '$e^{-0.5t} \\cos 3t$ 描述一个阻尼振动。阻尼因子是 $\\alpha = $ ___', answer: '-0.5',
              explain: '$e^{\\alpha t}$ 中 $\\alpha = -0.5$。' },
            { type: 'choice', prompt: '微分方程把弹簧、电路、声波统一起来。$LC$ 电路的方程 $L q\'\' + R q\' + q/C = 0$ 和弹簧方程结构完全一样，其中 $R$ 对应什么？',
              options: ['质量（惯性）', '弹簧常数（回复力）', '阻尼系数（耗散）', '初始条件'], answer: 2,
              explain: '电阻 $R$ 消耗能量 → 阻尼。$L$ 对应质量，$1/C$ 对应弹簧常数。方程一样，物理不同，数学统一。' }
          ]
        },
        {
          id: 'm5-l6-u3',
          title: '回顾：微积分的全景',
          intro: {
            hook: '从「函数是一台机器」到「微分方程让函数自己讲故事」——你已经走完了微积分的核心旅程。',
            intuition: '<strong>导数</strong>把整体拆成瞬间（$\\Delta y / \\Delta x \\to dy/dx$），<strong>积分</strong>把瞬间加回整体（$\\sum f \\cdot \\Delta x \\to \\int f\\,dx$）。<strong>微积分基本定理</strong>说它们互为逆运算。<strong>微分方程</strong>用这个语言描述自然：人口增长、行星运动、声波传播……数学是宇宙的母语。',
            takeaway: '微分拆碎，积分拼回。这门语言，你已经会说了。'
          },
          exercises: [
            { type: 'choice', prompt: '导数描述的是什么？',
              options: ['面积', '瞬时变化率', '累积总量', '方程的根'], answer: 1,
              explain: '导数 = 瞬时变化率 = 切线斜率。' },
            { type: 'choice', prompt: '积分描述的是什么？',
              options: ['变化速度', '累积效果（面积、总量）', '最大值', '周期'], answer: 1,
              explain: '积分把微小的变化加起来，得到累积的总量。' },
            { type: 'choice', prompt: '微积分基本定理连接了？',
              options: ['加法和乘法', '导数和积分', '三角和指数', '实数和复数'], answer: 1,
              explain: '$\\int_a^b f\\,dx = F(b) - F(a)$：积分通过求原函数（导数的逆）来计算。' },
            { type: 'truefalse', prompt: '$y\' = ky$ 的解是指数函数。', answer: true,
              explain: '$y = Ce^{kx}$，指数增长或衰减。' },
            { type: 'choice', prompt: '如果要用一句话概括微积分，最准确的是？',
              options: ['研究方程的学科', '研究变化与累积的数学', '研究图形的学科', '研究数字的学科'], answer: 1,
              explain: '微积分的核心就是两件事：分析变化（微分）和累积效果（积分）。' }
          ]
        }
      ]
    }
  ]
};
