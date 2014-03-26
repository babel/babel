/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");

function check(g, yields, returnValue) {
  for (var i = 0; i < yields.length; ++i) {
    var info = i > 0 ? g.next(i) : g.next();
    assert.deepEqual(info.value, yields[i]);
    assert.strictEqual(info.done, false);
  }

  assert.deepEqual(
    i > 0 ? g.next(i) : g.next(),
    { value: returnValue, done: true }
  );
}

// A version of `throw` whose behavior can't be statically analyzed.
// Useful for testing dynamic exception dispatching.
function raise(argument) {
  throw argument;
}

describe("wrapGenerator", function() {
  it("should be defined globally", function() {
    var global = Function("return this")();
    assert.ok("wrapGenerator" in global);
    assert.strictEqual(global.wrapGenerator, wrapGenerator);
  });

  it("should be a function", function() {
    assert.strictEqual(typeof wrapGenerator, "function");
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

describe("range generator", function() {
  function *range(n) {
    for (var i = 0; i < n; ++i) {
      yield i;
    }
  }

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
    var gen2 = gen().next().value();
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

describe("completed generator", function() {
  function *gen() {
    return "ALL DONE";
  }

  it("should refuse to resume", function() {
    var g = gen();

    assert.deepEqual(g.next(), {
      value: "ALL DONE", done: true
    });

    try {
      g.next();
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.ok(err instanceof Error);
      assert.strictEqual(
        err.message,
        "Generator has already finished"
      );
    }
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

      yield typeof halve;

      yield increment(increment(n));
    }

    check(gen(3), [4, 1, "function", 5]);
    check(gen(4), [5, "undefined", 6]);
  });

  it("should work for nested generator function declarations", function() {
    function *outer(n) {
      yield 0;
      assert.ok(wrapGenerator.isGeneratorFunction(inner));
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

  it("should be shadowable by explicit declarations", function() {
    function *asParameter(x, arguments) {
      yield x + arguments;
    }

    check(asParameter(4, 5), [9]);
    check(asParameter("asdf", "zxcv"), ["asdfzxcv"]);

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
    function *gen(obj) {
      yield obj.arguments;
      obj.arguments = "oyez";
      yield obj;
    }

    check(gen({ arguments: 42 }), [42, { arguments: "oyez" }]);
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

  it("should not replace variables defined in inner scopes", function() {
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
      wrapGenerator.isGeneratorFunction(genFun),
      true
    );

    assert.strictEqual(
      wrapGenerator.isGeneratorFunction(normalFun),
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
      wrapGenerator.isGeneratorFunction(function *genFun() {
        yield 0;
      }),
      true
    );

    assert.strictEqual(
      wrapGenerator.isGeneratorFunction(function normalFun() {
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
});
