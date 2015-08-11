import {trunc} from '../../../src/runtime/polyfills/Math.js';

function testTrunc(trunc) {
  assert.equal(0, trunc(0));
  assert.equal(-0, trunc(-0));
  assert.equal(Infinity, trunc(Infinity));
  assert.equal(-Infinity, trunc(-Infinity));
  assert.equal(42, trunc(42));
  assert.equal(2, trunc(2.5));
  assert.equal(-2, trunc(-2.5));
}

testTrunc(trunc);
testTrunc(Math.trunc);
