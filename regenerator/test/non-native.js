/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// These tests run only in translation, not in native Node.

var assert = require("assert");
var shared = require("./shared.js");
var Symbol = shared.Symbol;
var check = shared.check;
var assertAlreadyFinished = shared.assertAlreadyFinished;

describe("@@iterator", function() {
  it("is defined on Generator.prototype and returns this", function() {
    function *gen(){}
    var iterator = gen();
    assert.ok(!iterator.hasOwnProperty(Symbol.iterator));
    assert.ok(!Object.getPrototypeOf(iterator).hasOwnProperty(Symbol.iterator));
    assert.ok(Object.getPrototypeOf(Object.getPrototypeOf(
      Object.getPrototypeOf(iterator)
    )).hasOwnProperty(Symbol.iterator));
    assert.strictEqual(iterator[Symbol.iterator](), iterator);
  });
});

describe("throw", function() {
  it("should complete throwing generator", function() {
    function *gen(x) {
      throw 1;
    }

    var u = gen();

    try {
      u.next();
    } catch (err) {
      assert.strictEqual(err, 1);
    }

    assertAlreadyFinished(u);
  });

  it("should complete yielding/throwing generator", function () {
    function *gen(x) {
      yield 2;
      throw 1;
    }

    var u = gen();

    u.next();

    try {
      u.throw(2);
    } catch (err) {
      assert.strictEqual(err, 2);
    }

    assertAlreadyFinished(u);
  });
});

describe("completed generator", function() {
  function *gen() {
    return "ALL DONE";
  }

  it("should refuse to resume", function() {
    var g = gen();

    assert.deepEqual(g.next(), {
      value: "ALL DONE", done: true
    });

    assertAlreadyFinished(g);
  });
});

describe("delegate yield", function() {
  it("should support any iterable argument", function() {
    function *gen() {
      yield 0;
      yield* [
        yield "one",
        yield "two",
        yield "three"
      ];
      yield 5;
    }

    check(gen(), [0, "one", "two", "three", 2, 3, 4, 5]);

    function *string() {
      return yield* "asdf";
    }

    check(string(), ["a", "s", "d", "f"]);
  });
});

describe("newborn generators", function () {
  it("should be able to access function.sent", function () {
    function *gen() {
      var sent = yield function.sent;
      assert.strictEqual(sent, function.sent);
      return function.sent;
    }

    var g = gen();

    assert.deepEqual(g.next("first"), {
      value: "first",
      done: false
    });

    assert.deepEqual(g.next("second"), {
      value: "second",
      done: true
    });
  });
});
