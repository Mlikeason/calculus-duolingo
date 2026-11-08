import { renderMath } from '../src/katex-helper.js';
import { renderViz } from '../src/viz/index.js';
import '../styles/main.css';
import './ios-renderer.css';

const root = document.getElementById('content');
let lastKey;
const send = message => window.webkit?.messageHandlers.lesson.postMessage(message);
function block(tag, html, className = '') {
  const node = document.createElement(tag);
  node.innerHTML = html || '';
  node.className = className;
  return node;
}
function visual(intro, values = {}) {
  if (!intro.visual) return;
  const host = block('section', '', 'visual card');
  host.setAttribute('aria-label', '交互图形');
  root.append(host);
  renderViz(host, intro.visual);
  const inputs = [...host.querySelectorAll('input')];
  inputs.forEach((input, i) => {
    input.setAttribute('aria-label', input.parentElement.querySelector('label')?.textContent || `图形参数 ${i + 1}`);
    if (values[i] !== undefined) { input.value = values[i]; input.dispatchEvent(new Event('input')); }
    input.addEventListener('input', () => {
      send({ type: 'visual', values: Object.fromEntries(inputs.map((v, j) => [j, v.value])) });
    });
  });
}
function introduction(intro, includeVisual, values) {
  root.append(block('p', intro.hook, 'lead'));
  if (includeVisual) visual(intro, values);
  if (intro.intuition) root.append(block('p', intro.intuition));
  if (intro.formula) {
    const box = block('section', '<div class="eyebrow">数学语言</div>', 'formula');
    box.append(block('div', `$$${intro.formula.latex}$$`));
    if (intro.formula.caption) box.append(block('p', intro.formula.caption, 'caption'));
    root.append(box);
  }
  if (intro.takeaway) root.append(block('aside', `<div class="eyebrow">一句话记住</div>${intro.takeaway}`, 'takeaway'));
}
window.renderLesson = p => {
  document.documentElement.style.fontSize = `${17 * p.fontScale}px`;
  const key = JSON.stringify([p.key, p.mode, p.index, p.submitted]);
  if (key === lastKey) return;
  lastKey = key;
  root.replaceChildren();
  window.scrollTo(0, 0);
  if (p.mode === 'reference') {
    root.append(block('div', '边看边想', 'eyebrow'));
    if (p.intro.visual) visual(p.intro, p.visualValues);
    introduction(p.intro, false, p.visualValues);
  } else if (p.mode === 'intro') {
    root.append(block('div', '建立直觉', 'eyebrow'));
    root.append(block('h1', p.title));
    introduction(p.intro, true, p.visualValues);
  } else {
    root.append(block('div', `练习 ${p.number} / ${p.total}`, 'eyebrow'));
    const exercise = p.exercise;
    root.append(block('h1', exercise.prompt, 'question'));
    if (exercise.type === 'fill') {
      const form = document.createElement('form');
      const label = block('label', '你的答案');
      label.htmlFor = 'answer';
      const input = document.createElement('input');
      input.id = 'answer'; input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false;
      input.autocapitalize = 'none'; input.maxLength = 300;
      input.placeholder = '输入数值、分数或公式';
      input.value = p.submitted?.text ?? p.draft ?? '';
      input.disabled = !!p.submitted;
      const button = block('button', '检查答案', 'submit');
      button.type = 'submit'; button.disabled = !!p.submitted || !input.value.trim();
      input.addEventListener('input', () => {
        button.disabled = !input.value.trim();
        send({ type: 'draft', index: p.index, text: input.value });
      });
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!input.value.trim() || p.submitted) return;
        input.blur();
        send({ type: 'answer', index: p.index, text: input.value });
      });
      form.append(label, input, button); root.append(form);
    } else {
      const items = exercise.type === 'truefalse' ? ['对', '错'] : exercise.options;
      const order = exercise.type === 'truefalse' ? [0, 1] : p.order;
      const correctIndex = exercise.type === 'truefalse' ? (exercise.answer ? 0 : 1) : exercise.answer;
      const shortOptions = items.every(item => String(item).replace(/<[^>]+>/g, '').length < 18);
      const list = block('div', '', shortOptions ? 'choices short' : 'choices');
      for (const index of order) {
        const button = block('button', items[index], 'option');
        if (p.submitted) {
          button.disabled = true;
          if (index === correctIndex) { button.classList.add('correct'); button.append(document.createTextNode(' ✓')); }
          else if (index === p.submitted.choice) { button.classList.add('incorrect'); button.append(document.createTextNode(' ✕')); }
        }
        button.addEventListener('click', () => send({ type: 'answer', index: p.index, choice: index }));
        list.append(button);
      }
      root.append(list);
    }
    if (p.submitted) {
      const correct = p.submitted.correct;
      const feedback = block('section', `<strong>${correct ? '答对了，继续积累。' : '没关系，从这里学会。'}</strong>`, `feedback ${correct ? 'correct' : 'incorrect'}`);
      feedback.setAttribute('role', 'status');
      if (!correct && exercise.type === 'fill') {
        const answer = Array.isArray(exercise.answer) ? exercise.answer[0] : exercise.answer;
        const text = document.createElement('p'); text.textContent = `参考答案：${answer}`; feedback.append(text);
      }
      if (exercise.explain) feedback.append(block('p', exercise.explain));
      root.append(feedback);
    }
  }
  renderMath(root);
  delete root.dataset.mathRendered;
};
