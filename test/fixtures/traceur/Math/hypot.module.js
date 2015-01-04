import {hypot} from '../../../src/runtime/polyfills/Math.js';

function testHypot(hypot) {
  assert.equal(1, hypot(1));
  assert.equal(Math.PI, hypot(Math.PI));
}

testHypot(hypot);
testHypot(Math.hypot);
