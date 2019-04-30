/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert = require("assert");
var shared = require("./shared.js");
var check = shared.check;

describe("class methods", function () {
  it("should work if the generator is a class method", function () {
    class Foo {
      *gen(x) {
        yield x;
      }
    }

    check(new Foo().gen("boom"), ["boom"]);
  });

  it("should work if the generator is a computed class method", function () {
    var fnName = "gen";
    class Foo {
      *[fnName](x) {
        yield x;
      }
    }

    check(new Foo().gen("boom"), ["boom"]);
  });

  it("should work with this", function () {
    class A {
      *gen() { yield this }
    }

    const a = new A;
    check(a.gen(), [a]);
  })

  it("should work with super", function () {
    class A {
      *gen() { yield 1 }
    }

    class B extends A {
      *gen() { yield super.gen; }
    }

    check(new B().gen(), [A.prototype.gen]);
  });

  it("should work with arguments", function () {
    class A {
      *gen() { yield arguments }
    }

    const args = new A().gen(1, 2, 3).next().value;
    assert.strictEqual(args.length, 3);
    assert.strictEqual(args[0], 1);
    assert.strictEqual(args[1], 2);
    assert.strictEqual(args[2], 3)
  });
});
