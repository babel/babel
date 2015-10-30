import {acosh} from '../../../src/runtime/polyfills/Math.js';

function testAcosh(acosh) {
  assert.equal(0, acosh(1));
}

testAcosh(acosh);
testAcosh(Math.acosh);
