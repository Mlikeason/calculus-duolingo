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
    <div class="text-xs uppercase tracking-[0.18em] text-muted mb-2">拾级 · 微积分</div>
    <h1 class="font-serif text-[2rem] leading-tight tracking-tight">一个普通人的微积分</h1>
    <p class="text-muted mt-2 text-sm">每段 2–3 分钟 · 自定节奏 · 答错不扣分</p>
  `;
  page.appendChild(header);

  // Overall progress
  const total = order.length;
  const done = order.filter(isDone).length;
  const progress = document.createElement('div');
  progress.className = 'mb-10';
  progress.innerHTML = `
    <div class="flex items-baseline justify-between text-xs">
      <span class="text-muted">进度 · ${done} / ${total}</span>
      <button class="text-muted hover:text-accent transition" data-action="reset">重置</button>
    </div>
    <div class="progress-track mt-2">
      <div class="progress-fill" style="width: ${total ? (done / total) * 100 : 0}%"></div>
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

  curriculum.forEach((module) => {
    const mod = document.createElement('section');
    mod.className = 'module-section mb-6';
    const moduleUnits = module.lessons.flatMap((l) => l.units);
    const moduleDone = moduleUnits.filter((u) => isDone(u.id)).length;
    mod.innerHTML = `
      <header class="flex items-baseline justify-between mb-5">
        <div>
          <h2 class="font-serif text-xl text-ink">${module.title}</h2>
          ${module.subtitle ? `<p class="text-xs text-muted mt-0.5">${module.subtitle}</p>` : ''}
        </div>
        <span class="text-xs text-muted font-mono">${moduleDone}/${moduleUnits.length}</span>
      </header>
    `;
    page.appendChild(mod);

    module.lessons.forEach((lesson, li) => {
      const ls = document.createElement('div');
      ls.className = li === module.lessons.length - 1 ? '' : 'mb-5';
      ls.innerHTML = `
        <h3 class="text-[0.75rem] uppercase tracking-[0.12em] text-muted mb-2 ml-3">${lesson.title}</h3>
      `;
      mod.appendChild(ls);

      lesson.units.forEach((unit, idx) => {
        const status = unitStatus(order, unit.id);
        const row = document.createElement('div');
        row.className = `node-row ${status === 'locked' ? 'locked' : ''}`;
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

        if (status !== 'locked') {
          row.addEventListener('click', () => go('/lesson/' + unit.id));
        }
      });
    });
  });

  const foot = document.createElement('footer');
  foot.className = 'text-center text-xs text-muted mt-12 pb-8';
  foot.innerHTML = `<span class="opacity-60">一个普通人的微积分 · 拾级版</span>`;
  page.appendChild(foot);

  renderMath(page);
}
