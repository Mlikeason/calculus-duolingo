import { renderChoice } from './choice.js';
import { renderTrueFalse } from './truefalse.js';
import { renderFill } from './fill.js';

export function renderExercise(ex, onAnswered) {
  const wrap = document.createElement('div');
  wrap.className = 'space-y-4';

  switch (ex.type) {
    case 'choice':    renderChoice(wrap, ex, onAnswered); break;
    case 'truefalse': renderTrueFalse(wrap, ex, onAnswered); break;
    case 'fill':      renderFill(wrap, ex, onAnswered); break;
    default:          wrap.textContent = `(未知题型: ${ex.type})`;
  }
  return wrap;
}
