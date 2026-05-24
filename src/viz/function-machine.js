// A small visualization: an input number enters a box (the function),
// and the output emerges. The user can change the input with a slider.

const COLORS = {
  ink: '#0f1626',
  muted: '#5e6b80',
  line: '#d8dde6',
  accent: '#2c4a7a',
  paper: '#ffffff',
  soft: '#dde6f3'
};

export function renderFunctionMachine(host, viz) {
  // viz.f is a string like "2*x + 1"; we evaluate via Function
  const f = makeF(viz.f);
  const fLabel = viz.label || 'f(x)';
  const min = viz.min ?? -3;
  const max = viz.max ?? 5;
  const step = viz.step ?? 1;
  let x = viz.initial ?? 2;

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';
  host.appendChild(wrap);

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 480 160');
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const y = f(x);

    const inputBubble = circle(70, 80, 28, COLORS.soft, COLORS.accent);
    const inputText = text(70, 86, fmt(x), 18, COLORS.accent);
    const arrow1 = line(102, 80, 178, 80, COLORS.muted);
    const tri1 = tri(178, 80);
    const box = rect(180, 50, 120, 60, COLORS.paper, COLORS.accent);
    const boxLabel = text(240, 84, fLabel, 16, COLORS.accent);
    const arrow2 = line(302, 80, 378, 80, COLORS.muted);
    const tri2 = tri(378, 80);
    const outputBubble = circle(410, 80, 28, COLORS.soft, COLORS.accent);
    const outputText = text(410, 86, fmt(y), 18, COLORS.accent);
    const inLab = text(70, 130, '输入 x', 12, COLORS.muted);
    const outLab = text(410, 130, '输出 f(x)', 12, COLORS.muted);

    [inputBubble, arrow1, tri1, box, boxLabel, arrow2, tri2, outputBubble, inputText, outputText, inLab, outLab]
      .forEach((el) => svg.appendChild(el));
  }

  const controls = document.createElement('div');
  controls.className = 'flex items-center gap-3 text-sm';
  controls.innerHTML = `
    <label class="text-muted">x =</label>
    <input type="range" min="${min}" max="${max}" step="${step}" value="${x}" class="flex-1" />
    <span class="font-mono text-accent w-10 text-right" data-x>${fmt(x)}</span>
  `;
  wrap.appendChild(controls);
  const slider = controls.querySelector('input');
  const xLabel = controls.querySelector('[data-x]');
  slider.addEventListener('input', (e) => {
    x = parseFloat(e.target.value);
    xLabel.textContent = fmt(x);
    draw();
  });

  draw();
}

function makeF(expr) {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('x', `with(Math){ return ${expr}; }`);
  } catch {
    return () => 0;
  }
}
function fmt(n) {
  if (Number.isFinite(n)) {
    if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
    return n.toFixed(2);
  }
  return '—';
}

function circle(cx, cy, r, fill, stroke) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  el.setAttribute('cx', cx); el.setAttribute('cy', cy); el.setAttribute('r', r);
  el.setAttribute('fill', fill); el.setAttribute('stroke', stroke); el.setAttribute('stroke-width', '1.5');
  return el;
}
function rect(x, y, w, h, fill, stroke) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  el.setAttribute('x', x); el.setAttribute('y', y); el.setAttribute('width', w); el.setAttribute('height', h);
  el.setAttribute('rx', 8); el.setAttribute('fill', fill); el.setAttribute('stroke', stroke); el.setAttribute('stroke-width', '1.5');
  return el;
}
function line(x1, y1, x2, y2, stroke) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  el.setAttribute('x1', x1); el.setAttribute('y1', y1); el.setAttribute('x2', x2); el.setAttribute('y2', y2);
  el.setAttribute('stroke', stroke); el.setAttribute('stroke-width', '1.5');
  return el;
}
function tri(x, y) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  el.setAttribute('points', `${x},${y - 5} ${x + 7},${y} ${x},${y + 5}`);
  el.setAttribute('fill', '#5e6b80');
  return el;
}
function text(x, y, s, size, color) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  el.setAttribute('x', x); el.setAttribute('y', y); el.setAttribute('text-anchor', 'middle');
  el.setAttribute('font-size', size); el.setAttribute('fill', color);
  el.setAttribute('font-family', 'ui-monospace, SF Mono, Menlo, monospace');
  el.textContent = s;
  return el;
}
