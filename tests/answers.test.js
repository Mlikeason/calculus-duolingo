import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesAnswer } from '../src/answer-matcher.js';

test('rejects partial numeric parses that incorrectly rewarded wrong mathematics', () => {
  for (const [input, answer] of [['1/2', '1/6'], ['1', '1/x'], ['3x', '3'], ['8abc', '8'], ['1/0', '1'], ['', '0'], ['Infinity', '1']]) {
    assert.equal(matchesAnswer(input, answer), false, `${input} != ${answer}`);
  }
});
test('accepts full numeric equivalence and explicit symbolic aliases', () => {
  for (const [input, answer] of [['0.5', '1/2'], ['2/12', '1/6'], ['－３', '-3'], ['π / 2', ['pi/2']], [' u*u ', ['u^2', 'u*u']]]) {
    assert.equal(matchesAnswer(input, answer), true, `${input} = ${answer}`);
  }
});
test('invalid saved state cannot crash progress lookup', async () => {
  for (const raw of ['null', '{}', '{"completed":[]}', '{"completed":{"bad":true,"m1-l1-u1":100}}', 'bad json']) {
    globalThis.localStorage = { getItem: () => raw, setItem: () => {} };
    const state = await import(`../src/state.js?case=${encodeURIComponent(raw)}`);
    assert.doesNotThrow(() => state.isDone('m1-l1-u1'));
    state.markDone('m1-l1-u1');
    assert.equal(state.unitStatus(['m1-l1-u1', 'm1-l1-u2'], 'm1-l1-u2'), 'available');
  }
});
