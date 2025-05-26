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
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return 1;
      case 2:
        _context.next = 4;
        return 1;
      case 4:
        return _context.a(2);
    }
  }, _marked);
}
var dataIterator = values();
var controlIterator = /*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
  var _iterator, _step, x, _t;
  return babelHelpers.regenerator().w(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _iterator = babelHelpers.createForOfIteratorHelper(dataIterator);
        _context2.prev = 1;
        _iterator.s();
      case 3:
        if ((_step = _iterator.n()).done) {
          _context2.next = 14;
          break;
        }
        x = _step.value;
        _context2.prev = 5;
      case 6:
        _context2.prev = 6;
        i++;
        return _context2.d(values(), 9);
      case 9:
        j++;
        return _context2.f(6);
      case 11:
        k++;
      case 12:
        _context2.next = 3;
        break;
      case 14:
        _context2.next = 19;
        break;
      case 16:
        _context2.prev = 16;
        _t = _context2.sent;
        _iterator.e(_t);
      case 19:
        _context2.prev = 19;
        _iterator.f();
        return _context2.f(19);
      case 22:
        l++;
      case 23:
        return _context2.a(2);
    }
  }, _callee, null, [[5,, 6, 11], [1, 16, 19, 22]]);
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
