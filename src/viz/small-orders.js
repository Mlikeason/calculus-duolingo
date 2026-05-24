// Show x, x², x³ near 0 to compare orders of infinitesimals.

const C = { line:'#d8dde6', muted:'#5e6b80', accent:'#2c4a7a', good:'#1f6b40', bad:'#9b2d20' };

export function renderSmallOrders(host) {
  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-2';
  host.appendChild(wrap);

  const W = 420, H = 280, pad = 28;
  const xMin = -1, xMax = 1, yMin = -0.6, yMax = 1.05;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);

  // Grid
  for (let x = -1; x <= 1; x += 0.5) svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1));
  for (let y = -0.5; y <= 1; y += 0.5) svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1));

  svg.appendChild(line(pad, sy(0), W - pad, sy(0), C.muted, 1.5));
  svg.appendChild(line(sx(0), pad, sx(0), H - pad, C.muted, 1.5));

  drawCurve(svg, xMin, xMax, (x) => x, sx, sy, yMin, yMax, C.accent);
  drawCurve(svg, xMin, xMax, (x) => x * x, sx, sy, yMin, yMax, C.good);
  drawCurve(svg, xMin, xMax, (x) => x * x * x, sx, sy, yMin, yMax, C.bad);

  svg.appendChild(txt(sx(0.85), sy(0.85), 'y = x', 11, C.accent, 'start'));
  svg.appendChild(txt(sx(0.85), sy(0.70), 'y = x²', 11, C.good, 'start'));
  svg.appendChild(txt(sx(0.85), sy(0.55), 'y = x³', 11, C.bad, 'start'));

  const note = document.createElement('p');
  note.className = 'text-xs text-muted text-center';
  note.textContent = '靠近 0 时，x³ 比 x² 更扁、x² 比 x 更扁 — 高次的「更快地」走向 0';
  wrap.appendChild(note);
}

function drawCurve(svg, xMin, xMax, f, sx, sy, yMin, yMax, color) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = '', started = false;
  const N = 100;
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = f(x);
    if (!Number.isFinite(y) || y < yMin - 0.5 || y > yMax + 0.5) { started = false; continue; }
    d += (started ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(y).toFixed(1) + ' ';
    started = true;
  }
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none'); path.setAttribute('stroke', color); path.setAttribute('stroke-width', 2);
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
