import {cbrt} from '../../../src/runtime/polyfills/Math.js';

function testCbrt(cbrt) {
  assert.equal(0, cbrt(0));
}

testCbrt(cbrt);
testCbrt(Math.cbrt);
