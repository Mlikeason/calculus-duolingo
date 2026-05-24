// M2 极限与连续 — 18 micro-lessons across 6 lessons.

export const m2 = {
  id: 'm2',
  title: 'M2 · 极限与连续',
  subtitle: '微积分的第一块基石',
  lessons: [
    // ───────────────────────────────────────────────────────────────
    // L1 极限直观
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm2-l1',
      title: '极限直观',
      units: [
        {
          id: 'm2-l1-u1',
          title: '靠近但不一定抵达',
          intro: {
            hook: '你走向一面墙，每步走剩下距离的一半。第一步走 1 米，第二步 0.5 米，第三步 0.25 米……你<em>永远</em>走不到墙边，但你想多近就多近。这面墙，就是你的<strong>极限</strong>。',
            visual: { type: 'limit-approach', f: '(x*x - 1)/(x - 1)', a: 1, L: 2, xMin: -1, xMax: 3, yMin: -1, yMax: 4, initialX: 0.2 },
            intuition: '上图是 $f(x) = \\dfrac{x^2 - 1}{x - 1}$。当 $x = 1$ 时分母为 0，函数无定义（图上那个空心圆）。但 x 越接近 1，f(x) 越接近 2。极限不问「站在 x = 1 的时候 f 是多少」，只问「向 x = 1 靠近的路上 f 朝哪里去」。',
            formula: { latex: '\\lim_{x \\to a} f(x) = L', caption: '当 x 无限接近 a 时，f(x) 无限接近 L。' },
            takeaway: '极限是「趋向」的描述，与函数在那一点是否有定义无关。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 3} (2x + 1)$ 等于多少？',
              options: ['$5$', '$6$', '$7$', '不存在'], answer: 2,
              explain: '$2x+1$ 是连续的，直接代入：$2 \\times 3 + 1 = 7$。' },
            { type: 'truefalse', prompt: '若 $\\displaystyle \\lim_{x \\to 1} f(x) = 5$，则一定有 $f(1) = 5$。', answer: false,
              explain: '极限只关心「靠近时」的样子。$f(1)$ 可以是别的值、甚至没有定义。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 0} (x^2 + 3) = $ ___', answer: '3',
              explain: '直接代入：$0^2 + 3 = 3$。' },
            { type: 'choice', prompt: '$f(x) = \\dfrac{x^2 - 4}{x - 2}$ 在 $x \\to 2$ 时的极限是？',
              options: ['$0$', '$2$', '$4$', '不存在'], answer: 2,
              explain: '约分：$(x-2)(x+2)/(x-2) = x + 2$。再代入 $x = 2$ 得 4。' },
            { type: 'choice', prompt: '想像 $f(x) = \\dfrac{\\sin x}{x}$，已知 $f(0)$ 没有定义。$\\displaystyle \\lim_{x \\to 0} f(x)$ 的结果会是？',
              options: ['一定不存在', '$0$', '$1$', '$\\infty$'], answer: 2,
              explain: '虽然 $f(0)$ 没定义，但 x 靠近 0 时 f(x) 越来越接近 1 — 极限存在并等于 1。下一节会推导。' }
          ]
        },
        {
          id: 'm2-l1-u2',
          title: '左极限与右极限',
          intro: {
            hook: '走向一个十字路口，可以从东边来，也可以从西边来。函数也分「从左边靠近」和「从右边靠近」两条路——这就是<strong>左极限</strong>和<strong>右极限</strong>。',
            visual: { type: 'plotter', f: 'x < 0 ? x + 1 : x - 1', xMin: -3, xMax: 3, yMin: -3, yMax: 2 },
            intuition: '上图是分段函数 $f(x) = \\begin{cases} x + 1 & x < 0 \\\\ x - 1 & x \\ge 0 \\end{cases}$。从左边靠近 0：f 趋向 1；从右边靠近 0：f 趋向 -1。两条路通向不同的目的地。',
            formula: { latex: '\\lim_{x \\to a^-} f(x) \\quad \\text{和} \\quad \\lim_{x \\to a^+} f(x)', caption: '上标 ⁻ 是从小于 a 的方向；⁺ 是从大于 a 的方向。' },
            takeaway: '双侧极限存在 ⟺ 左极限 = 右极限。'
          },
          exercises: [
            { type: 'choice', prompt: '上面分段函数 $\\displaystyle \\lim_{x \\to 0^-} f(x)$ 等于？',
              options: ['$-1$', '$0$', '$1$', '不存在'], answer: 2,
              explain: '从左边来用 $x + 1$：x 趋近 0，结果趋近 1。' },
            { type: 'choice', prompt: '它的右极限 $\\displaystyle \\lim_{x \\to 0^+} f(x)$ 等于？',
              options: ['$-1$', '$0$', '$1$', '不存在'], answer: 0,
              explain: '从右边来用 $x - 1$：x 趋近 0，结果趋近 -1。' },
            { type: 'truefalse', prompt: '上面这个函数在 $x \\to 0$ 处的双侧极限存在。', answer: false,
              explain: '左极限 1，右极限 -1，两边不相等，所以双侧极限不存在。' },
            { type: 'choice', prompt: '若 $\\displaystyle \\lim_{x \\to a^-} f(x) = 3$ 且 $\\displaystyle \\lim_{x \\to a^+} f(x) = 3$，那 $\\displaystyle \\lim_{x \\to a} f(x)$ 是？',
              options: ['$0$', '$3$', '$6$', '不能确定'], answer: 1,
              explain: '两侧相等时双侧极限存在，值就是这个公共值 3。' },
            { type: 'fill', prompt: '若 $\\displaystyle \\lim_{x \\to 1^-} f(x) = 2$，$\\displaystyle \\lim_{x \\to 1^+} f(x) = 2$，那么 $\\displaystyle \\lim_{x \\to 1} f(x) = $ ___', answer: '2',
              explain: '两边都到 2，双侧极限就是 2。' }
          ]
        },
        {
          id: 'm2-l1-u3',
          title: '极限值 vs 函数值',
          intro: {
            hook: '极限只看「靠近的路上」，函数值只看「站在那一点」。这是两件事。它们可能相等，也可能不等——这就引出了「连续」与「间断」的概念，后面会展开。',
            visual: { type: 'discontinuity-types' },
            intuition: '左图：lim 存在，但 f(a) 缺失或不等（<em>可去间断</em>）。中图：左右极限不相等，整体极限不存在（<em>跳跃间断</em>）。右图：函数飞向无穷，极限不存在（<em>无穷间断</em>）。',
            takeaway: '$\\lim_{x \\to a} f(x)$ 和 $f(a)$ 是两个独立的问题。'
          },
          exercises: [
            { type: 'truefalse', prompt: '极限存在就一定意味着函数在那一点有定义。', answer: false,
              explain: '不一定。比如 $\\dfrac{x^2 - 1}{x - 1}$ 在 x=1 没定义，但极限是 2。' },
            { type: 'truefalse', prompt: '函数在某点有定义就一定意味着那一点的极限存在。', answer: false,
              explain: '也不一定。比如 $f(x) = \\begin{cases} 1, x < 0 \\\\ 2, x \\ge 0 \\end{cases}$，$f(0) = 2$ 有定义，但左右极限不等，极限不存在。' },
            { type: 'choice', prompt: '若 $\\lim_{x \\to 1} f(x) = 5$ 但 $f(1) = 7$，这属于什么情况？',
              options: ['函数连续', '可去间断（洞）', '跳跃间断', '无穷间断'], answer: 1,
              explain: '极限存在，但函数值与极限不等，是「可去间断」——只要把 $f(1)$ 改成 5 就能补上洞。' },
            { type: 'choice', prompt: '$f(x) = \\dfrac{1}{x}$ 在 $x \\to 0$ 处是哪种情况？',
              options: ['连续', '可去间断', '跳跃间断', '无穷间断'], answer: 3,
              explain: '右边趋向 +∞，左边趋向 -∞，是无穷间断。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L2 极限的运算法则
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm2-l2',
      title: '极限的运算法则',
      units: [
        {
          id: 'm2-l2-u1',
          title: '加减乘除：极限对组装很友善',
          intro: {
            hook: '如果你知道 $\\lim f = A$、$\\lim g = B$，那么 f 和 g 通过加减乘除组装出来的新函数，它们的极限就是 A 和 B 的同样组装。',
            visual: { type: 'plotter', f: 'x*x + 2*x', xMin: -3, xMax: 2, yMin: -2, yMax: 8 },
            intuition: '把上图的 $x^2 + 2x$ 看成 $f(x) = x^2$ 和 $g(x) = 2x$ 相加。$x \\to 1$ 时 f → 1，g → 2，整体 → 3。',
            formula: { latex: '\\lim(f \\pm g) = \\lim f \\pm \\lim g, \\quad \\lim(f \\cdot g) = \\lim f \\cdot \\lim g, \\quad \\lim \\frac{f}{g} = \\frac{\\lim f}{\\lim g} \\ (\\lim g \\ne 0)', caption: '除法要保证分母极限不为 0。' },
            takeaway: '多项式直接代入就能求极限。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 2} (3x + 1) = $ ___', answer: '7',
              explain: '代入：$3 \\times 2 + 1 = 7$。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 1} (x^2 + 2x - 3) = $ ___', answer: '0',
              explain: '$1 + 2 - 3 = 0$。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 3} \\dfrac{x^2 - 1}{x + 1}$ 等于？',
              options: ['$0$', '$2$', '$\\dfrac{8}{4} = 2$', '$\\dfrac{8}{4}$'], answer: 2,
              explain: '分母在 x=3 处非 0，可直接代入：$\\dfrac{9-1}{3+1} = \\dfrac{8}{4} = 2$。' },
            { type: 'truefalse', prompt: '只要 lim f 和 lim g 都存在，就一定有 $\\displaystyle \\lim \\dfrac{f}{g} = \\dfrac{\\lim f}{\\lim g}$。', answer: false,
              explain: '还要求分母的极限 ≠ 0，否则分式法则不适用，需要别的方法。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 0} (5 - x^2) = $ ___', answer: '5',
              explain: '代入：$5 - 0 = 5$。' }
          ]
        },
        {
          id: 'm2-l2-u2',
          title: '直接代入 vs 「不定型」',
          intro: {
            hook: '大多数极限题，直接代 x = a 就行。但有时你会得到 $\\dfrac{0}{0}$ 或 $\\dfrac{\\infty}{\\infty}$——这种叫<strong>不定型</strong>，意思不是「无解」，而是「这种形式下答案可以是任何值，必须先变形」。',
            visual: { type: 'limit-approach', f: '(x*x - 4)/(x - 2)', a: 2, L: 4, xMin: 0, xMax: 4, yMin: 0, yMax: 6 },
            intuition: '上图 $\\dfrac{x^2 - 4}{x - 2}$ 在 x=2 处分子分母都是 0（0/0 不定型）。但化简后 = $x + 2$，所以极限是 4，曲线在那点只是个洞。',
            formula: { latex: '\\frac{0}{0}, \\frac{\\infty}{\\infty}, 0 \\cdot \\infty, \\infty - \\infty, 1^\\infty, 0^0, \\infty^0', caption: '常见不定型 — 见到要先化简，不能瞎代入。' },
            takeaway: '直接代入得 0/0 ⟹ 化简再代。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}$ 直接代入得到什么形式？',
              options: ['$0$', '$\\dfrac{0}{0}$ 不定型', '$\\infty$', '$4$'], answer: 1,
              explain: '分子 $4-4=0$，分母 $2-2=0$，是 0/0 不定型，必须化简。' },
            { type: 'choice', prompt: '上题化简后的极限是？',
              options: ['$0$', '$2$', '$4$', '不存在'], answer: 2,
              explain: '$(x-2)(x+2)/(x-2) = x+2$，代入 x=2 得 4。' },
            { type: 'truefalse', prompt: '看到 $\\dfrac{0}{0}$ 就说「极限不存在」是对的。', answer: false,
              explain: '0/0 是「不定型」，意味着「需要进一步分析」，不等于「不存在」。极限可能是任意有限值，也可能是 ∞，也可能不存在。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 1} \\dfrac{x^2 - 1}{x - 1} = $ ___', answer: '2',
              explain: '约分：$(x-1)(x+1)/(x-1) = x+1$。代入 x=1 得 2。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 5} \\dfrac{x - 5}{x^2 - 25}$ 等于？',
              options: ['$0$', '$\\dfrac{1}{10}$', '$5$', '不存在'], answer: 1,
              explain: '约分：$\\dfrac{x-5}{(x-5)(x+5)} = \\dfrac{1}{x+5}$。代入 x=5 得 1/10。' }
          ]
        },
        {
          id: 'm2-l2-u3',
          title: '化简三件套：因式 · 通分 · 有理化',
          intro: {
            hook: '遇到 0/0 不定型，三招通常够用：因式分解约掉公因式、通分合并、根号有理化。',
            intuition: '<strong>因式分解</strong>：$\\dfrac{x^2 - 1}{x - 1} = x + 1$。<br><strong>通分</strong>：$\\dfrac{1}{x} - \\dfrac{1}{2}$ 在 $x \\to 2$ 时合并成 $\\dfrac{2 - x}{2x}$。<br><strong>有理化</strong>：见 $\\sqrt{x + 1} - 1$ 这类，分子分母同乘 $\\sqrt{x + 1} + 1$，把根号「打开」消掉。',
            formula: { latex: '\\lim_{x \\to 0} \\frac{\\sqrt{x + 1} - 1}{x} = \\lim_{x \\to 0} \\frac{x}{x(\\sqrt{x + 1} + 1)} = \\frac{1}{2}', caption: '有理化的标准操作。' },
            takeaway: '0/0 不要慌：约因式、通分、有理化，挑一个试。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3} = $ ___', answer: '6',
              explain: '$(x-3)(x+3)/(x-3) = x+3$。代入 x=3 得 6。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\sqrt{x + 4} - 2}{x}$ 等于？',
              options: ['$0$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{2}$', '$1$'], answer: 1,
              explain: '有理化：分子分母同乘 $\\sqrt{x+4}+2$，得 $\\dfrac{x}{x(\\sqrt{x+4}+2)} = \\dfrac{1}{\\sqrt{x+4}+2}$。代入 x=0 得 $\\dfrac{1}{4}$。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 2} \\dfrac{x^2 - 4}{x^2 - 2x} = $ ___', answer: '2',
              explain: '约分：$\\dfrac{(x-2)(x+2)}{x(x-2)} = \\dfrac{x+2}{x}$。代入 x=2 得 $\\dfrac{4}{2} = 2$。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 1} \\dfrac{x^3 - 1}{x - 1}$ 等于？',
              options: ['$0$', '$1$', '$3$', '不存在'], answer: 2,
              explain: '$x^3 - 1 = (x-1)(x^2 + x + 1)$。约分后剩 $x^2 + x + 1$。代入 x=1 得 3。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L3 两个重要极限
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm2-l3',
      title: '两个重要极限',
      units: [
        {
          id: 'm2-l3-u1',
          title: '小角度神器：sin(x)/x → 1',
          intro: {
            hook: '在单位圆上，当角度 x 很小（用弧度），弧长 x、弦长 sin x、切线长 tan x 几乎一样。所以 $\\dfrac{\\sin x}{x}$ 在 x → 0 时趋近 1。',
            visual: { type: 'plotter', f: 'Math.abs(x) < 1e-9 ? 1 : Math.sin(x)/x', xMin: -6.28, xMax: 6.28, yMin: -0.3, yMax: 1.2, hole: { x: 0, y: 1 } },
            intuition: '上图是 $\\dfrac{\\sin x}{x}$。在 x=0 处函数没定义（那个空心圆），但两侧都收敛到 1。',
            formula: { latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1', caption: '微积分世界的「头号工具」。' },
            takeaway: '看到「小角度的 sin」，就想「sin 跟它自己几乎一样」。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\sin x}{x} = $ ___', answer: '1',
              explain: '这是公式本身。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\sin 3x}{x}$ 等于？',
              options: ['$0$', '$1$', '$3$', '$\\dfrac{1}{3}$'], answer: 2,
              explain: '凑形式：$\\dfrac{\\sin 3x}{x} = 3 \\cdot \\dfrac{\\sin 3x}{3x}$。内层 → 1，整体 → 3。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\sin x}{3x}$ 等于？',
              options: ['$0$', '$\\dfrac{1}{3}$', '$1$', '$3$'], answer: 1,
              explain: '$\\dfrac{1}{3} \\cdot \\dfrac{\\sin x}{x} \\to \\dfrac{1}{3} \\cdot 1$。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\sin 5x}{2x} = $ ___（写成分数 $a/b$ 形式）', answer: ['5/2', '2.5'],
              explain: '$\\dfrac{\\sin 5x}{2x} = \\dfrac{5}{2} \\cdot \\dfrac{\\sin 5x}{5x} \\to \\dfrac{5}{2}$。' },
            { type: 'truefalse', prompt: '这条公式要求角度用「弧度」。', answer: true,
              explain: '只有在弧度制下「弧长 ≈ 弦长」才成立。若用度数，结果会带 π/180 的系数。' }
          ]
        },
        {
          id: 'm2-l3-u2',
          title: '复利与 e：(1 + 1/n)^n → e',
          intro: {
            hook: '银行说「年利率 100%」。一年算一次，1 块变 2 块。一年算 2 次，每次 50%，1 块变 $(1+0.5)^2 = 2.25$。算 n 次呢？n 越大越接近 $e \\approx 2.718$。<strong>e 是「连续复利」的极限</strong>。',
            visual: { type: 'e-limit' },
            intuition: '上图横轴是 n，纵轴是 $(1 + 1/n)^n$。n 越大越靠近虚线 $y = e$。',
            formula: { latex: '\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2.71828', caption: '替换变量 $t = 1/n$ 后等价于 $\\displaystyle \\lim_{t \\to 0} (1 + t)^{1/t} = e$。' },
            takeaway: '$(1 + \\text{小} \\cdot)^{\\text{大次方}}$ 的形态 → e。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\displaystyle \\lim_{n \\to \\infty} \\left(1 + \\dfrac{1}{n}\\right)^n = $ ___（写 e 即可）', answer: 'e',
              explain: '公式本身。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{n \\to \\infty} \\left(1 + \\dfrac{2}{n}\\right)^n$ 等于？',
              options: ['$e$', '$e^2$', '$2e$', '$\\dfrac{e}{2}$'], answer: 1,
              explain: '令 $m = n/2$，则 $(1 + 1/m)^{2m} = [(1+1/m)^m]^2 \\to e^2$。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 0} (1 + x)^{1/x}$ 等于？',
              options: ['$0$', '$1$', '$e$', '不存在'], answer: 2,
              explain: '令 $n = 1/x$，等价于 $\\displaystyle \\lim_{n \\to \\infty} (1 + 1/n)^n = e$。' },
            { type: 'truefalse', prompt: '$(1 + 1/n)^n$ 当 n → ∞ 时趋向 1（因为底数趋于 1）。', answer: false,
              explain: '底数趋于 1，但指数趋于 ∞，这是 $1^\\infty$ 不定型——结果是 e，不是 1。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{n \\to \\infty} \\left(1 + \\dfrac{1}{n}\\right)^{3n}$ 等于？',
              options: ['$e$', '$3e$', '$e^3$', '$e^{1/3}$'], answer: 2,
              explain: '$\\left[(1+1/n)^n\\right]^3 \\to e^3$。' }
          ]
        },
        {
          id: 'm2-l3-u3',
          title: '替换法：把题目变成「标准形」',
          intro: {
            hook: '记不住每一种变形？没关系。只要把题目「凑」回 $\\dfrac{\\sin \\square}{\\square}$（□ → 0）或 $(1 + \\square)^{1/\\square}$（□ → 0）这两个标准形，就解决了。',
            intuition: '凑标准形的核心：上下出现的「东西」要长得一样。比如 $\\dfrac{\\sin 3x}{2x}$，让 $\\square = 3x$，则 $\\sin 3x / (3x) \\to 1$，多出来的 $3/2$ 拎出来当系数。',
            formula: { latex: '\\lim_{\\square \\to 0} \\frac{\\sin \\square}{\\square} = 1, \\quad \\lim_{\\square \\to 0} (1 + \\square)^{1/\\square} = e', caption: '□ 代表任意趋于 0 的表达式。' },
            takeaway: '凑标准形 = 凑「上下一样的东西 → 0」。'
          },
          exercises: [
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\tan x}{x}$ 等于？',
              options: ['$0$', '$1$', '$\\sec x$', '不存在'], answer: 1,
              explain: '$\\tan x = \\dfrac{\\sin x}{\\cos x}$，所以 $\\dfrac{\\tan x}{x} = \\dfrac{\\sin x}{x} \\cdot \\dfrac{1}{\\cos x} \\to 1 \\cdot 1 = 1$。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\sin 4x}{\\sin 2x} = $ ___', answer: '2',
              explain: '上下同除 x：$\\dfrac{\\sin 4x / x}{\\sin 2x / x} = \\dfrac{4 \\cdot \\sin 4x /(4x)}{2 \\cdot \\sin 2x / (2x)} \\to \\dfrac{4}{2} = 2$。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{n \\to \\infty} \\left(\\dfrac{n + 1}{n}\\right)^n$ 等于？',
              options: ['$1$', '$e$', '$2$', '$\\infty$'], answer: 1,
              explain: '$\\dfrac{n+1}{n} = 1 + \\dfrac{1}{n}$，所以等于 $(1 + 1/n)^n \\to e$。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{1 - \\cos x}{x^2} = $ ___（写成 1/2 即可）', answer: ['1/2', '0.5'],
              explain: '用 $1 - \\cos x = 2 \\sin^2(x/2)$，得 $\\dfrac{2 \\sin^2(x/2)}{x^2} = \\dfrac{1}{2} \\cdot \\left(\\dfrac{\\sin(x/2)}{x/2}\\right)^2 \\to \\dfrac{1}{2}$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L4 无穷小与无穷大
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm2-l4',
      title: '无穷小与无穷大',
      units: [
        {
          id: 'm2-l4-u1',
          title: '无穷小：会趋于 0 的函数',
          intro: {
            hook: '<strong>无穷小不是一个很小的数字</strong>——它是一个「会趋于 0 的函数」。比如 $\\sin x$ 在 $x \\to 0$ 时是无穷小；$\\dfrac{1}{x}$ 在 $x \\to \\infty$ 时是无穷小。',
            visual: { type: 'plotter', f: 'sin(x)', xMin: -1, xMax: 1, yMin: -1, yMax: 1, samplePoints: [[0, 0]] },
            intuition: '关键是「在指定的过程中」。$\\sin x$ 在 $x \\to 0$ 时是无穷小，但 $\\sin x$ 在 $x \\to \\pi/2$ 时趋近 1，就不是无穷小了。',
            formula: { latex: '\\alpha(x) \\text{ 是} x \\to a \\text{ 时的无穷小} \\iff \\lim_{x \\to a} \\alpha(x) = 0', caption: '定义就是「极限为 0」。' },
            takeaway: '「无穷小」是 0 的极限的另一种说法。'
          },
          exercises: [
            { type: 'truefalse', prompt: '0.001 是一个无穷小。', answer: false,
              explain: '无穷小是「函数」，不是常数（除非常数恰好是 0）。0.001 只是一个很小的数。' },
            { type: 'choice', prompt: '下面哪个在 $x \\to 0$ 时<em>不是</em>无穷小？',
              options: ['$x$', '$\\sin x$', '$x^2$', '$\\cos x$'], answer: 3,
              explain: '$\\cos 0 = 1 \\ne 0$，所以 $\\cos x$ 在 $x \\to 0$ 时趋向 1，不是无穷小。' },
            { type: 'truefalse', prompt: '$\\dfrac{1}{x}$ 在 $x \\to \\infty$ 时是无穷小。', answer: true,
              explain: '极限是 0，符合定义。' },
            { type: 'choice', prompt: '$x - 2$ 在哪个过程中是无穷小？',
              options: ['$x \\to 0$', '$x \\to 2$', '$x \\to \\infty$', '$x \\to -2$'], answer: 1,
              explain: '$x \\to 2$ 时 $x - 2 \\to 0$，是无穷小。其它过程都不趋于 0。' }
          ]
        },
        {
          id: 'm2-l4-u2',
          title: '阶：谁去得更快',
          intro: {
            hook: '都是无穷小，速度可不一样。$x$ 慢慢走向 0，$x^2$ 走得更快，$x^3$ 飞快。比一比就知道：看它们的<em>比值</em>。',
            visual: { type: 'small-orders' },
            intuition: '若 $\\dfrac{\\alpha}{\\beta} \\to 0$，说明 α 比 β 走向 0 走得更快，称 α 是 β 的<strong>高阶无穷小</strong>，记 $\\alpha = o(\\beta)$。若比值 → 常数 c ≠ 0，叫<strong>同阶</strong>。若比值 → 1，叫<strong>等价</strong>，记 $\\alpha \\sim \\beta$。',
            formula: { latex: 'x \\to 0 \\text{ 时常用等价：} \\sin x \\sim x, \\ \\tan x \\sim x, \\ 1 - \\cos x \\sim \\frac{x^2}{2}, \\ \\ln(1 + x) \\sim x, \\ e^x - 1 \\sim x', caption: '记住这几条，求极限时可以直接替换。' },
            takeaway: '同阶等价 → 求极限时可以「替身」。'
          },
          exercises: [
            { type: 'choice', prompt: '$x \\to 0$ 时，$x^2$ 是 $x$ 的什么？',
              options: ['等价无穷小', '同阶无穷小', '高阶无穷小', '低阶无穷小'], answer: 2,
              explain: '$\\dfrac{x^2}{x} = x \\to 0$，所以 $x^2$ 是 $x$ 的高阶无穷小。' },
            { type: 'choice', prompt: '$x \\to 0$ 时，$\\sin x$ 和 $x$ 是什么关系？',
              options: ['等价', '同阶但不等价', '高阶', '没关系'], answer: 0,
              explain: '$\\dfrac{\\sin x}{x} \\to 1$，所以 $\\sin x \\sim x$，等价无穷小。' },
            { type: 'fill', prompt: '利用等价替换：$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\sin 5x}{x} = $ ___', answer: '5',
              explain: '$\\sin 5x \\sim 5x$，所以原式 = $\\lim \\dfrac{5x}{x} = 5$。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 0} \\dfrac{\\tan x}{\\sin 2x}$ 等于？',
              options: ['$\\dfrac{1}{2}$', '$1$', '$2$', '$0$'], answer: 0,
              explain: '$\\tan x \\sim x$, $\\sin 2x \\sim 2x$，比值 $\\to \\dfrac{x}{2x} = \\dfrac{1}{2}$。' },
            { type: 'truefalse', prompt: '等价替换在<em>加减</em>里也可以随便用。', answer: false,
              explain: '只在乘除里安全！比如 $\\lim_{x \\to 0}\\dfrac{\\sin x - x}{x^3}$ 若把 sin x 换成 x，分子变 0，得错答案 0；正确是 $-1/6$。' }
          ]
        },
        {
          id: 'm2-l4-u3',
          title: '无穷大：无穷小的「反面」',
          intro: {
            hook: '无穷大也是函数：在指定过程中绝对值越来越大、没有上界。它和无穷小是「对偶」的：取倒数互相切换。',
            visual: { type: 'plotter', f: '1/x', xMin: -3, xMax: 3, yMin: -5, yMax: 5, asymptote: 0 },
            intuition: '$\\dfrac{1}{x}$ 在 $x \\to 0$ 时是无穷大（两边都飞）；它的倒数 $x$ 在 $x \\to 0$ 时是无穷小。互为倒数。',
            formula: { latex: '\\text{若 } \\alpha \\to 0 \\text{ 且 } \\alpha \\ne 0, \\text{则 } \\frac{1}{\\alpha} \\to \\infty; \\text{反之亦然}', caption: '只要小心 0 本身。' },
            takeaway: '无穷大 ↔ 无穷小，互为倒数。'
          },
          exercises: [
            { type: 'truefalse', prompt: '$x^3$ 在 $x \\to \\infty$ 时是无穷大。', answer: true,
              explain: '$\\lim_{x \\to \\infty} x^3 = \\infty$，符合定义。' },
            { type: 'choice', prompt: '$\\dfrac{1}{x - 2}$ 在 $x \\to 2$ 时是什么？',
              options: ['无穷小', '无穷大', '等于 0', '极限是 1'], answer: 1,
              explain: '分母 $x - 2 \\to 0$，整体 → ±∞。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to \\infty} \\dfrac{1}{x^2} = $ ___', answer: '0',
              explain: '$1 / (\\text{无穷大}) = $ 无穷小 = 0。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to \\infty} \\dfrac{3x^2 + 1}{2x^2 - x}$ 等于？',
              options: ['$0$', '$\\dfrac{1}{2}$', '$\\dfrac{3}{2}$', '$\\infty$'], answer: 2,
              explain: '上下同除 $x^2$：$\\dfrac{3 + 1/x^2}{2 - 1/x} \\to \\dfrac{3}{2}$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L5 连续性
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm2-l5',
      title: '连续性',
      units: [
        {
          id: 'm2-l5-u1',
          title: '一笔画的直觉',
          intro: {
            hook: '如果一条函数图像能<em>不抬笔、一笔画下来</em>，它就是连续的。没有断、没有洞、没有跳。',
            visual: { type: 'plotter', f: 'sin(x)', xMin: -6.28, xMax: 6.28, yMin: -1.5, yMax: 1.5 },
            intuition: '上图 $y = \\sin x$ 是处处连续的。反之，前面看过的 $\\dfrac{1}{x}$（在 0 处飞）、分段函数（在分界处跳）都不连续。',
            takeaway: '连续 = 图像没有「中断」。'
          },
          exercises: [
            { type: 'choice', prompt: '下列哪个函数在它的整个定义域上<em>不</em>连续？',
              options: ['$y = x^2$', '$y = \\sin x$', '$y = \\dfrac{1}{x}$（在 $x = 0$ 处取 0）', '$y = \\cos x$'], answer: 2,
              explain: '$1/x$ 在 x=0 处是无穷间断，硬把值定义成 0 也救不回来，因为极限 ≠ 函数值。其它都处处连续。' },
            { type: 'truefalse', prompt: '多项式函数处处连续。', answer: true,
              explain: '多项式由幂函数加减乘组成，没有分母为 0 的问题。' },
            { type: 'choice', prompt: '$y = \\tan x$ 在哪些点不连续？',
              options: ['整数倍 $\\pi$', '$x = \\pi/2 + k\\pi$', '只有 $x = 0$', '处处连续'], answer: 1,
              explain: '$\\tan x = \\sin x / \\cos x$，$\\cos x = 0$ 的地方（即 $\\pi/2 + k\\pi$）是无穷间断。' }
          ]
        },
        {
          id: 'm2-l5-u2',
          title: '连续的严格定义',
          intro: {
            hook: '直觉之外，连续的严格表达只一句话：<strong>在 a 处的极限值 = 函数值</strong>。要同时满足三件事，缺一不可。',
            intuition: '三件事：（1）$f(a)$ 存在 — 你能站到这一点；（2）$\\displaystyle \\lim_{x \\to a} f(x)$ 存在 — 趋近的路上有目的地；（3）这两个东西相等 — 站到的地方就是趋近到的地方。',
            formula: { latex: 'f \\text{ 在 } a \\text{ 处连续} \\iff \\lim_{x \\to a} f(x) = f(a)', caption: '一句话定义。' },
            takeaway: '极限值 = 函数值 = 连续。'
          },
          exercises: [
            { type: 'truefalse', prompt: '若 $\\displaystyle \\lim_{x \\to 1} f(x) = 5$ 且 $f(1) = 5$，则 $f$ 在 $x = 1$ 处连续。', answer: true,
              explain: '极限与函数值都存在且相等，正好满足定义。' },
            { type: 'choice', prompt: '若 $\\displaystyle \\lim_{x \\to 1} f(x) = 3$，但 $f(1) = 5$，则 $f$ 在 $x = 1$ 处？',
              options: ['连续', '不连续', '可去间断', 'B 和 C 都对'], answer: 3,
              explain: '不连续（极限 ≠ 函数值），具体是「可去间断」——只要把 $f(1)$ 改成 3 就能补好。' },
            { type: 'choice', prompt: '若 $\\displaystyle \\lim_{x \\to 1} f(x)$ 不存在，那 $f$ 在 $x = 1$ 处？',
              options: ['一定连续', '一定不连续', '看 $f(1)$ 而定', '看函数类型'], answer: 1,
              explain: '连续要求极限存在。极限都没有，谈不上连续。' },
            { type: 'fill', prompt: '若 $f(x) = \\dfrac{x^2 - 4}{x - 2}$（$x \\ne 2$），要让 $f$ 在 $x = 2$ 处连续，必须补充定义 $f(2) = $ ___', answer: '4',
              explain: '化简：$f = x + 2$（$x \\ne 2$），$\\displaystyle \\lim_{x \\to 2} f(x) = 4$。要连续，必须让 $f(2) = 4$。' }
          ]
        },
        {
          id: 'm2-l5-u3',
          title: '连续函数的好性质',
          intro: {
            hook: '基础初等函数——多项式、有理式（在分母非 0 处）、$\\sin x, \\cos x, e^x, \\ln x$（在定义域上）——都是处处连续的。它们经过加减乘除和复合，结果还是连续的。',
            intuition: '<strong>实战含义</strong>：在初等函数的定义域内求极限，只要直接代入！不连续点只会出现在「分母为 0」「根号里负」「对数 0 或负」「分段函数的分界处」这些怀疑点。',
            formula: { latex: '\\text{初等函数} f \\text{ 在 } a \\text{ 处有定义} \\Rightarrow \\lim_{x \\to a} f(x) = f(a)', caption: '直接代入大法的依据。' },
            takeaway: '初等函数 + 在定义域内 = 直接代入求极限。'
          },
          exercises: [
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to \\pi} \\sin x = $ ___', answer: '0',
              explain: 'sin 处处连续，直接代入：$\\sin \\pi = 0$。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 1} e^x = $ ___（写 e 即可）', answer: 'e',
              explain: '$e^x$ 处处连续，代入 x=1。' },
            { type: 'fill', prompt: '$\\displaystyle \\lim_{x \\to 0} \\cos x = $ ___', answer: '1',
              explain: '$\\cos 0 = 1$。' },
            { type: 'choice', prompt: '$\\displaystyle \\lim_{x \\to 2} \\dfrac{\\sin x}{x^2 + 1}$ 等于？',
              options: ['$0$', '$\\dfrac{\\sin 2}{5}$', '$\\dfrac{1}{2}$', '不存在'], answer: 1,
              explain: '分母在 x=2 处非 0，整体是连续函数。直接代入：$\\dfrac{\\sin 2}{4 + 1} = \\dfrac{\\sin 2}{5}$。' }
          ]
        }
      ]
    },

    // ───────────────────────────────────────────────────────────────
    // L6 间断点
    // ───────────────────────────────────────────────────────────────
    {
      id: 'm2-l6',
      title: '间断点',
      units: [
        {
          id: 'm2-l6-u1',
          title: '三种间断',
          intro: {
            hook: '函数能在一个点不连续的方式只有三种：洞、跳、爆炸。它们各有名字。',
            visual: { type: 'discontinuity-types' },
            intuition: '<strong>可去间断（洞）</strong>：极限存在，但函数值缺失或不等。补一下函数值就能修。<br><strong>跳跃间断</strong>：左右极限都存在但不相等，曲线在那一点「跳」一下。<br><strong>无穷间断</strong>：至少一侧极限是 ±∞，函数飞向无穷。',
            takeaway: '三类间断按极限是否存在、左右是否一致来分。'
          },
          exercises: [
            { type: 'choice', prompt: '$f(x) = \\dfrac{x^2 - 9}{x - 3}$ 在 $x = 3$ 处是哪种间断？',
              options: ['可去', '跳跃', '无穷', '不间断'], answer: 0,
              explain: '化简后 $f = x + 3$，$\\lim_{x \\to 3} f = 6$ 存在，但函数在 x=3 处没定义——可去间断。' },
            { type: 'choice', prompt: '$f(x) = \\begin{cases} 1, & x < 0 \\\\ 2, & x \\ge 0 \\end{cases}$ 在 $x = 0$ 处是？',
              options: ['可去', '跳跃', '无穷', '不间断'], answer: 1,
              explain: '左极限 1，右极限 2，不相等。是跳跃间断。' },
            { type: 'choice', prompt: '$f(x) = \\dfrac{1}{x^2}$ 在 $x = 0$ 处是？',
              options: ['可去', '跳跃', '无穷', '不间断'], answer: 2,
              explain: '两侧都飞向 +∞，无穷间断。' },
            { type: 'truefalse', prompt: '可去间断「可去」是因为只要重新定义函数值，就能让它连续。', answer: true,
              explain: '正是这个意思——洞是可以「填」的。' }
          ]
        },
        {
          id: 'm2-l6-u2',
          title: '怎么找间断点',
          intro: {
            hook: '初等函数处处连续，<em>除非</em>遇到这些「定义不允许」的点：分母为 0、根号下为负、对数 ≤ 0、分段函数的分界处。先找出怀疑对象，再逐一检查。',
            intuition: '<strong>查表</strong>：<br>• 有理函数 $\\dfrac{P(x)}{Q(x)}$：$Q(x) = 0$ 的 x。<br>• 偶次根 $\\sqrt{u(x)}$：$u(x) < 0$ 的 x。<br>• 对数 $\\ln u(x)$：$u(x) \\le 0$ 的 x。<br>• 分段函数：分界点。',
            takeaway: '间断点 = 函数表达式「出问题」的 x。'
          },
          exercises: [
            { type: 'choice', prompt: '$f(x) = \\dfrac{x}{x^2 - 1}$ 的间断点是？',
              options: ['$x = 0$', '$x = \\pm 1$', '$x = 1$', '无间断点'], answer: 1,
              explain: '分母 $x^2 - 1 = (x-1)(x+1)$，$x = \\pm 1$ 时为 0。' },
            { type: 'fill', prompt: '$f(x) = \\ln(x - 2)$ 在 $x = $ ___ 处不连续（写两个端点的小的那个），实际上要 $x > 2$ 才连续。', answer: '2',
              explain: '$\\ln$ 要求自变量 > 0，所以 $x - 2 > 0$ 即 $x > 2$。x=2 是定义域端点，左侧无定义。' },
            { type: 'choice', prompt: '$f(x) = \\sqrt{4 - x^2}$ 的连续区间是？',
              options: ['$[-2, 2]$', '$(-2, 2)$', '全体实数', '$x \\ne \\pm 2$'], answer: 0,
              explain: '根号下要 $\\ge 0$：$4 - x^2 \\ge 0$，即 $-2 \\le x \\le 2$，闭区间。' },
            { type: 'choice', prompt: '$f(x) = \\dfrac{\\sin x}{x}$ 的<em>所有</em>间断点是？',
              options: ['$x = 0$', '$x = k\\pi$', '所有 $x$ 都连续', '$x = \\pi$'], answer: 0,
              explain: '分母只在 x=0 时为 0。x=0 是可去间断（极限是 1，但函数没定义）。其它地方都连续。' }
          ]
        },
        {
          id: 'm2-l6-u3',
          title: '综合判断',
          intro: {
            hook: '把前面的工具合起来用：分段函数、含未定参数的函数、需要判断类型——只要按部就班，没难度。',
            intuition: '<strong>三步走</strong>：① 找出可疑点。② 在每个可疑点计算左极限、右极限、函数值。③ 比对它们之间的关系，套定义说出类型。',
            takeaway: '所有连续性题都是「极限和函数值」的对账题。'
          },
          exercises: [
            { type: 'choice', prompt: '若 $f(x) = \\begin{cases} x + 1, & x < 1 \\\\ a, & x = 1 \\\\ 3 - x, & x > 1 \\end{cases}$ 要在 $x = 1$ 处连续，$a$ 必须等于多少？',
              options: ['$1$', '$2$', '$3$', '任何数'], answer: 1,
              explain: '左极限 $1 + 1 = 2$，右极限 $3 - 1 = 2$。要连续就要 $f(1) = a = 2$。' },
            { type: 'choice', prompt: '函数 $f(x) = \\dfrac{x^2 - 1}{|x - 1|}$ 在 $x = 1$ 处是？',
              options: ['连续', '可去间断', '跳跃间断', '无穷间断'], answer: 2,
              explain: '$x \\to 1^+$：$\\dfrac{(x-1)(x+1)}{x-1} = x+1 \\to 2$；$x \\to 1^-$：$\\dfrac{(x-1)(x+1)}{-(x-1)} = -(x+1) \\to -2$。左右极限不相等 = 跳跃。' },
            { type: 'truefalse', prompt: '若 $f$ 在 $a$ 处的左右极限都是 $+\\infty$，则 $a$ 是无穷间断点。', answer: true,
              explain: '只要至少一侧是 ±∞，就是无穷间断。两侧都飞当然算。' },
            { type: 'choice', prompt: '$f(x) = \\dfrac{1}{x} \\sin x$ 在 $x = 0$ 处是？',
              options: ['连续', '可去间断', '跳跃间断', '无穷间断'], answer: 1,
              explain: '$\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = 1$ 存在，但 $f(0)$ 没定义。可去间断——补充 $f(0) = 1$ 就连续了。' }
          ]
        }
      ]
    }
  ]
};
