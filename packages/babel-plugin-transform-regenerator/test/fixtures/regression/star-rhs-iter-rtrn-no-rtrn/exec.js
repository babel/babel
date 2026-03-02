// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-generator-function-definitions-runtime-semantics-evaluation
es6id: 14.4.14
description: >
  "Return" completion returned when `return` method is not defined
info: |
  YieldExpression : yield * AssignmentExpression

  1. Let exprRef be the result of evaluating AssignmentExpression.
  2. Let value be ? GetValue(exprRef).
  3. Let iterator be ? GetIterator(value).
  4. Let received be NormalCompletion(undefined).
  5. Repeat
     a. If received.[[Type]] is normal, then
        [...]
     b. Else if received.[[Type]] is throw, then
        [...]
     c. Else,
        i. Assert: received.[[Type]] is return.
        ii. Let return be ? GetMethod(iterator, "return").
        iii. If return is undefined, return Completion(received).
features: [generators, Symbol.iterator]
---*/

const assert = require('assert');

var badIter = {};
var throwCount = 0;
var returnCount = 0;
var hitNextStatement = false;
var hitCatch = false;
var hitFinally = false;
var spyResult = {
  next: function() {
    return { done: false };
  }
};
Object.defineProperty(spyResult, 'throw', {
  get: function() {
    throwCount += 1;
  }
});
Object.defineProperty(spyResult, 'return', {
  get: function() {
    returnCount += 1;
  }
});
badIter[Symbol.iterator] = function() {
  return spyResult;
};
function* g() {
  try {
    yield * badIter;
    hitNextStatement = true;
  } catch (_) {
    hitCatch = true;
  } finally {
    hitFinally = true;
  }
}
var iter = g();

iter.next();
iter.return();

assert.strictEqual(throwCount, 0, '`throw` property access');
assert.strictEqual(returnCount, 1, '`return` property access');
assert.strictEqual(
  hitFinally, true, 'Generator execution was resumed'
);
assert.strictEqual(
  hitNextStatement, false, 'Abrupt completion interrupted control flow'
);
assert.strictEqual(
  hitCatch, false, 'Abrupt completion not interpreted as "throw"'
);
