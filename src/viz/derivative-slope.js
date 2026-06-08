// Plot f(x), draggable point a on x-axis. Shows tangent line at (a, f(a))
// and the slope value (= f'(a) numerically).

const C = { line:'#d8dde6', muted:'#5e6b80', accent:'#2c4a7a', good:'#1f6b40' };

export function renderDerivativeSlope(host, viz) {
  const f = makeF(viz.f);
  const fLabel = viz.fLabel || 'f(x)';
  const xMin = viz.xMin ?? -3, xMax = viz.xMax ?? 3;
  const yMin = viz.yMin ?? -2, yMax = viz.yMax ?? 6;
  let a = viz.initial ?? 1;

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';
  host.appendChild(wrap);

  const W = 420, H = 280, pad = 28;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    for (let x = Math.ceil(xMin); x <= xMax; x++) svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1));
    for (let y = Math.ceil(yMin); y <= yMax; y++) svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1));
    svg.appendChild(line(pad, sy(0), W - pad, sy(0), C.muted, 1.5));
    svg.appendChild(line(sx(0), pad, sx(0), H - pad, C.muted, 1.5));

    // f curve
    drawCurve(svg, xMin, xMax, f, sx, sy, yMin, yMax, C.accent, 2);

    // numerical derivative
    const fa = f(a);
    const dfa = (f(a + 1e-5) - f(a - 1e-5)) / 2e-5;
    // tangent line: y = fa + dfa * (x - a)
    const tF = (x) => fa + dfa * (x - a);
    drawCurve(svg, xMin, xMax, tF, sx, sy, yMin, yMax, C.good, 1.8);

    // point
    const px = sx(a), py = sy(fa);
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', px); c.setAttribute('cy', py); c.setAttribute('r', 5); c.setAttribute('fill', C.accent);
    svg.appendChild(c);

    // Labels
    svg.appendChild(txt(W - pad - 6, pad + 14, `${fLabel}`, 11, C.accent, 'end'));
    svg.appendChild(txt(W - pad - 6, pad + 30, `斜率 = ${dfa.toFixed(3)}`, 11, C.good, 'end'));
    svg.appendChild(txt(px, py + 18, `(${fmt(a)}, ${fmt(fa)})`, 11, C.accent));
  }

  const controls = document.createElement('div');
  controls.className = 'flex items-center gap-3 text-sm';
  controls.innerHTML = `
    <label class="text-muted">a =</label>
    <input type="range" min="${xMin + 0.1}" max="${xMax - 0.1}" step="0.05" value="${a}" class="flex-1" />
    <span class="font-mono text-accent w-12 text-right" data-a>${fmt(a)}</span>
  `;
  wrap.appendChild(controls);
  controls.querySelector('input').addEventListener('input', (e) => {
    a = parseFloat(e.target.value);
    controls.querySelector('[data-a]').textContent = fmt(a);
    draw();
  });

  draw();
}

function makeF(expr) {
  try { return new Function('x', `with(Math){ return ${expr}; }`); }
  catch { return () => 0; }
}
function fmt(n) {
  if (!Number.isFinite(n)) return '—';
  if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
  return n.toFixed(2);
}
function drawCurve(svg, xMin, xMax, f, sx, sy, yMin, yMax, color, w) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = '', started = false;
  const N = 150;
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = f(x);
    if (!Number.isFinite(y) || y < yMin - 5 || y > yMax + 5) { started = false; continue; }
    d += (started ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(y).toFixed(1) + ' ';
    started = true;
  }
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none'); path.setAttribute('stroke', color); path.setAttribute('stroke-width', w);
  svg.appendChild(path);
}
function line(x1, y1, x2, y2, stroke, w) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  el.setAttribute('x1', x1); el.setAttribute('y1', y1); el.setAttribute('x2', x2); el.setAttribute('y2', y2);
  el.setAttribute('stroke', stroke); el.setAttribute('stroke-width', w);
  return el;
}
function txt(x, y, s, size, color, anchor='middle') {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  el.setAttribute('x', x); el.setAttribute('y', y); el.setAttribute('text-anchor', anchor);
  el.setAttribute('font-size', size); el.setAttribute('fill', color);
  el.setAttribute('font-family', 'ui-monospace, SF Mono, Menlo, monospace');
  el.textContent = s;
  return el;
}
