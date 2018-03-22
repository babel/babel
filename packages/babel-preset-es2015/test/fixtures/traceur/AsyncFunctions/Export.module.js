// Options: --async-functions
// Async.

import {asyncFunction} from './resources/async-function.js';
import asyncFunctionDefault from './resources/async-function.js';

assert.instanceOf(asyncFunction(), Promise);
assert.instanceOf(asyncFunctionDefault(), Promise);

(async function() {
  var x = await asyncFunction();
  expect(x).toBe(1);

  var y = await asyncFunctionDefault();
  expect(y).toBe(2);

  done();
})();
