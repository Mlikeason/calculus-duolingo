// Visualize x -> a from both sides, with f(x) -> L. Optional hole at (a, L).

import { C } from './colors.js';

export function renderLimitApproach(host, viz) {
  const f = makeF(viz.f);
  const a = viz.a;
  const L = viz.L ?? f(a + 1e-6);
  const xMin = viz.xMin ?? a - 2, xMax = viz.xMax ?? a + 2;
  const yMin = viz.yMin ?? L - 2, yMax = viz.yMax ?? L + 2;
  const hole = viz.hole !== false; // default: show hole at (a, L)

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

  // Grid
  for (let x = Math.ceil(xMin); x <= xMax; x++) svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1));
  for (let y = Math.ceil(yMin); y <= yMax; y++) svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1));

  // Axes
  svg.appendChild(line(pad, sy(0), W - pad, sy(0), C.muted, 1.5));
  svg.appendChild(line(sx(0), pad, sx(0), H - pad, C.muted, 1.5));

  // Vertical dashed guide at x = a, horizontal dashed at y = L
  svg.appendChild(dash(sx(a), pad, sx(a), H - pad));
  svg.appendChild(dash(pad, sy(L), W - pad, sy(L)));
  svg.appendChild(txt(sx(a), H - 8, viz.aLabel || `a = ${a}`, 11, C.muted));
  svg.appendChild(txt(pad - 6, sy(L) - 4, viz.LLabel || `L = ${fmt(L)}`, 11, C.good, 'end'));

  // Curve (skip a tiny neighborhood of x=a to suggest the hole visually)
  const eps = 0.02 * (xMax - xMin);
  drawCurve(svg, xMin, a - eps, f, sx, sy, yMin, yMax, C.accent);
  drawCurve(svg, a + eps, xMax, f, sx, sy, yMin, yMax, C.accent);

  // Hole at (a, L)
  if (hole) {
    const h = document.createElementNS(svgNS, 'circle');
    h.setAttribute('cx', sx(a)); h.setAttribute('cy', sy(L));
    h.setAttribute('r', 5); h.setAttribute('fill', '#ffffff');
    h.setAttribute('stroke', C.accent); h.setAttribute('stroke-width', 1.8);
    svg.appendChild(h);
  }

  // Arrows showing approach
  const off = (xMax - xMin) * 0.18;
  const yLArrow = sy(L) + 22;
  // left arrow pointing toward x=a from the left
  svg.appendChild(arrowR(sx(a - off), yLArrow, sx(a) - 8, yLArrow));
  svg.appendChild(txt(sx(a - off / 2), yLArrow - 6, 'x → a⁻', 10, C.bad));
  // right arrow pointing toward x=a from the right
  svg.appendChild(arrowL(sx(a + off), yLArrow, sx(a) + 8, yLArrow));
  svg.appendChild(txt(sx(a + off / 2), yLArrow - 6, 'x → a⁺', 10, C.bad));

  // Slider for x with live readout (optional)
  if (viz.interactive !== false) {
    let curX = viz.initialX ?? a - 0.5;
    const dotX = document.createElementNS(svgNS, 'circle');
    dotX.setAttribute('r', 4); dotX.setAttribute('fill', C.accent);
    svg.appendChild(dotX);
    const guideV = document.createElementNS(svgNS, 'line');
    guideV.setAttribute('stroke', C.accent); guideV.setAttribute('stroke-width', 1);
    svg.appendChild(guideV);
    const guideH = document.createElementNS(svgNS, 'line');
    guideH.setAttribute('stroke', C.accent); guideH.setAttribute('stroke-width', 1);
    svg.appendChild(guideH);

    function placeDot() {
      const x = Math.abs(curX - a) < 1e-4 ? curX + 1e-4 : curX;
      const y = f(x);
      dotX.setAttribute('cx', sx(curX)); dotX.setAttribute('cy', sy(y));
      guideV.setAttribute('x1', sx(curX)); guideV.setAttribute('y1', sy(0));
      guideV.setAttribute('x2', sx(curX)); guideV.setAttribute('y2', sy(y));
      guideH.setAttribute('x1', sx(0)); guideH.setAttribute('y1', sy(y));
      guideH.setAttribute('x2', sx(curX)); guideH.setAttribute('y2', sy(y));
    }
    placeDot();

    const controls = document.createElement('div');
    controls.className = 'flex items-center gap-3 text-sm';
    controls.innerHTML = `
      <label class="text-muted">x =</label>
      <input type="range" min="${xMin}" max="${xMax}" step="0.05" value="${curX}" class="flex-1" />
      <span class="font-mono text-accent w-20 text-right" data-xy>${fmt(curX)} → ${fmt(f(curX))}</span>
    `;
    wrap.appendChild(controls);
    const slider = controls.querySelector('input');
    const lab = controls.querySelector('[data-xy]');
    slider.addEventListener('input', (e) => {
      curX = parseFloat(e.target.value);
      lab.textContent = `${fmt(curX)} → ${fmt(f(Math.abs(curX - a) < 1e-4 ? curX + 1e-4 : curX))}`;
      placeDot();
    });
  }
}

function drawCurve(svg, xMin, xMax, f, sx, sy, yMin, yMax, color) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = '', started = false;
  const N = 120;
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = f(x);
    if (!Number.isFinite(y) || y < yMin - 5 || y > yMax + 5) { started = false; continue; }
    d += (started ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(y).toFixed(1) + ' ';
    started = true;
  }
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none'); path.setAttribute('stroke', color); path.setAttribute('stroke-width', 2);
  svg.appendChild(path);
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
function line(x1, y1, x2, y2, stroke, w) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  el.setAttribute('x1', x1); el.setAttribute('y1', y1); el.setAttribute('x2', x2); el.setAttribute('y2', y2);
  el.setAttribute('stroke', stroke); el.setAttribute('stroke-width', w);
  return el;
}
function dash(x1, y1, x2, y2) {
  const el = line(x1, y1, x2, y2, '#aab3c2', 1);
  el.setAttribute('stroke-dasharray', '4 4');
  return el;
}
function arrowR(x1, y, x2, y2) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const l = line(x1, y, x2, y2, '#9b2d20', 1.5);
  const t = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  t.setAttribute('points', `${x2},${y2 - 4} ${x2 + 6},${y2} ${x2},${y2 + 4}`);
  t.setAttribute('fill', '#9b2d20');
  g.appendChild(l); g.appendChild(t); return g;
}
function arrowL(x1, y, x2, y2) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const l = line(x1, y, x2, y2, '#9b2d20', 1.5);
  const t = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  t.setAttribute('points', `${x2},${y2 - 4} ${x2 - 6},${y2} ${x2},${y2 + 4}`);
  t.setAttribute('fill', '#9b2d20');
  g.appendChild(l); g.appendChild(t); return g;
}
function txt(x, y, s, size, color, anchor='middle') {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  el.setAttribute('x', x); el.setAttribute('y', y); el.setAttribute('text-anchor', anchor);
  el.setAttribute('font-size', size); el.setAttribute('fill', color);
  el.setAttribute('font-family', 'ui-monospace, SF Mono, Menlo, monospace');
  el.textContent = s;
  return el;
}
