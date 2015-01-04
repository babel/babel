import {fround} from '../../../src/runtime/polyfills/Math.js';

function testFround(fround) {
  assert.equal(0, fround(0));
}

testFround(fround);
testFround(Math.fround);
