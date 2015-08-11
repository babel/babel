import {atanh} from '../../../src/runtime/polyfills/Math.js';

function testAtanh(atanh) {
  assert.equal(0, atanh(0));
}

testAtanh(atanh);
testAtanh(Math.atanh);
