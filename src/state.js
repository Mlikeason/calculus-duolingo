const KEY = 'calculus-duolingo-progress-v1';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { completed: {} };
  } catch {
    return { completed: {} };
  }
}

let state = load();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

export function isDone(unitId) {
  return !!state.completed[unitId];
}

export function markDone(unitId) {
  state.completed[unitId] = Date.now();
  save();
}

export function reset() {
  state = { completed: {} };
  save();
}

// A unit is unlocked if it is the first unit overall, OR the previous unit
// in the linear order is done.
export function unitStatus(allUnitsInOrder, unitId) {
  if (isDone(unitId)) return 'done';
  const idx = allUnitsInOrder.indexOf(unitId);
  if (idx === -1) return 'locked';
  if (idx === 0) return 'available';
  const prev = allUnitsInOrder[idx - 1];
  return isDone(prev) ? 'available' : 'locked';
}

export function getState() { return state; }
