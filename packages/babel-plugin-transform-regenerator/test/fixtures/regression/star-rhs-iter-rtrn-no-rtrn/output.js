var _marked = /*#__PURE__*/babelHelpers.regenerator().m(g);
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

var assert = require('assert');
var badIter = {};
var throwCount = 0;
var returnCount = 0;
var hitNextStatement = false;
var hitCatch = false;
var hitFinally = false;
var spyResult = {
  next: function next() {
    return {
      done: false
    };
  }
};
Object.defineProperty(spyResult, 'throw', {
  get: function get() {
    throwCount += 1;
  }
});
Object.defineProperty(spyResult, 'return', {
  get: function get() {
    returnCount += 1;
  }
});
badIter[Symbol.iterator] = function () {
  return spyResult;
};
function g() {
  var _t;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.next) {
      case 0:
        _context.p = 0;
        return _context.d(badIter, 2);
      case 2:
        hitNextStatement = true;
        _context.next = 8;
        break;
      case 5:
        _context.p = 5;
        _t = _context.v;
        hitCatch = true;
      case 8:
        _context.p = 8;
        hitFinally = true;
        return _context.f(8);
      case 11:
        return _context.a(2);
    }
  }, _marked, null, [[0, 5, 8, 11]]);
}
var iter = g();
iter.next();
iter["return"]();
assert.strictEqual(throwCount, 0, '`throw` property access');
assert.strictEqual(returnCount, 1, '`return` property access');
assert.strictEqual(hitFinally, true, 'Generator execution was resumed');
assert.strictEqual(hitNextStatement, false, 'Abrupt completion interrupted control flow');
assert.strictEqual(hitCatch, false, 'Abrupt completion not interpreted as "throw"');
