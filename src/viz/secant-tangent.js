// Animate the secant line from (a, f(a)) to (a+h, f(a+h)) and watch it converge
// to the tangent as h → 0. Slider controls h.

import { C } from './colors.js';

export function renderSecantTangent(host, viz) {
  const f = makeF(viz.f);
  const a = viz.a ?? 1;
  const xMin = viz.xMin ?? -1, xMax = viz.xMax ?? 4;
  const yMin = viz.yMin ?? -1, yMax = viz.yMax ?? 9;
  let h = viz.initialH ?? 1.5;

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';
  host.appendChild(wrap);

  const W = 420, H = 300, pad = 28;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);

  // numerical derivative at a
  const fPrimeA = (f(a + 1e-6) - f(a - 1e-6)) / 2e-6;

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Grid
    for (let x = Math.ceil(xMin); x <= xMax; x++) svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1));
    for (let y = Math.ceil(yMin); y <= yMax; y++) svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1));
    // Axes
    svg.appendChild(line(pad, sy(0), W - pad, sy(0), C.muted, 1.5));
    svg.appendChild(line(sx(0), pad, sx(0), H - pad, C.muted, 1.5));

    // f curve
    drawCurve(svg, xMin, xMax, f, sx, sy, yMin, yMax, C.accent, 2);

    // Tangent line at a (always shown as faint reference)
    const tF = (x) => f(a) + fPrimeA * (x - a);
    drawCurve(svg, xMin, xMax, tF, sx, sy, yMin, yMax, C.good, 1.5, '5 4');

    // Two points: (a, f(a)) and (a+h, f(a+h))
    const fa = f(a), fah = f(a + h);
    // Secant slope
    const m = (fah - fa) / h;
    const sF = (x) => fa + m * (x - a);
    drawCurve(svg, xMin, xMax, sF, sx, sy, yMin, yMax, C.bad, 1.8);

    // Points
    dot(svg, sx(a), sy(fa), C.accent);
    dot(svg, sx(a + h), sy(fah), C.bad);

    // Labels: m_sec value, m_tan value
    svg.appendChild(txt(W - pad - 6, pad + 14, `割线斜率 ${m.toFixed(3)}`, 11, C.bad, 'end'));
    svg.appendChild(txt(W - pad - 6, pad + 30, `切线斜率 ${fPrimeA.toFixed(3)}`, 11, C.good, 'end'));
    svg.appendChild(txt(sx(a), sy(fa) + 16, `a`, 11, C.accent));
    svg.appendChild(txt(sx(a + h), sy(fah) - 8, `a+h`, 11, C.bad));
  }

  const controls = document.createElement('div');
  controls.className = 'flex items-center gap-3 text-sm';
  controls.innerHTML = `
    <label class="text-muted">h =</label>
    <input type="range" min="0.05" max="2" step="0.05" value="${h}" class="flex-1" />
    <span class="font-mono text-accent w-12 text-right" data-h>${h.toFixed(2)}</span>
  `;
  wrap.appendChild(controls);
  controls.querySelector('input').addEventListener('input', (e) => {
    h = parseFloat(e.target.value);
    controls.querySelector('[data-h]').textContent = h.toFixed(2);
    draw();
  });

  const note = document.createElement('p');
  note.className = 'text-xs text-muted text-center';
  note.textContent = '红线是割线，绿虚线是切线。把 h 拖小，看红线如何「贴」到绿线上。';
  wrap.appendChild(note);

  draw();
}

function makeF(expr) {
  try { return new Function('x', `with(Math){ return ${expr}; }`); }
  catch { return () => 0; }
}
function drawCurve(svg, xMin, xMax, f, sx, sy, yMin, yMax, color, w, dashArr) {
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
  if (dashArr) path.setAttribute('stroke-dasharray', dashArr);
  svg.appendChild(path);
}
function dot(svg, x, y, color) {
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 4); c.setAttribute('fill', color);
  svg.appendChild(c);
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
