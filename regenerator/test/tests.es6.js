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
