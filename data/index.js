import { m1 } from './m1.js';
import { m2 } from './m2.js';
import { m3 } from './m3.js';
import { m4 } from './m4.js';
import { m5 } from './m5.js';

export const curriculum = [m1, m2, m3, m4, m5];

let _unitOrderCache;
export function allUnitsInOrder() {
  if (!_unitOrderCache) {
    _unitOrderCache = [];
    curriculum.forEach((m) => m.lessons.forEach((l) => l.units.forEach((u) => _unitOrderCache.push(u.id))));
  }
  return _unitOrderCache;
}

export function findUnit(id) {
  for (const m of curriculum) {
    for (const l of m.lessons) {
      for (const u of l.units) {
        if (u.id === id) return u;
      }
    }
  }
  return null;
}
