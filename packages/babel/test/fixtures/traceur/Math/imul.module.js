import {imul} from '../../../src/runtime/polyfills/Math.js';

function testImul(imul) {
  assert.equal(8, imul(2, 4));
}

testImul(imul);
testImul(Math.imul);
