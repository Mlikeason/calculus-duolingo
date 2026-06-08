// Three small panels side-by-side: removable, jump, infinite discontinuity.

import { C } from './colors.js';

export function renderDiscontinuityTypes(host) {
  host.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'grid grid-cols-1 sm:grid-cols-3 gap-3';
  host.appendChild(wrap);

  const panels = [
    { label: '可去（洞）', subtitle: 'lim 存在但缺值', draw: drawRemovable },
    { label: '跳跃', subtitle: '左右极限不相等', draw: drawJump },
    { label: '无穷', subtitle: '至少一边 → ±∞', draw: drawInfinite }
  ];

  panels.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'rounded-lg border border-line bg-paper p-2';
    const ttl = document.createElement('div');
    ttl.className = 'text-xs text-ink font-medium px-1';
    ttl.textContent = p.label;
    const sub = document.createElement('div');
    sub.className = 'text-[10px] text-muted px-1 mb-1';
    sub.textContent = p.subtitle;
    card.appendChild(ttl); card.appendChild(sub);
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 160 120');
    svg.setAttribute('class', 'w-full');
    p.draw(svg);
    card.appendChild(svg);
    wrap.appendChild(card);
  });
}

function gridAxes(svg) {
  // axes through center
  svg.appendChild(line(10, 60, 150, 60, C.muted, 1));
  svg.appendChild(line(80, 10, 80, 110, C.muted, 1));
}

function drawRemovable(svg) {
  gridAxes(svg);
  // line y = x/2 + 30 (sloped going down to up), with hole at x = 80 (mid)
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M 15 90 L 76 49');
  path.setAttribute('stroke', C.accent); path.setAttribute('stroke-width', 2); path.setAttribute('fill', 'none');
  svg.appendChild(path);
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M 84 49 L 145 30');
  path2.setAttribute('stroke', C.accent); path2.setAttribute('stroke-width', 2); path2.setAttribute('fill', 'none');
  svg.appendChild(path2);
  // hole circle at (80, 49)
  const hole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  hole.setAttribute('cx', 80); hole.setAttribute('cy', 49); hole.setAttribute('r', 4);
  hole.setAttribute('fill', '#fff'); hole.setAttribute('stroke', C.accent); hole.setAttribute('stroke-width', 1.5);
  svg.appendChild(hole);
}

function drawJump(svg) {
  gridAxes(svg);
  // left piece ending at (80, 40)
  const pL = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pL.setAttribute('d', 'M 15 80 L 76 40');
  pL.setAttribute('stroke', C.accent); pL.setAttribute('stroke-width', 2); pL.setAttribute('fill', 'none');
  svg.appendChild(pL);
  // right piece starting at (80, 80)
  const pR = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pR.setAttribute('d', 'M 84 80 L 145 50');
  pR.setAttribute('stroke', C.accent); pR.setAttribute('stroke-width', 2); pR.setAttribute('fill', 'none');
  svg.appendChild(pR);
  // open endpoint on left
  const h1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  h1.setAttribute('cx', 80); h1.setAttribute('cy', 40); h1.setAttribute('r', 3.5);
  h1.setAttribute('fill', '#fff'); h1.setAttribute('stroke', C.accent); h1.setAttribute('stroke-width', 1.5);
  svg.appendChild(h1);
  // solid endpoint on right
  const h2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  h2.setAttribute('cx', 80); h2.setAttribute('cy', 80); h2.setAttribute('r', 3.5);
  h2.setAttribute('fill', C.accent);
  svg.appendChild(h2);
}

function drawInfinite(svg) {
  gridAxes(svg);
  // dashed asymptote at x = 80
  const asym = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  asym.setAttribute('x1', 80); asym.setAttribute('y1', 10);
  asym.setAttribute('x2', 80); asym.setAttribute('y2', 110);
  asym.setAttribute('stroke', C.dashed); asym.setAttribute('stroke-width', 1);
  asym.setAttribute('stroke-dasharray', '3 3');
  svg.appendChild(asym);
  // y = 1/(x - 80/50) shape; draw two pieces of 1/x around x=80
  // left branch goes to -infty as x->80-
  const pL = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let dL = 'M 15 55';
  for (let i = 1; i < 64; i++) {
    const x = 15 + i;
    const y = 60 + 20 / Math.max(0.01, (80 - x) / 65) * 0.4;
    dL += ' L ' + x + ' ' + Math.min(115, y);
  }
  pL.setAttribute('d', dL);
  pL.setAttribute('stroke', C.accent); pL.setAttribute('stroke-width', 2); pL.setAttribute('fill', 'none');
  svg.appendChild(pL);

  const pR = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let dR = 'M 145 65';
  for (let i = 1; i < 64; i++) {
    const x = 145 - i;
    const y = 60 - 20 / Math.max(0.01, (x - 80) / 65) * 0.4;
    dR += ' L ' + x + ' ' + Math.max(5, y);
  }
  pR.setAttribute('d', dR);
  pR.setAttribute('stroke', C.accent); pR.setAttribute('stroke-width', 2); pR.setAttribute('fill', 'none');
  svg.appendChild(pR);
}

function line(x1, y1, x2, y2, stroke, w) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  el.setAttribute('x1', x1); el.setAttribute('y1', y1); el.setAttribute('x2', x2); el.setAttribute('y2', y2);
  el.setAttribute('stroke', stroke); el.setAttribute('stroke-width', w);
  return el;
}
