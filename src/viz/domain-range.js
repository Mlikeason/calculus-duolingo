// Show a function and shade the domain (x-axis interval) and range (y-axis interval).

import { C } from './colors.js';

export function renderDomainRange(host, viz) {
  const f = makeF(viz.f);
  const xMin = viz.xMin ?? -4, xMax = viz.xMax ?? 4;
  const yMin = viz.yMin ?? -2, yMax = viz.yMax ?? 6;
  const dom = viz.domain; // [a, b]
  const rng = viz.range;  // [c, d]

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';
  host.appendChild(wrap);

  const W = 420, H = 300, pad = 28;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);

  // grid
  for (let x = Math.ceil(xMin); x <= xMax; x++) svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1));
  for (let y = Math.ceil(yMin); y <= yMax; y++) svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1));

  // Domain band (vertical strip)
  if (dom) {
    const band = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    band.setAttribute('x', sx(dom[0])); band.setAttribute('y', pad);
    band.setAttribute('width', sx(dom[1]) - sx(dom[0]));
    band.setAttribute('height', H - 2 * pad);
    band.setAttribute('fill', C.soft); band.setAttribute('opacity', '0.6');
    svg.appendChild(band);
  }
  // Range band (horizontal strip)
  if (rng) {
    const band = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    band.setAttribute('x', pad); band.setAttribute('y', sy(rng[1]));
    band.setAttribute('width', W - 2 * pad);
    band.setAttribute('height', sy(rng[0]) - sy(rng[1]));
    band.setAttribute('fill', C.goodSoft); band.setAttribute('opacity', '0.6');
    svg.appendChild(band);
  }

  // axes
  svg.appendChild(line(pad, sy(0), W - pad, sy(0), C.muted, 1.5));
  svg.appendChild(line(sx(0), pad, sx(0), H - pad, C.muted, 1.5));

  // curve (restricted to domain if provided)
  const cMin = dom ? dom[0] : xMin, cMax = dom ? dom[1] : xMax;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = '', started = false;
  const N = 200;
  for (let i = 0; i <= N; i++) {
    const x = cMin + (i / N) * (cMax - cMin);
    const y = f(x);
    if (!Number.isFinite(y)) { started = false; continue; }
    d += (started ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(y).toFixed(1) + ' ';
    started = true;
  }
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none'); path.setAttribute('stroke', C.accent); path.setAttribute('stroke-width', 2);
  svg.appendChild(path);

  // labels
  if (dom) svg.appendChild(txt((sx(dom[0]) + sx(dom[1])) / 2, H - 6, `定义域 [${dom[0]}, ${dom[1]}]`, 11, C.accent));
  if (rng) svg.appendChild(txt(pad - 6, (sy(rng[0]) + sy(rng[1])) / 2, `值域 [${rng[0]}, ${rng[1]}]`, 11, C.good, 'end'));
}

function makeF(expr) {
  try { return new Function('x', `with(Math){ return ${expr}; }`); }
  catch { return () => 0; }
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
