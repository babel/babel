import {log10} from '../../../src/runtime/polyfills/Math.js';

function testLog10(log10) {
  assert.equal(1, log10(10));
  assert.equal(2, log10(100));
}

testLog10(log10);
testLog10(Math.log10);
