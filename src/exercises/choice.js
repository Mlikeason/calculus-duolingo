import { renderMath } from '../katex-helper.js';

export function renderChoice(wrap, ex, onAnswered) {
  const prompt = document.createElement('div');
  prompt.className = 'text-lg leading-relaxed';
  prompt.innerHTML = ex.prompt;
  wrap.appendChild(prompt);
  renderMath(prompt);

  const list = document.createElement('div');
  list.className = 'space-y-2 mt-2';
  wrap.appendChild(list);

  const feedback = document.createElement('div');
  feedback.className = 'space-y-2';
  wrap.appendChild(feedback);

  let answered = false;

  ex.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ex-option';
    btn.innerHTML = opt;
    list.appendChild(btn);
    renderMath(btn);

    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const correct = i === ex.answer;
      // Disable all
      Array.from(list.children).forEach((b, j) => {
        b.disabled = true;
        if (j === ex.answer) b.classList.add('correct');
        else if (j === i && !correct) b.classList.add('wrong');
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
