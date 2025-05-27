var _marked = /*#__PURE__*/babelHelpers.regenerator().m(values);
// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.6.4.13
description: >
    Control flow during body evaluation should honor `yield *` statements
    within the `finally` block of `try` statements.
features: [generators]
---*/

function values() {
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return 1;
      case 1:
        _context.n = 2;
        return 1;
      case 2:
        return _context.a(2);
    }
  }, _marked);
}
var dataIterator = values();
var controlIterator = /*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
  var _iterator, _step, x, _t;
  return babelHelpers.regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        _iterator = babelHelpers.createForOfIteratorHelper(dataIterator);
        _context2.p = 1;
        _iterator.s();
      case 2:
        if ((_step = _iterator.n()).done) {
          _context2.n = 8;
          break;
        }
        x = _step.value;
        _context2.p = 3;
      case 4:
        _context2.p = 4;
        i++;
        return _context2.d(babelHelpers.regeneratorValues(values()), 5);
      case 5:
        j++;
        return _context2.f(4);
      case 6:
        k++;
      case 7:
        _context2.n = 2;
        break;
      case 8:
        _context2.n = 10;
        break;
      case 9:
        _context2.p = 9;
        _t = _context2.v;
        _iterator.e(_t);
      case 10:
        _context2.p = 10;
        _iterator.f();
        return _context2.f(10);
      case 11:
        l++;
      case 12:
        return _context2.a(2);
    }
  }, _callee, null, [[3,, 4, 6], [1, 9, 10, 11]]);
})();
var i = 0;
var j = 0;
var k = 0;
var l = 0;
var assert = require("assert");
controlIterator.next();
assert.strictEqual(i, 1, 'First iteration: pre-yield');
assert.strictEqual(j, 0, 'First iteration: post-yield');
assert.strictEqual(k, 0, 'First iteration: post-try');
assert.strictEqual(l, 0, 'First iteration: post-for-of');
controlIterator.next();
assert.strictEqual(i, 1, 'Second iteration: pre-yield');
assert.strictEqual(j, 0, 'Second iteration: post-yield');
assert.strictEqual(k, 0, 'Second iteration: post-try');
assert.strictEqual(l, 0, 'Second iteration: post-for-of');
controlIterator.next();
assert.strictEqual(i, 2, 'Third iteration: pre-yield');
assert.strictEqual(j, 1, 'Third iteration: post-yield');
assert.strictEqual(k, 1, 'Third iteration: post-try');
assert.strictEqual(l, 0, 'Third iteration: post-for-of');
controlIterator.next();
assert.strictEqual(i, 2, 'Fourth iteration: pre-yield');
assert.strictEqual(j, 1, 'Fourth iteration: post-yield');
assert.strictEqual(k, 1, 'Fourth iteration: post-try');
assert.strictEqual(l, 0, 'Fourth iteration: post-for-of');
controlIterator.next();
assert.strictEqual(i, 2, 'Fifth iteration: pre-yield');
assert.strictEqual(j, 2, 'Fifth iteration: post-yield');
assert.strictEqual(k, 2, 'Fifth iteration: post-try');
assert.strictEqual(l, 1, 'Fifth iteration: post-for-of');
