// Generic function plotter on a Cartesian grid.
// viz: { f: 'x*x', xMin, xMax, yMin, yMax, samplePoints?: [x,...], showPoint?: true, initialX? }

import { C } from './colors.js';

export function renderPlotter(host, viz) {
  const f = makeF(viz.f);
  const xMin = viz.xMin ?? -4, xMax = viz.xMax ?? 4;
  const yMin = viz.yMin ?? -4, yMax = viz.yMax ?? 4;
  const showPoint = !!viz.showPoint;
  let curX = viz.initialX ?? 1;

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';
  host.appendChild(wrap);

  const W = 420, H = 280, pad = 24;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full');
  wrap.appendChild(svg);

  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Grid
    const gx = []; for (let x = Math.ceil(xMin); x <= xMax; x++) gx.push(x);
    const gy = []; for (let y = Math.ceil(yMin); y <= yMax; y++) gy.push(y);
    gx.forEach((x) => svg.appendChild(line(sx(x), pad, sx(x), H - pad, C.line, 1)));
    gy.forEach((y) => svg.appendChild(line(pad, sy(y), W - pad, sy(y), C.line, 1)));

    // Axes
    svg.appendChild(line(pad, sy(0), W - pad, sy(0), C.muted, 1.5));
    svg.appendChild(line(sx(0), pad, sx(0), H - pad, C.muted, 1.5));
    svg.appendChild(txt(W - pad - 4, sy(0) - 4, 'x', 11, C.muted, 'end'));
    svg.appendChild(txt(sx(0) + 6, pad + 12, 'y', 11, C.muted, 'start'));

    // Curve
    const path = document.createElementNS(svgNS, 'path');
    let d = '';
    const N = 200;
    let started = false;
    for (let i = 0; i <= N; i++) {
      const x = xMin + (i / N) * (xMax - xMin);
      const y = f(x);
      if (!Number.isFinite(y) || y < yMin - 10 || y > yMax + 10) { started = false; continue; }
      const X = sx(x), Y = sy(y);
      d += (started ? 'L' : 'M') + X.toFixed(1) + ',' + Y.toFixed(1) + ' ';
      started = true;
    }
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', C.accent);
    path.setAttribute('stroke-width', '2');
    svg.appendChild(path);

    // Sample points (filled dots)
    (viz.samplePoints || []).forEach(([px, py]) => {
      const c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', sx(px)); c.setAttribute('cy', sy(py)); c.setAttribute('r', 3);
      c.setAttribute('fill', C.accent);
      svg.appendChild(c);
    });

    // "Hole" — open circle indicating function is undefined at this x
    // viz.hole: { x, y } — y is the limit value (where the hole appears)
    if (viz.hole) {
      const h = document.createElementNS(svgNS, 'circle');
      h.setAttribute('cx', sx(viz.hole.x));
      h.setAttribute('cy', sy(viz.hole.y));
      h.setAttribute('r', 4.5);
      h.setAttribute('fill', C.paper);
      h.setAttribute('stroke', C.accent);
      h.setAttribute('stroke-width', '1.8');
      svg.appendChild(h);
    }

    // "Solid dot" — filled circle indicating a defined function value
    if (viz.solidDot) {
      const d = document.createElementNS(svgNS, 'circle');
      d.setAttribute('cx', sx(viz.solidDot.x));
      d.setAttribute('cy', sy(viz.solidDot.y));
      d.setAttribute('r', 4.5);
      d.setAttribute('fill', C.accent);
      svg.appendChild(d);
    }

    // Vertical dashed asymptote
    if (viz.asymptote !== undefined) {
      const a = document.createElementNS(svgNS, 'line');
      a.setAttribute('x1', sx(viz.asymptote));
      a.setAttribute('y1', pad);
      a.setAttribute('x2', sx(viz.asymptote));
      a.setAttribute('y2', H - pad);
      a.setAttribute('stroke', C.dashed);
      a.setAttribute('stroke-width', '1');
      a.setAttribute('stroke-dasharray', '4 4');
      svg.appendChild(a);
    }

    if (showPoint) {
      const yCur = f(curX);
      const pX = sx(curX), pY = sy(yCur);
      // guide lines
      svg.appendChild(line(pX, sy(0), pX, pY, C.accent, 1));
      svg.appendChild(line(sx(0), pY, pX, pY, C.accent, 1));
      const c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', pX); c.setAttribute('cy', pY); c.setAttribute('r', 4);
      c.setAttribute('fill', C.accent);
      svg.appendChild(c);
      svg.appendChild(txt(pX + 6, pY - 6, `(${fmt(curX)}, ${fmt(yCur)})`, 11, C.accent, 'start'));
    }
  }

  if (showPoint) {
    const controls = document.createElement('div');
    controls.className = 'flex items-center gap-3 text-sm';
    controls.innerHTML = `
      <label class="text-muted">x =</label>
      <input type="range" min="${xMin}" max="${xMax}" step="0.1" value="${curX}" class="flex-1" />
      <span class="font-mono text-accent w-12 text-right" data-x>${fmt(curX)}</span>
    `;
    wrap.appendChild(controls);
    const slider = controls.querySelector('input');
    const lab = controls.querySelector('[data-x]');
    slider.addEventListener('input', (e) => {
      curX = parseFloat(e.target.value);
      lab.textContent = fmt(curX);
      draw();
    });
  }

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
