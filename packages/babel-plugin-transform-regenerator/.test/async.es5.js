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

describe("async functions and await expressions", function () {
  Promise = require("promise");

  describe("regeneratorRuntime", function () {
    it("should be defined globally", function () {
      var global = Function("return this")();
      assert.ok("regeneratorRuntime" in global);
      assert.strictEqual(global.regeneratorRuntime, regeneratorRuntime);
    });

    it("should have a .wrap method", function () {
      assert.strictEqual(typeof regeneratorRuntime.wrap, "function");
    });
  });

  describe("Promise", function () {
    it("should be defined globally", function () {
      var global = Function("return this")();
      assert.ok("Promise" in global);
      assert.strictEqual(global.Promise, Promise);
    });

    it("should be a function", function () {
      assert.strictEqual(typeof Promise, "function");
    });
  });

  describe("no-await async function", function () {
    it("should return a Promise", function (done) {
      var called = false;

      function noAwait(value) {
        return regeneratorRuntime.async(function noAwait$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              called = true;
              return _context.abrupt("return", value);

            case 2:
            case "end":
              return _context.stop();
          }
        }, null, this);
      }

      var promise = noAwait("asdf");
      assert.strictEqual(called, true);

      promise.then(function (value) {
        assert.strictEqual(called, true);
        assert.strictEqual(value, "asdf");
        done();
      }).catch(done);
    });
  });

  describe("one-await async function", function () {
    it("should finish asynchronously", function (done) {
      var flag1 = false;
      var flag2 = false;

      function oneAwait(value) {
        var result;
        return regeneratorRuntime.async(function oneAwait$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              flag1 = true;
              _context2.next = 3;
              return regeneratorRuntime.awrap(value);

            case 3:
              result = _context2.sent;

              flag2 = true;
              return _context2.abrupt("return", result);

            case 6:
            case "end":
              return _context2.stop();
          }
        }, null, this);
      }

      var promise = oneAwait("asdf");
      assert.strictEqual(flag1, true);
      assert.strictEqual(flag2, false);

      promise.then(function (value) {
        assert.strictEqual(flag2, true);
        assert.strictEqual(value, "asdf");
        done();
      }).catch(done);
    });
  });

  describe("nested async function calls", function () {
    it("should evaluate in the right order", function (done) {
      var markers = [];

      function innerMost(marker) {
        return regeneratorRuntime.async(function innerMost$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              markers.push(marker);
              _context3.next = 3;
              return regeneratorRuntime.awrap(marker);

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }, null, this);
      }

      function inner(marker) {
        return regeneratorRuntime.async(function inner$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              markers.push(marker);

              _context4.t0 = assert;
              _context4.next = 4;
              return regeneratorRuntime.awrap(innerMost(marker + 1));

            case 4:
              _context4.t1 = _context4.sent;
              _context4.t2 = marker + 1;

              _context4.t0.strictEqual.call(_context4.t0, _context4.t1, _context4.t2);

              markers.push(marker + 2);

              _context4.t3 = assert;
              _context4.next = 11;
              return regeneratorRuntime.awrap(innerMost(marker + 3));

            case 11:
              _context4.t4 = _context4.sent;
              _context4.t5 = marker + 3;

              _context4.t3.strictEqual.call(_context4.t3, _context4.t4, _context4.t5);

              markers.push(marker + 4);

            case 15:
            case "end":
              return _context4.stop();
          }
        }, null, this);
      }

      function outer() {
        return regeneratorRuntime.async(function outer$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              markers.push(0);
              _context5.next = 3;
              return regeneratorRuntime.awrap(inner(1));

            case 3:
              markers.push(6);
              _context5.next = 6;
              return regeneratorRuntime.awrap(inner(7));

            case 6:
              markers.push(12);

            case 7:
            case "end":
              return _context5.stop();
          }
        }, null, this);
      }

      outer().then(function () {
        var expected = [];
        for (var i = 0; i <= 12; ++i) expected.push(i);
        assert.deepEqual(markers, expected);
        done();
      }).catch(done);
    });
  });

  describe("dependent promises", function () {
    it("should be awaitable out of order", function (done) {
      function outer(value) {
        var resolved, p1, v2, v1;
        return regeneratorRuntime.async(function outer$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              resolved = false;
              p1 = new Promise(function (resolve) {
                setTimeout(function () {
                  resolve(value + 1);
                  resolved = true;
                }, 0);
              });

              assert.strictEqual(resolved, false);

              _context6.next = 5;
              return regeneratorRuntime.awrap(p1.then(function (value) {
                return value + 1;
              }));

            case 5:
              v2 = _context6.sent;

              assert.strictEqual(resolved, true);

              _context6.next = 9;
              return regeneratorRuntime.awrap(p1);

            case 9:
              v1 = _context6.sent;
              return _context6.abrupt("return", [v1, v2]);

            case 11:
            case "end":
              return _context6.stop();
          }
        }, null, this);
      }

      outer(1).then(function (pair) {
        assert.deepEqual(pair, [2, 3]);
        done();
      }).catch(done);
    });
  });

  describe("rejected promises", function () {
    it("should cause await expressions to throw", function (done) {
      var error = new Error("rejected");

      function f(arg) {
        return regeneratorRuntime.async(function f$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return regeneratorRuntime.awrap(arg);

            case 3:
              return _context7.abrupt("return", _context7.sent);

            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7["catch"](0);

              assert.strictEqual(_context7.t0, error);
              return _context7.abrupt("return", "did throw");

            case 10:
            case "end":
              return _context7.stop();
          }
        }, null, this, [[0, 6]]);
      }

      Promise.all([f(Promise.reject(error)), f(Promise.resolve("did not throw"))]).then(function (results) {
        assert.deepEqual(results, ["did throw", "did not throw"]);
        done();
      }).catch(done);
    });

    it("should be returned by exceptional async functions", function (done) {
      var error = new Error("rejected");

      function e(arg) {
        return regeneratorRuntime.async(function e$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (!arg) {
                _context8.next = 2;
                break;
              }

              throw arg;

            case 2:
              return _context8.abrupt("return", "did not throw");

            case 3:
            case "end":
              return _context8.stop();
          }
        }, null, this);
      }

      function f(arg) {
        return regeneratorRuntime.async(function f$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(e(arg));

            case 2:
              return _context9.abrupt("return", _context9.sent);

            case 3:
            case "end":
              return _context9.stop();
          }
        }, null, this);
      }

      function g(arg) {
        return regeneratorRuntime.async(function g$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(f(arg));

            case 2:
              return _context10.abrupt("return", _context10.sent);

            case 3:
            case "end":
              return _context10.stop();
          }
        }, null, this);
      }

      function h(arg) {
        return regeneratorRuntime.async(function h$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(Promise.all([g(arg), Promise.resolve("dummy")]));

            case 2:
              return _context11.abrupt("return", _context11.sent);

            case 3:
            case "end":
              return _context11.stop();
          }
        }, null, this);
      }

      Promise.all([h(error).then(function () {
        done(new Error("should not have resolved"));
      }, function (e) {
        assert.strictEqual(e, error);
        return "ok1";
      }), h(null).then(function (result) {
        assert.deepEqual(result, ["did not throw", "dummy"]);
        return "ok2";
      })]).then(function (results) {
        assert.deepEqual(results, ["ok1", "ok2"]);
        done();
      }).catch(done);
    });

    it("should propagate failure when returned", function () {
      var rejection = new Error("rejection");

      function f() {
        return regeneratorRuntime.async(function f$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise(function (resolve, reject) {
                reject(rejection);
              }));

            case 1:
            case "end":
              return _context12.stop();
          }
        }, null, this);
      }

      return f().then(function (result) {
        assert.ok(false, "should have been rejected");
      }, function (error) {
        assert.strictEqual(error, rejection);
      });
    });
  });

  describe("async function expressions", function () {
    it("should be allowed", function (done) {
      (function _callee(arg) {
        return regeneratorRuntime.async(function _callee$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(arg);

            case 2:
              return _context13.abrupt("return", _context13.sent);

            case 3:
            case "end":
              return _context13.stop();
          }
        }, null, this);
      })(Promise.resolve(1234)).then(function (value) {
        assert.strictEqual(value, 1234);
        done();
      }).catch(done);
    });
  });
});

describe("async generator functions", function () {
  it("should return a working AsyncIterator", function () {
    var _marked = [gen].map(regeneratorRuntime.mark);

    var markers = [];

    function gen(arg) {
      var sent, result;
      return regeneratorRuntime.async(function gen$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            markers.push(0);
            _context14.next = 3;
            return arg;

          case 3:
            sent = _context14.sent;

            markers.push(1);
            _context14.next = 7;
            return regeneratorRuntime.awrap(sent);

          case 7:
            result = _context14.sent;

            markers.push(2);
            _context14.t0 = assert;
            _context14.t1 = regeneratorRuntime;
            _context14.next = 13;
            return "second";

          case 13:
            _context14.t2 = _context14.sent;
            _context14.next = 16;
            return _context14.t1.awrap.call(_context14.t1, _context14.t2);

          case 16:
            _context14.t3 = _context14.sent;

            _context14.t0.strictEqual.call(_context14.t0, _context14.t3, "sent after second");

            markers.push(3);
            return _context14.abrupt("return", result);

          case 20:
          case "end":
            return _context14.stop();
        }
      }, _marked[0], this);
    }

    var iter = gen("initial argument");
    assert.deepEqual(markers, []);

    var firstPromise = iter.next();
    assert.deepEqual(markers, [0]);

    return firstPromise.then(function (firstResult) {
      assert.deepEqual(firstResult, {
        value: "initial argument",
        done: false
      });

      assert.deepEqual(markers, [0]);

      return iter.next(new Promise(function (resolve) {
        setTimeout(resolve, 100);
      }).then(function () {
        assert.deepEqual(markers, [0, 1]);
        return "will become final result";
      }));
    }).then(function (secondResult) {
      assert.deepEqual(secondResult, {
        value: "second",
        done: false
      });

      assert.deepEqual(markers, [0, 1, 2]);

      return iter.next("sent after second");
    }).then(function (finalResult) {
      assert.deepEqual(markers, [0, 1, 2, 3]);
      assert.deepEqual(finalResult, {
        value: "will become final result",
        done: true
      });
    });
  });

  it("should keep results in order", function () {
    var _marked2 = [range].map(regeneratorRuntime.mark);

    function range(limit) {
      var before, after, i;
      return regeneratorRuntime.async(function range$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            before = [];
            after = [];
            i = 0;

          case 3:
            if (!(i < limit)) {
              _context15.next = 11;
              break;
            }

            before.push(i);
            _context15.next = 7;
            return i;

          case 7:
            after.push(i);

          case 8:
            ++i;
            _context15.next = 3;
            break;

          case 11:
            assert.deepEqual(before, after);
            return _context15.abrupt("return", before);

          case 13:
          case "end":
            return _context15.stop();
        }
      }, _marked2[0], this);
    }

    var limit = 10;
    var iter = range(limit);
    var promises = [];
    var results = [];

    for (var i = 0; i < limit; ++i) {
      var promise = iter.next();
      promises.push(promise);

      promise.then(function (result) {
        assert.strictEqual(result.done, false);
        results.push(result);
      });
    }

    assert.deepEqual(results, []);

    return Promise.all(promises).then(function (promiseResults) {
      assert.deepEqual(results, promiseResults);

      return iter.next();
    }).then(function (finalResult) {
      assert.deepEqual(results.map(function (result) {
        return result.value;
      }), finalResult.value);

      assert.strictEqual(finalResult.done, true);
    });
  });

  it("should be able to handle many awaits", function () {
    var _marked3 = [gen].map(regeneratorRuntime.mark);

    var awaitCount = 0;

    function countAwait(i) {
      return Promise.resolve(i).then(function () {
        ++awaitCount;
      });
    }

    function gen(limit) {
      var i;
      return regeneratorRuntime.async(function gen$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return regeneratorRuntime.awrap(countAwait(0));

          case 2:
            _context16.next = 4;
            return 1;

          case 4:
            _context16.next = 6;
            return regeneratorRuntime.awrap(countAwait(2));

          case 6:
            _context16.next = 8;
            return regeneratorRuntime.awrap(countAwait(3));

          case 8:
            _context16.next = 10;
            return 4;

          case 10:
            _context16.next = 12;
            return regeneratorRuntime.awrap(countAwait(5));

          case 12:
            _context16.next = 14;
            return regeneratorRuntime.awrap(countAwait(6));

          case 14:
            _context16.next = 16;
            return regeneratorRuntime.awrap(countAwait(7));

          case 16:
            _context16.next = 18;
            return 8;

          case 18:
            i = 0;

          case 19:
            if (!(i < limit)) {
              _context16.next = 25;
              break;
            }

            _context16.next = 22;
            return regeneratorRuntime.awrap(countAwait(i));

          case 22:
            ++i;
            _context16.next = 19;
            break;

          case 25:
            return _context16.abrupt("return", "done");

          case 26:
          case "end":
            return _context16.stop();
        }
      }, _marked3[0], this);
    }

    var iter = gen(100);

    return iter.next().then(function (result) {
      assert.strictEqual(awaitCount, 1);

      assert.deepEqual(result, {
        value: 1,
        done: false
      });

      return iter.next();
    }).then(function (result) {
      assert.strictEqual(awaitCount, 3);

      assert.deepEqual(result, {
        value: 4,
        done: false
      });

      return iter.next();
    }).then(function (result) {
      assert.strictEqual(awaitCount, 6);

      assert.deepEqual(result, {
        value: 8,
        done: false
      });

      return iter.next();
    }).then(function (result) {
      assert.strictEqual(awaitCount, 6 + 100);

      assert.deepEqual(result, {
        value: "done",
        done: true
      });

      return iter.next();
    }).then(function (result) {
      assert.deepEqual(result, {
        value: void 0,
        done: true
      });
    });
  });

  it("should not propagate exceptions between iterations", function () {
    var _marked4 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.async(function gen$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return 1;

          case 2:
            _context17.next = 4;
            return 2;

          case 4:
          case "end":
            return _context17.stop();
        }
      }, _marked4[0], this);
    }

    var iter = gen();

    return iter.next().then(function (result) {
      assert.deepEqual(result, {
        value: 1,
        done: false
      });

      return iter.throw(new Error("thrown from first yield"));
    }).then(function () {
      throw new Error("should have thrown");
    }, function (error) {
      assert.strictEqual(error.message, "thrown from first yield");
      return iter.next();
    }).then(function (result) {
      assert.deepEqual(result, {
        value: void 0,
        done: true
      });
    });
  });

  it("should allow yielding a rejected Promise", function () {
    var _marked5 = [gen].map(regeneratorRuntime.mark);

    var yielded = new Error("yielded rejection");
    var returned = new Error("returned rejection");

    function gen() {
      return regeneratorRuntime.async(function gen$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.t0 = assert;
            _context18.next = 3;
            return Promise.reject(yielded);

          case 3:
            _context18.t1 = _context18.sent;

            _context18.t0.strictEqual.call(_context18.t0, _context18.t1, "first sent");

            _context18.t2 = assert;
            _context18.next = 8;
            return "middle";

          case 8:
            _context18.t3 = _context18.sent;

            _context18.t2.strictEqual.call(_context18.t2, _context18.t3, "second sent");

            return _context18.abrupt("return", Promise.reject(returned));

          case 11:
          case "end":
            return _context18.stop();
        }
      }, _marked5[0], this);
    }

    var iter = gen();

    return iter.next().then(function (result) {
      assert.ok(false, "should have yielded a rejected Promise");
    }, function (error) {
      assert.strictEqual(error, yielded);
      return iter.next("first sent");
    }).then(function (result) {
      assert.deepEqual(result, {
        value: "middle",
        done: false
      });
      return iter.next("second sent");
    }).then(function (result) {
      assert.ok(false, "should have returned a rejected Promise");
    }, function (error) {
      assert.strictEqual(error, returned);
    });
  });
});