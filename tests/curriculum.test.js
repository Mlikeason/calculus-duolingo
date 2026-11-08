import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { curriculum } from '../data/index.js';
const units = curriculum.flatMap(m => m.lessons.flatMap(l => l.units));
test('all lessons and exercises have valid answer schemas', () => {
  assert.equal(new Set(units.map(u => u.id)).size, 78);
  for (const u of units) for (const e of u.exercises) {
    assert.ok(e.explain, u.id);
    if (e.type === 'choice') {
      assert.ok(Number.isInteger(e.answer) && e.options[e.answer], u.id);
      assert.equal(new Set(e.options).size, e.options.length, u.id);
      assert.ok(!e.options.some(o => /[A-D] 和 [A-D]/.test(o)), 'Answers must not depend on shuffled positions');
    } else if (e.type === 'truefalse') assert.equal(typeof e.answer, 'boolean');
    else {
      assert.equal(e.type, 'fill');
      assert.equal((e.prompt.match(/___/g) || []).length, 1, u.id);
      assert.ok([e.answer].flat().every(a => typeof a === 'string' && a.length));
    }
  }
});
test('every bundled mathematical expression renders without a KaTeX error', () => {
  let count = 0;
  function walk(value, key = '') {
    if (typeof value === 'string') {
      for (const match of value.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g)) {
        count++; assert.doesNotThrow(() => katex.renderToString(match[1] ?? match[2], { throwOnError: true, strict: false }), key);
      }
    } else if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        if (k === 'latex') { count++; assert.doesNotThrow(() => katex.renderToString(v, { throwOnError: true, strict: false }), key); }
        else walk(v, `${key}.${k}`);
      }
    }
  }
  walk(curriculum); assert.ok(count > 2100);
});
