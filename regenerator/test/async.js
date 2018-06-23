/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert = require("assert");

describe("async functions and await expressions", function() {
  Promise = require("promise");

  describe("regeneratorRuntime", function() {
    it("should be defined globally", function() {
      var global = Function("return this")();
      assert.ok("regeneratorRuntime" in global);
      assert.strictEqual(global.regeneratorRuntime, regeneratorRuntime);
    });

    it("should have a .wrap method", function() {
      assert.strictEqual(typeof regeneratorRuntime.wrap, "function");
    });
  });

  describe("Promise", function() {
    it("should be defined globally", function() {
      var global = Function("return this")();
      assert.ok("Promise" in global);
      assert.strictEqual(global.Promise, Promise);
    });

    it("should be a function", function() {
      assert.strictEqual(typeof Promise, "function");
    });
  });

  describe("no-await async function", function() {
    it("should return a Promise", function(done) {
      var called = false;

      async function noAwait(value) {
        called = true;
        return value;
      }

      var promise = noAwait("asdf");
      assert.strictEqual(called, true);

      promise.then(function(value) {
        assert.strictEqual(called, true);
        assert.strictEqual(value, "asdf");
        done();
      }).catch(done);
    });
  });

  describe("one-await async function", function() {
    it("should finish asynchronously", function(done) {
      var flag1 = false;
      var flag2 = false;

      async function oneAwait(value) {
        flag1 = true;
        var result = await value;
        flag2 = true;
        return result;
      }

      var promise = oneAwait("asdf");
      assert.strictEqual(flag1, true);
      assert.strictEqual(flag2, false);

      promise.then(function(value) {
        assert.strictEqual(flag2, true);
        assert.strictEqual(value, "asdf");
        done();
      }).catch(done);
    });
  });

  describe("nested async function calls", function() {
    it("should evaluate in the right order", function(done) {
      var markers = [];

      async function innerMost(marker) {
        markers.push(marker);
        return await marker;
      }

      async function inner(marker) {
        markers.push(marker);

        assert.strictEqual(
          await innerMost(marker + 1),
          marker + 1
        );

        markers.push(marker + 2);

        assert.strictEqual(
          await innerMost(marker + 3),
          marker + 3
        );

        markers.push(marker + 4);
      }

      async function outer() {
        markers.push(0);
        await inner(1);
        markers.push(6);
        await inner(7);
        markers.push(12);
      }

      outer().then(function() {
        var expected = [];
        for (var i = 0; i <= 12; ++i)
          expected.push(i);
        assert.deepEqual(markers, expected);
        done();
      }).catch(done);
    });
  });

  describe("dependent promises", function() {
    it("should be awaitable out of order", function(done) {
      async function outer(value) {
        var resolved = false;
        var p1 = new Promise(function(resolve) {
          setTimeout(function() {
            resolve(value + 1);
            resolved = true;
          }, 0);
        });

        assert.strictEqual(resolved, false);

        var v2 = await p1.then(function(value) {
          return value + 1;
        });

        assert.strictEqual(resolved, true);

        var v1 = await p1;

        return [v1, v2];
      }

      outer(1).then(function(pair) {
        assert.deepEqual(pair, [2, 3]);
        done();
      }).catch(done);
    });
  });

  describe("rejected promises", function() {
    it("should cause await expressions to throw", function(done) {
      var error = new Error("rejected");

      async function f(arg) {
        try {
          return await arg;
        } catch (e) {
          assert.strictEqual(e, error);
          return "did throw";
        }
      }

      Promise.all([
        f(Promise.reject(error)),
        f(Promise.resolve("did not throw"))
      ]).then(function(results) {
        assert.deepEqual(results, [
          "did throw",
          "did not throw"
        ]);
        done();
      }).catch(done);
    });

    it("should be returned by exceptional async functions", function(done) {
      var error = new Error("rejected");

      async function e(arg) {
        if (arg) {
          throw arg;
        }
        return "did not throw";
      }

      async function f(arg) {
        return await e(arg);
      }

      async function g(arg) {
        return await f(arg);
      }

      async function h(arg) {
        return await Promise.all([
          g(arg),
          Promise.resolve("dummy")
        ]);
      }

      Promise.all([
        h(error).then(function() {
          done(new Error("should not have resolved"));
        }, function(e) {
          assert.strictEqual(e, error);
          return "ok1";
        }),
        h(null).then(function(result) {
          assert.deepEqual(result, [
            "did not throw",
            "dummy"
          ]);
          return "ok2";
        })
      ]).then(function(results) {
        assert.deepEqual(results, ["ok1", "ok2"]);
        done();
      }).catch(done);
    });

    it("should propagate failure when returned", function() {
      var rejection = new Error("rejection");

      async function f() {
        return new Promise(function(resolve, reject) {
          reject(rejection);
        });
      }

      return f().then(function(result) {
        assert.ok(false, "should have been rejected");
      }, function(error) {
        assert.strictEqual(error, rejection);
      });
    });
  });

  describe("async function expressions", function() {
    it("should be allowed", function(done) {
      (async function(arg) {
        return await arg;
      })(Promise.resolve(1234)).then(function(value) {
        assert.strictEqual(value, 1234);
        done();
      }).catch(done);
    });
  });
});

describe("async generator functions", function() {
  it("should return a working AsyncIterator", function() {
    var markers = [];

    async function *gen(arg) {
      markers.push(0);
      var sent = yield arg;
      markers.push(1);
      var result = await sent;
      markers.push(2);
      assert.strictEqual(await (yield "second"), "sent after second");
      markers.push(3);
      return result;
    }

    var iter = gen("initial argument");
    assert.deepEqual(markers, []);

    var firstPromise = iter.next();
    assert.deepEqual(markers, [0]);

    return firstPromise.then(function(firstResult) {
      assert.deepEqual(firstResult, {
        value: "initial argument",
        done: false
      });

      assert.deepEqual(markers, [0]);

      return iter.next(new Promise(function(resolve) {
        setTimeout(resolve, 100);
      }).then(function() {
        assert.deepEqual(markers, [0, 1]);
        return "will become final result";
      }));

    }).then(function(secondResult) {
      assert.deepEqual(secondResult, {
        value: "second",
        done: false
      });

      assert.deepEqual(markers, [0, 1, 2]);

      return iter.next("sent after second");

    }).then(function(finalResult) {
      assert.deepEqual(markers, [0, 1, 2, 3]);
      assert.deepEqual(finalResult, {
        value: "will become final result",
        done: true
      });
    });
  });

  it("should keep results in order", function() {
    async function *range(limit) {
      var before = [];
      var after = [];
      for (var i = 0; i < limit; ++i) {
        before.push(i);
        yield i;
        after.push(i);
      }
      assert.deepEqual(before, after);
      return before;
    }

    var limit = 10;
    var iter = range(limit);
    var promises = [];
    var results = [];

    for (var i = 0; i < limit; ++i) {
      var promise = iter.next();
      promises.push(promise);

      promise.then(function(result) {
        assert.strictEqual(result.done, false);
        results.push(result);
      });
    }

    assert.deepEqual(results, []);

    return Promise.all(promises).then(function(promiseResults) {
      assert.deepEqual(results, promiseResults);

      return iter.next();

    }).then(function(finalResult) {
      assert.deepEqual(results.map(function(result) {
        return result.value;
      }), finalResult.value);

      assert.strictEqual(finalResult.done, true);
    });
  });

  it("should be able to handle many awaits", function() {
    var awaitCount = 0;

    function countAwait(i) {
      return Promise.resolve(i).then(function() {
        ++awaitCount;
      });
    }

    async function *gen(limit) {
      await countAwait(0);
      yield 1;
      await countAwait(2);
      await countAwait(3);
      yield 4;
      await countAwait(5);
      await countAwait(6);
      await countAwait(7);
      yield 8;
      for (var i = 0; i < limit; ++i) {
        await countAwait(i);
      }
      return "done";
    }

    var iter = gen(100);

    return iter.next().then(function(result) {
      assert.strictEqual(awaitCount, 1);

      assert.deepEqual(result, {
        value: 1,
        done: false
      });

      return iter.next();

    }).then(function(result) {
      assert.strictEqual(awaitCount, 3);

      assert.deepEqual(result, {
        value: 4,
        done: false
      });

      return iter.next();

    }).then(function(result) {
      assert.strictEqual(awaitCount, 6);

      assert.deepEqual(result, {
        value: 8,
        done: false
      });

      return iter.next();

    }).then(function(result) {
      assert.strictEqual(awaitCount, 6 + 100);

      assert.deepEqual(result, {
        value: "done",
        done: true
      });

      return iter.next();

    }).then(function(result) {
      assert.deepEqual(result, {
        value: void 0,
        done: true
      });
    });
  });

  it("should not propagate exceptions between iterations", function() {
    async function *gen() {
      yield 1;
      yield 2;
    }

    var iter = gen();

    return iter.next().then(function(result) {
      assert.deepEqual(result, {
        value: 1,
        done: false
      });

      return iter.throw(new Error("thrown from first yield"));

    }).then(function() {
      throw new Error("should have thrown");

    }, function(error) {
      assert.strictEqual(error.message, "thrown from first yield");
      return iter.next();

    }).then(function(result) {
      assert.deepEqual(result, {
        value: void 0,
        done: true
      });
    });
  });

  it("should allow yielding a rejected Promise", function() {
    var yielded = new Error("yielded rejection");
    var returned = new Error("returned rejection");

    async function *gen() {
      assert.strictEqual(yield "first yielded", "first sent");
      try {
        assert.strictEqual(yield Promise.reject(yielded), "not reached");
      } catch (e) {
        assert.strictEqual(yield e, "second sent");
        return Promise.reject(returned);
      }
    }

    var iter = gen();

    return iter.next().then(function(result) {
      assert.deepEqual(result, {
        value: "first yielded",
        done: false
      });
      return iter.next("first sent");
    }).then(function (result) {
      assert.deepEqual(result, {
        value: yielded,
        done: false
      });
      return iter.next("second sent");
    }).then(function(result) {
      assert.ok(false, "should have returned a rejected Promise");
    }, function(error) {
      assert.strictEqual(error, returned);
    });
  });

  it("should work with nested arrow functions", async function () {
    var a = async b => {
      return await (async () => {
        return await b();
      })();
    };

    assert.strictEqual(
      await a(() => Promise.resolve(1234)),
      1234
    );
  });

  it("should support super.method(...) in async methods", async function () {
    class A {
      async method() {
        return "from A";
      }
    }

    class B extends A {
      async method() {
        return "from B " + (await super.method());
      }
    }

    assert.strictEqual(await new B().method(), "from B from A");
  });
});
