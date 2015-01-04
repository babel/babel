import {expm1} from '../../../src/runtime/polyfills/Math.js';

function testExpm1(expm1) {
  assert.equal(Infinity, expm1(Infinity));
  assert.equal(-1, expm1(-Infinity));
}

testExpm1(expm1);
testExpm1(Math.expm1);
