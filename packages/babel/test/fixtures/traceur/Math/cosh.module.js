import {cosh} from '../../../src/runtime/polyfills/Math.js';

function testCosh(cosh) {
  assert.equal(Infinity, cosh(-Infinity));
  assert.equal(Infinity, cosh(Infinity));
  assert.equal(1, cosh(0));
  assert.equal(1, cosh(-0));
}

testCosh(cosh);
testCosh(Math.cosh);
