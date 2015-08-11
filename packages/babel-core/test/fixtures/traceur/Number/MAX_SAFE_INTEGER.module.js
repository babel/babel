import {MAX_SAFE_INTEGER} from '../../../src/runtime/polyfills/Number.js';

assert.equal(MAX_SAFE_INTEGER, Math.pow(2, 53) - 1);
assert.equal(Number.MAX_SAFE_INTEGER, Math.pow(2, 53) - 1);
