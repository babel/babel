import {log1p} from '../../../src/runtime/polyfills/Math.js';

function testLog1p(log1p) {
  assert.equal(0, log1p(0));
}

// testLog1p(log1p);
testLog1p(Math.log1p);
