// Unit circle: rotate angle θ, show cos θ (horizontal) and sin θ (vertical).

import { C } from './colors.js';

export function renderUnitCircle(host, viz) {
  let theta = viz.initial ?? Math.PI / 4; // radians

  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';
  host.appendChild(wrap);

  const W = 360, H = 320, cx = 170, cy = 160, r = 120;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'w-full max-w-md mx-auto block');
  wrap.appendChild(svg);

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // axes
    svg.appendChild(line(cx - r - 20, cy, cx + r + 20, cy, C.muted, 1));
    svg.appendChild(line(cx, cy - r - 20, cx, cy + r + 20, C.muted, 1));

    // unit circle
    const circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circ.setAttribute('cx', cx); circ.setAttribute('cy', cy); circ.setAttribute('r', r);
    circ.setAttribute('fill', 'none'); circ.setAttribute('stroke', C.line); circ.setAttribute('stroke-width', 1.5);
    svg.appendChild(circ);

    const px = cx + r * Math.cos(theta);
    const py = cy - r * Math.sin(theta);

    // radius
    svg.appendChild(line(cx, cy, px, py, C.accent, 2));
    // cos (horizontal projection) — green
    svg.appendChild(line(cx, cy, px, cy, C.good, 2.5));
    // sin (vertical projection) — accent
    svg.appendChild(line(px, cy, px, py, C.accent, 2.5));
    // point
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', px); dot.setAttribute('cy', py); dot.setAttribute('r', 4); dot.setAttribute('fill', C.accent);
    svg.appendChild(dot);

    // angle arc
    const ar = 28;
    const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const ex = cx + ar * Math.cos(theta), ey = cy - ar * Math.sin(theta);
    const sweep = theta > 0 ? 0 : 1;
    arc.setAttribute('d', `M ${cx + ar} ${cy} A ${ar} ${ar} 0 0 ${sweep} ${ex} ${ey}`);
    arc.setAttribute('fill', 'none'); arc.setAttribute('stroke', C.accent); arc.setAttribute('stroke-width', 1.5);
    svg.appendChild(arc);

    // labels
    svg.appendChild(txt(cx + r + 12, cy + 14, 'x', 11, C.muted, 'start'));
    svg.appendChild(txt(cx - 6, cy - r - 12, 'y', 11, C.muted, 'end'));

    const cosV = Math.cos(theta), sinV = Math.sin(theta);
    svg.appendChild(txt((cx + px) / 2, cy + 16, `cos θ = ${cosV.toFixed(2)}`, 12, C.good, 'middle'));
    svg.appendChild(txt(px + (cosV >= 0 ? 6 : -6), (cy + py) / 2 + 4, `sin θ = ${sinV.toFixed(2)}`, 12, C.accent, cosV >= 0 ? 'start' : 'end'));
    svg.appendChild(txt(cx + ar + 6, cy - 6, `θ`, 12, C.accent, 'start'));
  }

  const controls = document.createElement('div');
  controls.className = 'flex items-center gap-3 text-sm';
  controls.innerHTML = `
    <label class="text-muted">θ =</label>
    <input type="range" min="0" max="6.283" step="0.05" value="${theta}" class="flex-1" />
    <span class="font-mono text-accent w-20 text-right" data-t>${theta.toFixed(2)} rad</span>
  `;
  wrap.appendChild(controls);
  const slider = controls.querySelector('input');
  const lab = controls.querySelector('[data-t]');
  slider.addEventListener('input', (e) => {
    theta = parseFloat(e.target.value);
    lab.textContent = theta.toFixed(2) + ' rad';
    draw();
  });

  draw();
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
