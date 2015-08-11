import {tanh} from '../../../src/runtime/polyfills/Math.js';

function testTanh(tanh) {
  assert.equal(0, tanh(0));
  assert.equal(-0, tanh(-0));
  assert.equal(1, tanh(Infinity));
  assert.equal(-1, tanh(-Infinity));
}

testTanh(tanh);
testTanh(Math.tanh);
