import { renderMath } from '../katex-helper.js';

export function renderTrueFalse(wrap, ex, onAnswered) {
  const prompt = document.createElement('div');
  prompt.className = 'text-lg leading-relaxed';
  prompt.innerHTML = ex.prompt;
  wrap.appendChild(prompt);
  renderMath(prompt);

  const list = document.createElement('div');
  list.className = 'flex gap-3 mt-2';
  wrap.appendChild(list);

  const feedback = document.createElement('div');
  wrap.appendChild(feedback);

  let answered = false;
  const options = [
    { label: '对', value: true },
    { label: '错', value: false }
  ];

  options.forEach(({ label, value }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ex-option flex-1 text-center';
    btn.textContent = label;
    list.appendChild(btn);

    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const correct = value === ex.answer;
      Array.from(list.children).forEach((b) => {
        b.disabled = true;
        const v = b.textContent === '对';
        if (v === ex.answer) b.classList.add('correct');
        else if (b === btn && !correct) b.classList.add('wrong');
      });
      const fb = document.createElement('div');
      fb.className = correct ? 'feedback-good' : 'feedback-bad';
      fb.innerHTML = correct
        ? '<strong>对</strong>' + (ex.explain ? ' · ' + ex.explain : '')
        : '<strong>差一点</strong>' + (ex.explain ? ' · ' + ex.explain : '');
      feedback.appendChild(fb);
      renderMath(fb);
      onAnswered(correct);
    });
  });
}
