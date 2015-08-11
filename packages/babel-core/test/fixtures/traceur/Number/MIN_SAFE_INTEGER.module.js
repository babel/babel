import {MIN_SAFE_INTEGER} from '../../../src/runtime/polyfills/Number.js';

assert.equal(MIN_SAFE_INTEGER, -Math.pow(2, 53) + 1);
assert.equal(Number.MIN_SAFE_INTEGER, -Math.pow(2, 53) + 1);
