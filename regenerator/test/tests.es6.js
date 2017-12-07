/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert = require("assert");
var runningInTranslation = /\.wrap\(/.test(function*(){});
var shared = require("./shared.js");
var Symbol = shared.Symbol;
var check = shared.check;
var assertAlreadyFinished = shared.assertAlreadyFinished;
var fullCompatibility = runningInTranslation ||
  require("semver").gte(process.version, "7.0.0");

// A version of `throw` whose behavior can't be statically analyzed.
// Useful for testing dynamic exception dispatching.
function raise(argument) {
  throw argument;
}

describe("regeneratorRuntime", function() {
  it("should be defined globally", function() {
    var global = Function("return this")();
    assert.ok("regeneratorRuntime" in global);
    assert.strictEqual(global.regeneratorRuntime, regeneratorRuntime);
  });

  it("should have a .wrap method", function() {
    assert.strictEqual(typeof regeneratorRuntime.wrap, "function");
  });

  it("should have a .mark method", function() {
    assert.strictEqual(typeof regeneratorRuntime.mark, "function");
  });

  it("should be the object name returned by util.runtimeProperty", function() {
    assert.strictEqual(
      require("../lib/util").runtimeProperty("foo").object.name,
      "regeneratorRuntime"
    );
  });
});

describe("simple argument yielder", function() {
  it("should yield only its first argument", function() {
    function *gen(x) {
      yield x;
    }

    check(gen("oyez"), ["oyez"]);
    check(gen("foo", "bar"), ["foo"]);
  });

  it("should support multiple yields in expression", function() {
    function *gen() { return (yield 0) + (yield 0); }
    var itr = gen();
    itr.next();
    itr.next(1);
    assert.equal(itr.next(2).value, 3);
  });
});

function *range(n) {
  for (var i = 0; i < n; ++i) {
    yield i;
  }
}

describe("range generator", function() {
  it("should yield the empty range", function() {
    check(range(0), []);
  })

  it("should yield the range 0..n-1", function() {
    check(range(5), [0, 1, 2, 3, 4]);
  });
});

describe("collatz generator", function() {
  function *gen(n) {
    var count = 0;

    yield n;

    while (n !== 1) {
      count += 1;

      if (n % 2) {
        yield n = n * 3 + 1;
      } else {
        yield n >>= 1;
      }
    }

    return count;
  }

  function collatz(n) {
    var result = [n];

    while (n !== 1) {
      if (n % 2) {
        n *= 3;
        n += 1;
      } else {
        n >>= 1;
      }

      result.push(n);
    }

    return result;
  }

  var seven = collatz(7);
  var fiftyTwo = seven.slice(seven.indexOf(52));
  var eightyTwo = collatz(82);

  it("seven", function() {
    check(gen(7), seven, 16);
  });

  it("fifty two", function() {
    check(gen(52), fiftyTwo, 11);
  });

  it("eighty two", function() {
    check(gen(82), eightyTwo, 110);
  });
});

describe("try-catch generator", function() {
  function *usingThrow(x) {
    yield 0;
    try {
      yield 1;
      if (x % 2 === 0)
        throw 2;
      yield x;
    } catch (x) {
      yield x;
    }
    yield 3;
  }

  function *usingRaise(x) {
    yield 0;
    try {
      yield 1;
      if (x % 2 === 0)
        raise(2);
      yield x;
    } catch (x) {
      yield x;
    }
    yield 3;
  }

  it("should catch static exceptions properly", function() {
    check(usingThrow(4), [0, 1, 2, 3]);
    check(usingThrow(5), [0, 1, 5, 3]);
  });

  it("should catch dynamic exceptions properly", function() {
    check(usingRaise(4), [0, 1, 2, 3]);
    check(usingRaise(5), [0, 1, 5, 3]);
  });
});

describe("nested generators in try-catch", function() {
  function *gen() {
    try {
       nonExistent;
    } catch (e) {
      yield function* () {
        yield e;
      }
    }
  }

  it('should get a reference to the caught error', function () {
    var genFun2 = gen().next().value;
    assert.ok(regeneratorRuntime.isGeneratorFunction(genFun2));
    var gen2 = genFun2();
    var res = gen2.next();
    assert.ok(res.value instanceof ReferenceError);
    // Note that we don't do strict equality over the message because it varies
    // across browsers (if we ever want to run tests in browsers).
    assert.ok(res.value.message.match(/nonExistent/));
  });

});

describe("try-finally generator", function() {
  function *usingThrow(condition) {
    yield 0;
    try {
      yield 1;
      throw 2;
      yield 3;
    } finally {
      if (condition) {
        yield 4;
        return 5;
      }
      yield 6;
      return 7;
    }
  }

  function *usingRaise(condition) {
    yield 0;
    try {
      yield 1;
      raise(2);
      yield 3;
    } finally {
      if (condition) {
        yield 4;
        return 5;
      }
      yield 6;
      return 7;
    }
  }

  function *usingAbrupt(abruptType, finallyAbruptType) {
    yield 0;
    for (;;) {
      try {
        yield 1;
        if (abruptType === "return") {
          return 2;
        } else if (abruptType === "break") {
          break;
        } else if (abruptType === "continue") {
          abruptType = "return";
          continue;
        }
      }
      finally {
        yield 3;
        if (finallyAbruptType === "return") {
          return 4;
        } else if (finallyAbruptType === "break") {
          break;
        } else if (finallyAbruptType === "continue") {
          finallyAbruptType = null;
          continue;
        }
      }
    }
    return 5;
  }

  it("should honor return", function() {
    check(usingAbrupt("return", null), [0, 1, 3], 2);
  });

  it("should honor break", function() {
    check(usingAbrupt("break", null), [0, 1, 3], 5);
  });

  it("should honor continue", function() {
    check(usingAbrupt("continue", null), [0, 1, 3, 1, 3], 2);
  });

  it("should override abrupt with return", function() {
    check(usingAbrupt("return", "return"), [0, 1, 3], 4);
    check(usingAbrupt("break", "return"), [0, 1, 3], 4);
    check(usingAbrupt("continue", "return"), [0, 1, 3], 4);
  });

  it("should override abrupt with break", function() {
    check(usingAbrupt("return", "break"), [0, 1, 3], 5);
    check(usingAbrupt("break", "break"), [0, 1, 3], 5);
    check(usingAbrupt("continue", "break"), [0, 1, 3], 5);
  });

  it("should override abrupt with continue", function() {
    check(usingAbrupt("return", "continue"), [0, 1, 3, 1, 3], 2);
    check(usingAbrupt("break", "continue"), [0, 1, 3, 1, 3], 5);
    check(usingAbrupt("continue", "continue"), [0, 1, 3, 1, 3], 2);
  });

  it("should execute finally blocks statically", function() {
    check(usingThrow(true), [0, 1, 4], 5);
    check(usingThrow(false), [0, 1, 6], 7);
  });

  it("should execute finally blocks dynamically", function() {
    check(usingRaise(true), [0, 1, 4], 5);
    check(usingRaise(false), [0, 1, 6], 7);
  });

  it("should execute finally blocks before throwing", function() {
    var uncaughtError = new Error("uncaught");

    function *uncaught(condition) {
      try {
        yield 0;
        if (condition) {
          yield 1;
          raise(uncaughtError);
        }
        yield 2;
      } finally {
        yield 3;
      }
      yield 4;
    }

    check(uncaught(false), [0, 2, 3, 4]);

    var u = uncaught(true);

    assert.deepEqual(u.next(), { value: 0, done: false });
    assert.deepEqual(u.next(), { value: 1, done: false });
    assert.deepEqual(u.next(), { value: 3, done: false });

    try {
      u.next();
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, uncaughtError);
    }
  });

  it("should throw correct error when finally contains catch", function() {
    var right = new Error("right");
    var wrong = new Error("wrong");

    function *gen() {
      try {
        yield 0;
        raise(right);
      } finally {
        yield 1;
        try {
          raise(wrong);
        } catch (err) {
          assert.strictEqual(err, wrong);
          yield 2;
        }
      }
    }

    var g = gen();

    assert.deepEqual(g.next(), {
      value: 0,
      done: false
    });

    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });

    assert.deepEqual(g.next(), {
      value: 2,
      done: false
    });

    try {
      g.next();
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, right);
    }
  });

  it("should run finally after break within try", function() {
    function *gen() {
      try {
        yield 0;
        while (true) {
          yield 1;
          break;
        }
      } finally {
        yield 2;
      }
      yield 3;
    }

    check(gen(), [0, 1, 2, 3]);
  });

  it("should return the correct value when overridden by finally", function() {
    function* gen() {
      try {
        return yield 1;
      } finally {
        return 3;
      }
    }

    var g = gen();

    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });

    if (typeof g.return === "function") {
      assert.deepEqual(g.return(5), {
        value: 3,
        done: true
      });
    } else {
      assert.deepEqual(g.next(5), {
        value: 3,
        done: true
      });
    }
  });

  it("should let the last finally block override all others", function() {
    function* gen(condition) {
      try {
        try {
          return yield 1;
        } finally {
          return 2;
        }
      } finally {
        try {
          return 3;
        } finally {
          if (condition) {
            return 4;
          }
        }
      }
    }

    var g1 = gen(true);

    assert.deepEqual(g1.next(), {
      value: 1,
      done: false
    });

    // The generator function has been carefully constructed so that .next
    // and .return have the same effect, so that these tests should pass
    // in versions of Node that do not support .return.
    var method = g1.return || g1.next;

    assert.deepEqual(method.call(g1, 5), {
      value: 4,
      done: true
    });

    var g2 = gen(false);

    assert.deepEqual(g2.next(), {
      value: 1,
      done: false
    });

    assert.deepEqual(method.call(g2, 5), {
      value: 3,
      done: true
    });
  });

  it("should allow additional yields during finally propagation", function() {
    function* gen(condition) {
      try {
        try {
          return yield 1;
        } finally {
          return 2;
        }
      } finally {
        try {
          return yield "oyez";
        } finally {
          if (condition) {
            return 4;
          }
        }
      }
    }

    var g1 = gen(true);

    assert.deepEqual(g1.next(), {
      value: 1,
      done: false
    });

    // The generator function has been carefully constructed so that .next
    // and .return have the same effect, so that these tests should pass
    // in versions of Node that do not support .return.
    var method = g1.return || g1.next;

    assert.deepEqual(method.call(g1, 5), {
      value: "oyez",
      done: false
    });

    assert.deepEqual(method.call(g1, 5), {
      value: 4,
      done: true
    });

    var g2 = gen(false);

    assert.deepEqual(g2.next(), {
      value: 1,
      done: false
    });

    assert.deepEqual(method.call(g2, 5), {
      value: "oyez",
      done: false
    });

    assert.deepEqual(method.call(g2, 5), {
      value: 5,
      done: true
    });
  });
});

describe("try-catch-finally generator", function() {
  function *usingThrow() {
    yield 0;
    try {
      try {
        yield 1;
        throw 2;
        yield 3;
      } catch (x) {
        throw yield x;
      } finally {
        yield 5;
      }
    } catch (thrown) {
      yield thrown;
    }
    yield 6;
  }

  function *usingRaise() {
    yield 0;
    try {
      try {
        yield 1;
        raise(2);
        yield 3;
      } catch (x) {
        throw yield x;
      } finally {
        yield 5;
      }
    } catch (thrown) {
      yield thrown;
    }
    yield 6;
  }

  it("should statically catch and then finalize", function() {
    check(usingThrow(), [0, 1, 2, 5, 3, 6]);
  });

  it("should dynamically catch and then finalize", function() {
    check(usingRaise(), [0, 1, 2, 5, 3, 6]);
  });

  it("should execute catch and finally blocks at most once", function() {
    var error = new Error();

    function *gen() {
      try {
        switch (1) {
        case 1:
          yield "a";
          break;
        default:
          break;
        }
        throw error;
      } catch (e) {
        assert.strictEqual(e, error);
        yield "b";
        do {
          do {
            yield "c";
            break;
          } while (false);
          yield "d";
          break;
        } while (false);
        yield "e";
      } finally {
        yield "f";
      }
    }

    check(gen(), ["a", "b", "c", "d", "e", "f"]);
  });

  it("should handle backwards jumps in labeled loops", function() {
    function *gen() {
      var firstTime = true;
      outer:
      while (true) {
        yield 0;
        try {
          while (true) {
            yield 1;
            if (firstTime) {
              firstTime = false;
              yield 2;
              continue outer;
            } else {
              yield 3;
              break;
            }
          }
          yield 4;
          break;
        } finally {
          yield 5;
        }
        yield 6;
      }
      yield 7;
    }

    check(gen(), [0, 1, 2, 5, 0, 1, 3, 4, 5, 7]);
  });

  it("should handle loop continue statements properly", function() {
    var error = new Error("thrown");
    var markers = [];

    function *gen() {
      var c = 2;
      while (c > 0) {
        try {
          markers.push("try");
          yield c;
        } catch (e) {
          assert.strictEqual(e, error);
          markers.push("catch");
          continue;
        } finally {
          markers.push("finally");
        }
        markers.push("decrement");
        --c;
      }
    }

    var g = gen();

    assert.deepEqual(g.next(), { value: 2, done: false });
    assert.deepEqual(g.throw(error), { value: 2, done: false });
    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: void 0, done: true });

    assert.deepEqual(markers, [
      "try",
      "catch",
      "finally",
      "try",
      "finally",
      "decrement",
      "try",
      "finally",
      "decrement"
    ]);
  });
});

describe("dynamic exception", function() {
  function *gen(x, fname) {
    try {
      return fns[fname](x);
    } catch (thrown) {
      yield thrown;
    }
  }

  var fns = {
    f: function(x) {
      throw x;
    },

    g: function(x) {
      return x;
    }
  };

  it("should be dispatched correctly", function() {
    check(gen("asdf", "f"), ["asdf"]);
    check(gen("asdf", "g"), [], "asdf");
  });
});

describe("nested finally blocks", function() {
  function *usingThrow() {
    try {
      try {
        try {
          throw "thrown";
        } finally {
          yield 1;
        }
      } catch (thrown) {
        yield thrown;
      } finally {
        yield 2;
      }
    } finally {
      yield 3;
    }
  }

  function *usingRaise() {
    try {
      try {
        try {
          raise("thrown");
        } finally {
          yield 1;
        }
      } catch (thrown) {
        yield thrown;
      } finally {
        yield 2;
      }
    } finally {
      yield 3;
    }
  }

  it("should statically execute in order", function() {
    check(usingThrow(), [1, "thrown", 2, 3]);
  });

  it("should dynamically execute in order", function() {
    check(usingRaise(), [1, "thrown", 2, 3]);
  });
});

describe("for-in loop generator", function() {
  it("should handle the simple case", function() {
    function *gen() {
      var count = 0;
      var obj = {foo: 1, bar: 2};
      for (var key in obj) {
        assert(obj.hasOwnProperty(key), key + " must be own property");
        yield [key, obj[key]];
        count += 1;
      }
      return count;
    }

    check(gen(), [["foo", 1], ["bar", 2]], 2);
  });

  it("should handle break in loop", function() {
    function *gen(obj) {
      var count = 0;
      for (var key in (yield "why not", obj)) {
        if (obj.hasOwnProperty(key)) {
          if (key === "skip") {
            break;
          }
          count += 1;
          yield [key, obj[key]];
        }
      }
      return count;
    }

    check(
      gen({ a: 1, b: 2, skip: 3, c: 4 }),
      ["why not", ["a", 1], ["b", 2]],
      2
    );
  });

  it("should handle property deletion in loop", function() {
    function *gen() {
      var count = 0;
      var obj = {foo: 1, bar: 2};
      for (var key in obj) {
        assert(obj.hasOwnProperty(key), key + " must be own property");
        yield [key, obj[key]];
        delete obj.bar;
        count += 1;
      }
      return count;
    }

    check(gen(), [["foo", 1]], 1);
  });

  it("should loop over inherited properties", function() {
    function *gen() {
      var count = 0;
      function Foo() {
        this.baz = 1
      }
      Foo.prototype.bar = 2;

      var foo = new Foo();
      for (var key in foo) {
        yield [key, foo[key]];
        count += 1;
      }
      return count;
    }

    check(gen(), [["baz", 1], ["bar", 2]], 2);
  });

  it("should handle risky object expressions", function() {
    function a(sent) {
      assert.strictEqual(sent, 1);
      a.called = true;
    }

    function b(sent) {
      assert.strictEqual(sent, 2);
      b.called = true;
      return { callee: b };
    }

    function *gen() {
      assert.ok(!a.called);
      assert.ok(!b.called);
      for (var key in a(yield 0), b(yield 1)) {
        assert.ok(a.called);
        assert.ok(b.called);
        assert.strictEqual(yield key, 3);
      }

      for (var key in a(1), { foo: "foo", bar: "bar" }) {
        yield key;
      }
    }

    check(gen(), [0, 1, "callee", "foo", "bar"]);
  });

  it("should allow non-Identifier left-hand expressions", function() {
    var obj = {};
    var baz = { a: 1, b: 2, c: 3 };
    var markers = [];

    function foo() {
      markers.push("called foo");
      return obj;
    }

    function *gen() {
      for (foo().bar in baz) {
        markers.push(obj.bar);
        yield obj.bar;
      }
    }

    check(gen(), ["a", "b", "c"]);

    assert.deepEqual(markers, [
      "called foo",
      "a",
      "called foo",
      "b",
      "called foo",
      "c"
    ]);
  });
});

describe("yield chain", function() {
  function *gen(n) {
    return yield yield yield yield n;
  }

  it("should have correct associativity", function() {
    check(gen(5), [5, 1, 2, 3], 4);
    check(gen("asdf"), ["asdf", 1, 2, 3], 4);
  });
});

describe("call expression ordering (#244)", function test() {
  function *gen() {
    return (yield 1)(yield 2)(yield 3);
  }

  it("should be correct", function () {
    var g = gen();
    var order = [];

    assert.deepEqual(g.next(), { value: 1, done: false });

    assert.deepEqual(g.next(function (sent2) {
      assert.strictEqual(sent2, "sent 2");

      return function (sent3) {
        assert.strictEqual(sent3, "sent 3")
        return "done";
      };
    }), { value: 2, done: false });

    assert.deepEqual(g.next("sent 2"), { value: 3, done: false });
    assert.deepEqual(g.next("sent 3"), { value: "done", done: true });
  });
});

describe("object literal generator", function() {
  function *gen(a, b) {
    yield {
      a: a - (yield a),
      b: yield b
    };
  }

  it("should yield the correct object", function() {
    check(gen(1, 2), [1, 2, { a: 0, b: 2 }]);
    check(gen(4, 2), [4, 2, { a: 3, b: 2 }]);
  });
});

describe("switch statement generator", function() {
  function *gen(a) {
    switch (yield a) {
    case (yield "x") - a:
      return "first case";
    case (yield "y") - a:
      return "second case";
    }
  }

  it("should jump to the correct cases", function() {
    check(gen(1), [1, "x"], "first case");
    check(gen(2), [2, "x", "y"], "second case");
  });
});

describe("infinite sequence generator", function() {
  function *gen(start, step) {
    step = step || 1;
    while (true) {
      yield start;
      start += step;
    }
  }

  function *limit(g, stop) {
    while (true) {
      var info = g.next();
      if (info.done) {
        return;
      } else if (info.value < stop) {
        yield info.value;
      } else {
        return;
      }
    }
  }

  it("should generate a lot of plausible values", function() {
    var g = gen(10, 2);

    assert.deepEqual(g.next(), { value: 10, done: false });
    assert.deepEqual(g.next(), { value: 12, done: false });
    assert.deepEqual(g.next(), { value: 14, done: false });
    assert.deepEqual(g.next(), { value: 16, done: false });

    var sum = 10 + 12 + 14 + 16;

    for (var n = 0; n < 1000; ++n) {
      var info = g.next();
      sum += info.value;
      assert.strictEqual(info.done, false);
    }

    assert.strictEqual(sum, 1017052);
  });

  it("should allow limiting", function() {
    check(limit(gen(10, 3), 20), [10, 13, 16, 19]);
  });
});

describe("generator function expression", function() {
  it("should behave just like a declared generator", function() {
    check(function *(x, y) {
      yield x;
      yield y;
      yield x + y;
      return x * y;
    }(3, 7), [3, 7, 10], 21);
  })
});

describe("generator reentry attempt", function() {
  function *gen(x) {
    try {
      (yield x).next(x);
    } catch (err) {
      yield err;
    }
    return x + 1;
  }

  it("should complain with a TypeError", function() {
    var g = gen(3);
    assert.deepEqual(g.next(), { value: 3, done: false });
    var complaint = g.next(g); // Sending the generator to itself.
    assert.ok(complaint.value instanceof Error);
    assert.strictEqual(
      complaint.value.message,
      "Generator is already running"
    );
    assert.deepEqual(g.next(), { value: 4, done: true });
  });
});

describe("delegated yield", function() {
  it("should delegate correctly", function() {
    function *gen(condition) {
      yield 0;
      if (condition) {
        yield 1;
        yield* gen(false);
        yield 2;
      }
      yield 3;
    }

    check(gen(true), [0, 1, 0, 3, 2, 3]);
    check(gen(false), [0, 3]);
  });

  it("should cope with empty delegatees", function() {
    function *gen(condition) {
      if (condition) {
        yield 0;
        yield* gen(false);
        yield 1;
      }
    }

    check(gen(true), [0, 1]);
    check(gen(false), []);
  });

  it("should support deeper nesting", function() {
    function *outer(n) {
      yield n;
      yield* middle(n - 1, inner(n + 10));
      yield n + 1;
    }

    function *middle(n, plusTen) {
      yield n;
      yield* inner(n - 1);
      yield n + 1;
      yield* plusTen;
    }

    function *inner(n) {
      yield n;
    }

    check(outer(5), [5, 4, 3, 5, 15, 6]);
  });

  it("should pass sent values through", function() {
    function *outer(n) {
      yield* inner(n << 1);
      yield "zxcv";
    }

    function *inner(n) {
      return yield yield yield n;
    }

    var g = outer(3);
    assert.deepEqual(g.next(), { value: 6, done: false });
    assert.deepEqual(g.next(1), { value: 1, done: false });
    assert.deepEqual(g.next(2), { value: 2, done: false });
    assert.deepEqual(g.next(4), { value: "zxcv", done: false });
    assert.deepEqual(g.next(5), { value: void 0, done: true });
  });

  it("should be governed by enclosing try statements", function() {
    var error = new Error("thrown");

    function *outer(n) {
      try {
        yield 0;
        yield* inner(n);
        yield 1;
      } catch (err) {
        yield err.message;
      }
      yield 4;
    }

    function *inner(n) {
      while (n --> 0) {
        try {
          if (n === 3) {
            raise(error);
          }
        } finally {
          yield n;
        }
      }
    }

    check(outer(3), [0, 2, 1, 0, 1, 4]);
    check(outer(5), [0, 4, 3, "thrown", 4]);
  });

  it("should dispatch .thrown exceptions correctly", function() {
    var count = 0;

    function *gen() {
      yield* inner();
      try {
        yield* inner();
      } catch (err) {
        // pass
      }
      return yield* inner();
    }

    function *inner() {
      return yield count++;
    }

    var g = gen();

    assert.deepEqual(g.next(), {
      value: 0,
      done: false
    });

    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });

    assert.deepEqual(g.throw(new Error("lol")), {
      value: 2,
      done: false,
    });

    assert.deepEqual(g.next("sent"), {
      value: "sent",
      done: true
    });
  });

  it("should call .return methods of delegate iterators", function() {
    var throwee = new Error("argument to gen.throw");
    var thrownFromThrow = new Error("thrown from throw method");
    var thrownFromReturn = new Error("thrown from return method");

    function *gen(delegate) {
      try {
        return yield* delegate;
      } catch (err) {
        return err;
      }
    }

    function check(throwMethod, returnMethod) {
      var throwCalled = false;
      var returnCalled = false;
      var count = 0;
      var iterator = {
        next: function() {
          return { value: count++, done: false };
        }
      };

      iterator[Symbol.iterator] = function() {
        return this;
      };

      if (throwMethod) {
        iterator["throw"] = function() {
          throwCalled = true;
          return throwMethod.apply(this, arguments);
        };
      }

      if (returnMethod) {
        iterator["return"] = function() {
          returnCalled = true;
          return returnMethod.apply(this, arguments);
        };
      }

      var g = gen(iterator);

      assert.deepEqual(g.next(), { value: 0, done: false });
      assert.deepEqual(g.next(), { value: 1, done: false });
      assert.deepEqual(g.next(), { value: 2, done: false });
      assert.deepEqual(g.next(), { value: 3, done: false });

      assert.strictEqual(throwCalled, false);
      assert.strictEqual(returnCalled, false);

      var result = {};

      result.throwResult = g.throw(throwee);
      result.throwCalled = throwCalled;
      result.returnCalled = returnCalled;

      return result;
    }

    var checkResult = check(undefined, function() {
      throw thrownFromReturn;
    });
    if (fullCompatibility) {
      // BUG: Nodes <v6 neglect to call .return here.
      assert.strictEqual(checkResult.throwResult.value, thrownFromReturn);
      assert.strictEqual(checkResult.returnCalled, true);
    } else {
      // This is the Error that results from trying to call the undefined
      // .throw method of the iterator.
      assert.ok(checkResult.throwResult.value instanceof Error);
    }
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, false);

    checkResult = check(undefined, function() {
      return { value: "from return", done: true };
    });
    assert.notStrictEqual(checkResult.throwResult.value, throwee);
    // This is the TypeError that results from trying to call the
    // undefined .throw method of the iterator.
    assert.ok(checkResult.throwResult.value instanceof TypeError);
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, false);
    if (fullCompatibility) {
      // BUG: Nodes <v6 neglect to call .return here.
      assert.strictEqual(checkResult.returnCalled, true);
    }

    var checkResult = check(function(thrown) {
      return { value: "from throw", done: true };
    }, function() {
      throw thrownFromReturn;
    });
    assert.strictEqual(checkResult.throwResult.value, "from throw");
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, true);
    assert.strictEqual(checkResult.returnCalled, false);

    var checkResult = check(function(thrown) {
      throw thrownFromThrow;
    }, function() {
      throw thrownFromReturn;
    });
    assert.strictEqual(checkResult.throwResult.value, thrownFromThrow);
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, true);
    assert.strictEqual(checkResult.returnCalled, false);

    var checkResult = check(undefined, undefined);
    if (fullCompatibility) {
      assert.notStrictEqual(checkResult.throwResult.value, throwee);
      // This is the TypeError that results from trying to call the
      // undefined .throw method of the iterator.
      assert.ok(checkResult.throwResult.value instanceof Error);
      assert.strictEqual(checkResult.throwResult.done, true);
    }
    assert.strictEqual(checkResult.throwCalled, false);
    assert.strictEqual(checkResult.returnCalled, false);
  });

  it("should not be required to have a .return method", function() {
    function *gen(delegate) {
      return yield* delegate;
    }

    var inner = range(5);
    var iterator = { next: inner.next.bind(inner) };
    iterator[Symbol.iterator] = function() {
      return this;
    };

    var g = gen(iterator);
    assert.deepEqual(g.next(), { value: 0, done: false });
    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: 2, done: false });

    if (typeof g.return === "function") {
      var returnResult = g.return(-1);
      if (fullCompatibility) {
        assert.deepEqual(returnResult, { value: -1, done: true });
      }
      assert.deepEqual(g.next(), { value: void 0, done: true });
    }
  });

  it("should execute finally blocks of delegate generators", function() {
    var markers = [];

    function* parent() {
      try {
        return yield* child();
      } finally {
        markers.push("parent");
      }
    }

    function* child() {
      try {
        return yield 1;
      } finally {
        yield 2;
        markers.push("child");
      }
    }

    var g = parent();

    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });

    // The generator function has been carefully constructed so that .next
    // and .return have the same effect, so that these tests should pass
    // in versions of Node that do not support .return.
    assert.deepEqual((g.return || g.next).call(g, 3), {
      value: 2,
      done: false
    });

    assert.deepEqual(g.next(), {
      value: 3,
      done: true
    });

    assert.deepEqual(markers, ["child", "parent"]);
  });

  it("should evaluate to the return value of the delegate", function() {
    function *inner() {
      yield 1;
      return 2;
    }

    function *outer(delegate) {
      return yield* delegate;
    }

    check(outer(inner()), [1], 2);

    var arrayDelegate = [3, 4];
    if (!fullCompatibility) {
      // Node v0.11 doesn't know how to turn arrays into iterators over
      // their elements without a little help.
      arrayDelegate = regeneratorRuntime.values(arrayDelegate);
    }
    check(outer(arrayDelegate), [3, 4], void 0); // See issue #143.

    if (!fullCompatibility) {
      return;
    }

    var iterator = {
      next: function() {
        return { value: "oyez", done: true };
      }
    };

    iterator[Symbol.iterator] = function () { return this };

    check(outer(iterator), [], "oyez");
  });

  it("should work as a subexpression", function() {
    function *inner(arg) {
      return arg;
    }

    function *gen(delegate) {
      // Unfortunately these parentheses appear to be necessary.
      return 1 + (yield* delegate);
    }

    check(gen(inner(2)), [], 3);
    check(gen(inner(3)), [], 4);

    if (!fullCompatibility) {
      return;
    }

    var iterator = {
      next: function() {
        return { value: "foo", done: true };
      }
    };

    iterator[Symbol.iterator] = function () { return this };

    check(gen(iterator), [], "1foo");
  });
});

(fullCompatibility
 ? describe // run these tests
 : xdescribe // skip running these tests
)("generator return method", function() {
  it("should work with newborn generators", function() {
    function *gen() {
      yield 0;
    }

    var g = gen();

    assert.deepEqual(g.return("argument"), {
      value: "argument",
      done: true
    });

    assertAlreadyFinished(g);
  });

  it("should behave as if generator actually returned", function() {
    var executedFinally = false;

    function *gen() {
      try {
        yield 0;
      } catch (err) {
        assert.ok(false, "should not have executed the catch handler");
      } finally {
        executedFinally = true;
      }
    }

    var g = gen();
    assert.deepEqual(g.next(), { value: 0, done: false });

    assert.deepEqual(g.return("argument"), {
      value: "argument",
      done: true
    });

    assert.strictEqual(executedFinally, true);
    assertAlreadyFinished(g);
  });

  it("should return both delegate and delegator", function() {
    var checkpoints = [];

    function* callee(errorToThrow) {
      try {
        yield 1;
        yield 2;
      } finally {
        checkpoints.push("callee finally");
        if (errorToThrow) {
          throw errorToThrow;
        }
      }
    }

    function* caller(errorToThrow) {
      try {
        yield 0;
        yield* callee(errorToThrow);
        yield 3;
      } finally {
        checkpoints.push("caller finally");
      }
    }

    var g1 = caller();

    assert.deepEqual(g1.next(), { value: 0, done: false });
    assert.deepEqual(g1.next(), { value: 1, done: false });

    assert.deepEqual(g1.return(-1), { value: -1, done: true });
    assert.deepEqual(checkpoints, [
      "callee finally",
      "caller finally"
    ]);

    var error = new Error("thrown from callee");
    var g2 = caller(error);

    assert.deepEqual(g2.next(), { value: 0, done: false });
    assert.deepEqual(g2.next(), { value: 1, done: false });

    try {
      g2.return(-1);
      assert.ok(false, "should have thrown an exception");
    } catch (thrown) {
      assert.strictEqual(thrown, error);
    }

    assert.deepEqual(checkpoints, [
      "callee finally",
      "caller finally",
      "callee finally",
      "caller finally"
    ]);
  });
});

describe("function declaration hoisting", function() {
  it("should work even if the declarations are out of order", function() {
    function *gen(n) {
      yield increment(n);

      function increment(x) {
        return x + 1;
      }

      if (n % 2) {
        yield halve(decrement(n));

        function halve(x) {
          return x >> 1;
        }

        function decrement(x) {
          return x - 1;
        }
      } else {
        // The behavior of function declarations nested inside conditional
        // blocks is notoriously underspecified, and in V8 it appears the
        // halve function is still defined when we take this branch, so
        // "undefine" it for consistency with regenerator semantics.
        halve = void 0;
      }

      yield increment(increment(n));
    }

    check(gen(3), [4, 1, 5]);
    check(gen(4), [5, 6]);
  });

  it("should work for nested generator function declarations", function() {
    function *outer(n) {
      yield 0;
      assert.ok(regeneratorRuntime.isGeneratorFunction(inner));
      return yield* inner(n);

      // Note that this function declaration comes after everything else
      // in the outer function, but needs to be fully available above.
      function *inner(n) {
        yield n - 1;
        yield n;
        return yield n + 1;
      }
    }

    check(outer(2), [0, 1, 2, 3], 4);
  });

  it("should not interfere with function rebinding", function() {
    function rebindTo(value) {
      var oldValue = toBeRebound;
      toBeRebound = value;
      return oldValue;
    }

    function *toBeRebound() {
      var originalValue = toBeRebound;
      yield toBeRebound;
      assert.strictEqual(rebindTo(42), originalValue);
      yield toBeRebound;
      assert.strictEqual(rebindTo("asdf"), 42);
      yield toBeRebound;
    }

    var original = toBeRebound;
    check(toBeRebound(), [original, 42, "asdf"]);

    function attemptToRebind(value) {
      var oldValue = safe;
      safe = value;
      return oldValue;
    }

    var safe = function *safe() {
      var originalValue = safe;
      yield safe;
      assert.strictEqual(attemptToRebind(42), originalValue);
      yield safe;
      assert.strictEqual(attemptToRebind("asdf"), 42);
      yield safe;
    }

    original = safe;
    check(safe(), [safe, safe, safe]);
  });
});

describe("the arguments object", function() {
  it("should work in simple variadic functions", function() {
    function *sum() {
      var result = 0;

      for (var i = 0; i < arguments.length; ++i) {
        yield result += arguments[i];
      }

      return result;
    }

    check(sum(1, 2, 3), [1, 3, 6], 6);
    check(sum(9, -5, 3, 0, 2), [9, 4, 7, 7, 9], 9);
  });

  it("should alias function parameters", function() {
    function *gen(x, y) {
      yield x;
      ++arguments[0];
      yield x;

      yield y;
      --arguments[1];
      yield y;

      var temp = y;
      y = x;
      x = temp;

      yield x;
      yield y;
    }

    check(gen(3, 7), [3, 4, 7, 6, 6, 4]);
    check(gen(10, -5), [10, 11, -5, -6, -6, 11]);
  });

  it("should be shadowable by explicit declarations (sloppy)", function() {
    function *asParameter(x, arguments) {
      arguments = arguments + 1;
      yield x + arguments;
    }

    check(asParameter(4, 5), [10]);
    check(asParameter("asdf", "zxcv"), ["asdfzxcv1"]);

    function *asVariable(x) {
      // TODO References to arguments before the variable declaration
      // seem to see the object instead of the undefined value.
      var arguments = x + 1;
      yield arguments;
    }

    check(asVariable(4), [5]);
    check(asVariable("asdf"), ["asdf1"]);
  });

  it("should not get confused by properties", function() {
    function *gen(args) {
      var obj = { arguments: args };
      yield obj.arguments;
      obj.arguments = "oyez";
      yield obj;
    }

    check(gen(42), [42, { arguments: "oyez" }]);
  });

  it("supports .callee", function() {
    function *gen(doYield) {
      yield 1;
      if (doYield) {
        yield 2;
      } else {
        yield 3
        yield* arguments.callee(true);
        yield 4
      }
      yield 5;
    }

    check(gen(false), [1, 3, 1, 2, 5, 4, 5]);
  });
});

describe("directive strings", function () {
  function *strict() {
    "use strict";
    yield ! this;
  }

  function *sloppy() {
    yield ! this;
  }

  it("should be kept at top of outer function", function () {
    var strictCode = String(strict);
    var useStrictIndex = strictCode.indexOf("use strict");
    var thisIndex = strictCode.indexOf("this");

    assert.notStrictEqual(useStrictIndex, -1);
    assert.ok(thisIndex > useStrictIndex);

    assert.strictEqual(String(sloppy).indexOf("use strict"), -1);

    check(strict(), [true]);
    check(sloppy(), [false]);
  });
});

describe("catch parameter shadowing", function() {
  it("should leave outer variables unmodified", function() {
    function *gen(x) {
      var y = x + 1;
      try {
        throw x + 2;
      } catch (x) {
        yield x;
        x += 1;
        yield x;
      }
      yield x;
      try {
        throw x + 3;
      } catch (y) {
        yield y;
        y *= 2;
        yield y;
      }
      yield y;
    }

    check(gen(1), [3, 4, 1, 4, 8, 2]);
    check(gen(2), [4, 5, 2, 5, 10, 3]);
  });

  // This test will be fixed by https://github.com/babel/babel/pull/4880.
  (fullCompatibility ? xit : it)(
    "should not replace variables defined in inner scopes", function() {
    function *gen(x) {
      try {
        throw x;
      } catch (x) {
        yield x;

        yield (function(x) {
          return x += 1;
        }(x + 1));

        yield (function() {
          var x = arguments[0];
          return x * 2;
        }(x + 2));

        yield (function() {
          function notCalled(x) {
            throw x;
          }

          x >>= 1;
          return x;
        }());

        yield x -= 1;
      }

      yield x;
    }

    check(gen(10), [10, 12, 24, 5, 4, 10]);
    check(gen(11), [11, 13, 26, 5, 4, 11]);
  });

  it("should allow nested catch parameters of the same name", function() {
    function *gen() {
      try {
        raise("e1");
      } catch (e) {
        yield e;
        try {
          raise("e2");
        } catch (e) {
          yield e;
        }
        yield e;
      }
    }

    check(gen(), ["e1", "e2", "e1"]);
  });

  it("should not interfere with non-referential identifiers", function() {
    function *gen() {
      try {
        yield 1;
        raise(new Error("oyez"));
        yield 2;
      } catch (e) {
        yield 3;
        e.e = "e.e";
        e[e.message] = "e.oyez";
        return {
          e: e,
          identity: function(x) {
            var e = x;
            return e;
          }
        };
      }
      yield 4;
    }

    var g = gen();
    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: 3, done: false });

    var info = g.next();
    assert.strictEqual(info.done, true);
    assert.strictEqual(info.value.e.message, "oyez");
    assert.strictEqual(info.value.e.e, "e.e");
    assert.strictEqual(info.value.e.oyez, "e.oyez");
    assert.strictEqual(info.value.identity("same"), "same");
  });
});

describe("empty while loops", function() {
  it("should be preserved in generated code", function() {
    function *gen(x) {
      while (x) {
        // empty while loop
      }

      do {
        // empty do-while loop
      } while (x);

      return gen.toString();
    }

    var info = gen(false).next();
    assert.strictEqual(info.done, true);
    assert.ok(/empty while loop/.test(info.value));
    assert.ok(/empty do-while loop/.test(info.value));
  });
});

describe("object literals with multiple yields", function() {
  it("should receive different sent values", function() {
    function *gen(fn) {
      return {
        a: yield "a",
        b: yield "b",
        c: fn(yield "c", yield "d"),
        d: [yield "e", yield "f"]
      };
    }

    check(gen(function sum(x, y) {
      return x + y;
    }), ["a", "b", "c", "d", "e", "f"], {
      a: 1,
      b: 2,
      c: 3 + 4,
      d: [5, 6]
    });
  });
});

describe("generator .throw method", function() {
  it("should work after the final call to .next", function() {
    function *gen() {
      yield 1;
    }

    var g = gen();
    assert.deepEqual(g.next(), { value: 1, done: false });

    var exception = new Error("unhandled exception");
    try {
      g.throw(exception);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, exception);
    }
  });

  it("should immediately complete a new-born generator", function() {
    var began = false;

    function *gen() {
      began = true;
      yield 1;
    }

    var g = gen();
    var exception = new Error("unhandled exception");
    try {
      g.throw(exception);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, exception);
      assert.strictEqual(began, false);
    }
  });

  it("should not propagate errors handled inside a delegate", function() {
    function *outer() {
      try {
        yield* inner();
      } catch (err) {
        return -1;
      }
      return 1;
    }

    function *inner() {
      try {
        yield void 0;
      } catch (e) {
        return;
      }
    }

    var g = outer();
    g.next();
    assert.equal(g.throw(new Error('foo')).value, 1);
  });

  it("should propagate errors unhandled inside a delegate", function() {
    function *outer() {
      try {
        yield* inner();
      } catch (err) {
        return -1;
      }
      return 1;
    }

    function *inner() {
      yield void 0;
    }

    var g = outer();
    g.next();
    assert.equal(g.throw(new Error('foo')).value, -1);
  });
});

describe("unqualified function calls", function() {
  it("should have a global `this` object", function() {
    function getThis() {
      return this;
    }

    // This is almost certainly the global object, but there's a chance it
    // might be null or undefined (in strict mode).
    var unqualifiedThis = getThis();

    function *invoke() {
      // It seems like a bug in the ES6 spec that we have to yield an
      // argument instead of just calling (yield)().
      return (yield "dummy")();
    }

    var g = invoke();
    var info = g.next();

    assert.deepEqual(info, { value: "dummy", done: false });

    info = g.next(getThis);

    // Avoid using assert.strictEqual when the arguments might equal the
    // global object, since JSON.stringify chokes on circular structures.
    assert.ok(info.value === unqualifiedThis);

    assert.strictEqual(info.done, true);
  });
});

describe("yield* expression results", function () {
  it("have correct values", function () {
    function* foo() {
      yield 0;
      return yield* bar();
    }

    function* bar() {
      yield 1;
      return 2;
    }

    check(foo(), [0, 1], 2);
  });

  it("can be used in complex expressions", function () {
    function pumpNumber(gen) {
      var n = 0;

      while (true) {
        var res = n > 0 ? gen.next(n) : gen.next();
        n = res.value;
        if (res.done) {
          return n;
        }
      }
    }

    function* foo() {
      return (yield* bar()) + (yield* bar());
    }

    function* bar() {
      return (yield 2) + (yield 3);
    }

    assert.strictEqual(pumpNumber(bar()), 5);
    assert.strictEqual(pumpNumber(foo()), 10);
  });
});

describe("isGeneratorFunction", function() {
  it("should work for function declarations", function() {
    // Do the assertions up here to make sure the generator function is
    // marked at the beginning of the block the function is declared in.
    assert.strictEqual(
      regeneratorRuntime.isGeneratorFunction(genFun),
      true
    );

    assert.strictEqual(
      regeneratorRuntime.isGeneratorFunction(normalFun),
      false
    );

    function normalFun() {
      return 0;
    }

    function *genFun() {
      yield 0;
    }
  });

  it("should work for function expressions", function() {
    assert.strictEqual(
      regeneratorRuntime.isGeneratorFunction(function *genFun() {
        yield 0;
      }),
      true
    );

    assert.strictEqual(
      regeneratorRuntime.isGeneratorFunction(function normalFun() {
        return 0;
      }),
      false
    );
  });
});

describe("new expressions", function() {
  it("should be able to contain yield sub-expressions", function() {
    function A(first, second) {
      this.first = first;
      this.second = second;
    }

    function *gen() {
      return yield new (yield 0)(yield 1, yield 2);
    }

    var g = gen();

    assert.deepEqual(g.next(), { value: 0, done: false });
    assert.deepEqual(g.next(A), { value: 1, done: false });
    assert.deepEqual(g.next("asdf"), { value: 2, done: false });

    var info = g.next("zxcv");
    assert.strictEqual(info.done, false);
    assert.ok(info.value instanceof A);
    assert.strictEqual(info.value.first, "asdf");
    assert.strictEqual(info.value.second, "zxcv");

    assert.deepEqual(g.next("qwer"), { value: "qwer", done: true });
  });
});

describe("block binding", function() {
  it("should translate block binding correctly", function() {
    "use strict";

    function *gen() {
      var a$0 = 0, a$1 = 1;

      let a = 3;

      {
        let a = 1;
        yield a + a$0;
      }

      {
        let a = 2;
        yield a - 1 + a$1;
      }

      yield a;
    }

    var g = gen();

    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: 2, done: false });
    assert.deepEqual(g.next(), { value: 3, done: false });
    assert.deepEqual(g.next(), { value: void 0, done: true });
  });

  it("should translate block binding with iife correctly", function() {
    "use strict";

    function *gen() {
      let arr = [];

      for (let x = 0; x < 3; x++) {
        let y = x;
        arr.push(function() { return y; });
      }

      {
        let x;
        while( x = arr.pop() ) {
          yield x;
        }
      }
    }

    var g = gen();

    assert.equal(g.next().value(), 2);
    assert.equal(g.next().value(), 1);
    assert.equal(g.next().value(), 0);
    assert.deepEqual(g.next(), { value: void 0, done: true });
  });
});

describe("newborn generators", function() {
  it("should be able to yield* non-newborn generators", function() {
    function *inner() {
      return [yield 1, yield 2];
    }

    function *outer(delegate) {
      return yield* delegate;
    }

    var n = inner();

    assert.deepEqual(n.next(), {
      value: 1,
      done: false
    });

    var g = outer(n);

    // I would really like to be able to pass 3 to g.next here, but V8
    // ignores values sent to newborn generators, and SpiderMonkey throws
    // a TypeError.
    assert.deepEqual(g.next(), {
      value: 2,
      done: false
    });

    assert.deepEqual(g.next(4), {
      value: [void 0, 4],
      done: true
    });
  });

  it("should support the ignore-initial-yield wrapper idiom", function() {
    var markers = [];

    function *inner() {
      markers.push(0);
      var sent1 = yield 1;
      markers.push(2);
      var sent2 = yield 2;
      markers.push(3);
      return [sent1, sent2];
    }

    function wrapper(delegate) {
      var gen = (function*() {
        // This yield is the "initial yield" whose argument we ignore.
        var sent = yield "ignored", info;

        markers.push(1);

        while (!(info = delegate.next(sent)).done) {
          sent = yield info.value;
        }

        markers.push(4);

        return info.value;
      })();

      // Ensure that gen is not newborn and that the next invocation of
      // gen.next(value) can send value to the initial yield expression.
      gen.next();

      return gen;
    }

    var n = inner();

    assert.deepEqual(n.next(), {
      value: 1,
      done: false
    });

    var g = wrapper(n);

    // Unlike in the previous spec, it's fine to pass 3 to g.next here,
    // because g is not newborn, because g.next was already called once
    // before g was returned from the wrapper function.
    assert.deepEqual(g.next(3), {
      value: 2,
      done: false
    });

    assert.deepEqual(g.next(4), {
      value: [3, 4],
      done: true
    });

    // Ensure we encountered the marker points in the expected order.
    assert.deepEqual(markers, [0, 1, 2, 3, 4]);
  });

  it("should allow chaining newborn and non-newborn generators", function() {
    function *range(n) {
      for (var i = 0; i < n; ++i) {
        yield i;
      }
    }

    function *chain(a, b) {
      yield* a;
      yield* b;
    }

    check(chain(range(3), range(5)), [0, 1, 2, 0, 1, 2, 3, 4]);

    function *y3(x) {
      return yield yield yield x;
    }

    function *y5(x) {
      return yield yield yield yield yield x;
    }

    check(
      chain(y3("foo"), y5("bar")),
      ["foo", 1, 2, "bar", 4, 5, 6, 7]
    );

    var g3 = y3("three");
    assert.deepEqual(g3.next(), {
      value: "three",
      done: false
    });

    var g5 = y5("five");
    assert.deepEqual(g5.next(), {
      value: "five",
      done: false
    });

    var undef; // A little easier to read than void 0.
    check(chain(g3, g5), [undef, 1, undef, 3, 4, 5]);
  });
});

describe("labeled break and continue statements", function() {
  it("should be able to exit multiple try statements", function() {
    var e1 = "first";
    var e2 = "second";
    var e3 = "third";
    var e4 = "fourth";

    function *gen(n, which) {
      try {
        yield 0;
        raise(e1);

      } finally {
        yield 1;

        loop:
        for (var i = 0; i < n; ++i) {
          yield i;

          try {
            raise(e2);
          } finally {
            yield 2;

            try {
              raise(e3);
            } finally {
              yield 3;

              try {
                raise(e4);
              } finally {
                yield 4;

                if (which === "break") {
                  yield "breaking";
                  break loop;
                }

                if (which === "continue") {
                  yield "continuing";
                  continue loop;
                }

                yield 5;
              }
            }
          }
        }

        yield 6;
      }
    }

    try {
      check(gen(1, "break"), [
        0, 1, 0, 2, 3, 4, "breaking", 6
      ]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e1);
    }

    try {
      check(gen(3, "continue"), [
        0, 1, 0, 2, 3, 4, "continuing",
        1, 2, 3, 4, "continuing",
        2, 2, 3, 4, "continuing",
        6 // Loop finished naturally.
      ]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e1);
    }

    try {
      check(gen(3, "neither"), [
        0, 1, 0, 2, 3, 4, 5
      ]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e4);
    }
  });

  it("should allow breaking from any labeled statement", function() {
    function* gen(limit) {
      yield 0;

      for (var i = 0; i < limit; ++i) {
        yield 1;

        label1: {
          yield 2;
          break label1;
          yield 3;
        }

        label2:
        if (limit === 3) label3: {
          yield 4;
          if (i === 0) break label2;
          yield 5;
          if (i === 1) break label3;
          label4: yield 6;
          // This should break from the for-loop.
          if (i === 2) xxx: break;
          yield 7;
        }

        // This should be a no-op.
        xxx: break xxx;

        yield 8
      }

      yield 9;
    }

    check(gen(0), [0, 9]);
    check(gen(1), [0, 1, 2, 8, 9]);
    check(gen(2), [0, 1, 2, 8, 1, 2, 8, 9]);
    check(gen(3), [0, 1, 2, 4, 8, 1, 2, 4, 5, 8, 1, 2, 4, 5, 6, 9]);
  });
});

describe("for loop with var decl and no update expression", function() {
  // https://github.com/facebook/regenerator/issues/103
  function *range() {
    for (var i = 0; false; ) {
    }
  }

  it("should compile and run", function() {
    check(range(), []);
  });
});

describe("generator function prototype", function() {
  function getProto(obj) {
    return Object.getPrototypeOf
      ? Object.getPrototypeOf(obj)
      : obj.__proto__;
  }

  it("should follow the expected object model", function() {
    var GeneratorFunctionPrototype = getProto(f);
    var GeneratorFunction = GeneratorFunctionPrototype.constructor;

    assert.strictEqual(GeneratorFunction.name, 'GeneratorFunction');
    assert.strictEqual(GeneratorFunction.prototype,
                       GeneratorFunctionPrototype);
    assert.strictEqual(GeneratorFunctionPrototype.prototype.constructor,
                       GeneratorFunctionPrototype);
    assert.strictEqual(GeneratorFunctionPrototype.prototype,
                       getProto(f.prototype));
    assert.strictEqual(getProto(GeneratorFunctionPrototype),
                       Function.prototype);

    if (typeof process === "undefined" ||
        process.version.slice(1, 3) === "0.") {
      // Node version strings start with 0.
      assert.strictEqual(GeneratorFunctionPrototype.name,
                         "GeneratorFunctionPrototype");
    } else if (process.version.slice(1, 3) === "1.") {
      // iojs version strings start with 1., and iojs gets this .name
      // property wrong. TODO report this?
      assert.strictEqual(GeneratorFunctionPrototype.name, "");
    }

    assert.strictEqual(typeof f2, "function");
    assert.strictEqual(f2.constructor, GeneratorFunction);
    assert.ok(f2 instanceof GeneratorFunction);
    assert.strictEqual(f2.name, "f2");

    var g = f();
    assert.ok(g instanceof f);
    assert.strictEqual(getProto(g), f.prototype);

    assert.deepEqual([], Object.getOwnPropertyNames(f.prototype));
    // assert.deepEqual([], Object.getOwnPropertyNames(g));

    f.prototype.x = 42;

    var g2 = f();
    assert.strictEqual(g2.x, 42);

    function* f2() {
      yield 1;
    }

    assert.strictEqual(getProto(f), getProto(f2));
    assert.strictEqual(f.hasOwnProperty('constructor'), false);
    assert.strictEqual(getProto(f).constructor.name, 'GeneratorFunction');

    // Intentionally at the end to test hoisting.
    function* f() {
      yield this;
    }

    function* f() {
      yield 1;
    }

    var f2 = f;
    f = 42;
    var g = f2();

    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: void 0, done: true });
    assert.ok(g instanceof f2);
  });
});

describe("for-of loops", function() {
  var arraysAreIterable =
    typeof Array.prototype[Symbol.iterator] === "function";

  (fullCompatibility && arraysAreIterable ? it : xit)
  ("should work for Arrays", function() {
    var sum = 0;
    for (var x of [1, 2].concat(3)) {
      sum += x;
    }
    assert.strictEqual(sum, 6);
  });

  it("should work for generators", function() {
    var value, values = [];
    for (value of range(3))
      values.push(value);
    assert.deepEqual(values, [0, 1, 2]);
  });

  it("should work inside of generators", function() {
    function *yieldPermutations(list) {
      if (list.length < 2) {
        yield list;
        return 1;
      }

      var count = 0;
      var first = list.slice(0, 1);
      var genRest = yieldPermutations(list.slice(1));

      for (var perm of genRest) {
        for (var i = 0; i < list.length; ++i) {
          var prefix = perm.slice(0, i);
          var suffix = perm.slice(i);
          yield prefix.concat(first, suffix);
        }

        count += i;
      }

      return count;
    }

    var count = 0;
    for (var perm of yieldPermutations([])) {
      assert.deepEqual(perm, []);
      ++count;
    }
    assert.strictEqual(count, 1);

    check(yieldPermutations([1]), [[1]], 1);

    check(yieldPermutations([2, 1]), [
      [2, 1],
      [1, 2]
    ], 2);

    check(yieldPermutations([1,3,2]), [
      [1, 3, 2],
      [3, 1, 2],
      [3, 2, 1],
      [1, 2, 3],
      [2, 1, 3],
      [2, 3, 1]
    ], 6);
  });
});

describe("expressions containing yield subexpressions", function() {
  it("should evaluate all subexpressions before yielding", function() {
    function *gen(x) {
      return x * (yield (function(y) { x = y }));
    }

    var g = gen(2);
    var result = g.next();
    assert.strictEqual(result.done, false);

    result.value(5);

    assert.deepEqual(g.next(5), {
      value: 10,
      done: true
    });
  });

  it("should work even with getter member expressions", function() {
    function *gen() {
      return a.b + (yield "asdf");
    }

    var a = {};
    var b = 0;

    Object.defineProperty(a, "b", {
      get: function() {
        return ++b;
      }
    });

    var g = gen();

    assert.strictEqual(a.b, 1);

    assert.deepEqual(g.next(), {
      value: "asdf",
      done: false
    });

    assert.strictEqual(a.b, 3);

    assert.deepEqual(g.next(2), {
      value: 4,
      done: true
    });
  });

  it("should evaluate all array elements before yielding", function() {
    function *gen() {
      return [a, yield "asdf", a];
    }

    var a = 1;
    var g = gen();

    assert.deepEqual(g.next(), {
      value: "asdf",
      done: false
    });

    a = 3;

    assert.deepEqual(g.next(2), {
      value: [1, 2, 3],
      done: true
    });
  });

  it("should handle callee member expressions correctly", function() {
    function *gen() {
      a = a.slice(0).concat(yield "asdf");
      return a;
    }

    var a = [];
    var g = gen();

    assert.deepEqual(g.next(), {
      value: "asdf",
      done: false
    });

    a.push(1);

    assert.deepEqual(g.next(2), {
      value: [2],
      done: true
    });
  });

  it("should handle implicit stringification correctly", function() {
    function *gen() {
      return a + (yield "asdf");
    }

    var a = [1, 2];
    var g = gen();

    assert.deepEqual(g.next(), {
      value: "asdf",
      done: false
    });

    a = [4,5];

    assert.deepEqual(g.next(",3"), {
      value: "1,2,3",
      done: true
    });
  });
});
