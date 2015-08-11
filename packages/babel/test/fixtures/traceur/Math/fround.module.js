import {fround} from '../../../src/runtime/polyfills/Math.js';
import {fround as jsFround} from '../../../src/runtime/polyfills/fround.js';

function testFround(x, expected) {
  assert.strictEqual(expected, Math.fround(x));
  assert.strictEqual(expected, fround(x));
  assert.strictEqual(expected, jsFround(x));
}

testFround(0, 0);
testFround(-0, -0);
testFround(Infinity, Infinity);
testFround(-Infinity, -Infinity);

assert.isTrue(isNaN(Math.fround(NaN)));
assert.isTrue(isNaN(fround(NaN)));
assert.isTrue(isNaN(jsFround(NaN)));

testFround(1, 1);
testFround(1.5, 1.5);
testFround(1.6, 1.600000023841858);
testFround(1.337, 1.3370000123977661);
