var assert = require("assert");
require("../runtime/dev");

function check(g, yields, returnValue) {
  for (var i = 0; i < yields.length; ++i) {
    var info = g.next(i);
    assert.deepEqual(info.value, yields[i]);
    assert.strictEqual(info.done, false);
  }

  assert.deepEqual(g.next(i), {
    value: returnValue,
    done: true
  });
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
  function *gen(x) {
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

  it("should catch exceptions properly", function() {
    check(gen(4), [0, 1, 2, 3]);
    check(gen(5), [0, 1, 5, 3]);
  });
});

describe("try-finally generator", function() {
  function *gen(condition) {
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

  it("should execute finally blocks", function() {
    check(gen(true), [0, 1, 4], 5);
    check(gen(false), [0, 1, 6], 7);
  });
});

describe("try-catch-finally generator", function() {
  function *gen() {
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

  it("should catch and then finalize", function() {
    check(gen(), [0, 1, 2, 3, 6]);
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
  function *gen() {
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

  it("should execute in order", function() {
    check(gen(), [1, "thrown", 2, 3]);
  });
});

describe("for-in loop generator", function() {
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

  it("should visit properties until 'skip'", function() {
    check(
      gen({ a: 1, b: 2, skip: 3, c: 4 }),
      ["why not", ["a", 1], ["b", 2]], 2);
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
