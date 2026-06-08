// M4 积分 — 16 micro-lessons across 7 lessons.

export const m4 = {
  id: 'm4',
  title: 'M4 · 积分',
  subtitle: '把碎片加回来',
  lessons: [
    // ───────────────────────────────────────────────────────────────
    // L1 不定积分（反导数）
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm4-l1',
      title: '不定积分（反导数）',
      units: [
        {
          id: 'm4-l1-u1',
          title: '从速度找回位置',
          intro: {
            hook: '导数把位置变成速度。那如果只知道速度，能<strong>倒推回位置</strong>吗？能。这就是<strong>积分</strong>——导数的逆运算。',
            visual: { type: 'plotter', f: '2*x', xMin: -1, xMax: 4, yMin: -2, yMax: 8, showPoint: true, initialX: 2 },
            intuition: '上图是 $v(t) = 2t$（速度随时间增长）。你知道速度是位置的导数，那什么函数的导数等于 $2t$？是 $t^2$。所以位置函数是 $s(t) = t^2$（加个常数也行）。<em>找一个函数，使它的导数等于给定函数</em>——这就是积分在做的事。',
            formula: { latex: 'F\'(x) = f(x) \\implies F(x) \\text{ 是 } f(x) \\text{ 的一个原函数}', caption: '$F$ 叫做 $f$ 的<strong>原函数</strong>（antiderivative）。' },
            takeaway: '积分 = 求导的逆运算 = 找原函数。'
          },
          exercises: [
            { type: 'choice', prompt: '哪个函数的导数是 $2x$？',
              options: ['$x$', '$x^2$', '$x^2 + 1$', '$x^2$ 和 $x^2 + 1$ 都是'], answer: 3,
              explain: '$(x^2)\' = 2x$，$(x^2 + 1)\' = 2x$。加任何常数都行。' },
            { type: 'fill', prompt: '若 $F\'(x) = 3x^2$，则 $F(x)$ 可以是 ___ （写最简单的一个）', answer: ['x^3', 'x³'],
              explain: '$(x^3)\' = 3x^2$。' },
            { type: 'truefalse', prompt: '一个函数的原函数是唯一的。', answer: false,
              explain: '$x^2$、$x^2 + 5$、$x^2 - 100$ 的导数都是 $2x$。原函数之间差一个常数。' },
            { type: 'choice', prompt: '若速度 $v(t) = 0$（物体静止），位置函数 $s(t)$ 是？',
              options: ['$s(t) = 0$', '$s(t) = t$', '$s(t) = $ 任意常数', '$s(t) = \\infty$'], answer: 2,
              explain: '常数的导数是 0。物体不动，但可以停在任何位置上。' },
            { type: 'fill', prompt: '若 $F\'(x) = \\cos x$，则 $F(x) = $ ___（写一个原函数）', answer: ['sin x', 'sinx', 'sin(x)'],
              explain: '$(\\sin x)\' = \\cos x$。' }
          ]
        },
        {
          id: 'm4-l1-u2',
          title: '不定积分的记号',
          intro: {
            hook: '数学家用一个拉长的 S（∫）表示「求原函数」。它的全名叫<strong>不定积分</strong>。',
            intuition: '$\\int f(x)\\,dx$ 读作「f(x) 的不定积分」。$\\int$ 是积分号，$f(x)$ 是被积函数，$dx$ 表示「对 x 积」。结果永远要<strong>加 C</strong>——因为常数求导为 0，所以原函数差一个常数都行。',
            formula: { latex: '\\int f(x)\\,dx = F(x) + C', caption: '$F\'(x) = f(x)$，$C$ 是任意常数。验算：把结果求导，应该还原成 $f(x)$。' },
            takeaway: '$\\int$ = 求导的反操作。别忘了 $+ C$。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\int 2x\\,dx$ 等于？',
              options: ['$x^2$', '$x^2 + C$', '$2x^2 + C$', '$2$'], answer: 1,
              explain: '$(x^2)\' = 2x$，所以 $\\int 2x\\,dx = x^2 + C$。' },
            { type: 'truefalse', prompt: '$\\int 2x\\,dx = x^2$（不加 $C$）也算对。', answer: false,
              explain: '不定积分必须加 $C$。$x^2 + 7$ 的导数也是 $2x$，缺了 $C$ 就漏掉了一族解。' },
            { type: 'fill', prompt: '$\\int 1\\,dx = x + $ ___', answer: 'C',
              explain: '$(x)\' = 1$，所以 $\\int 1\\,dx = x + C$。' },
            { type: 'choice', prompt: '怎么验算 $\\int f(x)\\,dx$ 的结果是否正确？',
              options: ['再积一次', '把结果求导，看是否等于 $f(x)$', '画图', '没法验算'], answer: 1,
              explain: '积分和导数互逆。把答案求导，回到被积函数就对了。' },
            { type: 'fill', prompt: '$\\int \\cos x\\,dx = $ ___ $+ C$', answer: ['sin x', 'sinx', 'sin(x)'],
              explain: '$(\\sin x)\' = \\cos x$。验算 ✓。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L2 基本积分公式
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm4-l2',
      title: '基本积分公式',
      units: [
        {
          id: 'm4-l2-u1',
          title: '幂函数：指数加一除以新指数',
          intro: {
            hook: '导数是「指数搬前面，自减一」。反过来，积分就是「指数加一，除以新指数」。',
            visual: { type: 'plotter', f: 'x*x', xMin: -2, xMax: 2, yMin: -1, yMax: 4, showPoint: true, initialX: 1 },
            intuition: '$(x^2)\' = 2x$，反过来 $\\int 2x\\,dx = x^2 + C$。更一般地，$\\int x^n\\,dx$ 就是把指数加 1、除以新指数。唯一例外：$n = -1$ 时 $\\int x^{-1}\\,dx = \\ln|x| + C$（因为 $1/0$ 没意义）。',
            formula: { latex: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\ne -1)', caption: '反向的幂法则。$n = -1$ 时用 $\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C$。' },
            takeaway: '指数 +1，除以新指数。$n = -1$ 例外用 ln。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\int x^3\\,dx = \\dfrac{x^?}{4} + C$，? = ___', answer: '4',
              explain: '$n = 3$，加 1 得 4。$\\int x^3\\,dx = \\dfrac{x^4}{4} + C$。' },
            { type: 'choice', prompt: '$\\int x^5\\,dx$ 等于？',
              options: ['$5x^4 + C$', '$\\dfrac{x^6}{6} + C$', '$\\dfrac{x^5}{5} + C$', '$x^6 + C$'], answer: 1,
              explain: '指数 $5 + 1 = 6$，除以 6。' },
            { type: 'fill', prompt: '$\\int 1\\,dx = \\int x^0\\,dx = $ ___ $+ C$', answer: 'x',
              explain: '$0 + 1 = 1$，$\\dfrac{x^1}{1} = x$。' },
            { type: 'choice', prompt: '$\\int \\dfrac{1}{x}\\,dx$ 等于？',
              options: ['$\\dfrac{x^0}{0} + C$（不存在）', '$\\ln x + C$', '$\\ln|x| + C$', '$-\\dfrac{1}{x^2} + C$'], answer: 2,
              explain: '这是 $n = -1$ 的例外。要加绝对值：$\\ln|x| + C$。' },
            { type: 'fill', prompt: '$\\int \\sqrt{x}\\,dx = \\int x^{1/2}\\,dx = \\dfrac{2}{3}x^{$ ___ $} + C$', answer: ['3/2', '1.5'],
              explain: '$1/2 + 1 = 3/2$，$\\dfrac{x^{3/2}}{3/2} = \\dfrac{2}{3}x^{3/2}$。' }
          ]
        },
        {
          id: 'm4-l2-u2',
          title: '三角与指数：把导数表倒过来',
          intro: {
            hook: '把求导公式表倒过来读，就是积分公式表。sin 导得 cos → cos 积回 sin。$e^x$ 导得 $e^x$ → $e^x$ 积还是 $e^x$。',
            formula: { latex: '\\int \\cos x\\,dx = \\sin x + C, \\quad \\int \\sin x\\,dx = -\\cos x + C, \\quad \\int e^x\\,dx = e^x + C', caption: '注意 sin 积分有负号。验算：$(-\\cos x)\' = \\sin x$ ✓。' },
            intuition: '为什么 $\\int \\sin x\\,dx = -\\cos x + C$？因为 $(-\\cos x)\' = -(-\\sin x) = \\sin x$。两个负号抵消了。',
            takeaway: 'cos → sin，sin → -cos，$e^x$ → $e^x$。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\int \\sin x\\,dx$ 等于？',
              options: ['$\\cos x + C$', '$-\\cos x + C$', '$-\\sin x + C$', '$\\sin x + C$'], answer: 1,
              explain: '$(-\\cos x)\' = \\sin x$。注意负号。' },
            { type: 'fill', prompt: '$\\int e^x\\,dx = $ ___ $+ C$', answer: ['e^x', 'exp(x)'],
              explain: '$e^x$ 的导数是自己，积分也是自己。' },
            { type: 'choice', prompt: '$\\int \\cos x\\,dx$ 等于？',
              options: ['$\\sin x + C$', '$-\\sin x + C$', '$\\cos x + C$', '$\\tan x + C$'], answer: 0,
              explain: '$(\\sin x)\' = \\cos x$，直接反过来。' },
            { type: 'choice', prompt: '$\\int \\sec^2 x\\,dx$ 等于？（提示：什么函数求导得 $\\sec^2 x$？）',
              options: ['$\\sec x + C$', '$\\tan x + C$', '$\\sin^2 x + C$', '$\\cos^2 x + C$'], answer: 1,
              explain: '$(\\tan x)\' = \\sec^2 x$，所以 $\\int \\sec^2 x\\,dx = \\tan x + C$。' },
            { type: 'fill', prompt: '$\\int \\dfrac{1}{\\cos^2 x}\\,dx = $ ___ $+ C$', answer: ['tan x', 'tanx', 'tan(x)'],
              explain: '$\\dfrac{1}{\\cos^2 x} = \\sec^2 x$，积分得 $\\tan x + C$。' }
          ]
        },
        {
          id: 'm4-l2-u3',
          title: '线性性：拆开积、提出常数',
          intro: {
            hook: '跟导数一样，积分也允许「拆和」和「提常数」——这让你把复杂的被积函数拆成简单零件，一块一块积。',
            formula: { latex: '\\int [f(x) \\pm g(x)]\\,dx = \\int f(x)\\,dx \\pm \\int g(x)\\,dx, \\quad \\int c\\,f(x)\\,dx = c \\int f(x)\\,dx', caption: '加减可拆，常数可提。但乘除<em>不能</em>拆！' },
            intuition: '$\\int (3x^2 + 2x)\\,dx$：拆成 $\\int 3x^2\\,dx + \\int 2x\\,dx = 3 \\cdot \\dfrac{x^3}{3} + 2 \\cdot \\dfrac{x^2}{2} = x^3 + x^2 + C$。',
            takeaway: '积分的加减和数乘可以穿透 $\\int$，但乘除不行。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\int (x^2 + 1)\\,dx = \\dfrac{x^3}{3} + $ ___ $+ C$', answer: 'x',
              explain: '$\\int x^2\\,dx + \\int 1\\,dx = \\dfrac{x^3}{3} + x + C$。' },
            { type: 'choice', prompt: '$\\int 5x^4\\,dx$ 等于？',
              options: ['$20x^3 + C$', '$x^5 + C$', '$\\dfrac{5x^5}{5} + C$', '$5x^5 + C$'], answer: 1,
              explain: '$5 \\cdot \\dfrac{x^5}{5} = x^5$。选项 B 和 C 一样。' },
            { type: 'fill', prompt: '$\\int (3\\cos x - 2\\sin x)\\,dx = 3\\sin x + $ ___ $\\cos x + C$（填带符号的系数）', answer: '2',
              explain: '$\\int -2\\sin x\\,dx = -2 \\cdot (-\\cos x) = 2\\cos x$。' },
            { type: 'truefalse', prompt: '$\\int f(x) \\cdot g(x)\\,dx = \\int f(x)\\,dx \\cdot \\int g(x)\\,dx$。', answer: false,
              explain: '积分对乘法不能拆！这是常见错误。乘积的积分需要用分部积分法（后面学）。' },
            { type: 'choice', prompt: '$\\int (6x^2 - 4x + 1)\\,dx$ 等于？',
              options: ['$2x^3 - 2x^2 + x + C$', '$12x - 4 + C$', '$6x^3 - 4x^2 + x + C$', '$2x^3 - 4x + C$'], answer: 0,
              explain: '$6 \\cdot \\dfrac{x^3}{3} - 4 \\cdot \\dfrac{x^2}{2} + 1 \\cdot x = 2x^3 - 2x^2 + x + C$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L3 换元积分法
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm4-l3',
      title: '换元积分法',
      units: [
        {
          id: 'm4-l3-u1',
          title: '凑微分：把「内层的导数」拎出来',
          intro: {
            hook: '链式法则说 $(F(g(x)))\' = F\'(g(x)) \\cdot g\'(x)$。反过来：如果被积函数恰好是「外层函数 × 内层导数」的形状，就能直接积。',
            intuition: '看 $\\int 2x \\cdot \\cos(x^2)\\,dx$。令 $u = x^2$，则 $du = 2x\\,dx$。原式 = $\\int \\cos u\\,du = \\sin u + C = \\sin(x^2) + C$。<em>关键</em>：被积函数里正好有 $u\' = 2x$ 当系数。',
            formula: { latex: '\\int f(g(x)) \\cdot g\'(x)\\,dx = \\int f(u)\\,du \\quad (u = g(x))', caption: '令 $u = $ 内层，$du = g\'(x)\\,dx$。' },
            takeaway: '看到「外层 × 内层导数」→ 凑微分换元。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\int 2x \\cos(x^2)\\,dx$，令 $u = x^2$，则原式等于？',
              options: ['$\\cos u + C$', '$\\sin u + C$', '$-\\sin u + C$', '$2\\sin u + C$'], answer: 1,
              explain: '$du = 2x\\,dx$，原式 = $\\int \\cos u\\,du = \\sin u + C = \\sin(x^2) + C$。' },
            { type: 'fill', prompt: '$\\int e^{3x} \\cdot 3\\,dx$，令 $u = 3x$，结果是 ___ $+ C$', answer: ['e^(3x)', 'e^3x', 'e^{3x}'],
              explain: '$du = 3\\,dx$，$\\int e^u\\,du = e^u + C = e^{3x} + C$。' },
            { type: 'choice', prompt: '$\\int \\dfrac{2x}{x^2 + 1}\\,dx$ 等于？',
              options: ['$\\dfrac{1}{x^2 + 1} + C$', '$\\ln(x^2 + 1) + C$', '$\\arctan x + C$', '$(x^2 + 1)^2 + C$'], answer: 1,
              explain: '令 $u = x^2 + 1$，$du = 2x\\,dx$。$\\int \\dfrac{du}{u} = \\ln|u| + C = \\ln(x^2 + 1) + C$（$x^2 + 1 > 0$ 恒成立，不需绝对值）。' },
            { type: 'choice', prompt: '换元法的本质是哪条求导法则的逆运算？',
              options: ['加减法则', '乘法法则', '链式法则', '除法法则'], answer: 2,
              explain: '换元 = 链式法则反过来用。' },
            { type: 'fill', prompt: '$\\int \\cos(2x)\\,dx = \\dfrac{1}{2}\\sin(2x) + C$。为什么有 $\\dfrac{1}{2}$？因为 $(2x)\' = $ ___', answer: '2',
              explain: '内层导数是 2，要除掉它来「凑」出 $du$，所以多出 $1/2$。' }
          ]
        },
        {
          id: 'm4-l3-u2',
          title: '换元练习：常见套路',
          intro: {
            hook: '换元法没有固定流程，但有几种「一眼能看出来」的模式。练多了就成条件反射。',
            intuition: '<strong>模式 1</strong>：$\\int f(ax + b)\\,dx = \\dfrac{1}{a} F(ax + b) + C$。线性内层，直接除以内层系数。<br><strong>模式 2</strong>：被积函数里有 $g(x)$ 和 $g\'(x)$，令 $u = g(x)$。<br><strong>模式 3</strong>：分母是 $1 + x^2$ → 想 $\\arctan$；分母是 $\\sqrt{1 - x^2}$ → 想 $\\arcsin$。',
            formula: { latex: '\\int f(ax + b)\\,dx = \\frac{1}{a} F(ax + b) + C', caption: '线性换元最常用，直接除以 $a$。' },
            takeaway: '线性内层除以系数，复杂内层找导数凑。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\int e^{5x}\\,dx = \\dfrac{1}{ \\text{___} }\\, e^{5x} + C$', answer: '5',
              explain: '线性内层 $5x$，除以系数 5。' },
            { type: 'choice', prompt: '$\\int \\sin(3x + 1)\\,dx$ 等于？',
              options: ['$-\\cos(3x + 1) + C$', '$-\\dfrac{1}{3}\\cos(3x + 1) + C$', '$\\dfrac{1}{3}\\cos(3x + 1) + C$', '$3\\cos(3x + 1) + C$'], answer: 1,
              explain: '$\\sin$ 积分得 $-\\cos$，线性内层除以 3。' },
            { type: 'choice', prompt: '$\\int x \\cdot e^{x^2}\\,dx$ 等于？',
              options: ['$e^{x^2} + C$', '$\\dfrac{1}{2}e^{x^2} + C$', '$2x \\cdot e^{x^2} + C$', '$x^2 e^{x^2} + C$'], answer: 1,
              explain: '令 $u = x^2$，$du = 2x\\,dx$，所以 $x\\,dx = \\dfrac{1}{2}du$。$\\dfrac{1}{2}\\int e^u\\,du = \\dfrac{1}{2}e^{x^2} + C$。' },
            { type: 'fill', prompt: '$\\int (2x + 3)^4\\,dx = \\dfrac{(2x+3)^5}{\\text{___}} + C$', answer: '10',
              explain: '幂法则给 $\\dfrac{u^5}{5}$，线性内层再除以 2，共 $5 \\times 2 = 10$。' },
            { type: 'choice', prompt: '$\\int \\dfrac{1}{1 + x^2}\\,dx$ 等于？',
              options: ['$\\ln(1 + x^2) + C$', '$\\arctan x + C$', '$\\arcsin x + C$', '$\\dfrac{-1}{x} + C$'], answer: 1,
              explain: '这是标准公式：$(\\arctan x)\' = \\dfrac{1}{1 + x^2}$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L4 分部积分法
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm4-l4',
      title: '分部积分法',
      units: [
        {
          id: 'm4-l4-u1',
          title: '乘积的积分：一边积、一边导',
          intro: {
            hook: '乘法的导数法则是 $(uv)\' = u\'v + uv\'$。两边积分移项，就得到了<strong>分部积分公式</strong>：把一个因子积分、另一个求导，把难题变简单。',
            intuition: '比如 $\\int x e^x\\,dx$。直接积没法做。但令 $u = x$（导后更简单），$dv = e^x\\,dx$（容易积）。则 $du = dx$，$v = e^x$。套公式：$x e^x - \\int e^x\\,dx = x e^x - e^x + C$。',
            formula: { latex: '\\int u\\,dv = uv - \\int v\\,du', caption: '口诀：<strong>LIATE</strong>（取 $u$ 的优先顺序）—— Logarithm > Inverse trig > Algebraic > Trig > Exponential。越「难积」的越适合当 $u$（去导）。' },
            takeaway: '一个导、一个积，交换难度。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\int x e^x\\,dx$，取 $u = x$，$dv = e^x\\,dx$。结果是？',
              options: ['$x e^x + C$', '$x e^x - e^x + C$', '$\\dfrac{x^2}{2} e^x + C$', '$e^x + C$'], answer: 1,
              explain: '$uv - \\int v\\,du = x e^x - \\int e^x\\,dx = x e^x - e^x + C$。' },
            { type: 'choice', prompt: '$\\int x \\cos x\\,dx$，取 $u = x$，$dv = \\cos x\\,dx$。结果是？',
              options: ['$x \\sin x + \\cos x + C$', '$x \\sin x - \\cos x + C$', '$\\dfrac{x^2}{2} \\sin x + C$', '$-x \\sin x + C$'], answer: 0,
              explain: '$uv - \\int v\\,du = x \\sin x - \\int \\sin x\\,dx = x \\sin x + \\cos x + C$。' },
            { type: 'choice', prompt: '$\\int \\ln x\\,dx$，取 $u = \\ln x$，$dv = dx$。结果是？',
              options: ['$\\dfrac{1}{x} + C$', '$x \\ln x + C$', '$x \\ln x - x + C$', '$x^2 \\ln x + C$'], answer: 2,
              explain: '$uv - \\int v\\,du = x \\ln x - \\int x \\cdot \\dfrac{1}{x}\\,dx = x \\ln x - x + C$。' },
            { type: 'truefalse', prompt: '分部积分的本质是乘法求导法则的逆运算。', answer: true,
              explain: '$(uv)\' = u\'v + uv\'$ 两边积分再移项，就是分部积分公式。' },
            { type: 'choice', prompt: '做 $\\int x^2 e^x\\,dx$ 时，需要分部积分几次？',
              options: ['一次', '两次', '三次', '无法使用分部积分'], answer: 1,
              explain: '第一次把 $x^2$ 降到 $x$，第二次把 $x$ 降到 $1$。每次分部积分都降一阶。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L5 定积分
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm4-l5',
      title: '定积分',
      units: [
        {
          id: 'm4-l5-u1',
          title: '面积问题：切成无穷窄的条',
          intro: {
            hook: '怎么算一条弯曲线下方的面积？直线好算，曲线不行——除非你把它切成无穷多条<em>极窄的矩形</em>，每条窄到几乎就是一个点。全部加起来，就是精确面积。',
            visual: { type: 'plotter', f: 'x*x', xMin: -0.5, xMax: 2.5, yMin: -0.5, yMax: 5 },
            intuition: '上图是 $y = x^2$。想象从 $x = 0$ 到 $x = 2$，在曲线下面塞满窄矩形。每个矩形的宽是 $\\Delta x$，高是 $f(x_i)$，面积 ≈ $f(x_i) \\cdot \\Delta x$。全部加起来 ≈ 总面积。矩形越窄（$\\Delta x \\to 0$），近似越精确。',
            formula: { latex: '\\text{面积} \\approx \\sum_{i=1}^{n} f(x_i) \\cdot \\Delta x', caption: '这叫<strong>黎曼和</strong>（Riemann sum）。$n \\to \\infty$ 时变成精确的定积分。' },
            takeaway: '曲线下的面积 = 无穷多个极窄矩形面积之和。'
          },
          exercises: [
            { type: 'choice', prompt: '用 4 个等宽矩形估算 $y = x$（$0 \\le x \\le 4$）的面积，每个宽度 $\\Delta x$ 是？',
              options: ['$0.5$', '$1$', '$2$', '$4$'], answer: 1,
              explain: '区间 $[0, 4]$ 分 4 等份，$\\Delta x = 4/4 = 1$。' },
            { type: 'truefalse', prompt: '矩形越多（$n$ 越大），黎曼和越接近真实面积。', answer: true,
              explain: '矩形越窄，「阶梯」越贴合曲线，误差越小。' },
            { type: 'choice', prompt: '黎曼和中，每个矩形的面积等于？',
              options: ['$f(x_i)$', '$\\Delta x$', '$f(x_i) \\cdot \\Delta x$', '$f(x_i) + \\Delta x$'], answer: 2,
              explain: '面积 = 高 × 宽 = $f(x_i) \\cdot \\Delta x$。' },
            { type: 'fill', prompt: '$y = 3$（常函数）从 $x = 0$ 到 $x = 5$ 的面积 = ___', answer: '15',
              explain: '长方形面积 = $3 \\times 5 = 15$。不需要积分也能算。' }
          ]
        },
        {
          id: 'm4-l5-u2',
          title: '定积分的定义',
          intro: {
            hook: '让黎曼和的 $n \\to \\infty$（矩形无穷窄），极限值就是<strong>定积分</strong>。它有上下界（$a$ 到 $b$），算出来是一个<em>确定的数</em>，不是函数，也没有 $+C$。',
            intuition: '不定积分 $\\int f\\,dx$ 是「一族函数」（带 $C$）。定积分 $\\int_a^b f\\,dx$ 是「一个数」——从 $a$ 到 $b$ 之间曲线下的（有符号）面积。',
            formula: { latex: '\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i) \\cdot \\Delta x', caption: '$a$ 是下限，$b$ 是上限。结果是一个数。' },
            takeaway: '定积分 = 黎曼和的极限 = 有界面积（有符号）。'
          },
          exercises: [
            { type: 'truefalse', prompt: '定积分的结果是一个函数。', answer: false,
              explain: '定积分算出来是一个<em>数</em>。不定积分才是函数族。' },
            { type: 'choice', prompt: '定积分 $\\int_0^1 f(x)\\,dx$ 中，0 和 1 分别叫什么？',
              options: ['被积函数和积分变量', '下限和上限', '起点和终点', 'B 和 C 都对'], answer: 3,
              explain: '下限/上限，也叫积分的起点/终点。' },
            { type: 'truefalse', prompt: '定积分的结果要加 $+C$。', answer: false,
              explain: '不需要。$C$ 是不定积分的事。定积分已经有上下限，结果是唯一的数。' },
            { type: 'choice', prompt: '若 $f(x) < 0$（图像在 x 轴下方），$\\int_a^b f(x)\\,dx$ 是？',
              options: ['正数', '负数', '零', '看情况'], answer: 1,
              explain: '曲线在 x 轴下方时定积分为负。定积分算的是<em>有符号面积</em>。' },
            { type: 'fill', prompt: '$\\int_a^a f(x)\\,dx = $ ___（上下限相同）', answer: '0',
              explain: '区间宽度为 0，面积为 0。' }
          ]
        },
        {
          id: 'm4-l5-u3',
          title: '定积分的性质',
          intro: {
            hook: '定积分继承了不定积分的线性性，还多出几条关于上下限的性质。',
            formula: { latex: '\\int_a^b [f \\pm g]\\,dx = \\int_a^b f\\,dx \\pm \\int_a^b g\\,dx', caption: '加减可拆，常数可提——跟不定积分一样。' },
            intuition: '额外性质：<br>• <strong>反向</strong>：$\\int_a^b f\\,dx = -\\int_b^a f\\,dx$（交换上下限取反）。<br>• <strong>拆区间</strong>：$\\int_a^b f\\,dx = \\int_a^c f\\,dx + \\int_c^b f\\,dx$（中间切一刀）。<br>• <strong>同限</strong>：$\\int_a^a f\\,dx = 0$。',
            takeaway: '交换限取反，中间切一刀可拆。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\int_3^1 f(x)\\,dx$ 和 $\\int_1^3 f(x)\\,dx$ 的关系是？',
              options: ['相等', '互为相反数', '没有关系', '互为倒数'], answer: 1,
              explain: '交换上下限取反：$\\int_3^1 = -\\int_1^3$。' },
            { type: 'choice', prompt: '若 $\\int_0^5 f\\,dx = 10$，$\\int_0^3 f\\,dx = 4$，那 $\\int_3^5 f\\,dx = $？',
              options: ['$6$', '$14$', '$-6$', '$4$'], answer: 0,
              explain: '$\\int_0^5 = \\int_0^3 + \\int_3^5$，所以 $10 = 4 + \\int_3^5$，得 6。' },
            { type: 'fill', prompt: '$\\int_0^2 3\\,dx = 3 \\times $ ___ $ = 6$', answer: '2',
              explain: '常函数 $f = 3$，从 0 到 2，面积 = $3 \\times (2 - 0) = 6$。' },
            { type: 'truefalse', prompt: '$\\int_a^b [2f(x) + 3g(x)]\\,dx = 2\\int_a^b f\\,dx + 3\\int_a^b g\\,dx$。', answer: true,
              explain: '线性性：常数提出来，加减拆开。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L6 微积分基本定理
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm4-l6',
      title: '微积分基本定理',
      units: [
        {
          id: 'm4-l6-u1',
          title: '牛顿-莱布尼茨公式',
          intro: {
            hook: '用黎曼和一条条加太慢了。<strong>微积分基本定理</strong>给了一条捷径：要算 $\\int_a^b f\\,dx$，只需要找到 $f$ 的一个原函数 $F$，然后算 $F(b) - F(a)$。就这么简单。',
            visual: { type: 'plotter', f: 'x*x', xMin: -0.5, xMax: 3, yMin: -0.5, yMax: 9 },
            intuition: '想算 $\\int_0^2 x^2\\,dx$（抛物线下的面积）。$x^2$ 的一个原函数是 $\\dfrac{x^3}{3}$。代入上下限：$\\dfrac{2^3}{3} - \\dfrac{0^3}{3} = \\dfrac{8}{3} - 0 = \\dfrac{8}{3}$。不用画矩形、不用求极限，一步搞定。',
            formula: { latex: '\\int_a^b f(x)\\,dx = F(b) - F(a) = F(x)\\Big|_a^b', caption: '竖线记号 $\\Big|_a^b$ 表示「代入 $b$ 减去代入 $a$」。这是微积分里最核心的一条公式。' },
            takeaway: '定积分 = 原函数在上限的值 - 下限的值。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\int_0^2 x^2\\,dx = \\dfrac{x^3}{3}\\Big|_0^2 = $ ___（写成分数）', answer: ['8/3'],
              explain: '$\\dfrac{8}{3} - \\dfrac{0}{3} = \\dfrac{8}{3}$。' },
            { type: 'choice', prompt: '$\\int_0^{\\pi} \\sin x\\,dx$ 等于？',
              options: ['$0$', '$1$', '$2$', '$\\pi$'], answer: 2,
              explain: '$-\\cos x\\Big|_0^{\\pi} = -\\cos\\pi - (-\\cos 0) = -(-1) + 1 = 2$。' },
            { type: 'fill', prompt: '$\\int_1^e \\dfrac{1}{x}\\,dx = \\ln x \\Big|_1^e = $ ___', answer: '1',
              explain: '$\\ln e - \\ln 1 = 1 - 0 = 1$。' },
            { type: 'choice', prompt: '$\\int_0^1 e^x\\,dx$ 等于？',
              options: ['$1$', '$e$', '$e - 1$', '$e + 1$'], answer: 2,
              explain: '$e^x\\Big|_0^1 = e^1 - e^0 = e - 1$。' },
            { type: 'truefalse', prompt: '用牛顿-莱布尼茨公式时需要加 $+C$。', answer: false,
              explain: '不需要。$C$ 在 $F(b) - F(a)$ 中会被减掉，对结果没影响。' }
          ]
        },
        {
          id: 'm4-l6-u2',
          title: '算面积实战',
          intro: {
            hook: '有了公式，算面积就是「找原函数 → 代入上下限 → 做减法」三步。来练几道。',
            visual: { type: 'plotter', f: 'sin(x)', xMin: -0.5, xMax: 6.78, yMin: -1.5, yMax: 1.5 },
            intuition: '注意：定积分算的是<em>有符号面积</em>。若 $f(x) < 0$，那段面积是负的。要求几何面积（永远为正），需要对负的部分取绝对值或拆区间。',
            takeaway: '定积分 = 有符号面积。几何面积可能要拆区间取绝对值。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\int_0^3 2x\\,dx = x^2\\Big|_0^3 = $ ___', answer: '9',
              explain: '$3^2 - 0^2 = 9$。' },
            { type: 'choice', prompt: '$\\int_0^{2\\pi} \\sin x\\,dx$ 等于？',
              options: ['$0$', '$2$', '$4$', '$2\\pi$'], answer: 0,
              explain: '$-\\cos x\\Big|_0^{2\\pi} = -\\cos 2\\pi + \\cos 0 = -1 + 1 = 0$。正负面积恰好抵消。' },
            { type: 'choice', prompt: '上题结果是 0，但 sin 曲线明显围出了面积。要算<em>几何面积</em>该怎么办？',
              options: ['直接取绝对值 $|0| = 0$', '拆成 $[0, \\pi]$ 和 $[\\pi, 2\\pi]$，分别算绝对值再相加', '换成 cos 再算', '没法算'], answer: 1,
              explain: '$\\int_0^\\pi \\sin x\\,dx = 2$（正面积），$\\int_\\pi^{2\\pi} \\sin x\\,dx = -2$（负面积）。几何面积 = $2 + |-2| = 4$。' },
            { type: 'fill', prompt: '$\\int_1^4 \\sqrt{x}\\,dx = \\dfrac{2}{3}x^{3/2}\\Big|_1^4 = \\dfrac{2}{3}(8 - 1) = $ ___（写成分数）', answer: ['14/3'],
              explain: '$4^{3/2} = (\\sqrt{4})^3 = 8$，$1^{3/2} = 1$。$\\dfrac{2}{3}(8 - 1) = \\dfrac{14}{3}$。' },
            { type: 'choice', prompt: '$\\int_{-1}^{1} x^3\\,dx$ 等于？',
              options: ['$0$', '$\\dfrac{1}{2}$', '$2$', '$-\\dfrac{1}{2}$'], answer: 0,
              explain: '$x^3$ 是奇函数，在对称区间 $[-1, 1]$ 上积分为 0。也可算：$\\dfrac{x^4}{4}\\Big|_{-1}^1 = \\dfrac{1}{4} - \\dfrac{1}{4} = 0$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L7 定积分的应用
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm4-l7',
      title: '定积分的应用',
      units: [
        {
          id: 'm4-l7-u1',
          title: '两条曲线之间的面积',
          intro: {
            hook: '一条曲线下的面积会了。那<em>两条曲线之间</em>呢？上面的减下面的，从左积到右。',
            visual: { type: 'plotter', f: 'x', xMin: -0.5, xMax: 3, yMin: -0.5, yMax: 5 },
            intuition: '要算 $y = x^2$ 和 $y = x$ 之间的面积。先找交点：$x^2 = x \\Rightarrow x = 0, 1$。在 $[0, 1]$ 上 $x \\ge x^2$（直线在抛物线上面），所以面积 = $\\int_0^1 (x - x^2)\\,dx = \\dfrac{x^2}{2} - \\dfrac{x^3}{3}\\Big|_0^1 = \\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{1}{6}$。',
            formula: { latex: 'A = \\int_a^b |f(x) - g(x)|\\,dx', caption: '上面的减下面的。若不确定谁在上面，加绝对值或拆区间。' },
            takeaway: '两曲线面积 = $\\int$(上 - 下) dx。'
          },
          exercises: [
            { type: 'fill', prompt: '$y = x$ 和 $y = x^2$ 从 $x = 0$ 到 $x = 1$ 之间的面积 = ___（写成分数）', answer: ['1/6'],
              explain: '$\\int_0^1 (x - x^2)\\,dx = \\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{1}{6}$。' },
            { type: 'choice', prompt: '算两曲线面积的第一步是？',
              options: ['直接积分', '找交点确定区间', '画图', '求导'], answer: 1,
              explain: '交点决定了积分的上下限。' },
            { type: 'choice', prompt: '$y = 4 - x^2$ 和 $y = 0$（x 轴）围成的面积，区间是？',
              options: ['$[0, 4]$', '$[-2, 2]$', '$[0, 2]$', '$[-4, 4]$'], answer: 1,
              explain: '$4 - x^2 = 0 \\Rightarrow x = \\pm 2$。交点在 $x = -2$ 和 $x = 2$。' },
            { type: 'fill', prompt: '$\\int_{-2}^{2} (4 - x^2)\\,dx = [4x - \\dfrac{x^3}{3}]_{-2}^{2}$。代入得 ___（写成分数）', answer: ['32/3'],
              explain: '代入 2：$8 - 8/3 = 16/3$。代入 -2：$-8 + 8/3 = -16/3$。相减：$16/3 - (-16/3) = 32/3$。' },
            { type: 'truefalse', prompt: '若在 $[a, b]$ 上两条曲线交叉（谁上谁下会变），可以在交叉点处拆成两段分别算。', answer: true,
              explain: '拆开后每段都保证一条在上、一条在下，分别积再加起来。' }
          ]
        },
        {
          id: 'm4-l7-u2',
          title: '旋转体的体积',
          intro: {
            hook: '把一条曲线绕 x 轴旋转 360°，扫出来一个「旋转体」。它的体积怎么算？把它切成无穷多片极薄的<strong>圆盘</strong>，每片半径是 $f(x)$，面积是 $\\pi [f(x)]^2$。',
            visual: { type: 'plotter', f: 'Math.sqrt(x)', xMin: -0.5, xMax: 4.5, yMin: -0.5, yMax: 2.5, showPoint: true, initialX: 2 },
            intuition: '上图 $y = \\sqrt{x}$，从 $x = 0$ 到 $x = 4$ 绕 x 轴转一圈。在位置 $x$ 处切一刀，截面是半径 $\\sqrt{x}$ 的圆，面积 $\\pi x$。所有圆盘厚 $dx$ 叠起来：$V = \\int_0^4 \\pi x\\,dx = \\pi \\cdot \\dfrac{x^2}{2}\\Big|_0^4 = 8\\pi$。',
            formula: { latex: 'V = \\int_a^b \\pi [f(x)]^2\\,dx', caption: '圆盘法（disk method）。每片体积 = $\\pi r^2 \\cdot dx$，$r = f(x)$。' },
            takeaway: '旋转体体积 = $\\pi \\int [f(x)]^2\\,dx$。'
          },
          exercises: [
            { type: 'choice', prompt: '$y = x$（$0 \\le x \\le 3$）绕 x 轴旋转，是什么形状？',
              options: ['圆柱', '圆锥', '球', '抛物面'], answer: 1,
              explain: '直线从原点出发绕轴转，扫出一个圆锥。' },
            { type: 'fill', prompt: '上题圆锥体积 $V = \\int_0^3 \\pi x^2\\,dx = \\pi \\cdot \\dfrac{x^3}{3}\\Big|_0^3 = $ ___$\\pi$', answer: '9',
              explain: '$\\dfrac{27}{3} = 9$。所以 $V = 9\\pi$。正好等于 $\\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi \\cdot 9 \\cdot 3 = 9\\pi$。' },
            { type: 'choice', prompt: '$y = \\sqrt{r^2 - x^2}$（上半圆）绕 x 轴转一圈得到什么？',
              options: ['圆柱', '圆环', '球', '圆锥'], answer: 2,
              explain: '上半圆绕 x 轴转 360° 得到完整的球。' },
            { type: 'choice', prompt: '球的体积公式 $V = \\dfrac{4}{3}\\pi r^3$ 可以用哪种方法推导？',
              options: ['求导', '圆盘法积分', '勾股定理', '夹逼定理'], answer: 1,
              explain: '$V = \\int_{-r}^{r} \\pi(r^2 - x^2)\\,dx = \\pi[r^2 x - \\dfrac{x^3}{3}]_{-r}^r = \\dfrac{4}{3}\\pi r^3$。' },
            { type: 'truefalse', prompt: '圆盘法的核心思想和定积分的定义一样：把连续的量切成无穷多个小片再加起来。', answer: true,
              explain: '正是如此。积分的本质就是「切片求和取极限」，面积、体积、弧长……都是这个思路。' }
          ]
        }
      ]
    }
  ]
};
