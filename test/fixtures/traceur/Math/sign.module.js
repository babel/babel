import {sign} from '../../../src/runtime/polyfills/Math.js';

function testSign(sign) {
  assert.equal(1, sign(1));
  assert.equal(-1, sign(-1));
  assert.equal(0, sign(0));
  assert.equal(-0, sign(-0));
}

testSign(sign);
testSign(Math.sign);
