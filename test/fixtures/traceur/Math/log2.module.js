import {log2} from '../../../src/runtime/polyfills/Math.js';

function testLog2(log2) {
  assert.equal(1, log2(2));
  assert.equal(2, log2(4));
}

testLog2(log2);
testLog2(Math.log2);
