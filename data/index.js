import { m1 } from './m1.js';
import { m2 } from './m2.js';

export const curriculum = [m1, m2];

export function allUnitsInOrder() {
  const ids = [];
  curriculum.forEach((m) => m.lessons.forEach((l) => l.units.forEach((u) => ids.push(u.id))));
  return ids;
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
