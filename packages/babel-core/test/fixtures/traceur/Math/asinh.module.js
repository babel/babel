import {asinh} from '../../../src/runtime/polyfills/Math.js';

function testAsinh(asinh) {
  assert.equal(0, asinh(0));
}

testAsinh(asinh);
testAsinh(Math.asinh);
