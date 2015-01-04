import {sinh} from '../../../src/runtime/polyfills/Math.js';

function testSinh(sinh) {
  assert.equal(0, sinh(0));
  assert.equal(-0, sinh(-0));
  assert.equal(Infinity, sinh(Infinity));
  assert.equal(-Infinity, sinh(-Infinity));
}

testSinh(sinh);
testSinh(Math.sinh);
