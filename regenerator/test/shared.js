/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert = require("assert");

if (typeof Symbol === "function") {
  exports.Symbol = Symbol;
} else {
  exports.Symbol = function Symbol() {};
}

if (! exports.Symbol.iterator) {
  exports.Symbol.iterator = "@@iterator";
}

exports.check = function check(g, yields, returnValue) {
  for (var i = 0; i < yields.length; ++i) {
    var info = g.next(i);
    assert.deepEqual(info.value, yields[i]);
    assert.strictEqual(info.done, false);
  }

  assert.deepEqual(
    i > 0 ? g.next(i) : g.next(),
    { value: returnValue, done: true }
  );
};

exports.assertAlreadyFinished =
function assertAlreadyFinished(generator) {
  assert.deepEqual(generator.next(), {
    value: void 0,
    done: true
  });
};
