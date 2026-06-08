// Side-by-side: y = a^x and y = log_a(x), mirror across y = x.

import { C } from './colors.js';

export function renderExpLog(host, viz) {
  const base = viz.base ?? Math.E;
  const xMin = -3, xMax = 3, yMin = -3, yMax = 3;

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';
  host.appendChild(wrap);

  const W = 400, H = 320, pad = 24;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);

  // grid
  for (let x = Math.ceil(xMin); x <= xMax; x++) svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1));
  for (let y = Math.ceil(yMin); y <= yMax; y++) svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1));

  // axes
  svg.appendChild(line(pad, sy(0), W - pad, sy(0), C.muted, 1.5));
  svg.appendChild(line(sx(0), pad, sx(0), H - pad, C.muted, 1.5));

  // y = x mirror line
  const mirror = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  mirror.setAttribute('x1', sx(-3)); mirror.setAttribute('y1', sy(-3));
  mirror.setAttribute('x2', sx(3));  mirror.setAttribute('y2', sy(3));
  mirror.setAttribute('stroke', C.dashed); mirror.setAttribute('stroke-width', 1);
  mirror.setAttribute('stroke-dasharray', '4 4');
  svg.appendChild(mirror);
  svg.appendChild(txt(sx(2.6), sy(2.6) - 4, 'y = x', 10, C.muted, 'start'));

  // y = a^x (accent)
  svg.appendChild(curve(xMin, xMax, (x) => Math.pow(base, x), sx, sy, yMin, yMax, C.accent));
  // y = log_a x (good)
  svg.appendChild(curve(0.05, xMax, (x) => Math.log(x) / Math.log(base), sx, sy, yMin, yMax, C.good));

  svg.appendChild(txt(sx(0.9), sy(2.6), `y = ${base === Math.E ? 'e^x' : base + '^x'}`, 12, C.accent, 'start'));
  svg.appendChild(txt(sx(2.4), sy(0.6), `y = ${base === Math.E ? 'ln x' : 'log x'}`, 12, C.good, 'start'));
}

function curve(xMin, xMax, f, sx, sy, yMin, yMax, color) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = '';
  const N = 200;
  let started = false;
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = f(x);
    if (!Number.isFinite(y) || y < yMin - 1 || y > yMax + 1) { started = false; continue; }
    d += (started ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(y).toFixed(1) + ' ';
    started = true;
  }
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', '2');
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
