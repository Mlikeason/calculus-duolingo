// Two function machines in series: x -> g -> u -> f -> y.

const C = { ink:'#0f1626', muted:'#5e6b80', accent:'#2c4a7a', paper:'#ffffff', soft:'#dde6f3' };

export function renderComposition(host, viz) {
  const g = makeF(viz.g);
  const f = makeF(viz.f);
  const gLabel = viz.gLabel || 'g(x)';
  const fLabel = viz.fLabel || 'f(u)';
  const min = viz.min ?? -2, max = viz.max ?? 4, step = viz.step ?? 1;
  let x = viz.initial ?? 1;

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';
  host.appendChild(wrap);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 560 160');
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const u = g(x), y = f(u);
    bubble(svg, 50, 80, x, '输入 x');
    arrow(svg, 82, 80, 138);
    box(svg, 140, gLabel);
    arrow(svg, 232, 80, 278);
    bubble(svg, 300, 80, u, '中间 u');
    arrow(svg, 332, 80, 388);
    box(svg, 390, fLabel);
    arrow(svg, 482, 80, 528);
    bubble(svg, 545, 80, y, '输出 y');
  }

  const controls = document.createElement('div');
  controls.className = 'flex items-center gap-3 text-sm';
  controls.innerHTML = `
    <label class="text-muted">x =</label>
    <input type="range" min="${min}" max="${max}" step="${step}" value="${x}" class="flex-1" />
    <span class="font-mono text-accent w-10 text-right" data-x>${fmt(x)}</span>
  `;
  wrap.appendChild(controls);
  controls.querySelector('input').addEventListener('input', (e) => {
    x = parseFloat(e.target.value);
    controls.querySelector('[data-x]').textContent = fmt(x);
    draw();
  });
  draw();
}

function bubble(svg, cx, cy, val, label) {
  const c = svgEl('circle', { cx, cy, r: 22, fill: C.soft, stroke: C.accent, 'stroke-width': 1.5 });
  const t = svgEl('text', { x: cx, y: cy + 5, 'text-anchor': 'middle', fill: C.accent, 'font-size': 14, 'font-family': 'ui-monospace, Menlo' }, fmt(val));
  const l = svgEl('text', { x: cx, y: cy + 44, 'text-anchor': 'middle', fill: C.muted, 'font-size': 11, 'font-family': 'ui-monospace, Menlo' }, label);
  svg.appendChild(c); svg.appendChild(t); svg.appendChild(l);
}
function box(svg, x, label) {
  const r = svgEl('rect', { x, y: 50, width: 90, height: 60, rx: 8, fill: C.paper, stroke: C.accent, 'stroke-width': 1.5 });
  const t = svgEl('text', { x: x + 45, y: 84, 'text-anchor': 'middle', fill: C.accent, 'font-size': 14, 'font-family': 'ui-monospace, Menlo' }, label);
  svg.appendChild(r); svg.appendChild(t);
}
function arrow(svg, x1, y, x2) {
  const l = svgEl('line', { x1, y1: y, x2, y2: y, stroke: C.muted, 'stroke-width': 1.5 });
  const tri = svgEl('polygon', { points: `${x2},${y - 5} ${x2 + 7},${y} ${x2},${y + 5}`, fill: C.muted });
  svg.appendChild(l); svg.appendChild(tri);
}
function svgEl(tag, attrs, text) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (text != null) el.textContent = text;
  return el;
}
function makeF(expr) {
  try { return new Function('x', `with(Math){ const u = x; return ${expr}; }`); }
  catch { return () => 0; }
}
function fmt(n) {
  if (!Number.isFinite(n)) return '—';
  if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
  return n.toFixed(2);
}
