import { curriculum, allUnitsInOrder } from '../data/index.js';
import { isDone, unitStatus, reset } from './state.js';
import { go } from './router.js';
import { renderMath } from './katex-helper.js';

export function renderTree(host) {
  host.innerHTML = '';
  const order = allUnitsInOrder();

  const page = document.createElement('div');
  page.className = 'max-w-2xl mx-auto px-5 py-10';
  host.appendChild(page);

  const header = document.createElement('header');
  header.className = 'mb-8';
  header.innerHTML = `
    <h1 class="font-serif text-[2rem] leading-tight tracking-tight">微/积</h1>
    <p class="text-muted mt-2 text-sm">细微处，积跬步</p>
  `;
  page.appendChild(header);

  // Overall progress
  const total = order.length;
  const done = order.filter(isDone).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const progress = document.createElement('div');
  progress.className = 'mb-10';
  progress.innerHTML = `
    <div class="flex items-baseline justify-between text-xs">
      <span class="text-muted">进度 · ${done} / ${total}（${pct}%）</span>
      <button class="text-muted hover:text-accent transition" data-action="reset">重置</button>
    </div>
    <div class="progress-track mt-2">
      <div class="progress-fill" style="width: ${pct}%"></div>
    </div>
  `;
  page.appendChild(progress);

  progress.querySelector('[data-action="reset"]').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('确定清空所有进度？')) {
      reset();
      renderTree(host);
    }
  });

  // Find active module (the one containing the first 'available' unit)
  let activeModuleId = curriculum[curriculum.length - 1].id;
  for (const m of curriculum) {
    const hasAvailable = m.lessons.some((l) => l.units.some((u) => unitStatus(order, u.id) === 'available'));
    if (hasAvailable) { activeModuleId = m.id; break; }
  }

  curriculum.forEach((module) => {
    const moduleUnits = module.lessons.flatMap((l) => l.units);
    const moduleDone = moduleUnits.filter((u) => isDone(u.id)).length;
    const moduleTotal = moduleUnits.length;
    const isActive = module.id === activeModuleId;
    const allDone = moduleDone === moduleTotal && moduleTotal > 0;

    const mod = document.createElement('section');
    let cls = 'module-section mb-6';
    if (isActive) cls += ' module-active';
    else if (allDone) cls += ' module-done';
    mod.className = cls;

    const hdr = document.createElement('header');
    hdr.className = 'module-header flex items-center justify-between';
    hdr.innerHTML = `
      <div class="flex items-center gap-3 min-w-0">
        <span class="module-chevron">›</span>
        <div class="min-w-0">
          <h2 class="font-serif text-xl text-ink">${allDone ? '✓ ' : ''}${module.title}</h2>
          ${module.subtitle ? `<p class="text-xs text-muted mt-0.5">${module.subtitle}</p>` : ''}
        </div>
      </div>
      <span class="text-xs text-muted font-mono flex-shrink-0">${moduleDone}/${moduleTotal}</span>
    `;
    mod.appendChild(hdr);

    // Module progress bar
    const modProg = document.createElement('div');
    modProg.className = 'module-progress';
    modProg.innerHTML = `<div class="module-progress-fill" style="width: ${moduleTotal ? (moduleDone / moduleTotal) * 100 : 0}%"></div>`;
    mod.appendChild(modProg);

    const body = document.createElement('div');
    body.className = 'module-body mt-5';
    body.style.display = 'none';
    mod.appendChild(body);

    hdr.addEventListener('click', () => {
      const open = body.style.display !== 'none';
      body.style.display = open ? 'none' : '';
      hdr.querySelector('.module-chevron').classList.toggle('open', !open);
    });

    page.appendChild(mod);

    module.lessons.forEach((lesson, li) => {
      const ls = document.createElement('div');
      ls.className = li === module.lessons.length - 1 ? '' : 'mb-5';
      ls.innerHTML = `
        <h3 class="text-[0.75rem] uppercase tracking-[0.12em] text-muted mb-2 ml-3">${lesson.title}</h3>
      `;
      body.appendChild(ls);

      lesson.units.forEach((unit, idx) => {
        const status = unitStatus(order, unit.id);
        const row = document.createElement('div');
        row.className = `node-row ${status === 'locked' ? 'locked' : ''}`;
        row.setAttribute('tabindex', '0');
        row.setAttribute('role', 'button');
        row.innerHTML = `
          <div class="node-dot ${status}"></div>
          <div class="flex-1 min-w-0">
            <div class="${status === 'done' ? 'text-muted' : 'text-ink'}">${unit.title}</div>
          </div>
          <div class="text-[0.7rem] text-muted">${status === 'done' ? '已学' : status === 'available' ? '可学' : ''}</div>
        `;
        ls.appendChild(row);

        if (idx < lesson.units.length - 1) {
          const conn = document.createElement('div');
          conn.className = 'node-connector';
          ls.appendChild(conn);
        }

        const target = status === 'locked' ? '/preview/' + unit.id : '/lesson/' + unit.id;
        row.addEventListener('click', () => go(target));
        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(target); }
        });
      });
    });
  });

  const foot = document.createElement('footer');
  foot.className = 'text-center text-xs text-muted mt-12 pb-8';
  foot.innerHTML = `<span class="opacity-60">微/积</span>`;
  page.appendChild(foot);

  renderMath(page);
}
