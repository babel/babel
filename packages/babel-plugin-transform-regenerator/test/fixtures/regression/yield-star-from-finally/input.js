// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.6.4.13
description: >
    Control flow during body evaluation should honor `yield *` statements
    within the `finally` block of `try` statements.
features: [generators]
---*/

function* values() {
  yield 1;
  yield 1;
}
var dataIterator = values();
var controlIterator = (function*() {
  for (var x of dataIterator) {
    try {
    } finally {
      i++;
      yield * values();
      j++;
    }
    k++;
  }

  l++;
})();
var i = 0;
var j = 0;
var k = 0;
var l = 0;

const assert = require("assert");

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
