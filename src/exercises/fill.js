import { renderMath } from '../katex-helper.js';

function normalize(s) {
  return String(s).trim().replace(/\s+/g, '').toLowerCase();
}

function matches(input, answer) {
  if (Array.isArray(answer)) return answer.some((a) => matches(input, a));
  const ni = normalize(input);
  const na = normalize(answer);
  if (ni === na) return true;
  // Try numeric match if both parse as numbers
  const ai = parseFloat(ni), ba = parseFloat(na);
  if (!Number.isNaN(ai) && !Number.isNaN(ba)) return Math.abs(ai - ba) < 1e-6;
  return false;
}

export function renderFill(wrap, ex, onAnswered) {
  const prompt = document.createElement('div');
  prompt.className = 'text-lg leading-relaxed';
  // Replace ___ with an input placeholder
  const html = ex.prompt.replace(/___/, '<span data-fill-slot></span>');
  prompt.innerHTML = html;
  wrap.appendChild(prompt);
  renderMath(prompt);

  const slot = prompt.querySelector('[data-fill-slot]');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'fill-input';
  input.placeholder = ex.placeholder || '?';
  input.autocomplete = 'off';
  if (slot) slot.replaceWith(input);
  else { prompt.appendChild(document.createTextNode(' ')); prompt.appendChild(input); }

  const row = document.createElement('div');
  row.className = 'flex gap-3 items-center';
  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'btn';
  submit.textContent = '提交';
  row.appendChild(submit);
  wrap.appendChild(row);

  const feedback = document.createElement('div');
  wrap.appendChild(feedback);

  let answered = false;
  const doSubmit = () => {
    if (answered) return;
    if (!input.value.trim()) return;
    answered = true;
    const correct = matches(input.value, ex.answer);
    input.classList.add(correct ? 'correct' : 'wrong');
    input.classList.add(correct ? 'pop' : 'shake');
    input.disabled = true;
    submit.disabled = true;
    const fb = document.createElement('div');
    fb.className = correct ? 'feedback-good' : 'feedback-bad';
    const ans = Array.isArray(ex.answer) ? ex.answer[0] : ex.answer;
    fb.innerHTML = correct
      ? '<strong>对</strong>' + (ex.explain ? ' · ' + ex.explain : '')
      : `<strong>差一点</strong> · 答案是 <code>${ans}</code>` + (ex.explain ? '。' + ex.explain : '');
    feedback.appendChild(fb);
    renderMath(fb);
    onAnswered(correct);
  };
  submit.addEventListener('click', doSubmit);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSubmit(); });
  setTimeout(() => input.focus(), 30);
}
