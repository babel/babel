import {clz32} from '../../../src/runtime/polyfills/Math.js';

function testClz32(clz32) {
  [NaN, Infinity, -Infinity, 0, -0, 'abc', 'Infinity', '-Infinity', {}].forEach(
    (x) => assert.equal(32, clz32(x)));
}

testClz32(clz32);
testClz32(Math.clz32);
