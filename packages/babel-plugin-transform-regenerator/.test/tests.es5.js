var _marked4 = [range].map(regeneratorRuntime.mark);

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
var runningInTranslation = /\.wrap\(/.test(regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
}));
var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator || "@@iterator";

function check(g, yields, returnValue) {
  for (var i = 0; i < yields.length; ++i) {
    var info = g.next(i);
    assert.deepEqual(info.value, yields[i]);
    assert.strictEqual(info.done, false);
  }

  assert.deepEqual(i > 0 ? g.next(i) : g.next(), { value: returnValue, done: true });
}

// A version of `throw` whose behavior can't be statically analyzed.
// Useful for testing dynamic exception dispatching.
function raise(argument) {
  throw argument;
}

function assertAlreadyFinished(generator) {
  assert.deepEqual(generator.next(), {
    value: void 0,
    done: true
  });
}

describe("regeneratorRuntime", function () {
  it("should be defined globally", function () {
    var global = Function("return this")();
    assert.ok("regeneratorRuntime" in global);
    assert.strictEqual(global.regeneratorRuntime, regeneratorRuntime);
  });

  it("should have a .wrap method", function () {
    assert.strictEqual(typeof regeneratorRuntime.wrap, "function");
  });

  it("should have a .mark method", function () {
    assert.strictEqual(typeof regeneratorRuntime.mark, "function");
  });

  it("should be the object name returned by util.runtimeProperty", function () {
    assert.strictEqual(require("../lib/util").runtimeProperty("foo").object.name, "regeneratorRuntime");
  });
});

(runningInTranslation ? describe : xdescribe)("@@iterator", function () {
  it("is defined on Generator.prototype and returns this", function () {
    var _marked = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }, _marked[0], this);
    }
    var iterator = gen();
    assert.ok(!iterator.hasOwnProperty(iteratorSymbol));
    assert.ok(!Object.getPrototypeOf(iterator).hasOwnProperty(iteratorSymbol));
    assert.ok(Object.getPrototypeOf(Object.getPrototypeOf(iterator)).hasOwnProperty(iteratorSymbol));
    assert.strictEqual(iterator[iteratorSymbol](), iterator);
  });
});

describe("simple argument yielder", function () {
  it("should yield only its first argument", function () {
    var _marked2 = [gen].map(regeneratorRuntime.mark);

    function gen(x) {
      return regeneratorRuntime.wrap(function gen$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return x;

          case 2:
          case "end":
            return _context3.stop();
        }
      }, _marked2[0], this);
    }

    check(gen("oyez"), ["oyez"]);
    check(gen("foo", "bar"), ["foo"]);
  });

  it("should support multiple yields in expression", function () {
    var _marked3 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return 0;

          case 2:
            _context4.t0 = _context4.sent;
            _context4.next = 5;
            return 0;

          case 5:
            _context4.t1 = _context4.sent;
            return _context4.abrupt("return", _context4.t0 + _context4.t1);

          case 7:
          case "end":
            return _context4.stop();
        }
      }, _marked3[0], this);
    }
    var itr = gen();
    itr.next();
    itr.next(1);
    assert.equal(itr.next(2).value, 3);
  });
});

function range(n) {
  var i;
  return regeneratorRuntime.wrap(function range$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        i = 0;

      case 1:
        if (!(i < n)) {
          _context5.next = 7;
          break;
        }

        _context5.next = 4;
        return i;

      case 4:
        ++i;
        _context5.next = 1;
        break;

      case 7:
      case "end":
        return _context5.stop();
    }
  }, _marked4[0], this);
}

describe("range generator", function () {
  it("should yield the empty range", function () {
    check(range(0), []);
  });

  it("should yield the range 0..n-1", function () {
    check(range(5), [0, 1, 2, 3, 4]);
  });
});

describe("collatz generator", function () {
  var _marked5 = [gen].map(regeneratorRuntime.mark);

  function gen(n) {
    var count;
    return regeneratorRuntime.wrap(function gen$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          count = 0;
          _context6.next = 3;
          return n;

        case 3:
          if (!(n !== 1)) {
            _context6.next = 14;
            break;
          }

          count += 1;

          if (!(n % 2)) {
            _context6.next = 10;
            break;
          }

          _context6.next = 8;
          return n = n * 3 + 1;

        case 8:
          _context6.next = 12;
          break;

        case 10:
          _context6.next = 12;
          return n >>= 1;

        case 12:
          _context6.next = 3;
          break;

        case 14:
          return _context6.abrupt("return", count);

        case 15:
        case "end":
          return _context6.stop();
      }
    }, _marked5[0], this);
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

  it("seven", function () {
    check(gen(7), seven, 16);
  });

  it("fifty two", function () {
    check(gen(52), fiftyTwo, 11);
  });

  it("eighty two", function () {
    check(gen(82), eightyTwo, 110);
  });
});

describe("throw", function () {
  (runningInTranslation ? it : xit)("should complete generator", function () {
    var _marked6 = [gen].map(regeneratorRuntime.mark);

    function gen(x) {
      return regeneratorRuntime.wrap(function gen$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            throw 1;

          case 1:
          case "end":
            return _context7.stop();
        }
      }, _marked6[0], this);
    }

    var u = gen();

    try {
      u.next();
    } catch (err) {
      assert.strictEqual(err, 1);
    }

    assertAlreadyFinished(u);
  });
});

describe("try-catch generator", function () {
  var _marked7 = [usingThrow, usingRaise].map(regeneratorRuntime.mark);

  function usingThrow(x) {
    return regeneratorRuntime.wrap(function usingThrow$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return 0;

        case 2:
          _context8.prev = 2;
          _context8.next = 5;
          return 1;

        case 5:
          if (!(x % 2 === 0)) {
            _context8.next = 7;
            break;
          }

          throw 2;

        case 7:
          _context8.next = 9;
          return x;

        case 9:
          _context8.next = 15;
          break;

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](2);
          _context8.next = 15;
          return _context8.t0;

        case 15:
          _context8.next = 17;
          return 3;

        case 17:
        case "end":
          return _context8.stop();
      }
    }, _marked7[0], this, [[2, 11]]);
  }

  function usingRaise(x) {
    return regeneratorRuntime.wrap(function usingRaise$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return 0;

        case 2:
          _context9.prev = 2;
          _context9.next = 5;
          return 1;

        case 5:
          if (x % 2 === 0) raise(2);
          _context9.next = 8;
          return x;

        case 8:
          _context9.next = 14;
          break;

        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](2);
          _context9.next = 14;
          return _context9.t0;

        case 14:
          _context9.next = 16;
          return 3;

        case 16:
        case "end":
          return _context9.stop();
      }
    }, _marked7[1], this, [[2, 10]]);
  }

  it("should catch static exceptions properly", function () {
    check(usingThrow(4), [0, 1, 2, 3]);
    check(usingThrow(5), [0, 1, 5, 3]);
  });

  it("should catch dynamic exceptions properly", function () {
    check(usingRaise(4), [0, 1, 2, 3]);
    check(usingRaise(5), [0, 1, 5, 3]);
  });
});

describe("nested generators in try-catch", function () {
  var _marked8 = [gen].map(regeneratorRuntime.mark);

  function gen() {
    return regeneratorRuntime.wrap(function gen$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;

          nonExistent;
          _context11.next = 8;
          break;

        case 4:
          _context11.prev = 4;
          _context11.t0 = _context11["catch"](0);
          _context11.next = 8;
          return regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context10) {
              while (1) switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return _context11.t0;

                case 2:
                case "end":
                  return _context10.stop();
              }
            }, _callee2, this);
          });

        case 8:
        case "end":
          return _context11.stop();
      }
    }, _marked8[0], this, [[0, 4]]);
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

describe("try-finally generator", function () {
  var _marked9 = [usingThrow, usingRaise, usingAbrupt].map(regeneratorRuntime.mark);

  function usingThrow(condition) {
    return regeneratorRuntime.wrap(function usingThrow$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return 0;

        case 2:
          _context12.prev = 2;
          _context12.next = 5;
          return 1;

        case 5:
          throw 2;

        case 8:
          _context12.prev = 8;

          if (!condition) {
            _context12.next = 13;
            break;
          }

          _context12.next = 12;
          return 4;

        case 12:
          return _context12.abrupt("return", 5);

        case 13:
          _context12.next = 15;
          return 6;

        case 15:
          return _context12.abrupt("return", 7);

        case 17:
        case "end":
          return _context12.stop();
      }
    }, _marked9[0], this, [[2,, 8, 17]]);
  }

  function usingRaise(condition) {
    return regeneratorRuntime.wrap(function usingRaise$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return 0;

        case 2:
          _context13.prev = 2;
          _context13.next = 5;
          return 1;

        case 5:
          raise(2);
          _context13.next = 8;
          return 3;

        case 8:
          _context13.prev = 8;

          if (!condition) {
            _context13.next = 13;
            break;
          }

          _context13.next = 12;
          return 4;

        case 12:
          return _context13.abrupt("return", 5);

        case 13:
          _context13.next = 15;
          return 6;

        case 15:
          return _context13.abrupt("return", 7);

        case 17:
        case "end":
          return _context13.stop();
      }
    }, _marked9[1], this, [[2,, 8, 17]]);
  }

  function usingAbrupt(abruptType, finallyAbruptType) {
    return regeneratorRuntime.wrap(function usingAbrupt$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return 0;

        case 2:
          _context14.prev = 2;
          _context14.next = 5;
          return 1;

        case 5:
          if (!(abruptType === "return")) {
            _context14.next = 9;
            break;
          }

          return _context14.abrupt("return", 2);

        case 9:
          if (!(abruptType === "break")) {
            _context14.next = 13;
            break;
          }

          return _context14.abrupt("break", 33);

        case 13:
          if (!(abruptType === "continue")) {
            _context14.next = 16;
            break;
          }

          abruptType = "return";
          return _context14.abrupt("continue", 31);

        case 16:
          _context14.prev = 16;
          _context14.next = 19;
          return 3;

        case 19:
          if (!(finallyAbruptType === "return")) {
            _context14.next = 23;
            break;
          }

          return _context14.abrupt("return", 4);

        case 23:
          if (!(finallyAbruptType === "break")) {
            _context14.next = 27;
            break;
          }

          return _context14.abrupt("break", 33);

        case 27:
          if (!(finallyAbruptType === "continue")) {
            _context14.next = 30;
            break;
          }

          finallyAbruptType = null;
          return _context14.abrupt("continue", 31);

        case 30:
          return _context14.finish(16);

        case 31:
          _context14.next = 2;
          break;

        case 33:
          return _context14.abrupt("return", 5);

        case 34:
        case "end":
          return _context14.stop();
      }
    }, _marked9[2], this, [[2,, 16, 31]]);
  }

  it("should honor return", function () {
    check(usingAbrupt("return", null), [0, 1, 3], 2);
  });

  it("should honor break", function () {
    check(usingAbrupt("break", null), [0, 1, 3], 5);
  });

  it("should honor continue", function () {
    check(usingAbrupt("continue", null), [0, 1, 3, 1, 3], 2);
  });

  it("should override abrupt with return", function () {
    check(usingAbrupt("return", "return"), [0, 1, 3], 4);
    check(usingAbrupt("break", "return"), [0, 1, 3], 4);
    check(usingAbrupt("continue", "return"), [0, 1, 3], 4);
  });

  it("should override abrupt with break", function () {
    check(usingAbrupt("return", "break"), [0, 1, 3], 5);
    check(usingAbrupt("break", "break"), [0, 1, 3], 5);
    check(usingAbrupt("continue", "break"), [0, 1, 3], 5);
  });

  it("should override abrupt with continue", function () {
    check(usingAbrupt("return", "continue"), [0, 1, 3, 1, 3], 2);
    check(usingAbrupt("break", "continue"), [0, 1, 3, 1, 3], 5);
    check(usingAbrupt("continue", "continue"), [0, 1, 3, 1, 3], 2);
  });

  it("should execute finally blocks statically", function () {
    check(usingThrow(true), [0, 1, 4], 5);
    check(usingThrow(false), [0, 1, 6], 7);
  });

  it("should execute finally blocks dynamically", function () {
    check(usingRaise(true), [0, 1, 4], 5);
    check(usingRaise(false), [0, 1, 6], 7);
  });

  it("should execute finally blocks before throwing", function () {
    var _marked10 = [uncaught].map(regeneratorRuntime.mark);

    var uncaughtError = new Error("uncaught");

    function uncaught(condition) {
      return regeneratorRuntime.wrap(function uncaught$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return 0;

          case 3:
            if (!condition) {
              _context15.next = 7;
              break;
            }

            _context15.next = 6;
            return 1;

          case 6:
            raise(uncaughtError);

          case 7:
            _context15.next = 9;
            return 2;

          case 9:
            _context15.prev = 9;
            _context15.next = 12;
            return 3;

          case 12:
            return _context15.finish(9);

          case 13:
            _context15.next = 15;
            return 4;

          case 15:
          case "end":
            return _context15.stop();
        }
      }, _marked10[0], this, [[0,, 9, 13]]);
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

  it("should throw correct error when finally contains catch", function () {
    var _marked11 = [gen].map(regeneratorRuntime.mark);

    var right = new Error("right");
    var wrong = new Error("wrong");

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return 0;

          case 3:
            raise(right);

          case 4:
            _context16.prev = 4;
            _context16.next = 7;
            return 1;

          case 7:
            _context16.prev = 7;

            raise(wrong);
            _context16.next = 16;
            break;

          case 11:
            _context16.prev = 11;
            _context16.t0 = _context16["catch"](7);

            assert.strictEqual(_context16.t0, wrong);
            _context16.next = 16;
            return 2;

          case 16:
            return _context16.finish(4);

          case 17:
          case "end":
            return _context16.stop();
        }
      }, _marked11[0], this, [[0,, 4, 17], [7, 11]]);
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

  it("should run finally after break within try", function () {
    var _marked12 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return 0;

          case 3:
            if (!true) {
              _context17.next = 9;
              break;
            }

            _context17.next = 6;
            return 1;

          case 6:
            return _context17.abrupt("break", 9);

          case 9:
            _context17.prev = 9;
            _context17.next = 12;
            return 2;

          case 12:
            return _context17.finish(9);

          case 13:
            _context17.next = 15;
            return 3;

          case 15:
          case "end":
            return _context17.stop();
        }
      }, _marked12[0], this, [[0,, 9, 13]]);
    }

    check(gen(), [0, 1, 2, 3]);
  });
});

describe("try-catch-finally generator", function () {
  var _marked13 = [usingThrow, usingRaise].map(regeneratorRuntime.mark);

  function usingThrow() {
    return regeneratorRuntime.wrap(function usingThrow$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return 0;

        case 2:
          _context18.prev = 2;
          _context18.prev = 3;
          _context18.next = 6;
          return 1;

        case 6:
          throw 2;

        case 9:
          _context18.next = 16;
          break;

        case 11:
          _context18.prev = 11;
          _context18.t0 = _context18["catch"](3);
          _context18.next = 15;
          return _context18.t0;

        case 15:
          throw _context18.sent;

        case 16:
          _context18.prev = 16;
          _context18.next = 19;
          return 5;

        case 19:
          return _context18.finish(16);

        case 20:
          _context18.next = 26;
          break;

        case 22:
          _context18.prev = 22;
          _context18.t1 = _context18["catch"](2);
          _context18.next = 26;
          return _context18.t1;

        case 26:
          _context18.next = 28;
          return 6;

        case 28:
        case "end":
          return _context18.stop();
      }
    }, _marked13[0], this, [[2, 22], [3, 11, 16, 20]]);
  }

  function usingRaise() {
    return regeneratorRuntime.wrap(function usingRaise$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return 0;

        case 2:
          _context19.prev = 2;
          _context19.prev = 3;
          _context19.next = 6;
          return 1;

        case 6:
          raise(2);
          _context19.next = 9;
          return 3;

        case 9:
          _context19.next = 16;
          break;

        case 11:
          _context19.prev = 11;
          _context19.t0 = _context19["catch"](3);
          _context19.next = 15;
          return _context19.t0;

        case 15:
          throw _context19.sent;

        case 16:
          _context19.prev = 16;
          _context19.next = 19;
          return 5;

        case 19:
          return _context19.finish(16);

        case 20:
          _context19.next = 26;
          break;

        case 22:
          _context19.prev = 22;
          _context19.t1 = _context19["catch"](2);
          _context19.next = 26;
          return _context19.t1;

        case 26:
          _context19.next = 28;
          return 6;

        case 28:
        case "end":
          return _context19.stop();
      }
    }, _marked13[1], this, [[2, 22], [3, 11, 16, 20]]);
  }

  it("should statically catch and then finalize", function () {
    check(usingThrow(), [0, 1, 2, 5, 3, 6]);
  });

  it("should dynamically catch and then finalize", function () {
    check(usingRaise(), [0, 1, 2, 5, 3, 6]);
  });

  it("should execute catch and finally blocks at most once", function () {
    var _marked14 = [gen].map(regeneratorRuntime.mark);

    var error = new Error();

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _context20.t0 = 1;
            _context20.next = _context20.t0 === 1 ? 4 : 7;
            break;

          case 4:
            _context20.next = 6;
            return "a";

          case 6:
            return _context20.abrupt("break", 8);

          case 7:
            return _context20.abrupt("break", 8);

          case 8:
            throw error;

          case 11:
            _context20.prev = 11;
            _context20.t1 = _context20["catch"](0);

            assert.strictEqual(_context20.t1, error);
            _context20.next = 16;
            return "b";

          case 16:
            _context20.next = 18;
            return "c";

          case 18:
            return _context20.abrupt("break", 20);

          case 19:
            if (false) {
              _context20.next = 16;
              break;
            }

          case 20:
            _context20.next = 22;
            return "d";

          case 22:
            return _context20.abrupt("break", 24);

          case 23:
            if (false) {
              _context20.next = 16;
              break;
            }

          case 24:
            _context20.next = 26;
            return "e";

          case 26:
            _context20.prev = 26;
            _context20.next = 29;
            return "f";

          case 29:
            return _context20.finish(26);

          case 30:
          case "end":
            return _context20.stop();
        }
      }, _marked14[0], this, [[0, 11, 26, 30]]);
    }

    check(gen(), ["a", "b", "c", "d", "e", "f"]);
  });

  it("should handle backwards jumps in labeled loops", function () {
    var _marked15 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      var firstTime;
      return regeneratorRuntime.wrap(function gen$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            firstTime = true;

          case 1:
            if (!true) {
              _context21.next = 31;
              break;
            }

            _context21.next = 4;
            return 0;

          case 4:
            _context21.prev = 4;

          case 5:
            if (!true) {
              _context21.next = 20;
              break;
            }

            _context21.next = 8;
            return 1;

          case 8:
            if (!firstTime) {
              _context21.next = 15;
              break;
            }

            firstTime = false;
            _context21.next = 12;
            return 2;

          case 12:
            return _context21.abrupt("continue", 1);

          case 15:
            _context21.next = 17;
            return 3;

          case 17:
            return _context21.abrupt("break", 20);

          case 18:
            _context21.next = 5;
            break;

          case 20:
            _context21.next = 22;
            return 4;

          case 22:
            return _context21.abrupt("break", 31);

          case 23:
            _context21.prev = 23;
            _context21.next = 26;
            return 5;

          case 26:
            return _context21.finish(23);

          case 27:
            _context21.next = 29;
            return 6;

          case 29:
            _context21.next = 1;
            break;

          case 31:
            _context21.next = 33;
            return 7;

          case 33:
          case "end":
            return _context21.stop();
        }
      }, _marked15[0], this, [[4,, 23, 27]]);
    }

    check(gen(), [0, 1, 2, 5, 0, 1, 3, 4, 5, 7]);
  });

  it("should handle loop continue statements properly", function () {
    var _marked16 = [gen].map(regeneratorRuntime.mark);

    var error = new Error("thrown");
    var markers = [];

    function gen() {
      var c;
      return regeneratorRuntime.wrap(function gen$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            c = 2;

          case 1:
            if (!(c > 0)) {
              _context22.next = 20;
              break;
            }

            _context22.prev = 2;

            markers.push("try");
            _context22.next = 6;
            return c;

          case 6:
            _context22.next = 13;
            break;

          case 8:
            _context22.prev = 8;
            _context22.t0 = _context22["catch"](2);

            assert.strictEqual(_context22.t0, error);
            markers.push("catch");
            return _context22.abrupt("continue", 1);

          case 13:
            _context22.prev = 13;

            markers.push("finally");
            return _context22.finish(13);

          case 16:
            markers.push("decrement");
            --c;
            _context22.next = 1;
            break;

          case 20:
          case "end":
            return _context22.stop();
        }
      }, _marked16[0], this, [[2, 8, 13, 16]]);
    }

    var g = gen();

    assert.deepEqual(g.next(), { value: 2, done: false });
    assert.deepEqual(g.throw(error), { value: 2, done: false });
    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: void 0, done: true });

    assert.deepEqual(markers, ["try", "catch", "finally", "try", "finally", "decrement", "try", "finally", "decrement"]);
  });
});

describe("dynamic exception", function () {
  var _marked17 = [gen].map(regeneratorRuntime.mark);

  function gen(x, fname) {
    return regeneratorRuntime.wrap(function gen$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          return _context23.abrupt("return", fns[fname](x));

        case 4:
          _context23.prev = 4;
          _context23.t0 = _context23["catch"](0);
          _context23.next = 8;
          return _context23.t0;

        case 8:
        case "end":
          return _context23.stop();
      }
    }, _marked17[0], this, [[0, 4]]);
  }

  var fns = {
    f: function (x) {
      throw x;
    },

    g: function (x) {
      return x;
    }
  };

  it("should be dispatched correctly", function () {
    check(gen("asdf", "f"), ["asdf"]);
    check(gen("asdf", "g"), [], "asdf");
  });
});

describe("nested finally blocks", function () {
  var _marked18 = [usingThrow, usingRaise].map(regeneratorRuntime.mark);

  function usingThrow() {
    return regeneratorRuntime.wrap(function usingThrow$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.prev = 1;
          _context24.prev = 2;
          throw "thrown";

        case 4:
          _context24.prev = 4;
          _context24.next = 7;
          return 1;

        case 7:
          return _context24.finish(4);

        case 8:
          _context24.next = 14;
          break;

        case 10:
          _context24.prev = 10;
          _context24.t0 = _context24["catch"](1);
          _context24.next = 14;
          return _context24.t0;

        case 14:
          _context24.prev = 14;
          _context24.next = 17;
          return 2;

        case 17:
          return _context24.finish(14);

        case 18:
          _context24.prev = 18;
          _context24.next = 21;
          return 3;

        case 21:
          return _context24.finish(18);

        case 22:
        case "end":
          return _context24.stop();
      }
    }, _marked18[0], this, [[0,, 18, 22], [1, 10, 14, 18], [2,, 4, 8]]);
  }

  function usingRaise() {
    return regeneratorRuntime.wrap(function usingRaise$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          _context25.prev = 1;
          _context25.prev = 2;

          raise("thrown");

        case 4:
          _context25.prev = 4;
          _context25.next = 7;
          return 1;

        case 7:
          return _context25.finish(4);

        case 8:
          _context25.next = 14;
          break;

        case 10:
          _context25.prev = 10;
          _context25.t0 = _context25["catch"](1);
          _context25.next = 14;
          return _context25.t0;

        case 14:
          _context25.prev = 14;
          _context25.next = 17;
          return 2;

        case 17:
          return _context25.finish(14);

        case 18:
          _context25.prev = 18;
          _context25.next = 21;
          return 3;

        case 21:
          return _context25.finish(18);

        case 22:
        case "end":
          return _context25.stop();
      }
    }, _marked18[1], this, [[0,, 18, 22], [1, 10, 14, 18], [2,, 4, 8]]);
  }

  it("should statically execute in order", function () {
    check(usingThrow(), [1, "thrown", 2, 3]);
  });

  it("should dynamically execute in order", function () {
    check(usingRaise(), [1, "thrown", 2, 3]);
  });
});

describe("for-in loop generator", function () {
  it("should handle the simple case", function () {
    var _marked19 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      var count, obj, key;
      return regeneratorRuntime.wrap(function gen$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            count = 0;
            obj = { foo: 1, bar: 2 };
            _context26.t0 = regeneratorRuntime.keys(obj);

          case 3:
            if ((_context26.t1 = _context26.t0()).done) {
              _context26.next = 11;
              break;
            }

            key = _context26.t1.value;

            assert(obj.hasOwnProperty(key), key + " must be own property");
            _context26.next = 8;
            return [key, obj[key]];

          case 8:
            count += 1;
            _context26.next = 3;
            break;

          case 11:
            return _context26.abrupt("return", count);

          case 12:
          case "end":
            return _context26.stop();
        }
      }, _marked19[0], this);
    }

    check(gen(), [["foo", 1], ["bar", 2]], 2);
  });

  it("should handle break in loop", function () {
    var _marked20 = [gen].map(regeneratorRuntime.mark);

    function gen(obj) {
      var count, key;
      return regeneratorRuntime.wrap(function gen$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            count = 0;
            _context27.next = 3;
            return "why not";

          case 3:
            _context27.t0 = regeneratorRuntime.keys(obj);

          case 4:
            if ((_context27.t1 = _context27.t0()).done) {
              _context27.next = 14;
              break;
            }

            key = _context27.t1.value;

            if (!obj.hasOwnProperty(key)) {
              _context27.next = 12;
              break;
            }

            if (!(key === "skip")) {
              _context27.next = 9;
              break;
            }

            return _context27.abrupt("break", 14);

          case 9:
            count += 1;
            _context27.next = 12;
            return [key, obj[key]];

          case 12:
            _context27.next = 4;
            break;

          case 14:
            return _context27.abrupt("return", count);

          case 15:
          case "end":
            return _context27.stop();
        }
      }, _marked20[0], this);
    }

    check(gen({ a: 1, b: 2, skip: 3, c: 4 }), ["why not", ["a", 1], ["b", 2]], 2);
  });

  it("should handle property deletion in loop", function () {
    var _marked21 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      var count, obj, key;
      return regeneratorRuntime.wrap(function gen$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
          case 0:
            count = 0;
            obj = { foo: 1, bar: 2 };
            _context28.t0 = regeneratorRuntime.keys(obj);

          case 3:
            if ((_context28.t1 = _context28.t0()).done) {
              _context28.next = 12;
              break;
            }

            key = _context28.t1.value;

            assert(obj.hasOwnProperty(key), key + " must be own property");
            _context28.next = 8;
            return [key, obj[key]];

          case 8:
            delete obj.bar;
            count += 1;
            _context28.next = 3;
            break;

          case 12:
            return _context28.abrupt("return", count);

          case 13:
          case "end":
            return _context28.stop();
        }
      }, _marked21[0], this);
    }

    check(gen(), [["foo", 1]], 1);
  });

  it("should loop over inherited properties", function () {
    var _marked22 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      var count, Foo, foo, key;
      return regeneratorRuntime.wrap(function gen$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            Foo = function Foo() {
              this.baz = 1;
            };

            count = 0;

            Foo.prototype.bar = 2;

            foo = new Foo();
            _context29.t0 = regeneratorRuntime.keys(foo);

          case 5:
            if ((_context29.t1 = _context29.t0()).done) {
              _context29.next = 12;
              break;
            }

            key = _context29.t1.value;
            _context29.next = 9;
            return [key, foo[key]];

          case 9:
            count += 1;
            _context29.next = 5;
            break;

          case 12:
            return _context29.abrupt("return", count);

          case 13:
          case "end":
            return _context29.stop();
        }
      }, _marked22[0], this);
    }

    check(gen(), [["baz", 1], ["bar", 2]], 2);
  });

  it("should handle risky object expressions", function () {
    var _marked23 = [gen].map(regeneratorRuntime.mark);

    function a(sent) {
      assert.strictEqual(sent, 1);
      a.called = true;
    }

    function b(sent) {
      assert.strictEqual(sent, 2);
      b.called = true;
      return { callee: b };
    }

    function gen() {
      var key;
      return regeneratorRuntime.wrap(function gen$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            assert.ok(!a.called);
            assert.ok(!b.called);
            _context30.next = 4;
            return 0;

          case 4:
            _context30.t1 = _context30.sent;
            a(_context30.t1);
            _context30.next = 8;
            return 1;

          case 8:
            _context30.t2 = _context30.sent;
            _context30.t0 = regeneratorRuntime.keys(b(_context30.t2));

          case 10:
            if ((_context30.t3 = _context30.t0()).done) {
              _context30.next = 21;
              break;
            }

            key = _context30.t3.value;

            assert.ok(a.called);
            assert.ok(b.called);
            _context30.t4 = assert;
            _context30.next = 17;
            return key;

          case 17:
            _context30.t5 = _context30.sent;

            _context30.t4.strictEqual.call(_context30.t4, _context30.t5, 3);

            _context30.next = 10;
            break;

          case 21:
            _context30.t6 = regeneratorRuntime.keys((a(1), { foo: "foo", bar: "bar" }));

          case 22:
            if ((_context30.t7 = _context30.t6()).done) {
              _context30.next = 28;
              break;
            }

            key = _context30.t7.value;
            _context30.next = 26;
            return key;

          case 26:
            _context30.next = 22;
            break;

          case 28:
          case "end":
            return _context30.stop();
        }
      }, _marked23[0], this);
    }

    check(gen(), [0, 1, "callee", "foo", "bar"]);
  });

  it("should allow non-Identifier left-hand expressions", function () {
    var _marked24 = [gen].map(regeneratorRuntime.mark);

    var obj = {};
    var baz = { a: 1, b: 2, c: 3 };
    var markers = [];

    function foo() {
      markers.push("called foo");
      return obj;
    }

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
          case 0:
            _context31.t0 = regeneratorRuntime.keys(baz);

          case 1:
            if ((_context31.t1 = _context31.t0()).done) {
              _context31.next = 8;
              break;
            }

            foo().bar = _context31.t1.value;

            markers.push(obj.bar);
            _context31.next = 6;
            return obj.bar;

          case 6:
            _context31.next = 1;
            break;

          case 8:
          case "end":
            return _context31.stop();
        }
      }, _marked24[0], this);
    }

    check(gen(), ["a", "b", "c"]);

    assert.deepEqual(markers, ["called foo", "a", "called foo", "b", "called foo", "c"]);
  });
});

describe("yield chain", function () {
  var _marked25 = [gen].map(regeneratorRuntime.mark);

  function gen(n) {
    return regeneratorRuntime.wrap(function gen$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return n;

        case 2:
          _context32.next = 4;
          return _context32.sent;

        case 4:
          _context32.next = 6;
          return _context32.sent;

        case 6:
          _context32.next = 8;
          return _context32.sent;

        case 8:
          return _context32.abrupt("return", _context32.sent);

        case 9:
        case "end":
          return _context32.stop();
      }
    }, _marked25[0], this);
  }

  it("should have correct associativity", function () {
    check(gen(5), [5, 1, 2, 3], 4);
    check(gen("asdf"), ["asdf", 1, 2, 3], 4);
  });
});

describe("object literal generator", function () {
  var _marked26 = [gen].map(regeneratorRuntime.mark);

  function gen(a, b) {
    return regeneratorRuntime.wrap(function gen$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          _context33.t0 = a;
          _context33.next = 3;
          return a;

        case 3:
          _context33.t1 = _context33.sent;
          _context33.t2 = _context33.t0 - _context33.t1;
          _context33.next = 7;
          return b;

        case 7:
          _context33.t3 = _context33.sent;
          _context33.next = 10;
          return {
            a: _context33.t2,
            b: _context33.t3
          };

        case 10:
        case "end":
          return _context33.stop();
      }
    }, _marked26[0], this);
  }

  it("should yield the correct object", function () {
    check(gen(1, 2), [1, 2, { a: 0, b: 2 }]);
    check(gen(4, 2), [4, 2, { a: 3, b: 2 }]);
  });
});

describe("switch statement generator", function () {
  var _marked27 = [gen].map(regeneratorRuntime.mark);

  function gen(a) {
    return regeneratorRuntime.wrap(function gen$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return a;

        case 2:
          _context34.t0 = _context34.sent;
          _context34.t1 = _context34.t0;
          _context34.next = 6;
          return "x";

        case 6:
          _context34.t2 = _context34.sent;
          _context34.t3 = a;
          _context34.t4 = _context34.t2 - _context34.t3;

          if (!(_context34.t1 === _context34.t4)) {
            _context34.next = 13;
            break;
          }

          _context34.t5 = 27;
          _context34.next = 25;
          break;

        case 13:
          _context34.t6 = _context34.t0;
          _context34.next = 16;
          return "y";

        case 16:
          _context34.t7 = _context34.sent;
          _context34.t8 = a;
          _context34.t9 = _context34.t7 - _context34.t8;

          if (!(_context34.t6 === _context34.t9)) {
            _context34.next = 23;
            break;
          }

          _context34.t10 = 28;
          _context34.next = 24;
          break;

        case 23:
          _context34.t10 = 29;

        case 24:
          _context34.t5 = _context34.t10;

        case 25:
          _context34.next = _context34.t5;
          break;

        case 27:
          return _context34.abrupt("return", "first case");

        case 28:
          return _context34.abrupt("return", "second case");

        case 29:
        case "end":
          return _context34.stop();
      }
    }, _marked27[0], this);
  }

  it("should jump to the correct cases", function () {
    check(gen(1), [1, "x"], "first case");
    check(gen(2), [2, "x", "y"], "second case");
  });
});

describe("infinite sequence generator", function () {
  var _marked28 = [gen, limit].map(regeneratorRuntime.mark);

  function gen(start, step) {
    return regeneratorRuntime.wrap(function gen$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          step = step || 1;

        case 1:
          if (!true) {
            _context35.next = 7;
            break;
          }

          _context35.next = 4;
          return start;

        case 4:
          start += step;
          _context35.next = 1;
          break;

        case 7:
        case "end":
          return _context35.stop();
      }
    }, _marked28[0], this);
  }

  function limit(g, stop) {
    var info;
    return regeneratorRuntime.wrap(function limit$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          if (!true) {
            _context36.next = 14;
            break;
          }

          info = g.next();

          if (!info.done) {
            _context36.next = 6;
            break;
          }

          return _context36.abrupt("return");

        case 6:
          if (!(info.value < stop)) {
            _context36.next = 11;
            break;
          }

          _context36.next = 9;
          return info.value;

        case 9:
          _context36.next = 12;
          break;

        case 11:
          return _context36.abrupt("return");

        case 12:
          _context36.next = 0;
          break;

        case 14:
        case "end":
          return _context36.stop();
      }
    }, _marked28[1], this);
  }

  it("should generate a lot of plausible values", function () {
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

  it("should allow limiting", function () {
    check(limit(gen(10, 3), 20), [10, 13, 16, 19]);
  });
});

describe("generator function expression", function () {
  it("should behave just like a declared generator", function () {
    check(regeneratorRuntime.mark(function _callee3(x, y) {
      return regeneratorRuntime.wrap(function _callee3$(_context37) {
        while (1) switch (_context37.prev = _context37.next) {
          case 0:
            _context37.next = 2;
            return x;

          case 2:
            _context37.next = 4;
            return y;

          case 4:
            _context37.next = 6;
            return x + y;

          case 6:
            return _context37.abrupt("return", x * y);

          case 7:
          case "end":
            return _context37.stop();
        }
      }, _callee3, this);
    })(3, 7), [3, 7, 10], 21);
  });
});

describe("generator reentry attempt", function () {
  var _marked29 = [gen].map(regeneratorRuntime.mark);

  function gen(x) {
    return regeneratorRuntime.wrap(function gen$(_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          _context38.prev = 0;
          _context38.next = 3;
          return x;

        case 3:
          _context38.t0 = x;

          _context38.sent.next(_context38.t0);

          _context38.next = 11;
          break;

        case 7:
          _context38.prev = 7;
          _context38.t1 = _context38["catch"](0);
          _context38.next = 11;
          return _context38.t1;

        case 11:
          return _context38.abrupt("return", x + 1);

        case 12:
        case "end":
          return _context38.stop();
      }
    }, _marked29[0], this, [[0, 7]]);
  }

  it("should complain with a TypeError", function () {
    var g = gen(3);
    assert.deepEqual(g.next(), { value: 3, done: false });
    var complaint = g.next(g); // Sending the generator to itself.
    assert.ok(complaint.value instanceof Error);
    assert.strictEqual(complaint.value.message, "Generator is already running");
    assert.deepEqual(g.next(), { value: 4, done: true });
  });
});

describe("completed generator", function () {
  var _marked30 = [gen].map(regeneratorRuntime.mark);

  function gen() {
    return regeneratorRuntime.wrap(function gen$(_context39) {
      while (1) switch (_context39.prev = _context39.next) {
        case 0:
          return _context39.abrupt("return", "ALL DONE");

        case 1:
        case "end":
          return _context39.stop();
      }
    }, _marked30[0], this);
  }

  (runningInTranslation ? it : xit)("should refuse to resume", function () {
    var g = gen();

    assert.deepEqual(g.next(), {
      value: "ALL DONE", done: true
    });

    assertAlreadyFinished(g);
  });
});

describe("delegated yield", function () {
  it("should delegate correctly", function () {
    var _marked31 = [gen].map(regeneratorRuntime.mark);

    function gen(condition) {
      return regeneratorRuntime.wrap(function gen$(_context40) {
        while (1) switch (_context40.prev = _context40.next) {
          case 0:
            _context40.next = 2;
            return 0;

          case 2:
            if (!condition) {
              _context40.next = 8;
              break;
            }

            _context40.next = 5;
            return 1;

          case 5:
            return _context40.delegateYield(gen(false), "t0", 6);

          case 6:
            _context40.next = 8;
            return 2;

          case 8:
            _context40.next = 10;
            return 3;

          case 10:
          case "end":
            return _context40.stop();
        }
      }, _marked31[0], this);
    }

    check(gen(true), [0, 1, 0, 3, 2, 3]);
    check(gen(false), [0, 3]);
  });

  it("should cope with empty delegatees", function () {
    var _marked32 = [gen].map(regeneratorRuntime.mark);

    function gen(condition) {
      return regeneratorRuntime.wrap(function gen$(_context41) {
        while (1) switch (_context41.prev = _context41.next) {
          case 0:
            if (!condition) {
              _context41.next = 6;
              break;
            }

            _context41.next = 3;
            return 0;

          case 3:
            return _context41.delegateYield(gen(false), "t0", 4);

          case 4:
            _context41.next = 6;
            return 1;

          case 6:
          case "end":
            return _context41.stop();
        }
      }, _marked32[0], this);
    }

    check(gen(true), [0, 1]);
    check(gen(false), []);
  });

  it("should support deeper nesting", function () {
    var _marked33 = [outer, middle, inner].map(regeneratorRuntime.mark);

    function outer(n) {
      return regeneratorRuntime.wrap(function outer$(_context42) {
        while (1) switch (_context42.prev = _context42.next) {
          case 0:
            _context42.next = 2;
            return n;

          case 2:
            return _context42.delegateYield(middle(n - 1, inner(n + 10)), "t0", 3);

          case 3:
            _context42.next = 5;
            return n + 1;

          case 5:
          case "end":
            return _context42.stop();
        }
      }, _marked33[0], this);
    }

    function middle(n, plusTen) {
      return regeneratorRuntime.wrap(function middle$(_context43) {
        while (1) switch (_context43.prev = _context43.next) {
          case 0:
            _context43.next = 2;
            return n;

          case 2:
            return _context43.delegateYield(inner(n - 1), "t0", 3);

          case 3:
            _context43.next = 5;
            return n + 1;

          case 5:
            return _context43.delegateYield(plusTen, "t1", 6);

          case 6:
          case "end":
            return _context43.stop();
        }
      }, _marked33[1], this);
    }

    function inner(n) {
      return regeneratorRuntime.wrap(function inner$(_context44) {
        while (1) switch (_context44.prev = _context44.next) {
          case 0:
            _context44.next = 2;
            return n;

          case 2:
          case "end":
            return _context44.stop();
        }
      }, _marked33[2], this);
    }

    check(outer(5), [5, 4, 3, 5, 15, 6]);
  });

  it("should pass sent values through", function () {
    var _marked34 = [outer, inner].map(regeneratorRuntime.mark);

    function outer(n) {
      return regeneratorRuntime.wrap(function outer$(_context45) {
        while (1) switch (_context45.prev = _context45.next) {
          case 0:
            return _context45.delegateYield(inner(n << 1), "t0", 1);

          case 1:
            _context45.next = 3;
            return "zxcv";

          case 3:
          case "end":
            return _context45.stop();
        }
      }, _marked34[0], this);
    }

    function inner(n) {
      return regeneratorRuntime.wrap(function inner$(_context46) {
        while (1) switch (_context46.prev = _context46.next) {
          case 0:
            _context46.next = 2;
            return n;

          case 2:
            _context46.next = 4;
            return _context46.sent;

          case 4:
            _context46.next = 6;
            return _context46.sent;

          case 6:
            return _context46.abrupt("return", _context46.sent);

          case 7:
          case "end":
            return _context46.stop();
        }
      }, _marked34[1], this);
    }

    var g = outer(3);
    assert.deepEqual(g.next(), { value: 6, done: false });
    assert.deepEqual(g.next(1), { value: 1, done: false });
    assert.deepEqual(g.next(2), { value: 2, done: false });
    assert.deepEqual(g.next(4), { value: "zxcv", done: false });
    assert.deepEqual(g.next(5), { value: void 0, done: true });
  });

  it("should be governed by enclosing try statements", function () {
    var _marked35 = [outer, inner].map(regeneratorRuntime.mark);

    var error = new Error("thrown");

    function outer(n) {
      return regeneratorRuntime.wrap(function outer$(_context47) {
        while (1) switch (_context47.prev = _context47.next) {
          case 0:
            _context47.prev = 0;
            _context47.next = 3;
            return 0;

          case 3:
            return _context47.delegateYield(inner(n), "t0", 4);

          case 4:
            _context47.next = 6;
            return 1;

          case 6:
            _context47.next = 12;
            break;

          case 8:
            _context47.prev = 8;
            _context47.t1 = _context47["catch"](0);
            _context47.next = 12;
            return _context47.t1.message;

          case 12:
            _context47.next = 14;
            return 4;

          case 14:
          case "end":
            return _context47.stop();
        }
      }, _marked35[0], this, [[0, 8]]);
    }

    function inner(n) {
      return regeneratorRuntime.wrap(function inner$(_context48) {
        while (1) switch (_context48.prev = _context48.next) {
          case 0:
            if (!(n-- > 0)) {
              _context48.next = 9;
              break;
            }

            _context48.prev = 1;

            if (n === 3) {
              raise(error);
            }

          case 3:
            _context48.prev = 3;
            _context48.next = 6;
            return n;

          case 6:
            return _context48.finish(3);

          case 7:
            _context48.next = 0;
            break;

          case 9:
          case "end":
            return _context48.stop();
        }
      }, _marked35[1], this, [[1,, 3, 7]]);
    }

    check(outer(3), [0, 2, 1, 0, 1, 4]);
    check(outer(5), [0, 4, 3, "thrown", 4]);
  });

  it("should dispatch .thrown exceptions correctly", function () {
    var _marked36 = [gen, inner].map(regeneratorRuntime.mark);

    var count = 0;

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context49) {
        while (1) switch (_context49.prev = _context49.next) {
          case 0:
            return _context49.delegateYield(inner(), "t0", 1);

          case 1:
            _context49.prev = 1;
            return _context49.delegateYield(inner(), "t1", 3);

          case 3:
            _context49.next = 7;
            break;

          case 5:
            _context49.prev = 5;
            _context49.t2 = _context49["catch"](1);

          case 7:
            return _context49.delegateYield(inner(), "t3", 8);

          case 8:
            return _context49.abrupt("return", _context49.t3);

          case 9:
          case "end":
            return _context49.stop();
        }
      }, _marked36[0], this, [[1, 5]]);
    }

    function inner() {
      return regeneratorRuntime.wrap(function inner$(_context50) {
        while (1) switch (_context50.prev = _context50.next) {
          case 0:
            _context50.next = 2;
            return count++;

          case 2:
            return _context50.abrupt("return", _context50.sent);

          case 3:
          case "end":
            return _context50.stop();
        }
      }, _marked36[1], this);
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
      done: false
    });

    assert.deepEqual(g.next("sent"), {
      value: "sent",
      done: true
    });
  });

  it("should call .return methods of delegate iterators", function () {
    var _marked37 = [gen].map(regeneratorRuntime.mark);

    var throwee = new Error("argument to gen.throw");
    var thrownFromThrow = new Error("thrown from throw method");
    var thrownFromReturn = new Error("thrown from return method");

    function gen(delegate) {
      return regeneratorRuntime.wrap(function gen$(_context51) {
        while (1) switch (_context51.prev = _context51.next) {
          case 0:
            _context51.prev = 0;
            return _context51.delegateYield(delegate, "t0", 2);

          case 2:
            return _context51.abrupt("return", _context51.t0);

          case 5:
            _context51.prev = 5;
            _context51.t1 = _context51["catch"](0);
            return _context51.abrupt("return", _context51.t1);

          case 8:
          case "end":
            return _context51.stop();
        }
      }, _marked37[0], this, [[0, 5]]);
    }

    function check(throwMethod, returnMethod) {
      var throwCalled = false;
      var returnCalled = false;
      var count = 0;
      var iterator = {
        next: function () {
          return { value: count++, done: false };
        }
      };

      iterator[iteratorSymbol] = function () {
        return this;
      };

      if (throwMethod) {
        iterator["throw"] = function () {
          throwCalled = true;
          return throwMethod.apply(this, arguments);
        };
      }

      if (returnMethod) {
        iterator["return"] = function () {
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

    var checkResult = check(undefined, function () {
      throw thrownFromReturn;
    });
    if (runningInTranslation) {
      // BUG: Node v0.11 and v0.12 neglect to call .return here.
      assert.strictEqual(checkResult.throwResult.value, thrownFromReturn);
    } else {
      // This is the TypeError that results from trying to call the
      // undefined .throw method of the iterator.
      assert.ok(checkResult.throwResult.value instanceof TypeError);
    }
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, false);
    // BUG: Node v0.11 and v0.12 neglect to call .return here.
    assert.strictEqual(checkResult.returnCalled, runningInTranslation);

    checkResult = check(undefined, function () {
      return { value: "from return", done: true };
    });
    assert.notStrictEqual(checkResult.throwResult.value, throwee);
    // This is the TypeError that results from trying to call the
    // undefined .throw method of the iterator.
    assert.ok(checkResult.throwResult.value instanceof TypeError);
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, false);
    // BUG: Node v0.11 and v0.12 neglect to call .return here.
    assert.strictEqual(checkResult.returnCalled, runningInTranslation);

    var checkResult = check(function (thrown) {
      return { value: "from throw", done: true };
    }, function () {
      throw thrownFromReturn;
    });
    assert.strictEqual(checkResult.throwResult.value, "from throw");
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, true);
    assert.strictEqual(checkResult.returnCalled, false);

    var checkResult = check(function (thrown) {
      throw thrownFromThrow;
    }, function () {
      throw thrownFromReturn;
    });
    assert.strictEqual(checkResult.throwResult.value, thrownFromThrow);
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, true);
    assert.strictEqual(checkResult.returnCalled, false);

    var checkResult = check(undefined, undefined);
    assert.notStrictEqual(checkResult.throwResult.value, throwee);
    // This is the TypeError that results from trying to call the
    // undefined .throw method of the iterator.
    assert.ok(checkResult.throwResult.value instanceof TypeError);
    assert.strictEqual(checkResult.throwResult.done, true);
    assert.strictEqual(checkResult.throwCalled, false);
    assert.strictEqual(checkResult.returnCalled, false);
  });

  it("should not be required to have a .return method", function () {
    var _marked38 = [gen].map(regeneratorRuntime.mark);

    function gen(delegate) {
      return regeneratorRuntime.wrap(function gen$(_context52) {
        while (1) switch (_context52.prev = _context52.next) {
          case 0:
            return _context52.delegateYield(delegate, "t0", 1);

          case 1:
            return _context52.abrupt("return", _context52.t0);

          case 2:
          case "end":
            return _context52.stop();
        }
      }, _marked38[0], this);
    }

    var inner = range(5);
    var iterator = { next: inner.next.bind(inner) };
    iterator[iteratorSymbol] = function () {
      return this;
    };

    var g = gen(iterator);
    assert.deepEqual(g.next(), { value: 0, done: false });
    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: 2, done: false });

    if (typeof g.return === "function") {
      assert.deepEqual(g.return(-1), { value: -1, done: true });
      assert.deepEqual(g.next(), { value: void 0, done: true });
    }
  });

  (runningInTranslation ? it : xit)("should support any iterable argument", function () {
    var _marked39 = [gen, string].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context53) {
        while (1) switch (_context53.prev = _context53.next) {
          case 0:
            _context53.next = 2;
            return 0;

          case 2:
            _context53.next = 4;
            return "one";

          case 4:
            _context53.t0 = _context53.sent;
            _context53.next = 7;
            return "two";

          case 7:
            _context53.t1 = _context53.sent;
            _context53.next = 10;
            return "three";

          case 10:
            _context53.t2 = _context53.sent;
            return _context53.delegateYield([_context53.t0, _context53.t1, _context53.t2], "t3", 12);

          case 12:
            _context53.next = 14;
            return 5;

          case 14:
          case "end":
            return _context53.stop();
        }
      }, _marked39[0], this);
    }

    check(gen(), [0, "one", "two", "three", 2, 3, 4, 5]);

    function string() {
      return regeneratorRuntime.wrap(function string$(_context54) {
        while (1) switch (_context54.prev = _context54.next) {
          case 0:
            return _context54.delegateYield("asdf", "t0", 1);

          case 1:
            return _context54.abrupt("return", _context54.t0);

          case 2:
          case "end":
            return _context54.stop();
        }
      }, _marked39[1], this);
    }

    check(string(), ["a", "s", "d", "f"]);
  });

  it("should evaluate to the return value of the delegate", function () {
    var _marked40 = [inner, outer].map(regeneratorRuntime.mark);

    function inner() {
      return regeneratorRuntime.wrap(function inner$(_context55) {
        while (1) switch (_context55.prev = _context55.next) {
          case 0:
            _context55.next = 2;
            return 1;

          case 2:
            return _context55.abrupt("return", 2);

          case 3:
          case "end":
            return _context55.stop();
        }
      }, _marked40[0], this);
    }

    function outer(delegate) {
      return regeneratorRuntime.wrap(function outer$(_context56) {
        while (1) switch (_context56.prev = _context56.next) {
          case 0:
            return _context56.delegateYield(delegate, "t0", 1);

          case 1:
            return _context56.abrupt("return", _context56.t0);

          case 2:
          case "end":
            return _context56.stop();
        }
      }, _marked40[1], this);
    }

    check(outer(inner()), [1], 2);

    var arrayDelegate = [3, 4];
    if (!runningInTranslation) {
      // Node v0.11 doesn't know how to turn arrays into iterators over
      // their elements without a little help.
      arrayDelegate = regeneratorRuntime.values(arrayDelegate);
    }
    check(outer(arrayDelegate), [3, 4], void 0); // See issue #143.

    if (!runningInTranslation) {
      return;
    }

    check(outer({
      next: function () {
        return { value: "oyez", done: true };
      }
    }), [], "oyez");
  });

  it("should work as a subexpression", function () {
    var _marked41 = [inner, gen].map(regeneratorRuntime.mark);

    function inner(arg) {
      return regeneratorRuntime.wrap(function inner$(_context57) {
        while (1) switch (_context57.prev = _context57.next) {
          case 0:
            return _context57.abrupt("return", arg);

          case 1:
          case "end":
            return _context57.stop();
        }
      }, _marked41[0], this);
    }

    function gen(delegate) {
      return regeneratorRuntime.wrap(function gen$(_context58) {
        while (1) switch (_context58.prev = _context58.next) {
          case 0:
            return _context58.delegateYield(delegate, "t0", 1);

          case 1:
            _context58.t1 = _context58.t0;
            return _context58.abrupt("return", 1 + _context58.t1);

          case 3:
          case "end":
            return _context58.stop();
        }
      }, _marked41[1], this);
    }

    check(gen(inner(2)), [], 3);
    check(gen(inner(3)), [], 4);

    if (!runningInTranslation) {
      return;
    }

    check(gen({
      next: function () {
        return { value: "foo", done: true };
      }
    }), [], "1foo");
  });
});

describe("function declaration hoisting", function () {
  it("should work even if the declarations are out of order", function () {
    var _marked42 = [gen].map(regeneratorRuntime.mark);

    function gen(n) {
      var increment, halve, decrement;
      return regeneratorRuntime.wrap(function gen$(_context59) {
        while (1) switch (_context59.prev = _context59.next) {
          case 0:
            increment = function increment(x) {
              return x + 1;
            };

            _context59.next = 3;
            return increment(n);

          case 3:
            if (!(n % 2)) {
              _context59.next = 10;
              break;
            }

            decrement = function decrement(x) {
              return x - 1;
            };

            halve = function halve(x) {
              return x >> 1;
            };

            _context59.next = 8;
            return halve(decrement(n));

          case 8:
            _context59.next = 11;
            break;

          case 10:
            // The behavior of function declarations nested inside conditional
            // blocks is notoriously underspecified, and in V8 it appears the
            // halve function is still defined when we take this branch, so
            // "undefine" it for consistency with regenerator semantics.
            halve = void 0;

          case 11:
            _context59.next = 13;
            return typeof halve;

          case 13:
            _context59.next = 15;
            return increment(increment(n));

          case 15:
          case "end":
            return _context59.stop();
        }
      }, _marked42[0], this);
    }

    check(gen(3), [4, 1, "function", 5]);
    check(gen(4), [5, "undefined", 6]);
  });

  it("should work for nested generator function declarations", function () {
    var _marked44 = [outer].map(regeneratorRuntime.mark);

    function outer(n) {
      var _marked43, inner;

      return regeneratorRuntime.wrap(function outer$(_context61) {
        while (1) switch (_context61.prev = _context61.next) {
          case 0:
            inner = function inner(n) {
              return regeneratorRuntime.wrap(function inner$(_context60) {
                while (1) switch (_context60.prev = _context60.next) {
                  case 0:
                    _context60.next = 2;
                    return n - 1;

                  case 2:
                    _context60.next = 4;
                    return n;

                  case 4:
                    _context60.next = 6;
                    return n + 1;

                  case 6:
                    return _context60.abrupt("return", _context60.sent);

                  case 7:
                  case "end":
                    return _context60.stop();
                }
              }, _marked43[0], this);
            };

            _marked43 = [inner].map(regeneratorRuntime.mark);
            _context61.next = 4;
            return 0;

          case 4:
            assert.ok(regeneratorRuntime.isGeneratorFunction(inner));
            return _context61.delegateYield(inner(n), "t0", 6);

          case 6:
            return _context61.abrupt("return", _context61.t0);

          case 7:
          case "end":
            return _context61.stop();
        }
      }, _marked44[0], this);
    }

    check(outer(2), [0, 1, 2, 3], 4);
  });

  it("should not interfere with function rebinding", function () {
    var _marked45 = [toBeRebound].map(regeneratorRuntime.mark);

    function rebindTo(value) {
      var oldValue = toBeRebound;
      toBeRebound = value;
      return oldValue;
    }

    function toBeRebound() {
      var originalValue;
      return regeneratorRuntime.wrap(function toBeRebound$(_context62) {
        while (1) switch (_context62.prev = _context62.next) {
          case 0:
            originalValue = toBeRebound;
            _context62.next = 3;
            return toBeRebound;

          case 3:
            assert.strictEqual(rebindTo(42), originalValue);
            _context62.next = 6;
            return toBeRebound;

          case 6:
            assert.strictEqual(rebindTo("asdf"), 42);
            _context62.next = 9;
            return toBeRebound;

          case 9:
          case "end":
            return _context62.stop();
        }
      }, _marked45[0], this);
    }

    var original = toBeRebound;
    check(toBeRebound(), [original, 42, "asdf"]);

    function attemptToRebind(value) {
      var oldValue = safe;
      safe = value;
      return oldValue;
    }

    var safe = regeneratorRuntime.mark(function safe() {
      var originalValue;
      return regeneratorRuntime.wrap(function safe$(_context63) {
        while (1) switch (_context63.prev = _context63.next) {
          case 0:
            originalValue = safe;
            _context63.next = 3;
            return safe;

          case 3:
            assert.strictEqual(attemptToRebind(42), originalValue);
            _context63.next = 6;
            return safe;

          case 6:
            assert.strictEqual(attemptToRebind("asdf"), 42);
            _context63.next = 9;
            return safe;

          case 9:
          case "end":
            return _context63.stop();
        }
      }, safe, this);
    });

    original = safe;
    check(safe(), [safe, safe, safe]);
  });
});

describe("the arguments object", function () {
  it("should work in simple variadic functions", function () {
    var _marked46 = [sum].map(regeneratorRuntime.mark);

    function sum() {
      var result,
          i,
          _args64 = arguments;
      return regeneratorRuntime.wrap(function sum$(_context64) {
        while (1) switch (_context64.prev = _context64.next) {
          case 0:
            result = 0;
            i = 0;

          case 2:
            if (!(i < _args64.length)) {
              _context64.next = 8;
              break;
            }

            _context64.next = 5;
            return result += _args64[i];

          case 5:
            ++i;
            _context64.next = 2;
            break;

          case 8:
            return _context64.abrupt("return", result);

          case 9:
          case "end":
            return _context64.stop();
        }
      }, _marked46[0], this);
    }

    check(sum(1, 2, 3), [1, 3, 6], 6);
    check(sum(9, -5, 3, 0, 2), [9, 4, 7, 7, 9], 9);
  });

  it("should alias function parameters", function () {
    var _marked47 = [gen].map(regeneratorRuntime.mark);

    function gen(x, y) {
      var temp,
          _args65 = arguments;
      return regeneratorRuntime.wrap(function gen$(_context65) {
        while (1) switch (_context65.prev = _context65.next) {
          case 0:
            _context65.next = 2;
            return x;

          case 2:
            ++_args65[0];
            _context65.next = 5;
            return x;

          case 5:
            _context65.next = 7;
            return y;

          case 7:
            --_args65[1];
            _context65.next = 10;
            return y;

          case 10:
            temp = y;

            y = x;
            x = temp;

            _context65.next = 15;
            return x;

          case 15:
            _context65.next = 17;
            return y;

          case 17:
          case "end":
            return _context65.stop();
        }
      }, _marked47[0], this);
    }

    check(gen(3, 7), [3, 4, 7, 6, 6, 4]);
    check(gen(10, -5), [10, 11, -5, -6, -6, 11]);
  });

  it("should be shadowable by explicit declarations", function () {
    var _marked48 = [asParameter, asVariable].map(regeneratorRuntime.mark);

    function asParameter(x, arguments) {
      var _args66 = arguments;
      return regeneratorRuntime.wrap(function asParameter$(_context66) {
        while (1) switch (_context66.prev = _context66.next) {
          case 0:
            _args66 = _args66 + 1;
            _context66.next = 3;
            return x + _args66;

          case 3:
          case "end":
            return _context66.stop();
        }
      }, _marked48[0], this);
    }

    check(asParameter(4, 5), [10]);
    check(asParameter("asdf", "zxcv"), ["asdfzxcv1"]);

    function asVariable(x) {
      var arguments,
          _args67 = arguments;
      return regeneratorRuntime.wrap(function asVariable$(_context67) {
        while (1) switch (_context67.prev = _context67.next) {
          case 0:
            // TODO References to arguments before the variable declaration
            // seem to see the object instead of the undefined value.
            _args67 = x + 1;
            _context67.next = 3;
            return _args67;

          case 3:
          case "end":
            return _context67.stop();
        }
      }, _marked48[1], this);
    }

    check(asVariable(4), [5]);
    check(asVariable("asdf"), ["asdf1"]);
  });

  it("should not get confused by properties", function () {
    var _marked49 = [gen].map(regeneratorRuntime.mark);

    function gen(args) {
      var obj;
      return regeneratorRuntime.wrap(function gen$(_context68) {
        while (1) switch (_context68.prev = _context68.next) {
          case 0:
            obj = { arguments: args };
            _context68.next = 3;
            return obj.arguments;

          case 3:
            obj.arguments = "oyez";
            _context68.next = 6;
            return obj;

          case 6:
          case "end":
            return _context68.stop();
        }
      }, _marked49[0], this);
    }

    check(gen(42), [42, { arguments: "oyez" }]);
  });

  it("supports .callee", function () {
    var _marked50 = [gen].map(regeneratorRuntime.mark);

    function gen(doYield) {
      var _args69 = arguments;
      return regeneratorRuntime.wrap(function gen$(_context69) {
        while (1) switch (_context69.prev = _context69.next) {
          case 0:
            _context69.next = 2;
            return 1;

          case 2:
            if (!doYield) {
              _context69.next = 7;
              break;
            }

            _context69.next = 5;
            return 2;

          case 5:
            _context69.next = 12;
            break;

          case 7:
            _context69.next = 9;
            return 3;

          case 9:
            return _context69.delegateYield(_args69.callee(true), "t0", 10);

          case 10:
            _context69.next = 12;
            return 4;

          case 12:
            _context69.next = 14;
            return 5;

          case 14:
          case "end":
            return _context69.stop();
        }
      }, _marked50[0], this);
    }

    check(gen(false), [1, 3, 1, 2, 5, 4, 5]);
  });
});

describe("catch parameter shadowing", function () {
  it("should leave outer variables unmodified", function () {
    var _marked51 = [gen].map(regeneratorRuntime.mark);

    function gen(x) {
      var y;
      return regeneratorRuntime.wrap(function gen$(_context70) {
        while (1) switch (_context70.prev = _context70.next) {
          case 0:
            y = x + 1;
            _context70.prev = 1;
            throw x + 2;

          case 5:
            _context70.prev = 5;
            _context70.t0 = _context70["catch"](1);
            _context70.next = 9;
            return _context70.t0;

          case 9:
            _context70.t0 += 1;
            _context70.next = 12;
            return _context70.t0;

          case 12:
            _context70.next = 14;
            return x;

          case 14:
            _context70.prev = 14;
            throw x + 3;

          case 18:
            _context70.prev = 18;
            _context70.t1 = _context70["catch"](14);
            _context70.next = 22;
            return _context70.t1;

          case 22:
            _context70.t1 *= 2;
            _context70.next = 25;
            return _context70.t1;

          case 25:
            _context70.next = 27;
            return y;

          case 27:
          case "end":
            return _context70.stop();
        }
      }, _marked51[0], this, [[1, 5], [14, 18]]);
    }

    check(gen(1), [3, 4, 1, 4, 8, 2]);
    check(gen(2), [4, 5, 2, 5, 10, 3]);
  });

  it("should not replace variables defined in inner scopes", function () {
    var _marked52 = [gen].map(regeneratorRuntime.mark);

    function gen(x) {
      return regeneratorRuntime.wrap(function gen$(_context71) {
        while (1) switch (_context71.prev = _context71.next) {
          case 0:
            _context71.prev = 0;
            throw x;

          case 4:
            _context71.prev = 4;
            _context71.t0 = _context71["catch"](0);
            _context71.next = 8;
            return _context71.t0;

          case 8:
            _context71.next = 10;
            return (function (x) {
              return x += 1;
            })(_context71.t0 + 1);

          case 10:
            _context71.next = 12;
            return (function () {
              var x = arguments[0];
              return x * 2;
            })(_context71.t0 + 2);

          case 12:
            _context71.next = 14;
            return (function () {
              function notCalled(x) {
                throw x;
              }

              _context71.t0 >>= 1;
              return _context71.t0;
            })();

          case 14:
            _context71.next = 16;
            return _context71.t0 -= 1;

          case 16:
            _context71.next = 18;
            return x;

          case 18:
          case "end":
            return _context71.stop();
        }
      }, _marked52[0], this, [[0, 4]]);
    }

    check(gen(10), [10, 12, 24, 5, 4, 10]);
    check(gen(11), [11, 13, 26, 5, 4, 11]);
  });

  it("should allow nested catch parameters of the same name", function () {
    var _marked53 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context72) {
        while (1) switch (_context72.prev = _context72.next) {
          case 0:
            _context72.prev = 0;

            raise("e1");
            _context72.next = 18;
            break;

          case 4:
            _context72.prev = 4;
            _context72.t0 = _context72["catch"](0);
            _context72.next = 8;
            return _context72.t0;

          case 8:
            _context72.prev = 8;

            raise("e2");
            _context72.next = 16;
            break;

          case 12:
            _context72.prev = 12;
            _context72.t1 = _context72["catch"](8);
            _context72.next = 16;
            return _context72.t1;

          case 16:
            _context72.next = 18;
            return _context72.t0;

          case 18:
          case "end":
            return _context72.stop();
        }
      }, _marked53[0], this, [[0, 4], [8, 12]]);
    }

    check(gen(), ["e1", "e2", "e1"]);
  });

  it("should not interfere with non-referential identifiers", function () {
    var _marked54 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context73) {
        while (1) switch (_context73.prev = _context73.next) {
          case 0:
            _context73.prev = 0;
            _context73.next = 3;
            return 1;

          case 3:
            raise(new Error("oyez"));
            _context73.next = 6;
            return 2;

          case 6:
            _context73.next = 15;
            break;

          case 8:
            _context73.prev = 8;
            _context73.t0 = _context73["catch"](0);
            _context73.next = 12;
            return 3;

          case 12:
            _context73.t0.e = "e.e";
            _context73.t0[_context73.t0.message] = "e.oyez";
            return _context73.abrupt("return", {
              e: _context73.t0,
              identity: function (x) {
                var e = x;
                return e;
              }
            });

          case 15:
            _context73.next = 17;
            return 4;

          case 17:
          case "end":
            return _context73.stop();
        }
      }, _marked54[0], this, [[0, 8]]);
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

describe("empty while loops", function () {
  it("should be preserved in generated code", function () {
    var _marked55 = [gen].map(regeneratorRuntime.mark);

    function gen(x) {
      return regeneratorRuntime.wrap(function gen$(_context74) {
        while (1) switch (_context74.prev = _context74.next) {
          case 0:
            while (x) {
              // empty while loop
            }

            do {
              // empty do-while loop
            } while (x);

            return _context74.abrupt("return", gen.toString());

          case 3:
          case "end":
            return _context74.stop();
        }
      }, _marked55[0], this);
    }

    var info = gen(false).next();
    assert.strictEqual(info.done, true);
    assert.ok(/empty while loop/.test(info.value));
    assert.ok(/empty do-while loop/.test(info.value));
  });
});

describe("object literals with multiple yields", function () {
  it("should receive different sent values", function () {
    var _marked56 = [gen].map(regeneratorRuntime.mark);

    function gen(fn) {
      return regeneratorRuntime.wrap(function gen$(_context75) {
        while (1) switch (_context75.prev = _context75.next) {
          case 0:
            _context75.next = 2;
            return "a";

          case 2:
            _context75.t0 = _context75.sent;
            _context75.next = 5;
            return "b";

          case 5:
            _context75.t1 = _context75.sent;
            _context75.next = 8;
            return "c";

          case 8:
            _context75.t2 = _context75.sent;
            _context75.next = 11;
            return "d";

          case 11:
            _context75.t3 = _context75.sent;
            _context75.t4 = fn(_context75.t2, _context75.t3);
            _context75.next = 15;
            return "e";

          case 15:
            _context75.t5 = _context75.sent;
            _context75.next = 18;
            return "f";

          case 18:
            _context75.t6 = _context75.sent;
            _context75.t7 = [_context75.t5, _context75.t6];
            return _context75.abrupt("return", {
              a: _context75.t0,
              b: _context75.t1,
              c: _context75.t4,
              d: _context75.t7
            });

          case 21:
          case "end":
            return _context75.stop();
        }
      }, _marked56[0], this);
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

describe("generator .throw method", function () {
  (runningInTranslation ? it : xit)("should complete generator", function () {
    var _marked57 = [gen].map(regeneratorRuntime.mark);

    function gen(x) {
      return regeneratorRuntime.wrap(function gen$(_context76) {
        while (1) switch (_context76.prev = _context76.next) {
          case 0:
            _context76.next = 2;
            return 2;

          case 2:
            throw 1;

          case 3:
          case "end":
            return _context76.stop();
        }
      }, _marked57[0], this);
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

  it("should work after the final call to .next", function () {
    var _marked58 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context77) {
        while (1) switch (_context77.prev = _context77.next) {
          case 0:
            _context77.next = 2;
            return 1;

          case 2:
          case "end":
            return _context77.stop();
        }
      }, _marked58[0], this);
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

  it("should immediately complete a new-born generator", function () {
    var _marked59 = [gen].map(regeneratorRuntime.mark);

    var began = false;

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context78) {
        while (1) switch (_context78.prev = _context78.next) {
          case 0:
            began = true;
            _context78.next = 3;
            return 1;

          case 3:
          case "end":
            return _context78.stop();
        }
      }, _marked59[0], this);
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

  it("should not propagate errors handled inside a delegate", function () {
    var _marked60 = [outer, inner].map(regeneratorRuntime.mark);

    function outer() {
      return regeneratorRuntime.wrap(function outer$(_context79) {
        while (1) switch (_context79.prev = _context79.next) {
          case 0:
            _context79.prev = 0;
            return _context79.delegateYield(inner(), "t0", 2);

          case 2:
            _context79.next = 7;
            break;

          case 4:
            _context79.prev = 4;
            _context79.t1 = _context79["catch"](0);
            return _context79.abrupt("return", -1);

          case 7:
            return _context79.abrupt("return", 1);

          case 8:
          case "end":
            return _context79.stop();
        }
      }, _marked60[0], this, [[0, 4]]);
    }

    function inner() {
      return regeneratorRuntime.wrap(function inner$(_context80) {
        while (1) switch (_context80.prev = _context80.next) {
          case 0:
            _context80.prev = 0;
            _context80.next = 3;
            return void 0;

          case 3:
            _context80.next = 8;
            break;

          case 5:
            _context80.prev = 5;
            _context80.t0 = _context80["catch"](0);
            return _context80.abrupt("return");

          case 8:
          case "end":
            return _context80.stop();
        }
      }, _marked60[1], this, [[0, 5]]);
    }

    var g = outer();
    g.next();
    assert.equal(g.throw(new Error('foo')).value, 1);
  });

  it("should propagate errors unhandled inside a delegate", function () {
    var _marked61 = [outer, inner].map(regeneratorRuntime.mark);

    function outer() {
      return regeneratorRuntime.wrap(function outer$(_context81) {
        while (1) switch (_context81.prev = _context81.next) {
          case 0:
            _context81.prev = 0;
            return _context81.delegateYield(inner(), "t0", 2);

          case 2:
            _context81.next = 7;
            break;

          case 4:
            _context81.prev = 4;
            _context81.t1 = _context81["catch"](0);
            return _context81.abrupt("return", -1);

          case 7:
            return _context81.abrupt("return", 1);

          case 8:
          case "end":
            return _context81.stop();
        }
      }, _marked61[0], this, [[0, 4]]);
    }

    function inner() {
      return regeneratorRuntime.wrap(function inner$(_context82) {
        while (1) switch (_context82.prev = _context82.next) {
          case 0:
            _context82.next = 2;
            return void 0;

          case 2:
          case "end":
            return _context82.stop();
        }
      }, _marked61[1], this);
    }

    var g = outer();
    g.next();
    assert.equal(g.throw(new Error('foo')).value, -1);
  });
});

describe("unqualified function calls", function () {
  it("should have a global `this` object", function () {
    var _marked62 = [invoke].map(regeneratorRuntime.mark);

    function getThis() {
      return this;
    }

    // This is almost certainly the global object, but there's a chance it
    // might be null or undefined (in strict mode).
    var unqualifiedThis = getThis();

    function invoke() {
      return regeneratorRuntime.wrap(function invoke$(_context83) {
        while (1) switch (_context83.prev = _context83.next) {
          case 0:
            _context83.next = 2;
            return "dummy";

          case 2:
            return _context83.abrupt("return", (0, _context83.sent)());

          case 3:
          case "end":
            return _context83.stop();
        }
      }, _marked62[0], this);
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
    var _marked63 = [foo, bar].map(regeneratorRuntime.mark);

    function foo() {
      return regeneratorRuntime.wrap(function foo$(_context84) {
        while (1) switch (_context84.prev = _context84.next) {
          case 0:
            _context84.next = 2;
            return 0;

          case 2:
            return _context84.delegateYield(bar(), "t0", 3);

          case 3:
            return _context84.abrupt("return", _context84.t0);

          case 4:
          case "end":
            return _context84.stop();
        }
      }, _marked63[0], this);
    }

    function bar() {
      return regeneratorRuntime.wrap(function bar$(_context85) {
        while (1) switch (_context85.prev = _context85.next) {
          case 0:
            _context85.next = 2;
            return 1;

          case 2:
            return _context85.abrupt("return", 2);

          case 3:
          case "end":
            return _context85.stop();
        }
      }, _marked63[1], this);
    }

    check(foo(), [0, 1], 2);
  });

  it("can be used in complex expressions", function () {
    var _marked64 = [foo, bar].map(regeneratorRuntime.mark);

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

    function foo() {
      return regeneratorRuntime.wrap(function foo$(_context86) {
        while (1) switch (_context86.prev = _context86.next) {
          case 0:
            return _context86.delegateYield(bar(), "t0", 1);

          case 1:
            _context86.t1 = _context86.t0;
            return _context86.delegateYield(bar(), "t2", 3);

          case 3:
            _context86.t3 = _context86.t2;
            return _context86.abrupt("return", _context86.t1 + _context86.t3);

          case 5:
          case "end":
            return _context86.stop();
        }
      }, _marked64[0], this);
    }

    function bar() {
      return regeneratorRuntime.wrap(function bar$(_context87) {
        while (1) switch (_context87.prev = _context87.next) {
          case 0:
            _context87.next = 2;
            return 2;

          case 2:
            _context87.t0 = _context87.sent;
            _context87.next = 5;
            return 3;

          case 5:
            _context87.t1 = _context87.sent;
            return _context87.abrupt("return", _context87.t0 + _context87.t1);

          case 7:
          case "end":
            return _context87.stop();
        }
      }, _marked64[1], this);
    }

    assert.strictEqual(pumpNumber(bar()), 5);
    assert.strictEqual(pumpNumber(foo()), 10);
  });
});

describe("isGeneratorFunction", function () {
  it("should work for function declarations", function () {
    var _marked65 = [genFun].map(regeneratorRuntime.mark);

    // Do the assertions up here to make sure the generator function is
    // marked at the beginning of the block the function is declared in.
    assert.strictEqual(regeneratorRuntime.isGeneratorFunction(genFun), true);

    assert.strictEqual(regeneratorRuntime.isGeneratorFunction(normalFun), false);

    function normalFun() {
      return 0;
    }

    function genFun() {
      return regeneratorRuntime.wrap(function genFun$(_context88) {
        while (1) switch (_context88.prev = _context88.next) {
          case 0:
            _context88.next = 2;
            return 0;

          case 2:
          case "end":
            return _context88.stop();
        }
      }, _marked65[0], this);
    }
  });

  it("should work for function expressions", function () {
    assert.strictEqual(regeneratorRuntime.isGeneratorFunction(regeneratorRuntime.mark(function genFun() {
      return regeneratorRuntime.wrap(function genFun$(_context89) {
        while (1) switch (_context89.prev = _context89.next) {
          case 0:
            _context89.next = 2;
            return 0;

          case 2:
          case "end":
            return _context89.stop();
        }
      }, genFun, this);
    })), true);

    assert.strictEqual(regeneratorRuntime.isGeneratorFunction(function normalFun() {
      return 0;
    }), false);
  });
});

describe("new expressions", function () {
  it("should be able to contain yield sub-expressions", function () {
    var _marked66 = [gen].map(regeneratorRuntime.mark);

    function A(first, second) {
      this.first = first;
      this.second = second;
    }

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context90) {
        while (1) switch (_context90.prev = _context90.next) {
          case 0:
            _context90.next = 2;
            return 0;

          case 2:
            _context90.t0 = _context90.sent;
            _context90.next = 5;
            return 1;

          case 5:
            _context90.t1 = _context90.sent;
            _context90.next = 8;
            return 2;

          case 8:
            _context90.t2 = _context90.sent;
            _context90.next = 11;
            return new _context90.t0(_context90.t1, _context90.t2);

          case 11:
            return _context90.abrupt("return", _context90.sent);

          case 12:
          case "end":
            return _context90.stop();
        }
      }, _marked66[0], this);
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

describe("block binding", function () {
  it("should translate block binding correctly", function () {
    "use strict";

    var _marked67 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      var a$0, a$1, a, _a, _a2;

      return regeneratorRuntime.wrap(function gen$(_context91) {
        while (1) switch (_context91.prev = _context91.next) {
          case 0:
            a$0 = 0, a$1 = 1;
            a = 3;
            _a = 1;
            _context91.next = 5;
            return _a + a$0;

          case 5:
            _a2 = 2;
            _context91.next = 8;
            return _a2 - 1 + a$1;

          case 8:
            _context91.next = 10;
            return a;

          case 10:
          case "end":
            return _context91.stop();
        }
      }, _marked67[0], this);
    }

    var g = gen();

    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: 2, done: false });
    assert.deepEqual(g.next(), { value: 3, done: false });
    assert.deepEqual(g.next(), { value: void 0, done: true });
  });

  it("should translate block binding with iife correctly", function () {
    "use strict";

    var _marked68 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      var arr, _loop, x;

      return regeneratorRuntime.wrap(function gen$(_context92) {
        while (1) switch (_context92.prev = _context92.next) {
          case 0:
            arr = [];

            _loop = function (x) {
              var y = x;
              arr.push(function () {
                return y;
              });
            };

            for (x = 0; x < 3; x++) {
              _loop(x);
            }

            x = undefined;

          case 4:
            if (!(x = arr.pop())) {
              _context92.next = 9;
              break;
            }

            _context92.next = 7;
            return x;

          case 7:
            _context92.next = 4;
            break;

          case 9:
          case "end":
            return _context92.stop();
        }
      }, _marked68[0], this);
    }

    var g = gen();

    assert.equal(g.next().value(), 2);
    assert.equal(g.next().value(), 1);
    assert.equal(g.next().value(), 0);
    assert.deepEqual(g.next(), { value: void 0, done: true });
  });
});

describe("newborn generators", function () {
  it("should be able to yield* non-newborn generators", function () {
    var _marked69 = [inner, outer].map(regeneratorRuntime.mark);

    function inner() {
      return regeneratorRuntime.wrap(function inner$(_context93) {
        while (1) switch (_context93.prev = _context93.next) {
          case 0:
            _context93.next = 2;
            return 1;

          case 2:
            _context93.t0 = _context93.sent;
            _context93.next = 5;
            return 2;

          case 5:
            _context93.t1 = _context93.sent;
            return _context93.abrupt("return", [_context93.t0, _context93.t1]);

          case 7:
          case "end":
            return _context93.stop();
        }
      }, _marked69[0], this);
    }

    function outer(delegate) {
      return regeneratorRuntime.wrap(function outer$(_context94) {
        while (1) switch (_context94.prev = _context94.next) {
          case 0:
            return _context94.delegateYield(delegate, "t0", 1);

          case 1:
            return _context94.abrupt("return", _context94.t0);

          case 2:
          case "end":
            return _context94.stop();
        }
      }, _marked69[1], this);
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

  it("should support the ignore-initial-yield wrapper idiom", function () {
    var _marked70 = [inner].map(regeneratorRuntime.mark);

    var markers = [];

    function inner() {
      var sent1, sent2;
      return regeneratorRuntime.wrap(function inner$(_context95) {
        while (1) switch (_context95.prev = _context95.next) {
          case 0:
            markers.push(0);
            _context95.next = 3;
            return 1;

          case 3:
            sent1 = _context95.sent;

            markers.push(2);
            _context95.next = 7;
            return 2;

          case 7:
            sent2 = _context95.sent;

            markers.push(3);
            return _context95.abrupt("return", [sent1, sent2]);

          case 10:
          case "end":
            return _context95.stop();
        }
      }, _marked70[0], this);
    }

    function wrapper(delegate) {
      var gen = regeneratorRuntime.mark(function _callee4() {
        var sent, info;
        return regeneratorRuntime.wrap(function _callee4$(_context96) {
          while (1) switch (_context96.prev = _context96.next) {
            case 0:
              _context96.next = 2;
              return "ignored";

            case 2:
              sent = _context96.sent;

              markers.push(1);

            case 4:
              if ((info = delegate.next(sent)).done) {
                _context96.next = 10;
                break;
              }

              _context96.next = 7;
              return info.value;

            case 7:
              sent = _context96.sent;
              _context96.next = 4;
              break;

            case 10:

              markers.push(4);

              return _context96.abrupt("return", info.value);

            case 12:
            case "end":
              return _context96.stop();
          }
        }, _callee4, this);
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

  it("should allow chaining newborn and non-newborn generators", function () {
    var _marked71 = [range, chain, y3, y5].map(regeneratorRuntime.mark);

    function range(n) {
      var i;
      return regeneratorRuntime.wrap(function range$(_context97) {
        while (1) switch (_context97.prev = _context97.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < n)) {
              _context97.next = 7;
              break;
            }

            _context97.next = 4;
            return i;

          case 4:
            ++i;
            _context97.next = 1;
            break;

          case 7:
          case "end":
            return _context97.stop();
        }
      }, _marked71[0], this);
    }

    function chain(a, b) {
      return regeneratorRuntime.wrap(function chain$(_context98) {
        while (1) switch (_context98.prev = _context98.next) {
          case 0:
            return _context98.delegateYield(a, "t0", 1);

          case 1:
            return _context98.delegateYield(b, "t1", 2);

          case 2:
          case "end":
            return _context98.stop();
        }
      }, _marked71[1], this);
    }

    check(chain(range(3), range(5)), [0, 1, 2, 0, 1, 2, 3, 4]);

    function y3(x) {
      return regeneratorRuntime.wrap(function y3$(_context99) {
        while (1) switch (_context99.prev = _context99.next) {
          case 0:
            _context99.next = 2;
            return x;

          case 2:
            _context99.next = 4;
            return _context99.sent;

          case 4:
            _context99.next = 6;
            return _context99.sent;

          case 6:
            return _context99.abrupt("return", _context99.sent);

          case 7:
          case "end":
            return _context99.stop();
        }
      }, _marked71[2], this);
    }

    function y5(x) {
      return regeneratorRuntime.wrap(function y5$(_context100) {
        while (1) switch (_context100.prev = _context100.next) {
          case 0:
            _context100.next = 2;
            return x;

          case 2:
            _context100.next = 4;
            return _context100.sent;

          case 4:
            _context100.next = 6;
            return _context100.sent;

          case 6:
            _context100.next = 8;
            return _context100.sent;

          case 8:
            _context100.next = 10;
            return _context100.sent;

          case 10:
            return _context100.abrupt("return", _context100.sent);

          case 11:
          case "end":
            return _context100.stop();
        }
      }, _marked71[3], this);
    }

    check(chain(y3("foo"), y5("bar")), ["foo", 1, 2, "bar", 4, 5, 6, 7]);

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

describe("labeled break and continue statements", function () {
  it("should be able to exit multiple try statements", function () {
    var _marked72 = [gen].map(regeneratorRuntime.mark);

    var e1 = "first";
    var e2 = "second";
    var e3 = "third";
    var e4 = "fourth";

    function gen(n, which) {
      var i;
      return regeneratorRuntime.wrap(function gen$(_context101) {
        while (1) switch (_context101.prev = _context101.next) {
          case 0:
            _context101.prev = 0;
            _context101.next = 3;
            return 0;

          case 3:
            raise(e1);

          case 4:
            _context101.prev = 4;
            _context101.next = 7;
            return 1;

          case 7:
            i = 0;

          case 8:
            if (!(i < n)) {
              _context101.next = 42;
              break;
            }

            _context101.next = 11;
            return i;

          case 11:
            _context101.prev = 11;

            raise(e2);

          case 13:
            _context101.prev = 13;
            _context101.next = 16;
            return 2;

          case 16:
            _context101.prev = 16;

            raise(e3);

          case 18:
            _context101.prev = 18;
            _context101.next = 21;
            return 3;

          case 21:
            _context101.prev = 21;

            raise(e4);

          case 23:
            _context101.prev = 23;
            _context101.next = 26;
            return 4;

          case 26:
            if (!(which === "break")) {
              _context101.next = 30;
              break;
            }

            _context101.next = 29;
            return "breaking";

          case 29:
            return _context101.abrupt("break", 42);

          case 30:
            if (!(which === "continue")) {
              _context101.next = 34;
              break;
            }

            _context101.next = 33;
            return "continuing";

          case 33:
            return _context101.abrupt("continue", 39);

          case 34:
            _context101.next = 36;
            return 5;

          case 36:
            return _context101.finish(23);

          case 37:
            return _context101.finish(18);

          case 38:
            return _context101.finish(13);

          case 39:
            ++i;
            _context101.next = 8;
            break;

          case 42:
            _context101.next = 44;
            return 6;

          case 44:
            return _context101.finish(4);

          case 45:
          case "end":
            return _context101.stop();
        }
      }, _marked72[0], this, [[0,, 4, 45], [11,, 13, 39], [16,, 18, 38], [21,, 23, 37]]);
    }

    try {
      check(gen(1, "break"), [0, 1, 0, 2, 3, 4, "breaking", 6]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e1);
    }

    try {
      check(gen(3, "continue"), [0, 1, 0, 2, 3, 4, "continuing", 1, 2, 3, 4, "continuing", 2, 2, 3, 4, "continuing", 6 // Loop finished naturally.
      ]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e1);
    }

    try {
      check(gen(3, "neither"), [0, 1, 0, 2, 3, 4, 5]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e4);
    }
  });

  it("should allow breaking from any labeled statement", function () {
    var _marked73 = [gen].map(regeneratorRuntime.mark);

    function gen(limit) {
      var i;
      return regeneratorRuntime.wrap(function gen$(_context102) {
        while (1) switch (_context102.prev = _context102.next) {
          case 0:
            _context102.next = 2;
            return 0;

          case 2:
            i = 0;

          case 3:
            if (!(i < limit)) {
              _context102.next = 32;
              break;
            }

            _context102.next = 6;
            return 1;

          case 6:
            _context102.next = 8;
            return 2;

          case 8:
            return _context102.abrupt("break", 11);

          case 11:
            if (!(limit === 3)) {
              _context102.next = 26;
              break;
            }

            _context102.next = 14;
            return 4;

          case 14:
            if (!(i === 0)) {
              _context102.next = 16;
              break;
            }

            return _context102.abrupt("break", 26);

          case 16:
            _context102.next = 18;
            return 5;

          case 18:
            if (!(i === 1)) {
              _context102.next = 20;
              break;
            }

            return _context102.abrupt("break", 26);

          case 20:
            _context102.next = 22;
            return 6;

          case 22:
            if (!(i === 2)) {
              _context102.next = 24;
              break;
            }

            return _context102.abrupt("break", 32);

          case 24:
            _context102.next = 26;
            return 7;

          case 26:
            return _context102.abrupt("break", 27);

          case 27:
            _context102.next = 29;
            return 8;

          case 29:
            ++i;
            _context102.next = 3;
            break;

          case 32:
            _context102.next = 34;
            return 9;

          case 34:
          case "end":
            return _context102.stop();
        }
      }, _marked73[0], this);
    }

    check(gen(0), [0, 9]);
    check(gen(1), [0, 1, 2, 8, 9]);
    check(gen(2), [0, 1, 2, 8, 1, 2, 8, 9]);
    check(gen(3), [0, 1, 2, 4, 8, 1, 2, 4, 5, 8, 1, 2, 4, 5, 6, 9]);
  });
});

describe("for loop with var decl and no update expression", function () {
  var _marked74 = [range].map(regeneratorRuntime.mark);

  // https://github.com/facebook/regenerator/issues/103
  function range() {
    var i;
    return regeneratorRuntime.wrap(function range$(_context103) {
      while (1) switch (_context103.prev = _context103.next) {
        case 0:
          for (i = 0; false;) {}

        case 1:
        case "end":
          return _context103.stop();
      }
    }, _marked74[0], this);
  }

  it("should compile and run", function () {
    check(range(), []);
  });
});

describe("generator function prototype", function () {
  function getProto(obj) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.__proto__;
  }

  it("should follow the expected object model", function () {
    var _marked75 = [f2, f, f].map(regeneratorRuntime.mark);

    var GeneratorFunctionPrototype = getProto(f);
    var GeneratorFunction = GeneratorFunctionPrototype.constructor;

    assert.strictEqual(GeneratorFunction.name, 'GeneratorFunction');
    assert.strictEqual(GeneratorFunction.prototype, GeneratorFunctionPrototype);
    assert.strictEqual(GeneratorFunctionPrototype.prototype.constructor, GeneratorFunctionPrototype);
    assert.strictEqual(GeneratorFunctionPrototype.prototype, getProto(f.prototype));
    assert.strictEqual(getProto(GeneratorFunctionPrototype), Function.prototype);

    if (typeof process === "undefined" || process.version.slice(1, 3) === "0.") {
      // Node version strings start with 0.
      assert.strictEqual(GeneratorFunctionPrototype.name, "GeneratorFunctionPrototype");
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

    var g3 = new f();
    assert.strictEqual(g3.x, 42);

    function f2() {
      return regeneratorRuntime.wrap(function f2$(_context104) {
        while (1) switch (_context104.prev = _context104.next) {
          case 0:
            _context104.next = 2;
            return 1;

          case 2:
          case "end":
            return _context104.stop();
        }
      }, _marked75[0], this);
    }

    assert.strictEqual(getProto(f), getProto(f2));
    assert.strictEqual(f.hasOwnProperty('constructor'), false);
    assert.strictEqual(getProto(f).constructor.name, 'GeneratorFunction');

    // Intentionally at the end to test hoisting.
    function f() {
      return regeneratorRuntime.wrap(function f$(_context105) {
        while (1) switch (_context105.prev = _context105.next) {
          case 0:
            _context105.next = 2;
            return this;

          case 2:
          case "end":
            return _context105.stop();
        }
      }, _marked75[1], this);
    }

    function f() {
      return regeneratorRuntime.wrap(function f$(_context106) {
        while (1) switch (_context106.prev = _context106.next) {
          case 0:
            _context106.next = 2;
            return 1;

          case 2:
          case "end":
            return _context106.stop();
        }
      }, _marked75[2], this);
    }

    var f2 = f;
    f = 42;
    var g = f2();

    assert.deepEqual(g.next(), { value: 1, done: false });
    assert.deepEqual(g.next(), { value: void 0, done: true });
    assert.ok(g instanceof f2);
  });
});

describe("for-of loops", function () {
  (runningInTranslation ? it : xit)("should work for Arrays", function () {
    var sum = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = [1, 2].concat(3)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var x = _step.value;

        sum += x;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    assert.strictEqual(sum, 6);
  });

  it("should work for generators", function () {
    var value,
        values = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = range(3)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        value = _step2.value;

        values.push(value);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    assert.deepEqual(values, [0, 1, 2]);
  });

  it("should work inside of generators", function () {
    var _marked76 = [yieldPermutations].map(regeneratorRuntime.mark);

    function yieldPermutations(list) {
      var count, first, genRest, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, perm, i, prefix, suffix;

      return regeneratorRuntime.wrap(function yieldPermutations$(_context107) {
        while (1) switch (_context107.prev = _context107.next) {
          case 0:
            if (!(list.length < 2)) {
              _context107.next = 4;
              break;
            }

            _context107.next = 3;
            return list;

          case 3:
            return _context107.abrupt("return", 1);

          case 4:
            count = 0;
            first = list.slice(0, 1);
            genRest = yieldPermutations(list.slice(1));
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context107.prev = 10;
            _iterator3 = genRest[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context107.next = 27;
              break;
            }

            perm = _step3.value;
            i = 0;

          case 15:
            if (!(i < list.length)) {
              _context107.next = 23;
              break;
            }

            prefix = perm.slice(0, i);
            suffix = perm.slice(i);
            _context107.next = 20;
            return prefix.concat(first, suffix);

          case 20:
            ++i;
            _context107.next = 15;
            break;

          case 23:

            count += i;

          case 24:
            _iteratorNormalCompletion3 = true;
            _context107.next = 12;
            break;

          case 27:
            _context107.next = 33;
            break;

          case 29:
            _context107.prev = 29;
            _context107.t0 = _context107["catch"](10);
            _didIteratorError3 = true;
            _iteratorError3 = _context107.t0;

          case 33:
            _context107.prev = 33;
            _context107.prev = 34;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 36:
            _context107.prev = 36;

            if (!_didIteratorError3) {
              _context107.next = 39;
              break;
            }

            throw _iteratorError3;

          case 39:
            return _context107.finish(36);

          case 40:
            return _context107.finish(33);

          case 41:
            return _context107.abrupt("return", count);

          case 42:
          case "end":
            return _context107.stop();
        }
      }, _marked76[0], this, [[10, 29, 33, 41], [34,, 36, 40]]);
    }

    var count = 0;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = yieldPermutations([])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var perm = _step4.value;

        assert.deepEqual(perm, []);
        ++count;
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    assert.strictEqual(count, 1);

    check(yieldPermutations([1]), [[1]], 1);

    check(yieldPermutations([2, 1]), [[2, 1], [1, 2]], 2);

    check(yieldPermutations([1, 3, 2]), [[1, 3, 2], [3, 1, 2], [3, 2, 1], [1, 2, 3], [2, 1, 3], [2, 3, 1]], 6);
  });
});

describe("generator return method", function () {
  if (!runningInTranslation) {
    // The return method has not been specified or implemented natively,
    // yet, so these tests need only pass in translation.
    return;
  }

  it("should work with newborn generators", function () {
    var _marked77 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context108) {
        while (1) switch (_context108.prev = _context108.next) {
          case 0:
            _context108.next = 2;
            return 0;

          case 2:
          case "end":
            return _context108.stop();
        }
      }, _marked77[0], this);
    }

    var g = gen();

    assert.deepEqual(g.return("argument"), {
      value: "argument",
      done: true
    });

    assertAlreadyFinished(g);
  });

  it("should behave as if generator actually returned", function () {
    var _marked78 = [gen].map(regeneratorRuntime.mark);

    var executedFinally = false;

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context109) {
        while (1) switch (_context109.prev = _context109.next) {
          case 0:
            _context109.prev = 0;
            _context109.next = 3;
            return 0;

          case 3:
            _context109.next = 8;
            break;

          case 5:
            _context109.prev = 5;
            _context109.t0 = _context109["catch"](0);

            assert.ok(false, "should not have executed the catch handler");

          case 8:
            _context109.prev = 8;

            executedFinally = true;
            return _context109.finish(8);

          case 11:
          case "end":
            return _context109.stop();
        }
      }, _marked78[0], this, [[0, 5, 8, 11]]);
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

  it("should return both delegate and delegator", function () {
    var _marked79 = [callee, caller].map(regeneratorRuntime.mark);

    var checkpoints = [];

    function callee(errorToThrow) {
      return regeneratorRuntime.wrap(function callee$(_context110) {
        while (1) switch (_context110.prev = _context110.next) {
          case 0:
            _context110.prev = 0;
            _context110.next = 3;
            return 1;

          case 3:
            _context110.next = 5;
            return 2;

          case 5:
            _context110.prev = 5;

            checkpoints.push("callee finally");

            if (!errorToThrow) {
              _context110.next = 9;
              break;
            }

            throw errorToThrow;

          case 9:
            return _context110.finish(5);

          case 10:
          case "end":
            return _context110.stop();
        }
      }, _marked79[0], this, [[0,, 5, 10]]);
    }

    function caller(errorToThrow) {
      return regeneratorRuntime.wrap(function caller$(_context111) {
        while (1) switch (_context111.prev = _context111.next) {
          case 0:
            _context111.prev = 0;
            _context111.next = 3;
            return 0;

          case 3:
            return _context111.delegateYield(callee(errorToThrow), "t0", 4);

          case 4:
            _context111.next = 6;
            return 3;

          case 6:
            _context111.prev = 6;

            checkpoints.push("caller finally");
            return _context111.finish(6);

          case 9:
          case "end":
            return _context111.stop();
        }
      }, _marked79[1], this, [[0,, 6, 9]]);
    }

    var g1 = caller();

    assert.deepEqual(g1.next(), { value: 0, done: false });
    assert.deepEqual(g1.next(), { value: 1, done: false });
    assert.deepEqual(g1.return(-1), { value: -1, done: true });
    assert.deepEqual(checkpoints, ["callee finally", "caller finally"]);

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

    assert.deepEqual(checkpoints, ["callee finally", "caller finally", "callee finally", "caller finally"]);
  });
});

describe("expressions containing yield subexpressions", function () {
  it("should evaluate all subexpressions before yielding", function () {
    var _marked80 = [gen].map(regeneratorRuntime.mark);

    function gen(x) {
      return regeneratorRuntime.wrap(function gen$(_context112) {
        while (1) switch (_context112.prev = _context112.next) {
          case 0:
            _context112.t0 = x;
            _context112.next = 3;
            return function (y) {
              x = y;
            };

          case 3:
            _context112.t1 = _context112.sent;
            return _context112.abrupt("return", _context112.t0 * _context112.t1);

          case 5:
          case "end":
            return _context112.stop();
        }
      }, _marked80[0], this);
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

  it("should work even with getter member expressions", function () {
    var _marked81 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context113) {
        while (1) switch (_context113.prev = _context113.next) {
          case 0:
            _context113.t0 = a.b;
            _context113.next = 3;
            return "asdf";

          case 3:
            _context113.t1 = _context113.sent;
            return _context113.abrupt("return", _context113.t0 + _context113.t1);

          case 5:
          case "end":
            return _context113.stop();
        }
      }, _marked81[0], this);
    }

    var a = {};
    var b = 0;

    Object.defineProperty(a, "b", {
      get: function () {
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

  it("should evaluate all array elements before yielding", function () {
    var _marked82 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context114) {
        while (1) switch (_context114.prev = _context114.next) {
          case 0:
            _context114.t0 = a;
            _context114.next = 3;
            return "asdf";

          case 3:
            _context114.t1 = _context114.sent;
            _context114.t2 = a;
            return _context114.abrupt("return", [_context114.t0, _context114.t1, _context114.t2]);

          case 6:
          case "end":
            return _context114.stop();
        }
      }, _marked82[0], this);
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

  it("should handle callee member expressions correctly", function () {
    var _marked83 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context115) {
        while (1) switch (_context115.prev = _context115.next) {
          case 0:
            _context115.t0 = a.slice(0);
            _context115.next = 3;
            return "asdf";

          case 3:
            _context115.t1 = _context115.sent;
            a = _context115.t0.concat.call(_context115.t0, _context115.t1);
            return _context115.abrupt("return", a);

          case 6:
          case "end":
            return _context115.stop();
        }
      }, _marked83[0], this);
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

  it("should handle implicit stringification correctly", function () {
    var _marked84 = [gen].map(regeneratorRuntime.mark);

    function gen() {
      return regeneratorRuntime.wrap(function gen$(_context116) {
        while (1) switch (_context116.prev = _context116.next) {
          case 0:
            _context116.t0 = a;
            _context116.next = 3;
            return "asdf";

          case 3:
            _context116.t1 = _context116.sent;
            return _context116.abrupt("return", _context116.t0 + _context116.t1);

          case 5:
          case "end":
            return _context116.stop();
        }
      }, _marked84[0], this);
    }

    var a = [1, 2];
    var g = gen();

    assert.deepEqual(g.next(), {
      value: "asdf",
      done: false
    });

    a = [4, 5];

    assert.deepEqual(g.next(",3"), {
      value: "1,2,3",
      done: true
    });
  });
});