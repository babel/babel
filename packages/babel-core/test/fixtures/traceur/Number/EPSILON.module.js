import {EPSILON} from '../../../src/runtime/polyfills/Number.js';

function testEpsilon(epsilon) {
  assert.equal(epsilon, Math.pow(2, -52));
  assert.equal(1 + epsilon - 1, epsilon);
  assert.equal(1 + epsilon / 2 - 1, 0);
}

testEpsilon(EPSILON);
testEpsilon(Number.EPSILON);
