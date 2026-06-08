import { findUnit, allUnitsInOrder } from '../data/index.js';
import { markDone } from './state.js';
import { go } from './router.js';
import { renderMath } from './katex-helper.js';
import { renderExercise } from './exercises/index.js';
import { renderViz } from './viz/index.js';

export function renderLesson(host, unitId) {
  const unit = findUnit(unitId);
  if (!unit) {
    host.innerHTML = `<div class="max-w-2xl mx-auto p-8 text-center">
      <p class="text-muted">这节课还没有内容</p>
      <button class="btn mt-4" onclick="location.hash='#/'">返回</button>
    </div>`;
    return;
  }

  // Build slides: intro + each exercise
  const slides = [];
  if (unit.intro) slides.push({ kind: 'intro', data: unit.intro });
  (unit.exercises || []).forEach((ex, i) => slides.push({ kind: 'exercise', data: ex, index: i }));
  slides.push({ kind: 'done' });

  let idx = 0;
  let correctCount = 0;

  host.innerHTML = '';
  const page = document.createElement('div');
  page.className = 'min-h-screen flex flex-col';
  host.appendChild(page);

  // Top bar
  const top = document.createElement('div');
  top.className = 'border-b border-line bg-paper';
  top.innerHTML = `
    <div class="max-w-2xl mx-auto px-5 py-3 flex items-center gap-4">
      <button class="text-muted hover:text-ink text-sm" data-action="back">← 退出</button>
      <div class="flex-1 h-1.5 bg-line rounded overflow-hidden">
        <div class="h-full bg-accent transition-all" data-progress style="width: 0%"></div>
      </div>
      <span class="text-xs text-muted" data-step>1 / ${slides.length}</span>
    </div>
  `;
  page.appendChild(top);
  top.querySelector('[data-action="back"]').addEventListener('click', () => {
    if (confirm('退出这一节？已答对的题不会丢失（但本节不算完成）')) go('/');
  });

  // Slide area
  const slideHost = document.createElement('main');
  slideHost.className = 'flex-1 max-w-2xl w-full mx-auto px-5 py-8';
  page.appendChild(slideHost);

  // Bottom nav
  const bottom = document.createElement('div');
  bottom.className = 'border-t border-line bg-paper sticky bottom-0';
  bottom.innerHTML = `
    <div class="max-w-2xl mx-auto px-5 py-4 flex justify-end">
      <button class="btn-primary" data-action="next">继续</button>
    </div>
  `;
  page.appendChild(bottom);

  const nextBtn = bottom.querySelector('[data-action="next"]');
  let canAdvance = false;

  function setCanAdvance(v) {
    canAdvance = v;
    nextBtn.disabled = !v;
  }

  function updateProgress() {
    const pct = ((idx + 1) / slides.length) * 100;
    top.querySelector('[data-progress]').style.width = pct + '%';
    top.querySelector('[data-step]').textContent = `${idx + 1} / ${slides.length}`;
  }

  function renderSlide() {
    slideHost.innerHTML = '';
    bottom.style.display = '';
    const s = slides[idx];
    updateProgress();

    if (s.kind === 'intro') {
      const wrap = document.createElement('article');
      wrap.className = 'space-y-5 max-w-prose mx-auto slide-in';
      const data = s.data;
      if (data.heading) {
        const h = document.createElement('h1');
        h.className = 'font-serif text-2xl';
        h.textContent = data.heading;
        wrap.appendChild(h);
      } else {
        const h = document.createElement('h1');
        h.className = 'font-serif text-2xl';
        h.textContent = unit.title;
        wrap.appendChild(h);
      }
      if (data.hook) {
        const p = document.createElement('p');
        p.className = 'text-ink leading-relaxed';
        p.innerHTML = data.hook;
        wrap.appendChild(p);
      }
      if (data.visual) {
        const vizWrap = document.createElement('div');
        vizWrap.className = 'card p-4 my-3';
        wrap.appendChild(vizWrap);
        renderViz(vizWrap, data.visual);
      }
      if (data.intuition) {
        const p = document.createElement('p');
        p.className = 'text-ink leading-relaxed';
        p.innerHTML = data.intuition;
        wrap.appendChild(p);
      }
      if (data.formula) {
        const f = document.createElement('div');
        f.className = 'callout';
        f.innerHTML = `<div class="text-sm text-muted mb-1">记号</div>
          <div>$$${data.formula.latex}$$</div>
          ${data.formula.caption ? `<div class="text-sm text-muted mt-1">${data.formula.caption}</div>` : ''}`;
        wrap.appendChild(f);
      }
      if (data.takeaway) {
        const t = document.createElement('div');
        t.className = 'callout';
        t.innerHTML = `<div class="text-sm text-muted mb-1">一句话记住</div><div>${data.takeaway}</div>`;
        wrap.appendChild(t);
      }
      slideHost.appendChild(wrap);
      renderMath(wrap);
      setCanAdvance(true);
      nextBtn.textContent = '开始练习 →';
    } else if (s.kind === 'exercise') {
      const card = document.createElement('div');
      card.className = 'card p-5 space-y-3 slide-in';
      const stepLabel = document.createElement('div');
      stepLabel.className = 'text-xs uppercase tracking-wider text-muted';
      stepLabel.textContent = `练习 ${s.index + 1}`;
      card.appendChild(stepLabel);
      slideHost.appendChild(card);

      const exHost = renderExercise(s.data, (correct) => {
        if (correct) correctCount++;
        setCanAdvance(true);
      });
      card.appendChild(exHost);
      setCanAdvance(false);
      nextBtn.textContent = idx === slides.length - 2 ? '完成 →' : '继续';
    } else if (s.kind === 'done') {
      markDone(unit.id);
      const exCount = (unit.exercises || []).length;
      const wrap = document.createElement('div');
      wrap.className = 'text-center py-16 space-y-4 slide-in';
      wrap.innerHTML = `
        <div class="font-serif text-3xl">完成</div>
        <p class="text-muted">${unit.title} · 答对 ${correctCount} / ${exCount}</p>
        <div class="flex gap-3 justify-center pt-4">
          <button class="btn" data-action="redo">再做一遍</button>
          <button class="btn-primary" data-action="continue">下一节 →</button>
        </div>
      `;
      slideHost.appendChild(wrap);
      wrap.querySelector('[data-action="redo"]').addEventListener('click', () => {
        idx = 0; correctCount = 0; renderSlide();
      });
      wrap.querySelector('[data-action="continue"]').addEventListener('click', () => {
        const order = allUnitsInOrder();
        const cur = order.indexOf(unit.id);
        const next = order[cur + 1];
        if (next) go('/lesson/' + next);
        else go('/');
      });
      // Hide bottom bar
      bottom.style.display = 'none';
    }
  }

  nextBtn.addEventListener('click', () => {
    if (!canAdvance) return;
    if (idx < slides.length - 1) {
      idx++;
      renderSlide();
    }
  });

  renderSlide();
}
