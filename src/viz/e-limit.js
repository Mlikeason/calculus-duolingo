// Visualize (1 + 1/n)^n → e as n grows.

import { C } from './colors.js';

export function renderELimit(host) {
  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-2';
  host.appendChild(wrap);

  const W = 420, H = 260, pad = 28;
  const xMin = 0, xMax = 30, yMin = 1.8, yMax = 3.0;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);

  // grid
  for (let x = 0; x <= 30; x += 5) svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1));
  for (let y = 1.8; y <= 3.0; y += 0.2) svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1));

  // e asymptote line
  const e = Math.E;
  const ea = line(pad, sy(e), W - pad, sy(e), C.good, 1.5);
  ea.setAttribute('stroke-dasharray', '5 4');
  svg.appendChild(ea);
  svg.appendChild(txt(W - pad - 4, sy(e) - 4, `y = e ≈ 2.718`, 11, C.good, 'end'));

  // axes
  svg.appendChild(line(pad, H - pad, W - pad, H - pad, C.muted, 1.5));
  svg.appendChild(line(pad, pad, pad, H - pad, C.muted, 1.5));
  svg.appendChild(txt(W - pad - 4, H - pad - 4, 'n', 11, C.muted, 'end'));
  svg.appendChild(txt(pad + 6, pad + 10, '(1 + 1/n)^n', 11, C.accent, 'start'));

  // Sample points and connecting "stair" suggesting discrete sequence
  const pts = [];
  for (let n = 1; n <= 30; n++) {
    pts.push([n, Math.pow(1 + 1 / n, n)]);
  }
  // Curve through the discrete points
  const path = document.createElementNS(svgNS, 'path');
  let d = '';
  pts.forEach(([n, v], i) => {
    d += (i === 0 ? 'M' : 'L') + sx(n).toFixed(1) + ',' + sy(v).toFixed(1) + ' ';
  });
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none'); path.setAttribute('stroke', C.accent); path.setAttribute('stroke-width', 2);
  svg.appendChild(path);
  pts.forEach(([n, v]) => {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', sx(n)); c.setAttribute('cy', sy(v));
    c.setAttribute('r', 2.5); c.setAttribute('fill', C.accent);
    svg.appendChild(c);
  });
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
