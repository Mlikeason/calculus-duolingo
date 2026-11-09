// Only complete numbers or simple fractions are numeric answers. Never eval input.
export function normalizeAnswer(value) {
  return String(value).normalize('NFKC').trim().replace(/\s+/g, '')
    .replace(/[−–]/g, '-').replace(/π/g, 'pi').toLowerCase();
}

function numeric(value) {
  const number = '[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?';
  if (new RegExp(`^${number}$`).test(value)) return Number(value);
  if (new RegExp(`^${number}/${number}$`).test(value)) {
    const [a, b] = value.split('/').map(Number);
    if (b !== 0) return a / b;
  }
  return NaN;
}

export function matchesAnswer(input, answer) {
  if (Array.isArray(answer)) return answer.some(a => matchesAnswer(input, a));
  const a = normalizeAnswer(input), b = normalizeAnswer(answer);
  if (!a || !b) return false;
  if (a === b) return true;
  const x = numeric(a), y = numeric(b);
  return Number.isFinite(x) && Number.isFinite(y) && Math.abs(x - y) < 1e-6;
}
