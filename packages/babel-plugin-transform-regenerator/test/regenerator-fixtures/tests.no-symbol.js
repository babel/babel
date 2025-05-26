eval("Symbol = undefined");

var assert = require("assert");
var shared = require("./shared.js");
var Symbol = shared.Symbol;
var check = shared.check;

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

    function *iterable() {
      return yield* {
        [Symbol.iterator]: function* () {
          yield 1;
          yield 2;
          yield 3;
        }
      }
    }

    check(iterable(), [1, 2, 3]);
  });
});
