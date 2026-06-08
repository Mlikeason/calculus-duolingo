// Show f and its inverse, reflected across y = x.

import { C } from './colors.js';

export function renderInverseMirror(host, viz) {
  const f = makeF(viz.f);
  const fInv = makeF(viz.fInv);
  const xMin = viz.xMin ?? -3, xMax = viz.xMax ?? 4;
  const yMin = viz.yMin ?? -3, yMax = viz.yMax ?? 4;

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-2';
  host.appendChild(wrap);

  const W = 380, H = 320, pad = 24;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full max-w-md mx-auto block');
  wrap.appendChild(svg);

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);

  for (let x = Math.ceil(xMin); x <= xMax; x++) svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1));
  for (let y = Math.ceil(yMin); y <= yMax; y++) svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1));

  svg.appendChild(line(pad, sy(0), W - pad, sy(0), C.muted, 1.5));
  svg.appendChild(line(sx(0), pad, sx(0), H - pad, C.muted, 1.5));

  // y = x mirror
  const m = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  const lo = Math.max(xMin, yMin), hi = Math.min(xMax, yMax);
  m.setAttribute('x1', sx(lo)); m.setAttribute('y1', sy(lo));
  m.setAttribute('x2', sx(hi)); m.setAttribute('y2', sy(hi));
  m.setAttribute('stroke', C.dashed); m.setAttribute('stroke-width', 1);
  m.setAttribute('stroke-dasharray', '4 4');
  svg.appendChild(m);

  // f (accent)
  svg.appendChild(curve(xMin, xMax, f, sx, sy, yMin, yMax, C.accent));
  // f^-1 (good)
  svg.appendChild(curve(xMin, xMax, fInv, sx, sy, yMin, yMax, C.good));

  svg.appendChild(txt(sx(0.5), sy(3.5), viz.fLabel || 'f', 12, C.accent, 'start'));
  svg.appendChild(txt(sx(3.5), sy(0.5), viz.fInvLabel || 'f⁻¹', 12, C.good, 'start'));
  svg.appendChild(txt(sx(2.5), sy(2.5) - 6, 'y = x', 10, C.muted, 'start'));
}

function makeF(expr) {
  try { return new Function('x', `with(Math){ return ${expr}; }`); }
  catch { return () => 0; }
}
function curve(xMin, xMax, f, sx, sy, yMin, yMax, color) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = '', started = false;
  const N = 200;
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = f(x);
    if (!Number.isFinite(y) || y < yMin - 1 || y > yMax + 1) { started = false; continue; }
    d += (started ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(y).toFixed(1) + ' ';
    started = true;
  }
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none'); path.setAttribute('stroke', color); path.setAttribute('stroke-width', 2);
  return path;
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
