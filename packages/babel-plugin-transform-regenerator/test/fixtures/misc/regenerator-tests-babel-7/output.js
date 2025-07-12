var _marked3 = /*#__PURE__*/babelHelpers.regenerator().m(range);
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert = require("assert");
var runningInTranslation = /\.wrap\(/.test(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        return _context.a(2);
    }
  }, _callee);
}));
var shared = require("./shared.js");
var Symbol = shared.Symbol;
var check = shared.check;
var assertAlreadyFinished = shared.assertAlreadyFinished;
var fullCompatibility = runningInTranslation || require("semver").gte(process.version, "7.0.0");
assert(/*#__PURE__*/babelHelpers.regenerator().m(function _callee2() {
  return babelHelpers.regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        return _context2.a(2);
    }
  }, _callee2);
}).toString().indexOf("regenerator") !== -1, "regenerator-transform should be enabled");

// A version of `throw` whose behavior can't be statically analyzed.
// Useful for testing dynamic exception dispatching.
function raise(argument) {
  throw argument;
}
describe("simple argument yielder", function () {
  it("should yield only its first argument", function () {
    var _marked = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(x) {
      return babelHelpers.regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return x;
          case 1:
            return _context3.a(2);
        }
      }, _marked);
    }
    check(gen("oyez"), ["oyez"]);
    check(gen("foo", "bar"), ["foo"]);
  });
  it("should support multiple yields in expression", function () {
    var _marked2 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t, _t2;
      return babelHelpers.regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return 0;
          case 1:
            _t = _context4.v;
            _context4.n = 2;
            return 0;
          case 2:
            _t2 = _context4.v;
            return _context4.a(2, _t + _t2);
        }
      }, _marked2);
    }
    var itr = gen();
    itr.next();
    itr.next(1);
    assert.equal(itr.next(2).value, 3);
  });
});
function range(n) {
  var i;
  return babelHelpers.regenerator().w(function (_context5) {
    while (1) switch (_context5.n) {
      case 0:
        i = 0;
      case 1:
        if (!(i < n)) {
          _context5.n = 3;
          break;
        }
        _context5.n = 2;
        return i;
      case 2:
        ++i;
        _context5.n = 1;
        break;
      case 3:
        return _context5.a(2);
    }
  }, _marked3);
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
  var _marked4 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
  function gen(n) {
    var count;
    return babelHelpers.regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          count = 0;
          _context6.n = 1;
          return n;
        case 1:
          if (!(n !== 1)) {
            _context6.n = 5;
            break;
          }
          count += 1;
          if (!(n % 2)) {
            _context6.n = 3;
            break;
          }
          _context6.n = 2;
          return n = n * 3 + 1;
        case 2:
          _context6.n = 4;
          break;
        case 3:
          _context6.n = 4;
          return n >>= 1;
        case 4:
          _context6.n = 1;
          break;
        case 5:
          return _context6.a(2, count);
      }
    }, _marked4);
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
describe("try-catch generator", function () {
  var _marked5 = /*#__PURE__*/babelHelpers.regenerator().m(usingThrow),
    _marked6 = /*#__PURE__*/babelHelpers.regenerator().m(usingRaise);
  function usingThrow(x) {
    var _t3;
    return babelHelpers.regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.n = 1;
          return 0;
        case 1:
          _context7.p = 1;
          _context7.n = 2;
          return 1;
        case 2:
          if (!(x % 2 === 0)) {
            _context7.n = 3;
            break;
          }
          throw 2;
        case 3:
          _context7.n = 4;
          return x;
        case 4:
          _context7.n = 6;
          break;
        case 5:
          _context7.p = 5;
          _t3 = _context7.v;
          _context7.n = 6;
          return _t3;
        case 6:
          _context7.n = 7;
          return 3;
        case 7:
          return _context7.a(2);
      }
    }, _marked5, null, [[1, 5]]);
  }
  function usingRaise(x) {
    var _t4;
    return babelHelpers.regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.n = 1;
          return 0;
        case 1:
          _context8.p = 1;
          _context8.n = 2;
          return 1;
        case 2:
          if (x % 2 === 0) raise(2);
          _context8.n = 3;
          return x;
        case 3:
          _context8.n = 5;
          break;
        case 4:
          _context8.p = 4;
          _t4 = _context8.v;
          _context8.n = 5;
          return _t4;
        case 5:
          _context8.n = 6;
          return 3;
        case 6:
          return _context8.a(2);
      }
    }, _marked6, null, [[1, 4]]);
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
  var _marked7 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
  function gen() {
    var _t5;
    return babelHelpers.regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          nonExistent;
          _context0.n = 2;
          break;
        case 1:
          _context0.p = 1;
          _t5 = _context0.v;
          _context0.n = 2;
          return /*#__PURE__*/babelHelpers.regenerator().m(function _callee3() {
            return babelHelpers.regenerator().w(function (_context9) {
              while (1) switch (_context9.n) {
                case 0:
                  _context9.n = 1;
                  return _t5;
                case 1:
                  return _context9.a(2);
              }
            }, _callee3);
          });
        case 2:
          return _context0.a(2);
      }
    }, _marked7, null, [[0, 1]]);
  }
  it("should get a reference to the caught error", function () {
    var genFun2 = gen().next().value;
    assert.ok(babelHelpers.regeneratorRuntime().isGeneratorFunction(genFun2));
    var gen2 = genFun2();
    var res = gen2.next();
    assert.ok(res.value instanceof ReferenceError);
    // Note that we don't do strict equality over the message because it varies
    // across browsers (if we ever want to run tests in browsers).
    assert.ok(res.value.message.match(/nonExistent/));
  });
});
describe("try-finally generator", function () {
  var _marked8 = /*#__PURE__*/babelHelpers.regenerator().m(usingThrow),
    _marked9 = /*#__PURE__*/babelHelpers.regenerator().m(usingRaise),
    _marked0 = /*#__PURE__*/babelHelpers.regenerator().m(usingAbrupt);
  function usingThrow(condition) {
    return babelHelpers.regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.n = 1;
          return 0;
        case 1:
          _context1.p = 1;
          _context1.n = 2;
          return 1;
        case 2:
          throw 2;
        case 3:
          _context1.p = 3;
          if (!condition) {
            _context1.n = 5;
            break;
          }
          _context1.n = 4;
          return 4;
        case 4:
          return _context1.a(2, 5);
        case 5:
          _context1.n = 6;
          return 6;
        case 6:
          return _context1.a(2, 7);
        case 7:
          return _context1.a(2);
      }
    }, _marked8, null, [[1,, 3, 7]]);
  }
  function usingRaise(condition) {
    return babelHelpers.regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.n = 1;
          return 0;
        case 1:
          _context10.p = 1;
          _context10.n = 2;
          return 1;
        case 2:
          raise(2);
          _context10.n = 3;
          return 3;
        case 3:
          _context10.p = 3;
          if (!condition) {
            _context10.n = 5;
            break;
          }
          _context10.n = 4;
          return 4;
        case 4:
          return _context10.a(2, 5);
        case 5:
          _context10.n = 6;
          return 6;
        case 6:
          return _context10.a(2, 7);
        case 7:
          return _context10.a(2);
      }
    }, _marked9, null, [[1,, 3, 7]]);
  }
  function usingAbrupt(abruptType, finallyAbruptType) {
    return babelHelpers.regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.n = 1;
          return 0;
        case 1:
          _context11.p = 1;
          _context11.n = 2;
          return 1;
        case 2:
          if (!(abruptType === "return")) {
            _context11.n = 3;
            break;
          }
          return _context11.a(2, 2);
        case 3:
          if (!(abruptType === "break")) {
            _context11.n = 4;
            break;
          }
          return _context11.a(3, 11);
        case 4:
          if (!(abruptType === "continue")) {
            _context11.n = 5;
            break;
          }
          abruptType = "return";
          return _context11.a(3, 10);
        case 5:
          _context11.p = 5;
          _context11.n = 6;
          return 3;
        case 6:
          if (!(finallyAbruptType === "return")) {
            _context11.n = 7;
            break;
          }
          return _context11.a(2, 4);
        case 7:
          if (!(finallyAbruptType === "break")) {
            _context11.n = 8;
            break;
          }
          return _context11.a(3, 11);
        case 8:
          if (!(finallyAbruptType === "continue")) {
            _context11.n = 9;
            break;
          }
          finallyAbruptType = null;
          return _context11.a(3, 10);
        case 9:
          return _context11.f(5);
        case 10:
          _context11.n = 1;
          break;
        case 11:
          return _context11.a(2, 5);
      }
    }, _marked0, null, [[1,, 5, 10]]);
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
    var _marked1 = /*#__PURE__*/babelHelpers.regenerator().m(uncaught);
    var uncaughtError = new Error("uncaught");
    function uncaught(condition) {
      return babelHelpers.regenerator().w(function (_context12) {
        while (1) switch (_context12.p = _context12.n) {
          case 0:
            _context12.p = 0;
            _context12.n = 1;
            return 0;
          case 1:
            if (!condition) {
              _context12.n = 3;
              break;
            }
            _context12.n = 2;
            return 1;
          case 2:
            raise(uncaughtError);
          case 3:
            _context12.n = 4;
            return 2;
          case 4:
            _context12.p = 4;
            _context12.n = 5;
            return 3;
          case 5:
            return _context12.f(4);
          case 6:
            _context12.n = 7;
            return 4;
          case 7:
            return _context12.a(2);
        }
      }, _marked1, null, [[0,, 4, 6]]);
    }
    check(uncaught(false), [0, 2, 3, 4]);
    var u = uncaught(true);
    assert.deepEqual(u.next(), {
      value: 0,
      done: false
    });
    assert.deepEqual(u.next(), {
      value: 1,
      done: false
    });
    assert.deepEqual(u.next(), {
      value: 3,
      done: false
    });
    try {
      u.next();
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, uncaughtError);
    }
  });
  it("should throw correct error when finally contains catch", function () {
    var _marked10 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    var right = new Error("right");
    var wrong = new Error("wrong");
    function gen() {
      var _t6;
      return babelHelpers.regenerator().w(function (_context13) {
        while (1) switch (_context13.p = _context13.n) {
          case 0:
            _context13.p = 0;
            _context13.n = 1;
            return 0;
          case 1:
            raise(right);
          case 2:
            _context13.p = 2;
            _context13.n = 3;
            return 1;
          case 3:
            _context13.p = 3;
            raise(wrong);
            _context13.n = 5;
            break;
          case 4:
            _context13.p = 4;
            _t6 = _context13.v;
            assert.strictEqual(_t6, wrong);
            _context13.n = 5;
            return 2;
          case 5:
            return _context13.f(2);
          case 6:
            return _context13.a(2);
        }
      }, _marked10, null, [[3, 4], [0,, 2, 6]]);
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
    var _marked11 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      return babelHelpers.regenerator().w(function (_context14) {
        while (1) switch (_context14.p = _context14.n) {
          case 0:
            _context14.p = 0;
            _context14.n = 1;
            return 0;
          case 1:
            if (!true) {
              _context14.n = 3;
              break;
            }
            _context14.n = 2;
            return 1;
          case 2:
            return _context14.a(3, 3);
          case 3:
            _context14.p = 3;
            _context14.n = 4;
            return 2;
          case 4:
            return _context14.f(3);
          case 5:
            _context14.n = 6;
            return 3;
          case 6:
            return _context14.a(2);
        }
      }, _marked11, null, [[0,, 3, 5]]);
    }
    check(gen(), [0, 1, 2, 3]);
  });
  it("should return the correct value when overridden by finally", function () {
    var _marked12 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      return babelHelpers.regenerator().w(function (_context15) {
        while (1) switch (_context15.p = _context15.n) {
          case 0:
            _context15.p = 0;
            _context15.n = 1;
            return 1;
          case 1:
            return _context15.a(2, _context15.v);
          case 2:
            _context15.p = 2;
            return _context15.a(2, 3);
          case 3:
            return _context15.a(2);
        }
      }, _marked12, null, [[0,, 2, 3]]);
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
  it("should let the last finally block override all others", function () {
    var _marked13 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(condition) {
      return babelHelpers.regenerator().w(function (_context16) {
        while (1) switch (_context16.p = _context16.n) {
          case 0:
            _context16.p = 0;
            _context16.p = 1;
            _context16.n = 2;
            return 1;
          case 2:
            return _context16.a(2, _context16.v);
          case 3:
            _context16.p = 3;
            return _context16.a(2, 2);
          case 4:
            _context16.p = 4;
            _context16.p = 5;
            return _context16.a(2, 3);
          case 6:
            _context16.p = 6;
            if (!condition) {
              _context16.n = 7;
              break;
            }
            return _context16.a(2, 4);
          case 7:
            return _context16.f(6);
          case 8:
            return _context16.f(4);
          case 9:
            return _context16.a(2);
        }
      }, _marked13, null, [[5,, 6, 8], [1,, 3, 4], [0,, 4, 9]]);
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
  it("should allow additional yields during finally propagation", function () {
    var _marked14 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(condition) {
      return babelHelpers.regenerator().w(function (_context17) {
        while (1) switch (_context17.p = _context17.n) {
          case 0:
            _context17.p = 0;
            _context17.p = 1;
            _context17.n = 2;
            return 1;
          case 2:
            return _context17.a(2, _context17.v);
          case 3:
            _context17.p = 3;
            return _context17.a(2, 2);
          case 4:
            _context17.p = 4;
            _context17.p = 5;
            _context17.n = 6;
            return "oyez";
          case 6:
            return _context17.a(2, _context17.v);
          case 7:
            _context17.p = 7;
            if (!condition) {
              _context17.n = 8;
              break;
            }
            return _context17.a(2, 4);
          case 8:
            return _context17.f(7);
          case 9:
            return _context17.f(4);
          case 10:
            return _context17.a(2);
        }
      }, _marked14, null, [[5,, 7, 9], [1,, 3, 4], [0,, 4, 10]]);
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
describe("try-catch-finally generator", function () {
  var _marked15 = /*#__PURE__*/babelHelpers.regenerator().m(usingThrow),
    _marked16 = /*#__PURE__*/babelHelpers.regenerator().m(usingRaise);
  function usingThrow() {
    var _t7, _t8;
    return babelHelpers.regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          _context18.n = 1;
          return 0;
        case 1:
          _context18.p = 1;
          _context18.p = 2;
          _context18.n = 3;
          return 1;
        case 3:
          throw 2;
        case 4:
          _context18.n = 7;
          break;
        case 5:
          _context18.p = 5;
          _t7 = _context18.v;
          _context18.n = 6;
          return _t7;
        case 6:
          throw _context18.v;
        case 7:
          _context18.p = 7;
          _context18.n = 8;
          return 5;
        case 8:
          return _context18.f(7);
        case 9:
          _context18.n = 11;
          break;
        case 10:
          _context18.p = 10;
          _t8 = _context18.v;
          _context18.n = 11;
          return _t8;
        case 11:
          _context18.n = 12;
          return 6;
        case 12:
          return _context18.a(2);
      }
    }, _marked15, null, [[2, 5, 7, 9], [1, 10]]);
  }
  function usingRaise() {
    var _t9, _t0;
    return babelHelpers.regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          _context19.n = 1;
          return 0;
        case 1:
          _context19.p = 1;
          _context19.p = 2;
          _context19.n = 3;
          return 1;
        case 3:
          raise(2);
          _context19.n = 4;
          return 3;
        case 4:
          _context19.n = 7;
          break;
        case 5:
          _context19.p = 5;
          _t9 = _context19.v;
          _context19.n = 6;
          return _t9;
        case 6:
          throw _context19.v;
        case 7:
          _context19.p = 7;
          _context19.n = 8;
          return 5;
        case 8:
          return _context19.f(7);
        case 9:
          _context19.n = 11;
          break;
        case 10:
          _context19.p = 10;
          _t0 = _context19.v;
          _context19.n = 11;
          return _t0;
        case 11:
          _context19.n = 12;
          return 6;
        case 12:
          return _context19.a(2);
      }
    }, _marked16, null, [[2, 5, 7, 9], [1, 10]]);
  }
  it("should statically catch and then finalize", function () {
    check(usingThrow(), [0, 1, 2, 5, 3, 6]);
  });
  it("should dynamically catch and then finalize", function () {
    check(usingRaise(), [0, 1, 2, 5, 3, 6]);
  });
  it("should execute catch and finally blocks at most once", function () {
    var _marked17 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    var error = new Error();
    function gen() {
      var _t1, _t10;
      return babelHelpers.regenerator().w(function (_context20) {
        while (1) switch (_context20.p = _context20.n) {
          case 0:
            _context20.p = 0;
            _t1 = 1;
            _context20.n = _t1 === 1 ? 1 : 3;
            break;
          case 1:
            _context20.n = 2;
            return "a";
          case 2:
            return _context20.a(3, 4);
          case 3:
            return _context20.a(3, 4);
          case 4:
            throw error;
          case 5:
            _context20.p = 5;
            _t10 = _context20.v;
            assert.strictEqual(_t10, error);
            _context20.n = 6;
            return "b";
          case 6:
            _context20.n = 7;
            return "c";
          case 7:
            return _context20.a(3, 9);
          case 8:
            if (false) {
              _context20.n = 6;
              break;
            }
          case 9:
            _context20.n = 10;
            return "d";
          case 10:
            return _context20.a(3, 12);
          case 11:
            if (false) {
              _context20.n = 6;
              break;
            }
          case 12:
            _context20.n = 13;
            return "e";
          case 13:
            _context20.p = 13;
            _context20.n = 14;
            return "f";
          case 14:
            return _context20.f(13);
          case 15:
            return _context20.a(2);
        }
      }, _marked17, null, [[0, 5, 13, 15]]);
    }
    check(gen(), ["a", "b", "c", "d", "e", "f"]);
  });
  it("should handle backwards jumps in labeled loops", function () {
    var _marked18 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var firstTime;
      return babelHelpers.regenerator().w(function (_context21) {
        while (1) switch (_context21.p = _context21.n) {
          case 0:
            firstTime = true;
          case 1:
            if (!true) {
              _context21.n = 15;
              break;
            }
            _context21.n = 2;
            return 0;
          case 2:
            _context21.p = 2;
          case 3:
            if (!true) {
              _context21.n = 9;
              break;
            }
            _context21.n = 4;
            return 1;
          case 4:
            if (!firstTime) {
              _context21.n = 6;
              break;
            }
            firstTime = false;
            _context21.n = 5;
            return 2;
          case 5:
            return _context21.a(3, 1);
          case 6:
            _context21.n = 7;
            return 3;
          case 7:
            return _context21.a(3, 9);
          case 8:
            _context21.n = 3;
            break;
          case 9:
            _context21.n = 10;
            return 4;
          case 10:
            return _context21.a(3, 15);
          case 11:
            _context21.p = 11;
            _context21.n = 12;
            return 5;
          case 12:
            return _context21.f(11);
          case 13:
            _context21.n = 14;
            return 6;
          case 14:
            _context21.n = 1;
            break;
          case 15:
            _context21.n = 16;
            return 7;
          case 16:
            return _context21.a(2);
        }
      }, _marked18, null, [[2,, 11, 13]]);
    }
    check(gen(), [0, 1, 2, 5, 0, 1, 3, 4, 5, 7]);
  });
  it("should handle loop continue statements properly", function () {
    var _marked19 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    var error = new Error("thrown");
    var markers = [];
    function gen() {
      var c, _t11;
      return babelHelpers.regenerator().w(function (_context22) {
        while (1) switch (_context22.p = _context22.n) {
          case 0:
            c = 2;
          case 1:
            if (!(c > 0)) {
              _context22.n = 7;
              break;
            }
            _context22.p = 2;
            markers.push("try");
            _context22.n = 3;
            return c;
          case 3:
            _context22.n = 5;
            break;
          case 4:
            _context22.p = 4;
            _t11 = _context22.v;
            assert.strictEqual(_t11, error);
            markers.push("catch");
            return _context22.a(3, 1);
          case 5:
            _context22.p = 5;
            markers.push("finally");
            return _context22.f(5);
          case 6:
            markers.push("decrement");
            --c;
            _context22.n = 1;
            break;
          case 7:
            return _context22.a(2);
        }
      }, _marked19, null, [[2, 4, 5, 6]]);
    }
    var g = gen();
    assert.deepEqual(g.next(), {
      value: 2,
      done: false
    });
    assert.deepEqual(g.throw(error), {
      value: 2,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: void 0,
      done: true
    });
    assert.deepEqual(markers, ["try", "catch", "finally", "try", "finally", "decrement", "try", "finally", "decrement"]);
  });
});
describe("dynamic exception", function () {
  var _marked20 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
  function gen(x, fname) {
    var _t12;
    return babelHelpers.regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          _context23.p = 0;
          return _context23.a(2, fns[fname](x));
        case 1:
          _context23.p = 1;
          _t12 = _context23.v;
          _context23.n = 2;
          return _t12;
        case 2:
          return _context23.a(2);
      }
    }, _marked20, null, [[0, 1]]);
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
  var _marked21 = /*#__PURE__*/babelHelpers.regenerator().m(usingThrow),
    _marked22 = /*#__PURE__*/babelHelpers.regenerator().m(usingRaise);
  function usingThrow() {
    var _t13;
    return babelHelpers.regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          _context24.p = 0;
          _context24.p = 1;
          _context24.p = 2;
          throw "thrown";
        case 3:
          _context24.p = 3;
          _context24.n = 4;
          return 1;
        case 4:
          return _context24.f(3);
        case 5:
          _context24.n = 7;
          break;
        case 6:
          _context24.p = 6;
          _t13 = _context24.v;
          _context24.n = 7;
          return _t13;
        case 7:
          _context24.p = 7;
          _context24.n = 8;
          return 2;
        case 8:
          return _context24.f(7);
        case 9:
          _context24.p = 9;
          _context24.n = 10;
          return 3;
        case 10:
          return _context24.f(9);
        case 11:
          return _context24.a(2);
      }
    }, _marked21, null, [[2,, 3, 5], [1, 6, 7, 9], [0,, 9, 11]]);
  }
  function usingRaise() {
    var _t14;
    return babelHelpers.regenerator().w(function (_context25) {
      while (1) switch (_context25.p = _context25.n) {
        case 0:
          _context25.p = 0;
          _context25.p = 1;
          _context25.p = 2;
          raise("thrown");
        case 3:
          _context25.p = 3;
          _context25.n = 4;
          return 1;
        case 4:
          return _context25.f(3);
        case 5:
          _context25.n = 7;
          break;
        case 6:
          _context25.p = 6;
          _t14 = _context25.v;
          _context25.n = 7;
          return _t14;
        case 7:
          _context25.p = 7;
          _context25.n = 8;
          return 2;
        case 8:
          return _context25.f(7);
        case 9:
          _context25.p = 9;
          _context25.n = 10;
          return 3;
        case 10:
          return _context25.f(9);
        case 11:
          return _context25.a(2);
      }
    }, _marked22, null, [[2,, 3, 5], [1, 6, 7, 9], [0,, 9, 11]]);
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
    var _marked23 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var count, obj, key, _t15, _t16;
      return babelHelpers.regenerator().w(function (_context26) {
        while (1) switch (_context26.n) {
          case 0:
            count = 0;
            obj = {
              foo: 1,
              bar: 2
            };
            _t15 = babelHelpers.regeneratorKeys(obj);
          case 1:
            if ((_t16 = _t15()).done) {
              _context26.n = 3;
              break;
            }
            key = _t16.value;
            assert(obj.hasOwnProperty(key), key + " must be own property");
            _context26.n = 2;
            return [key, obj[key]];
          case 2:
            count += 1;
            _context26.n = 1;
            break;
          case 3:
            return _context26.a(2, count);
        }
      }, _marked23);
    }
    check(gen(), [["foo", 1], ["bar", 2]], 2);
  });
  it("should handle break in loop", function () {
    var _marked24 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(obj) {
      var count, key, _t17, _t18;
      return babelHelpers.regenerator().w(function (_context27) {
        while (1) switch (_context27.n) {
          case 0:
            count = 0;
            _context27.n = 1;
            return "why not";
          case 1:
            _t17 = babelHelpers.regeneratorKeys(obj);
          case 2:
            if ((_t18 = _t17()).done) {
              _context27.n = 5;
              break;
            }
            key = _t18.value;
            if (!obj.hasOwnProperty(key)) {
              _context27.n = 4;
              break;
            }
            if (!(key === "skip")) {
              _context27.n = 3;
              break;
            }
            return _context27.a(3, 5);
          case 3:
            count += 1;
            _context27.n = 4;
            return [key, obj[key]];
          case 4:
            _context27.n = 2;
            break;
          case 5:
            return _context27.a(2, count);
        }
      }, _marked24);
    }
    check(gen({
      a: 1,
      b: 2,
      skip: 3,
      c: 4
    }), ["why not", ["a", 1], ["b", 2]], 2);
  });
  it("should handle property deletion in loop", function () {
    var _marked25 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var count, obj, key, _t19, _t20;
      return babelHelpers.regenerator().w(function (_context28) {
        while (1) switch (_context28.n) {
          case 0:
            count = 0;
            obj = {
              foo: 1,
              bar: 2
            };
            _t19 = babelHelpers.regeneratorKeys(obj);
          case 1:
            if ((_t20 = _t19()).done) {
              _context28.n = 3;
              break;
            }
            key = _t20.value;
            assert(obj.hasOwnProperty(key), key + " must be own property");
            _context28.n = 2;
            return [key, obj[key]];
          case 2:
            delete obj.bar;
            count += 1;
            _context28.n = 1;
            break;
          case 3:
            return _context28.a(2, count);
        }
      }, _marked25);
    }
    check(gen(), [["foo", 1]], 1);
  });
  it("should loop over inherited properties", function () {
    var _marked26 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var count, Foo, foo, key, _t21, _t22;
      return babelHelpers.regenerator().w(function (_context29) {
        while (1) switch (_context29.n) {
          case 0:
            Foo = function _Foo() {
              this.baz = 1;
            };
            count = 0;
            Foo.prototype.bar = 2;
            foo = new Foo();
            _t21 = babelHelpers.regeneratorKeys(foo);
          case 1:
            if ((_t22 = _t21()).done) {
              _context29.n = 3;
              break;
            }
            key = _t22.value;
            _context29.n = 2;
            return [key, foo[key]];
          case 2:
            count += 1;
            _context29.n = 1;
            break;
          case 3:
            return _context29.a(2, count);
        }
      }, _marked26);
    }
    check(gen(), [["baz", 1], ["bar", 2]], 2);
  });
  it("should handle risky object expressions", function () {
    var _marked27 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function a(sent) {
      assert.strictEqual(sent, 1);
      a.called = true;
    }
    function b(sent) {
      assert.strictEqual(sent, 2);
      b.called = true;
      return {
        callee: b
      };
    }
    function gen() {
      var key, _t23, _t24, _t25, _t26, _t27, _t28, _t29;
      return babelHelpers.regenerator().w(function (_context30) {
        while (1) switch (_context30.n) {
          case 0:
            assert.ok(!a.called);
            assert.ok(!b.called);
            _t24 = a;
            _context30.n = 1;
            return 0;
          case 1:
            _t24(_context30.v);
            _t25 = b;
            _context30.n = 2;
            return 1;
          case 2:
            _t23 = babelHelpers.regeneratorKeys(_t25(_context30.v));
          case 3:
            if ((_t26 = _t23()).done) {
              _context30.n = 5;
              break;
            }
            key = _t26.value;
            assert.ok(a.called);
            assert.ok(b.called);
            _t27 = assert;
            _context30.n = 4;
            return key;
          case 4:
            _t27.strictEqual.call(_t27, _context30.v, 3);
            _context30.n = 3;
            break;
          case 5:
            _t28 = babelHelpers.regeneratorKeys((a(1), {
              foo: "foo",
              bar: "bar"
            }));
          case 6:
            if ((_t29 = _t28()).done) {
              _context30.n = 8;
              break;
            }
            key = _t29.value;
            _context30.n = 7;
            return key;
          case 7:
            _context30.n = 6;
            break;
          case 8:
            return _context30.a(2);
        }
      }, _marked27);
    }
    check(gen(), [0, 1, "callee", "foo", "bar"]);
  });
  it("should allow non-Identifier left-hand expressions", function () {
    var _marked28 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    var obj = {};
    var baz = {
      a: 1,
      b: 2,
      c: 3
    };
    var markers = [];
    function foo() {
      markers.push("called foo");
      return obj;
    }
    function gen() {
      var _t30, _t31;
      return babelHelpers.regenerator().w(function (_context31) {
        while (1) switch (_context31.n) {
          case 0:
            _t30 = babelHelpers.regeneratorKeys(baz);
          case 1:
            if ((_t31 = _t30()).done) {
              _context31.n = 3;
              break;
            }
            foo().bar = _t31.value;
            markers.push(obj.bar);
            _context31.n = 2;
            return obj.bar;
          case 2:
            _context31.n = 1;
            break;
          case 3:
            return _context31.a(2);
        }
      }, _marked28);
    }
    check(gen(), ["a", "b", "c"]);
    assert.deepEqual(markers, ["called foo", "a", "called foo", "b", "called foo", "c"]);
  });
  it("should work with primitives", function () {
    var _marked29 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var key, _t32, _t33;
      return babelHelpers.regenerator().w(function (_context32) {
        while (1) switch (_context32.n) {
          case 0:
            _t32 = babelHelpers.regeneratorKeys("abc");
          case 1:
            if ((_t33 = _t32()).done) {
              _context32.n = 3;
              break;
            }
            key = _t33.value;
            _context32.n = 2;
            return key;
          case 2:
            _context32.n = 1;
            break;
          case 3:
            return _context32.a(2);
        }
      }, _marked29);
    }
    check(gen(), [0, 1, 2]);
  });
});
describe("yield chain", function () {
  var _marked30 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
  function gen(n) {
    return babelHelpers.regenerator().w(function (_context33) {
      while (1) switch (_context33.n) {
        case 0:
          _context33.n = 1;
          return n;
        case 1:
          _context33.n = 2;
          return _context33.v;
        case 2:
          _context33.n = 3;
          return _context33.v;
        case 3:
          _context33.n = 4;
          return _context33.v;
        case 4:
          return _context33.a(2, _context33.v);
      }
    }, _marked30);
  }
  it("should have correct associativity", function () {
    check(gen(5), [5, 1, 2, 3], 4);
    check(gen("asdf"), ["asdf", 1, 2, 3], 4);
  });
});
describe("call expression ordering", function test() {
  it("should be correct with chained calls (#244)", function () {
    var g = /*#__PURE__*/babelHelpers.regenerator().m(function gen() {
      var _t34, _t35;
      return babelHelpers.regenerator().w(function (_context34) {
        while (1) switch (_context34.n) {
          case 0:
            _context34.n = 1;
            return 1;
          case 1:
            _t34 = _context34.v;
            _context34.n = 2;
            return 2;
          case 2:
            _t35 = _t34(_context34.v);
            _context34.n = 3;
            return 3;
          case 3:
            return _context34.a(2, _t35(_context34.v));
        }
      }, gen);
    })();
    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });
    assert.deepEqual(g.next(function (sent2) {
      assert.strictEqual(sent2, "sent 2");
      return function (sent3) {
        assert.strictEqual(sent3, "sent 3");
        return "done";
      };
    }), {
      value: 2,
      done: false
    });
    assert.deepEqual(g.next("sent 2"), {
      value: 3,
      done: false
    });
    assert.deepEqual(g.next("sent 3"), {
      value: "done",
      done: true
    });
  });
  describe("when the callee is a member expression", function () {
    it("should allow vars assigned in the callee to be used in the args (#379)", function () {
      var g = /*#__PURE__*/babelHelpers.regenerator().m(function fn() {
        var _ref;
        return babelHelpers.regenerator().w(function (_context35) {
          while (1) switch (_context35.n) {
            case 0:
              _context35.n = 1;
              return;
            case 1:
              (_ref = _context35.v).method(_ref);
            case 2:
              return _context35.a(2);
          }
        }, fn);
      })();
      var res;
      var obj = {
        method(arg) {
          res = arg;
        }
      };
      g.next();
      g.next(obj);
      assert.strictEqual(obj, res);
    });
    it("should be correct when only the callee contains yield", function () {
      var order = [];
      function step(n) {
        order.push(n);
        return {
          method() {}
        };
      }
      var g = /*#__PURE__*/babelHelpers.regenerator().m(function fn() {
        return babelHelpers.regenerator().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              _context36.n = 1;
              return;
            case 1:
              step(1).method(step(2));
            case 2:
              return _context36.a(2);
          }
        }, fn);
      })();
      g.next();
      g.next();
      assert.deepStrictEqual(order, [1, 2]);
    });
    it("should be correct when only the arguments contains yield", function () {
      var order = [];
      function step(n) {
        order.push(n);
        return {
          method() {}
        };
      }
      var g = /*#__PURE__*/babelHelpers.regenerator().m(function fn() {
        var _t36, _t37;
        return babelHelpers.regenerator().w(function (_context37) {
          while (1) switch (_context37.n) {
            case 0:
              _t36 = step(1);
              _t37 = step(2);
              _context37.n = 1;
              return;
            case 1:
              _t36.method.call(_t36, _t37, _context37.v, step(3));
            case 2:
              return _context37.a(2);
          }
        }, fn);
      })();
      g.next();
      g.next();
      assert.deepStrictEqual(order, [1, 2, 3]);
    });
    it("should be correct when the callee and the arguments contain yield", function () {
      var order = [];
      function step(n) {
        order.push(n);
        return {
          method() {}
        };
      }
      var g = /*#__PURE__*/babelHelpers.regenerator().m(function fn() {
        var _t38, _t39;
        return babelHelpers.regenerator().w(function (_context38) {
          while (1) switch (_context38.n) {
            case 0:
              _context38.n = 1;
              return;
            case 1:
              _t38 = step(1);
              _t39 = step(2);
              _context38.n = 2;
              return;
            case 2:
              _t38.method.call(_t38, _t39, _context38.v, step(3));
            case 3:
              return _context38.a(2);
          }
        }, fn);
      })();
      g.next();
      g.next();
      g.next();
      assert.deepStrictEqual(order, [1, 2, 3]);
    });
  });
});
describe("object literal generator", function () {
  var _marked31 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
  function gen(a, b) {
    var _t40, _t41, _t42, _t43;
    return babelHelpers.regenerator().w(function (_context39) {
      while (1) switch (_context39.n) {
        case 0:
          _t40 = a;
          _context39.n = 1;
          return a;
        case 1:
          _t41 = _context39.v;
          _t42 = _t40 - _t41;
          _context39.n = 2;
          return b;
        case 2:
          _t43 = _context39.v;
          _context39.n = 3;
          return {
            a: _t42,
            b: _t43
          };
        case 3:
          return _context39.a(2);
      }
    }, _marked31);
  }
  it("should yield the correct object", function () {
    check(gen(1, 2), [1, 2, {
      a: 0,
      b: 2
    }]);
    check(gen(4, 2), [4, 2, {
      a: 3,
      b: 2
    }]);
  });
});
describe("switch statement generator", function () {
  var _marked32 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
  function gen(a) {
    var _t44, _t45, _t46, _t47, _t48, _t49, _t50, _t51, _t52, _t53, _t54;
    return babelHelpers.regenerator().w(function (_context40) {
      while (1) switch (_context40.n) {
        case 0:
          _context40.n = 1;
          return a;
        case 1:
          _t44 = _context40.v;
          _t45 = _t44;
          _context40.n = 2;
          return "x";
        case 2:
          _t46 = _context40.v;
          _t47 = a;
          _t48 = _t46 - _t47;
          if (!(_t45 === _t48)) {
            _context40.n = 3;
            break;
          }
          _t49 = 8;
          _context40.n = 7;
          break;
        case 3:
          _t50 = _t44;
          _context40.n = 4;
          return "y";
        case 4:
          _t51 = _context40.v;
          _t52 = a;
          _t53 = _t51 - _t52;
          if (!(_t50 === _t53)) {
            _context40.n = 5;
            break;
          }
          _t54 = 9;
          _context40.n = 6;
          break;
        case 5:
          _t54 = 10;
        case 6:
          _t49 = _t54;
        case 7:
          _context40.n = _t49;
          break;
        case 8:
          return _context40.a(2, "first case");
        case 9:
          return _context40.a(2, "second case");
        case 10:
          return _context40.a(2);
      }
    }, _marked32);
  }
  it("should jump to the correct cases", function () {
    check(gen(1), [1, "x"], "first case");
    check(gen(2), [2, "x", "y"], "second case");
  });
});
describe("infinite sequence generator", function () {
  var _marked33 = /*#__PURE__*/babelHelpers.regenerator().m(gen),
    _marked34 = /*#__PURE__*/babelHelpers.regenerator().m(limit);
  function gen(start, step) {
    return babelHelpers.regenerator().w(function (_context41) {
      while (1) switch (_context41.n) {
        case 0:
          step = step || 1;
        case 1:
          if (!true) {
            _context41.n = 3;
            break;
          }
          _context41.n = 2;
          return start;
        case 2:
          start += step;
          _context41.n = 1;
          break;
        case 3:
          return _context41.a(2);
      }
    }, _marked33);
  }
  function limit(g, stop) {
    var info;
    return babelHelpers.regenerator().w(function (_context42) {
      while (1) switch (_context42.n) {
        case 0:
          if (!true) {
            _context42.n = 5;
            break;
          }
          info = g.next();
          if (!info.done) {
            _context42.n = 1;
            break;
          }
          return _context42.a(2);
        case 1:
          if (!(info.value < stop)) {
            _context42.n = 3;
            break;
          }
          _context42.n = 2;
          return info.value;
        case 2:
          _context42.n = 4;
          break;
        case 3:
          return _context42.a(2);
        case 4:
          _context42.n = 0;
          break;
        case 5:
          return _context42.a(2);
      }
    }, _marked34);
  }
  it("should generate a lot of plausible values", function () {
    var g = gen(10, 2);
    assert.deepEqual(g.next(), {
      value: 10,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: 12,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: 14,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: 16,
      done: false
    });
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
    check(/*#__PURE__*/babelHelpers.regenerator().m(function _callee4(x, y) {
      return babelHelpers.regenerator().w(function (_context43) {
        while (1) switch (_context43.n) {
          case 0:
            _context43.n = 1;
            return x;
          case 1:
            _context43.n = 2;
            return y;
          case 2:
            _context43.n = 3;
            return x + y;
          case 3:
            return _context43.a(2, x * y);
        }
      }, _callee4);
    })(3, 7), [3, 7, 10], 21);
  });
});
describe("generator reentry attempt", function () {
  var _marked35 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
  function gen(x) {
    var _t55;
    return babelHelpers.regenerator().w(function (_context44) {
      while (1) switch (_context44.p = _context44.n) {
        case 0:
          _context44.p = 0;
          _context44.n = 1;
          return x;
        case 1:
          _context44.v.next(x);
          _context44.n = 3;
          break;
        case 2:
          _context44.p = 2;
          _t55 = _context44.v;
          _context44.n = 3;
          return _t55;
        case 3:
          return _context44.a(2, x + 1);
      }
    }, _marked35, null, [[0, 2]]);
  }
  it("should complain with a TypeError", function () {
    var g = gen(3);
    assert.deepEqual(g.next(), {
      value: 3,
      done: false
    });
    var complaint = g.next(g); // Sending the generator to itself.
    assert.ok(complaint.value instanceof Error);
    assert.strictEqual(complaint.value.message, "Generator is already running");
    assert.deepEqual(g.next(), {
      value: 4,
      done: true
    });
  });
});
describe("delegated yield", function () {
  it("should delegate correctly", function () {
    var _marked36 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(condition) {
      return babelHelpers.regenerator().w(function (_context45) {
        while (1) switch (_context45.n) {
          case 0:
            _context45.n = 1;
            return 0;
          case 1:
            if (!condition) {
              _context45.n = 4;
              break;
            }
            _context45.n = 2;
            return 1;
          case 2:
            return _context45.d(babelHelpers.regeneratorValues(gen(false)), 3);
          case 3:
            _context45.n = 4;
            return 2;
          case 4:
            _context45.n = 5;
            return 3;
          case 5:
            return _context45.a(2);
        }
      }, _marked36);
    }
    check(gen(true), [0, 1, 0, 3, 2, 3]);
    check(gen(false), [0, 3]);
  });
  it("should cope with empty delegatees", function () {
    var _marked37 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(condition) {
      return babelHelpers.regenerator().w(function (_context46) {
        while (1) switch (_context46.n) {
          case 0:
            if (!condition) {
              _context46.n = 3;
              break;
            }
            _context46.n = 1;
            return 0;
          case 1:
            return _context46.d(babelHelpers.regeneratorValues(gen(false)), 2);
          case 2:
            _context46.n = 3;
            return 1;
          case 3:
            return _context46.a(2);
        }
      }, _marked37);
    }
    check(gen(true), [0, 1]);
    check(gen(false), []);
  });
  it("should support deeper nesting", function () {
    var _marked38 = /*#__PURE__*/babelHelpers.regenerator().m(outer),
      _marked39 = /*#__PURE__*/babelHelpers.regenerator().m(middle),
      _marked40 = /*#__PURE__*/babelHelpers.regenerator().m(inner);
    function outer(n) {
      return babelHelpers.regenerator().w(function (_context47) {
        while (1) switch (_context47.n) {
          case 0:
            _context47.n = 1;
            return n;
          case 1:
            return _context47.d(babelHelpers.regeneratorValues(middle(n - 1, inner(n + 10))), 2);
          case 2:
            _context47.n = 3;
            return n + 1;
          case 3:
            return _context47.a(2);
        }
      }, _marked38);
    }
    function middle(n, plusTen) {
      return babelHelpers.regenerator().w(function (_context48) {
        while (1) switch (_context48.n) {
          case 0:
            _context48.n = 1;
            return n;
          case 1:
            return _context48.d(babelHelpers.regeneratorValues(inner(n - 1)), 2);
          case 2:
            _context48.n = 3;
            return n + 1;
          case 3:
            return _context48.d(babelHelpers.regeneratorValues(plusTen), 4);
          case 4:
            return _context48.a(2);
        }
      }, _marked39);
    }
    function inner(n) {
      return babelHelpers.regenerator().w(function (_context49) {
        while (1) switch (_context49.n) {
          case 0:
            _context49.n = 1;
            return n;
          case 1:
            return _context49.a(2);
        }
      }, _marked40);
    }
    check(outer(5), [5, 4, 3, 5, 15, 6]);
  });
  it("should pass sent values through", function () {
    var _marked41 = /*#__PURE__*/babelHelpers.regenerator().m(outer),
      _marked42 = /*#__PURE__*/babelHelpers.regenerator().m(inner);
    function outer(n) {
      return babelHelpers.regenerator().w(function (_context50) {
        while (1) switch (_context50.n) {
          case 0:
            return _context50.d(babelHelpers.regeneratorValues(inner(n << 1)), 1);
          case 1:
            _context50.n = 2;
            return "zxcv";
          case 2:
            return _context50.a(2);
        }
      }, _marked41);
    }
    function inner(n) {
      return babelHelpers.regenerator().w(function (_context51) {
        while (1) switch (_context51.n) {
          case 0:
            _context51.n = 1;
            return n;
          case 1:
            _context51.n = 2;
            return _context51.v;
          case 2:
            _context51.n = 3;
            return _context51.v;
          case 3:
            return _context51.a(2, _context51.v);
        }
      }, _marked42);
    }
    var g = outer(3);
    assert.deepEqual(g.next(), {
      value: 6,
      done: false
    });
    assert.deepEqual(g.next(1), {
      value: 1,
      done: false
    });
    assert.deepEqual(g.next(2), {
      value: 2,
      done: false
    });
    assert.deepEqual(g.next(4), {
      value: "zxcv",
      done: false
    });
    assert.deepEqual(g.next(5), {
      value: void 0,
      done: true
    });
  });
  it("should be governed by enclosing try statements", function () {
    var _marked43 = /*#__PURE__*/babelHelpers.regenerator().m(outer),
      _marked44 = /*#__PURE__*/babelHelpers.regenerator().m(inner);
    var error = new Error("thrown");
    function outer(n) {
      var _t56;
      return babelHelpers.regenerator().w(function (_context52) {
        while (1) switch (_context52.p = _context52.n) {
          case 0:
            _context52.p = 0;
            _context52.n = 1;
            return 0;
          case 1:
            return _context52.d(babelHelpers.regeneratorValues(inner(n)), 2);
          case 2:
            _context52.n = 3;
            return 1;
          case 3:
            _context52.n = 5;
            break;
          case 4:
            _context52.p = 4;
            _t56 = _context52.v;
            _context52.n = 5;
            return _t56.message;
          case 5:
            _context52.n = 6;
            return 4;
          case 6:
            return _context52.a(2);
        }
      }, _marked43, null, [[0, 4]]);
    }
    function inner(n) {
      return babelHelpers.regenerator().w(function (_context53) {
        while (1) switch (_context53.p = _context53.n) {
          case 0:
            if (!(n-- > 0)) {
              _context53.n = 5;
              break;
            }
            _context53.p = 1;
            if (n === 3) {
              raise(error);
            }
          case 2:
            _context53.p = 2;
            _context53.n = 3;
            return n;
          case 3:
            return _context53.f(2);
          case 4:
            _context53.n = 0;
            break;
          case 5:
            return _context53.a(2);
        }
      }, _marked44, null, [[1,, 2, 4]]);
    }
    check(outer(3), [0, 2, 1, 0, 1, 4]);
    check(outer(5), [0, 4, 3, "thrown", 4]);
  });
  it("should dispatch .thrown exceptions correctly", function () {
    var _marked45 = /*#__PURE__*/babelHelpers.regenerator().m(gen),
      _marked46 = /*#__PURE__*/babelHelpers.regenerator().m(inner);
    var count = 0;
    function gen() {
      var _t57;
      return babelHelpers.regenerator().w(function (_context54) {
        while (1) switch (_context54.p = _context54.n) {
          case 0:
            return _context54.d(babelHelpers.regeneratorValues(inner()), 1);
          case 1:
            _context54.p = 1;
            return _context54.d(babelHelpers.regeneratorValues(inner()), 2);
          case 2:
            _context54.n = 4;
            break;
          case 3:
            _context54.p = 3;
            _t57 = _context54.v;
          case 4:
            return _context54.d(babelHelpers.regeneratorValues(inner()), 5);
          case 5:
            return _context54.a(2, _context54.v);
        }
      }, _marked45, null, [[1, 3]]);
    }
    function inner() {
      return babelHelpers.regenerator().w(function (_context55) {
        while (1) switch (_context55.n) {
          case 0:
            _context55.n = 1;
            return count++;
          case 1:
            return _context55.a(2, _context55.v);
        }
      }, _marked46);
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
    var _marked47 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    var throwee = new Error("argument to gen.throw");
    var thrownFromThrow = new Error("thrown from throw method");
    var thrownFromReturn = new Error("thrown from return method");
    function gen(delegate) {
      var _t58;
      return babelHelpers.regenerator().w(function (_context56) {
        while (1) switch (_context56.p = _context56.n) {
          case 0:
            _context56.p = 0;
            return _context56.d(babelHelpers.regeneratorValues(delegate), 1);
          case 1:
            return _context56.a(2, _context56.v);
          case 2:
            _context56.p = 2;
            _t58 = _context56.v;
            return _context56.a(2, _t58);
        }
      }, _marked47, null, [[0, 2]]);
    }
    function check(throwMethod, returnMethod) {
      var throwCalled = false;
      var returnCalled = false;
      var count = 0;
      var iterator = {
        next: function () {
          return {
            value: count++,
            done: false
          };
        }
      };
      iterator[Symbol.iterator] = function () {
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
      assert.deepEqual(g.next(), {
        value: 3,
        done: false
      });
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
    checkResult = check(undefined, function () {
      return {
        value: "from return",
        done: true
      };
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
    var checkResult = check(function (thrown) {
      return {
        value: "from throw",
        done: true
      };
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
  it("should not be required to have a .return method", function () {
    var _marked48 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(delegate) {
      return babelHelpers.regenerator().w(function (_context57) {
        while (1) switch (_context57.n) {
          case 0:
            return _context57.d(babelHelpers.regeneratorValues(delegate), 1);
          case 1:
            return _context57.a(2, _context57.v);
        }
      }, _marked48);
    }
    var inner = range(5);
    var iterator = {
      next: inner.next.bind(inner)
    };
    iterator[Symbol.iterator] = function () {
      return this;
    };
    var g = gen(iterator);
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
    if (typeof g.return === "function") {
      var returnResult = g.return(-1);
      if (fullCompatibility) {
        assert.deepEqual(returnResult, {
          value: -1,
          done: true
        });
      }
      assert.deepEqual(g.next(), {
        value: void 0,
        done: true
      });
    }
  });
  it("should execute finally blocks of delegate generators", function () {
    var _marked49 = /*#__PURE__*/babelHelpers.regenerator().m(parent),
      _marked50 = /*#__PURE__*/babelHelpers.regenerator().m(child);
    var markers = [];
    function parent() {
      return babelHelpers.regenerator().w(function (_context58) {
        while (1) switch (_context58.p = _context58.n) {
          case 0:
            _context58.p = 0;
            return _context58.d(babelHelpers.regeneratorValues(child()), 1);
          case 1:
            return _context58.a(2, _context58.v);
          case 2:
            _context58.p = 2;
            markers.push("parent");
            return _context58.f(2);
          case 3:
            return _context58.a(2);
        }
      }, _marked49, null, [[0,, 2, 3]]);
    }
    function child() {
      return babelHelpers.regenerator().w(function (_context59) {
        while (1) switch (_context59.p = _context59.n) {
          case 0:
            _context59.p = 0;
            _context59.n = 1;
            return 1;
          case 1:
            return _context59.a(2, _context59.v);
          case 2:
            _context59.p = 2;
            _context59.n = 3;
            return 2;
          case 3:
            markers.push("child");
            return _context59.f(2);
          case 4:
            return _context59.a(2);
        }
      }, _marked50, null, [[0,, 2, 4]]);
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
  it("should evaluate to the return value of the delegate", function () {
    var _marked51 = /*#__PURE__*/babelHelpers.regenerator().m(inner),
      _marked52 = /*#__PURE__*/babelHelpers.regenerator().m(outer);
    function inner() {
      return babelHelpers.regenerator().w(function (_context60) {
        while (1) switch (_context60.n) {
          case 0:
            _context60.n = 1;
            return 1;
          case 1:
            return _context60.a(2, 2);
        }
      }, _marked51);
    }
    function outer(delegate) {
      return babelHelpers.regenerator().w(function (_context61) {
        while (1) switch (_context61.n) {
          case 0:
            return _context61.d(babelHelpers.regeneratorValues(delegate), 1);
          case 1:
            return _context61.a(2, _context61.v);
        }
      }, _marked52);
    }
    check(outer(inner()), [1], 2);
    var arrayDelegate = [3, 4];
    if (!fullCompatibility) {
      // Node v0.11 doesn't know how to turn arrays into iterators over
      // their elements without a little help.
      arrayDelegate = babelHelpers.regeneratorRuntime().values(arrayDelegate);
    }
    check(outer(arrayDelegate), [3, 4], void 0); // See issue #143.

    if (!fullCompatibility) {
      return;
    }
    var iterator = {
      next: function () {
        return {
          value: "oyez",
          done: true
        };
      }
    };
    iterator[Symbol.iterator] = function () {
      return this;
    };
    check(outer(iterator), [], "oyez");
  });
  it("should work as a subexpression", function () {
    var _marked53 = /*#__PURE__*/babelHelpers.regenerator().m(inner),
      _marked54 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function inner(arg) {
      return babelHelpers.regenerator().w(function (_context62) {
        while (1) switch (_context62.n) {
          case 0:
            return _context62.a(2, arg);
        }
      }, _marked53);
    }
    function gen(delegate) {
      var _t59;
      return babelHelpers.regenerator().w(function (_context63) {
        while (1) switch (_context63.n) {
          case 0:
            return _context63.d(babelHelpers.regeneratorValues(delegate), 1);
          case 1:
            _t59 = _context63.v;
            return _context63.a(2, 1 + _t59);
        }
      }, _marked54);
    }
    check(gen(inner(2)), [], 3);
    check(gen(inner(3)), [], 4);
    if (!fullCompatibility) {
      return;
    }
    var iterator = {
      next: function () {
        return {
          value: "foo",
          done: true
        };
      }
    };
    iterator[Symbol.iterator] = function () {
      return this;
    };
    check(gen(iterator), [], "1foo");
  });
  it("should work with empty string", function () {
    var _marked55 = /*#__PURE__*/babelHelpers.regenerator().m(f);
    function f() {
      return babelHelpers.regenerator().w(function (_context64) {
        while (1) switch (_context64.n) {
          case 0:
            return _context64.d(babelHelpers.regeneratorValues(""), 1);
          case 1:
            return _context64.a(2);
        }
      }, _marked55);
    }
    assert.deepEqual(f().next(), {
      value: undefined,
      done: true
    });
  });
  it("should throw if not iterable", function () {
    var _marked56 = /*#__PURE__*/babelHelpers.regenerator().m(f);
    function f(x) {
      return babelHelpers.regenerator().w(function (_context65) {
        while (1) switch (_context65.n) {
          case 0:
            return _context65.d(babelHelpers.regeneratorValues(x), 1);
          case 1:
            return _context65.a(2);
        }
      }, _marked56);
    }
    assert.throws(() => f(undefined).next(), TypeError);
    assert.throws(() => f(null).next(), TypeError);
    assert.throws(() => f(false).next(), TypeError);
    assert.throws(() => f(true).next(), TypeError);
    assert.throws(() => f(0).next(), TypeError);
    assert.throws(() => f(1).next(), TypeError);
    assert.throws(() => f({}).next(), TypeError);
  });
  it("should throw if the delegated iterable's iterator doesn't have .next", function () {
    var it = /*#__PURE__*/babelHelpers.regenerator().m(function _callee5() {
      return babelHelpers.regenerator().w(function (_context66) {
        while (1) switch (_context66.n) {
          case 0:
            return _context66.d(babelHelpers.regeneratorValues({
              [Symbol.iterator]: x => []
            }), 1);
          case 1:
            return _context66.a(2);
        }
      }, _callee5);
    })();
    assert.throws(() => {
      it.next();
    }, TypeError);
  });
  it("should work with falsy values", function () {
    try {
      var _marked57 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
      Boolean.prototype[Symbol.iterator] = /*#__PURE__*/babelHelpers.regenerator().m(function _callee6() {
        return babelHelpers.regenerator().w(function (_context67) {
          while (1) switch (_context67.n) {
            case 0:
              _context67.n = 1;
              return "Hello";
            case 1:
              return _context67.a(2);
          }
        }, _callee6);
      });
      function gen() {
        return babelHelpers.regenerator().w(function (_context68) {
          while (1) switch (_context68.n) {
            case 0:
              return _context68.d(babelHelpers.regeneratorValues(false), 1);
            case 1:
              return _context68.a(2);
          }
        }, _marked57);
      }
      check(gen(), ["Hello"]);
    } finally {
      delete Boolean.prototype[Symbol.iterator];
    }
  });
});
(fullCompatibility ? describe // run these tests
: xdescribe)(
// skip running these tests
"generator return method", function () {
  it("should work with newborn generators", function () {
    var _marked58 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      return babelHelpers.regenerator().w(function (_context69) {
        while (1) switch (_context69.n) {
          case 0:
            _context69.n = 1;
            return 0;
          case 1:
            return _context69.a(2);
        }
      }, _marked58);
    }
    var g = gen();
    assert.deepEqual(g.return("argument"), {
      value: "argument",
      done: true
    });
    assertAlreadyFinished(g);
  });
  it("should behave as if generator actually returned", function () {
    var _marked59 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    var executedFinally = false;
    function gen() {
      var _t60;
      return babelHelpers.regenerator().w(function (_context70) {
        while (1) switch (_context70.p = _context70.n) {
          case 0:
            _context70.p = 0;
            _context70.n = 1;
            return 0;
          case 1:
            _context70.n = 3;
            break;
          case 2:
            _context70.p = 2;
            _t60 = _context70.v;
            assert.ok(false, "should not have executed the catch handler");
          case 3:
            _context70.p = 3;
            executedFinally = true;
            return _context70.f(3);
          case 4:
            return _context70.a(2);
        }
      }, _marked59, null, [[0, 2, 3, 4]]);
    }
    var g = gen();
    assert.deepEqual(g.next(), {
      value: 0,
      done: false
    });
    assert.deepEqual(g.return("argument"), {
      value: "argument",
      done: true
    });
    assert.strictEqual(executedFinally, true);
    assertAlreadyFinished(g);
  });
  it("should return both delegate and delegator", function () {
    var _marked60 = /*#__PURE__*/babelHelpers.regenerator().m(callee),
      _marked61 = /*#__PURE__*/babelHelpers.regenerator().m(caller);
    var checkpoints = [];
    function callee(errorToThrow) {
      return babelHelpers.regenerator().w(function (_context71) {
        while (1) switch (_context71.p = _context71.n) {
          case 0:
            _context71.p = 0;
            _context71.n = 1;
            return 1;
          case 1:
            _context71.n = 2;
            return 2;
          case 2:
            _context71.p = 2;
            checkpoints.push("callee finally");
            if (!errorToThrow) {
              _context71.n = 3;
              break;
            }
            throw errorToThrow;
          case 3:
            return _context71.f(2);
          case 4:
            return _context71.a(2);
        }
      }, _marked60, null, [[0,, 2, 4]]);
    }
    function caller(errorToThrow) {
      return babelHelpers.regenerator().w(function (_context72) {
        while (1) switch (_context72.p = _context72.n) {
          case 0:
            _context72.p = 0;
            _context72.n = 1;
            return 0;
          case 1:
            return _context72.d(babelHelpers.regeneratorValues(callee(errorToThrow)), 2);
          case 2:
            _context72.n = 3;
            return 3;
          case 3:
            _context72.p = 3;
            checkpoints.push("caller finally");
            return _context72.f(3);
          case 4:
            return _context72.a(2);
        }
      }, _marked61, null, [[0,, 3, 4]]);
    }
    var g1 = caller();
    assert.deepEqual(g1.next(), {
      value: 0,
      done: false
    });
    assert.deepEqual(g1.next(), {
      value: 1,
      done: false
    });
    assert.deepEqual(g1.return(-1), {
      value: -1,
      done: true
    });
    assert.deepEqual(checkpoints, ["callee finally", "caller finally"]);
    var error = new Error("thrown from callee");
    var g2 = caller(error);
    assert.deepEqual(g2.next(), {
      value: 0,
      done: false
    });
    assert.deepEqual(g2.next(), {
      value: 1,
      done: false
    });
    try {
      g2.return(-1);
      assert.ok(false, "should have thrown an exception");
    } catch (thrown) {
      assert.strictEqual(thrown, error);
    }
    assert.deepEqual(checkpoints, ["callee finally", "caller finally", "callee finally", "caller finally"]);
  });
});
describe("function declaration hoisting", function () {
  it("should work even if the declarations are out of order", function () {
    var _marked62 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(n) {
      var increment, halve, decrement;
      return babelHelpers.regenerator().w(function (_context73) {
        while (1) switch (_context73.n) {
          case 0:
            increment = function _increment(x) {
              return x + 1;
            };
            _context73.n = 1;
            return increment(n);
          case 1:
            if (!(n % 2)) {
              _context73.n = 3;
              break;
            }
            decrement = function _decrement(x) {
              return x - 1;
            };
            halve = function _halve(x) {
              return x >> 1;
            };
            _context73.n = 2;
            return halve(decrement(n));
          case 2:
            _context73.n = 4;
            break;
          case 3:
            // The behavior of function declarations nested inside conditional
            // blocks is notoriously underspecified, and in V8 it appears the
            // halve function is still defined when we take this branch, so
            // "undefine" it for consistency with regenerator semantics.
            halve = void 0;
          case 4:
            _context73.n = 5;
            return increment(increment(n));
          case 5:
            return _context73.a(2);
        }
      }, _marked62);
    }
    check(gen(3), [4, 1, 5]);
    check(gen(4), [5, 6]);
  });
  it("should work for nested generator function declarations", function () {
    var _marked64 = /*#__PURE__*/babelHelpers.regenerator().m(outer);
    function outer(n) {
      var _marked63, inner;
      return babelHelpers.regenerator().w(function (_context75) {
        while (1) switch (_context75.n) {
          case 0:
            inner = function _inner(n) {
              return babelHelpers.regenerator().w(function (_context74) {
                while (1) switch (_context74.n) {
                  case 0:
                    _context74.n = 1;
                    return n - 1;
                  case 1:
                    _context74.n = 2;
                    return n;
                  case 2:
                    _context74.n = 3;
                    return n + 1;
                  case 3:
                    return _context74.a(2, _context74.v);
                }
              }, _marked63);
            };
            _marked63 = /*#__PURE__*/babelHelpers.regenerator().m(inner);
            _context75.n = 1;
            return 0;
          case 1:
            assert.ok(babelHelpers.regeneratorRuntime().isGeneratorFunction(inner));
            return _context75.d(babelHelpers.regeneratorValues(inner(n)), 2);
          case 2:
            return _context75.a(2, _context75.v);
        }
      }, _marked64);
    }
    check(outer(2), [0, 1, 2, 3], 4);
  });
  it("should not interfere with function rebinding", function () {
    var _marked65 = /*#__PURE__*/babelHelpers.regenerator().m(toBeRebound);
    function rebindTo(value) {
      var oldValue = toBeRebound;
      toBeRebound = value;
      return oldValue;
    }
    function toBeRebound() {
      var originalValue;
      return babelHelpers.regenerator().w(function (_context76) {
        while (1) switch (_context76.n) {
          case 0:
            originalValue = toBeRebound;
            _context76.n = 1;
            return toBeRebound;
          case 1:
            assert.strictEqual(rebindTo(42), originalValue);
            _context76.n = 2;
            return toBeRebound;
          case 2:
            assert.strictEqual(rebindTo("asdf"), 42);
            _context76.n = 3;
            return toBeRebound;
          case 3:
            return _context76.a(2);
        }
      }, _marked65);
    }
    var original = toBeRebound;
    check(toBeRebound(), [original, 42, "asdf"]);
    function attemptToRebind(value) {
      var oldValue = safe;
      safe = value;
      return oldValue;
    }
    var safe = /*#__PURE__*/babelHelpers.regenerator().m(function safe() {
      var originalValue;
      return babelHelpers.regenerator().w(function (_context77) {
        while (1) switch (_context77.n) {
          case 0:
            originalValue = safe;
            _context77.n = 1;
            return safe;
          case 1:
            assert.strictEqual(attemptToRebind(42), originalValue);
            _context77.n = 2;
            return safe;
          case 2:
            assert.strictEqual(attemptToRebind("asdf"), 42);
            _context77.n = 3;
            return safe;
          case 3:
            return _context77.a(2);
        }
      }, safe);
    });
    original = safe;
    check(safe(), [safe, safe, safe]);
  });
  it("should not interfere with nested function rebinding itself", function () {
    var _marked66 = /*#__PURE__*/babelHelpers.regenerator().m(parent);
    function parent() {
      var toBeRebound;
      return babelHelpers.regenerator().w(function (_context78) {
        while (1) switch (_context78.n) {
          case 0:
            toBeRebound = function _toBeRebound() {
              toBeRebound = 42;
            };
            toBeRebound();
            _context78.n = 1;
            return toBeRebound;
          case 1:
            return _context78.a(2);
        }
      }, _marked66);
    }
    check(parent(), [42]);
  });
});
describe("the arguments object", function () {
  it("should work in simple variadic functions", function () {
    var _marked67 = /*#__PURE__*/babelHelpers.regenerator().m(sum);
    function sum() {
      var result,
        i,
        _args79 = arguments;
      return babelHelpers.regenerator().w(function (_context79) {
        while (1) switch (_context79.n) {
          case 0:
            result = 0;
            i = 0;
          case 1:
            if (!(i < _args79.length)) {
              _context79.n = 3;
              break;
            }
            _context79.n = 2;
            return result += _args79[i];
          case 2:
            ++i;
            _context79.n = 1;
            break;
          case 3:
            return _context79.a(2, result);
        }
      }, _marked67);
    }
    check(sum(1, 2, 3), [1, 3, 6], 6);
    check(sum(9, -5, 3, 0, 2), [9, 4, 7, 7, 9], 9);
  });
  it("should alias function parameters", function () {
    var _marked68 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(x, y) {
      var temp,
        _args80 = arguments;
      return babelHelpers.regenerator().w(function (_context80) {
        while (1) switch (_context80.n) {
          case 0:
            _context80.n = 1;
            return x;
          case 1:
            ++_args80[0];
            _context80.n = 2;
            return x;
          case 2:
            _context80.n = 3;
            return y;
          case 3:
            --_args80[1];
            _context80.n = 4;
            return y;
          case 4:
            temp = y;
            y = x;
            x = temp;
            _context80.n = 5;
            return x;
          case 5:
            _context80.n = 6;
            return y;
          case 6:
            return _context80.a(2);
        }
      }, _marked68);
    }
    check(gen(3, 7), [3, 4, 7, 6, 6, 4]);
    check(gen(10, -5), [10, 11, -5, -6, -6, 11]);
  });
  it("should be shadowable by explicit declarations (sloppy)", function () {
    var _marked69 = /*#__PURE__*/babelHelpers.regenerator().m(asParameter),
      _marked70 = /*#__PURE__*/babelHelpers.regenerator().m(asVariable);
    function asParameter(x, arguments) {
      var _args81 = arguments;
      return babelHelpers.regenerator().w(function (_context81) {
        while (1) switch (_context81.n) {
          case 0:
            _args81 = _args81 + 1;
            _context81.n = 1;
            return x + _args81;
          case 1:
            return _context81.a(2);
        }
      }, _marked69);
    }
    check(asParameter(4, 5), [10]);
    check(asParameter("asdf", "zxcv"), ["asdfzxcv1"]);
    function asVariable(x) {
      var arguments,
        _args82 = arguments;
      return babelHelpers.regenerator().w(function (_context82) {
        while (1) switch (_context82.n) {
          case 0:
            // TODO References to arguments before the variable declaration
            // seem to see the object instead of the undefined value.
            _args82 = x + 1;
            _context82.n = 1;
            return _args82;
          case 1:
            return _context82.a(2);
        }
      }, _marked70);
    }
    check(asVariable(4), [5]);
    check(asVariable("asdf"), ["asdf1"]);
  });
  it("should not get confused by properties", function () {
    var _marked71 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(args) {
      var obj;
      return babelHelpers.regenerator().w(function (_context83) {
        while (1) switch (_context83.n) {
          case 0:
            obj = {
              arguments: args
            };
            _context83.n = 1;
            return obj.arguments;
          case 1:
            obj.arguments = "oyez";
            _context83.n = 2;
            return obj;
          case 2:
            return _context83.a(2);
        }
      }, _marked71);
    }
    check(gen(42), [42, {
      arguments: "oyez"
    }]);
  });
  it("supports .callee", function () {
    var _marked72 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(doYield) {
      var _args84 = arguments;
      return babelHelpers.regenerator().w(function (_context84) {
        while (1) switch (_context84.n) {
          case 0:
            _context84.n = 1;
            return 1;
          case 1:
            if (!doYield) {
              _context84.n = 3;
              break;
            }
            _context84.n = 2;
            return 2;
          case 2:
            _context84.n = 6;
            break;
          case 3:
            _context84.n = 4;
            return 3;
          case 4:
            return _context84.d(babelHelpers.regeneratorValues(_args84.callee(true)), 5);
          case 5:
            _context84.n = 6;
            return 4;
          case 6:
            _context84.n = 7;
            return 5;
          case 7:
            return _context84.a(2);
        }
      }, _marked72);
    }
    check(gen(false), [1, 3, 1, 2, 5, 4, 5]);
  });
});
describe("the this object", function () {
  it("should default to undefined (strict)", function () {
    var _marked73 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      "use strict";

      return babelHelpers.regenerator().w(function (_context85) {
        while (1) switch (_context85.n) {
          case 0:
            _context85.n = 1;
            return this;
          case 1:
            return _context85.a(2, this);
        }
      }, _marked73, this);
    }
    var it = gen();
    assert.strictEqual(it.next().value, undefined);
    assert.strictEqual(it.next().value, undefined);
  });
  it("should respect .call's this", function () {
    var _marked74 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      return babelHelpers.regenerator().w(function (_context86) {
        while (1) switch (_context86.n) {
          case 0:
            _context86.n = 1;
            return this;
          case 1:
            return _context86.a(2, this);
        }
      }, _marked74, this);
    }
    var self = {};
    var it = gen.call(self);
    assert.strictEqual(it.next().value, self);
    assert.strictEqual(it.next().value, self);
  });
  it("shouldn't capture this when not needed", function () {
    var _marked75 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    // https://github.com/babel/babel/issues/4056

    function gen() {
      return babelHelpers.regenerator().w(function (_context87) {
        while (1) switch (_context87.n) {
          case 0:
            return _context87.a(2, 0);
        }
      }, _marked75);
    }
    var source = String(gen);
    assert.strictEqual(source.indexOf("this"), -1);
  });
});
describe("directive strings", function () {
  var _marked76 = /*#__PURE__*/babelHelpers.regenerator().m(strict),
    _marked77 = /*#__PURE__*/babelHelpers.regenerator().m(sloppy);
  function strict() {
    "use strict";

    return babelHelpers.regenerator().w(function (_context88) {
      while (1) switch (_context88.n) {
        case 0:
          _context88.n = 1;
          return !this;
        case 1:
          return _context88.a(2);
      }
    }, _marked76, this);
  }
  function sloppy() {
    return babelHelpers.regenerator().w(function (_context89) {
      while (1) switch (_context89.n) {
        case 0:
          _context89.n = 1;
          return !this;
        case 1:
          return _context89.a(2);
      }
    }, _marked77, this);
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
describe("catch parameter shadowing", function () {
  it("should leave outer variables unmodified", function () {
    var _marked78 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(x) {
      var y, _t61, _t62;
      return babelHelpers.regenerator().w(function (_context90) {
        while (1) switch (_context90.p = _context90.n) {
          case 0:
            y = x + 1;
            _context90.p = 1;
            throw x + 2;
          case 2:
            _context90.p = 2;
            _t61 = _context90.v;
            _context90.n = 3;
            return _t61;
          case 3:
            _t61 += 1;
            _context90.n = 4;
            return _t61;
          case 4:
            _context90.n = 5;
            return x;
          case 5:
            _context90.p = 5;
            throw x + 3;
          case 6:
            _context90.p = 6;
            _t62 = _context90.v;
            _context90.n = 7;
            return _t62;
          case 7:
            _t62 *= 2;
            _context90.n = 8;
            return _t62;
          case 8:
            _context90.n = 9;
            return y;
          case 9:
            return _context90.a(2);
        }
      }, _marked78, null, [[5, 6], [1, 2]]);
    }
    check(gen(1), [3, 4, 1, 4, 8, 2]);
    check(gen(2), [4, 5, 2, 5, 10, 3]);
  });

  // This test will be fixed by https://github.com/babel/babel/pull/4880.
  (fullCompatibility ? xit : it)("should not replace variables defined in inner scopes", function () {
    var _marked79 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(x) {
      var _t63;
      return babelHelpers.regenerator().w(function (_context91) {
        while (1) switch (_context91.p = _context91.n) {
          case 0:
            _context91.p = 0;
            throw x;
          case 1:
            _context91.p = 1;
            _t63 = _context91.v;
            _context91.n = 2;
            return _t63;
          case 2:
            _context91.n = 3;
            return function (x) {
              return x += 1;
            }(_t63 + 1);
          case 3:
            _context91.n = 4;
            return function () {
              var x = arguments[0];
              return x * 2;
            }(_t63 + 2);
          case 4:
            _context91.n = 5;
            return function () {
              function notCalled(x) {
                throw x;
              }
              _t63 >>= 1;
              return _t63;
            }();
          case 5:
            _context91.n = 6;
            return _t63 -= 1;
          case 6:
            _context91.n = 7;
            return x;
          case 7:
            return _context91.a(2);
        }
      }, _marked79, null, [[0, 1]]);
    }
    check(gen(10), [10, 12, 24, 5, 4, 10]);
    check(gen(11), [11, 13, 26, 5, 4, 11]);
  });
  it("should allow nested catch parameters of the same name", function () {
    var _marked80 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t64, _t65;
      return babelHelpers.regenerator().w(function (_context92) {
        while (1) switch (_context92.p = _context92.n) {
          case 0:
            _context92.p = 0;
            raise("e1");
            _context92.n = 5;
            break;
          case 1:
            _context92.p = 1;
            _t64 = _context92.v;
            _context92.n = 2;
            return _t64;
          case 2:
            _context92.p = 2;
            raise("e2");
            _context92.n = 4;
            break;
          case 3:
            _context92.p = 3;
            _t65 = _context92.v;
            _context92.n = 4;
            return _t65;
          case 4:
            _context92.n = 5;
            return _t64;
          case 5:
            return _context92.a(2);
        }
      }, _marked80, null, [[2, 3], [0, 1]]);
    }
    check(gen(), ["e1", "e2", "e1"]);
  });
  it("should not interfere with non-referential identifiers", function () {
    var _marked81 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t66;
      return babelHelpers.regenerator().w(function (_context93) {
        while (1) switch (_context93.p = _context93.n) {
          case 0:
            _context93.p = 0;
            _context93.n = 1;
            return 1;
          case 1:
            raise(new Error("oyez"));
            _context93.n = 2;
            return 2;
          case 2:
            _context93.n = 5;
            break;
          case 3:
            _context93.p = 3;
            _t66 = _context93.v;
            _context93.n = 4;
            return 3;
          case 4:
            _t66.e = "e.e";
            _t66[_t66.message] = "e.oyez";
            return _context93.a(2, {
              e: _t66,
              identity: function (x) {
                var e = x;
                return e;
              }
            });
          case 5:
            _context93.n = 6;
            return 4;
          case 6:
            return _context93.a(2);
        }
      }, _marked81, null, [[0, 3]]);
    }
    var g = gen();
    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: 3,
      done: false
    });
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
    var _marked82 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(x) {
      return babelHelpers.regenerator().w(function (_context94) {
        while (1) switch (_context94.n) {
          case 0:
            while (x) {
              // empty while loop
            }
            do {
              // empty do-while loop
            } while (x);
            return _context94.a(2, gen.toString());
        }
      }, _marked82);
    }
    var info = gen(false).next();
    assert.strictEqual(info.done, true);
    assert.ok(/empty while loop/.test(info.value));
    assert.ok(/empty do-while loop/.test(info.value));
  });
});
describe("object literals with multiple yields", function () {
  it("should receive different sent values", function () {
    var _marked83 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(fn) {
      var _t67, _t68, _t69, _t70, _t71, _t72, _t73, _t74;
      return babelHelpers.regenerator().w(function (_context95) {
        while (1) switch (_context95.n) {
          case 0:
            _context95.n = 1;
            return "a";
          case 1:
            _t67 = _context95.v;
            _context95.n = 2;
            return "b";
          case 2:
            _t68 = _context95.v;
            _t69 = fn;
            _context95.n = 3;
            return "c";
          case 3:
            _t70 = _context95.v;
            _context95.n = 4;
            return "d";
          case 4:
            _t71 = _t69(_t70, _context95.v);
            _context95.n = 5;
            return "e";
          case 5:
            _t72 = _context95.v;
            _context95.n = 6;
            return "f";
          case 6:
            _t73 = _context95.v;
            _t74 = [_t72, _t73];
            return _context95.a(2, {
              a: _t67,
              b: _t68,
              c: _t71,
              d: _t74
            });
        }
      }, _marked83);
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
  it("should work after the final call to .next", function () {
    var _marked84 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      return babelHelpers.regenerator().w(function (_context96) {
        while (1) switch (_context96.n) {
          case 0:
            _context96.n = 1;
            return 1;
          case 1:
            return _context96.a(2);
        }
      }, _marked84);
    }
    var g = gen();
    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });
    var exception = new Error("unhandled exception");
    try {
      g.throw(exception);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, exception);
    }
  });
  it("should immediately complete a new-born generator", function () {
    var _marked85 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    var began = false;
    function gen() {
      return babelHelpers.regenerator().w(function (_context97) {
        while (1) switch (_context97.n) {
          case 0:
            began = true;
            _context97.n = 1;
            return 1;
          case 1:
            return _context97.a(2);
        }
      }, _marked85);
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
    var _marked86 = /*#__PURE__*/babelHelpers.regenerator().m(outer),
      _marked87 = /*#__PURE__*/babelHelpers.regenerator().m(inner);
    function outer() {
      var _t75;
      return babelHelpers.regenerator().w(function (_context98) {
        while (1) switch (_context98.p = _context98.n) {
          case 0:
            _context98.p = 0;
            return _context98.d(babelHelpers.regeneratorValues(inner()), 1);
          case 1:
            _context98.n = 3;
            break;
          case 2:
            _context98.p = 2;
            _t75 = _context98.v;
            return _context98.a(2, -1);
          case 3:
            return _context98.a(2, 1);
        }
      }, _marked86, null, [[0, 2]]);
    }
    function inner() {
      var _t76;
      return babelHelpers.regenerator().w(function (_context99) {
        while (1) switch (_context99.p = _context99.n) {
          case 0:
            _context99.p = 0;
            _context99.n = 1;
            return void 0;
          case 1:
            _context99.n = 3;
            break;
          case 2:
            _context99.p = 2;
            _t76 = _context99.v;
            return _context99.a(2);
          case 3:
            return _context99.a(2);
        }
      }, _marked87, null, [[0, 2]]);
    }
    var g = outer();
    g.next();
    assert.equal(g.throw(new Error("foo")).value, 1);
  });
  it("should propagate errors unhandled inside a delegate", function () {
    var _marked88 = /*#__PURE__*/babelHelpers.regenerator().m(outer),
      _marked89 = /*#__PURE__*/babelHelpers.regenerator().m(inner);
    function outer() {
      var _t77;
      return babelHelpers.regenerator().w(function (_context100) {
        while (1) switch (_context100.p = _context100.n) {
          case 0:
            _context100.p = 0;
            return _context100.d(babelHelpers.regeneratorValues(inner()), 1);
          case 1:
            _context100.n = 3;
            break;
          case 2:
            _context100.p = 2;
            _t77 = _context100.v;
            return _context100.a(2, -1);
          case 3:
            return _context100.a(2, 1);
        }
      }, _marked88, null, [[0, 2]]);
    }
    function inner() {
      return babelHelpers.regenerator().w(function (_context101) {
        while (1) switch (_context101.n) {
          case 0:
            _context101.n = 1;
            return void 0;
          case 1:
            return _context101.a(2);
        }
      }, _marked89);
    }
    var g = outer();
    g.next();
    assert.equal(g.throw(new Error("foo")).value, -1);
  });
});
describe("unqualified function calls", function () {
  it("should have a global `this` object", function () {
    var _marked90 = /*#__PURE__*/babelHelpers.regenerator().m(invoke);
    function getThis() {
      return this;
    }

    // This is almost certainly the global object, but there's a chance it
    // might be null or undefined (in strict mode).
    var unqualifiedThis = getThis();
    function invoke() {
      var _t78;
      return babelHelpers.regenerator().w(function (_context102) {
        while (1) switch (_context102.n) {
          case 0:
            _context102.n = 1;
            return "dummy";
          case 1:
            _t78 = _context102.v;
            return _context102.a(2, _t78());
        }
      }, _marked90);
    }
    var g = invoke();
    var info = g.next();
    assert.deepEqual(info, {
      value: "dummy",
      done: false
    });
    info = g.next(getThis);

    // Avoid using assert.strictEqual when the arguments might equal the
    // global object, since JSON.stringify chokes on circular structures.
    assert.ok(info.value === unqualifiedThis);
    assert.strictEqual(info.done, true);
  });
});
describe("yield* expression results", function () {
  it("have correct values", function () {
    var _marked91 = /*#__PURE__*/babelHelpers.regenerator().m(foo),
      _marked92 = /*#__PURE__*/babelHelpers.regenerator().m(bar);
    function foo() {
      return babelHelpers.regenerator().w(function (_context103) {
        while (1) switch (_context103.n) {
          case 0:
            _context103.n = 1;
            return 0;
          case 1:
            return _context103.d(babelHelpers.regeneratorValues(bar()), 2);
          case 2:
            return _context103.a(2, _context103.v);
        }
      }, _marked91);
    }
    function bar() {
      return babelHelpers.regenerator().w(function (_context104) {
        while (1) switch (_context104.n) {
          case 0:
            _context104.n = 1;
            return 1;
          case 1:
            return _context104.a(2, 2);
        }
      }, _marked92);
    }
    check(foo(), [0, 1], 2);
  });
  it("can be used in complex expressions", function () {
    var _marked93 = /*#__PURE__*/babelHelpers.regenerator().m(foo),
      _marked94 = /*#__PURE__*/babelHelpers.regenerator().m(bar);
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
      var _t79, _t80;
      return babelHelpers.regenerator().w(function (_context105) {
        while (1) switch (_context105.n) {
          case 0:
            return _context105.d(babelHelpers.regeneratorValues(bar()), 1);
          case 1:
            _t79 = _context105.v;
            return _context105.d(babelHelpers.regeneratorValues(bar()), 2);
          case 2:
            _t80 = _context105.v;
            return _context105.a(2, _t79 + _t80);
        }
      }, _marked93);
    }
    function bar() {
      var _t81, _t82;
      return babelHelpers.regenerator().w(function (_context106) {
        while (1) switch (_context106.n) {
          case 0:
            _context106.n = 1;
            return 2;
          case 1:
            _t81 = _context106.v;
            _context106.n = 2;
            return 3;
          case 2:
            _t82 = _context106.v;
            return _context106.a(2, _t81 + _t82);
        }
      }, _marked94);
    }
    assert.strictEqual(pumpNumber(bar()), 5);
    assert.strictEqual(pumpNumber(foo()), 10);
  });
});
describe("isGeneratorFunction", function () {
  it("should work for function declarations", function () {
    var _marked95 = /*#__PURE__*/babelHelpers.regenerator().m(genFun);
    // Do the assertions up here to make sure the generator function is
    // marked at the beginning of the block the function is declared in.
    assert.strictEqual(babelHelpers.regeneratorRuntime().isGeneratorFunction(genFun), true);
    assert.strictEqual(babelHelpers.regeneratorRuntime().isGeneratorFunction(normalFun), false);
    function normalFun() {
      return 0;
    }
    function genFun() {
      return babelHelpers.regenerator().w(function (_context107) {
        while (1) switch (_context107.n) {
          case 0:
            _context107.n = 1;
            return 0;
          case 1:
            return _context107.a(2);
        }
      }, _marked95);
    }
  });
  it("should work for function expressions", function () {
    assert.strictEqual(babelHelpers.regeneratorRuntime().isGeneratorFunction(/*#__PURE__*/babelHelpers.regenerator().m(function genFun() {
      return babelHelpers.regenerator().w(function (_context108) {
        while (1) switch (_context108.n) {
          case 0:
            _context108.n = 1;
            return 0;
          case 1:
            return _context108.a(2);
        }
      }, genFun);
    })), true);
    assert.strictEqual(babelHelpers.regeneratorRuntime().isGeneratorFunction(function normalFun() {
      return 0;
    }), false);
  });
});
describe("new expressions", function () {
  it("should be able to contain yield sub-expressions", function () {
    var _marked96 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function A(first, second) {
      this.first = first;
      this.second = second;
    }
    function gen() {
      var _t83, _t84, _t85;
      return babelHelpers.regenerator().w(function (_context109) {
        while (1) switch (_context109.n) {
          case 0:
            _context109.n = 1;
            return 0;
          case 1:
            _t83 = _context109.v;
            _context109.n = 2;
            return 1;
          case 2:
            _t84 = _context109.v;
            _context109.n = 3;
            return 2;
          case 3:
            _t85 = _context109.v;
            _context109.n = 4;
            return new _t83(_t84, _t85);
          case 4:
            return _context109.a(2, _context109.v);
        }
      }, _marked96);
    }
    var g = gen();
    assert.deepEqual(g.next(), {
      value: 0,
      done: false
    });
    assert.deepEqual(g.next(A), {
      value: 1,
      done: false
    });
    assert.deepEqual(g.next("asdf"), {
      value: 2,
      done: false
    });
    var info = g.next("zxcv");
    assert.strictEqual(info.done, false);
    assert.ok(info.value instanceof A);
    assert.strictEqual(info.value.first, "asdf");
    assert.strictEqual(info.value.second, "zxcv");
    assert.deepEqual(g.next("qwer"), {
      value: "qwer",
      done: true
    });
  });
});
describe("block binding", function () {
  it("should translate block binding correctly", function () {
    "use strict";

    var _marked97 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var a$0, a$1, a;
      return babelHelpers.regenerator().w(function (_context110) {
        while (1) switch (_context110.n) {
          case 0:
            a$0 = 0, a$1 = 1;
            a = 3;
            a = 1;
            _context110.n = 1;
            return a + a$0;
          case 1:
            a = 2;
            _context110.n = 2;
            return a - 1 + a$1;
          case 2:
            _context110.n = 3;
            return a;
          case 3:
            return _context110.a(2);
        }
      }, _marked97);
    }
    var g = gen();
    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: 2,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: 3,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: void 0,
      done: true
    });
  });
  it("should translate block binding with iife correctly", function () {
    "use strict";

    var _marked98 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var arr, x, y;
      return babelHelpers.regenerator().w(function (_context111) {
        while (1) switch (_context111.n) {
          case 0:
            arr = [];
            for (x = 0; x < 3; x++) {
              y = x;
              arr.push(function () {
                return y;
              });
            }
          case 1:
            if (!(x = arr.pop())) {
              _context111.n = 3;
              break;
            }
            _context111.n = 2;
            return x;
          case 2:
            _context111.n = 1;
            break;
          case 3:
            return _context111.a(2);
        }
      }, _marked98);
    }
    var g = gen();
    assert.equal(g.next().value(), 2);
    assert.equal(g.next().value(), 1);
    assert.equal(g.next().value(), 0);
    assert.deepEqual(g.next(), {
      value: void 0,
      done: true
    });
  });
});
describe("newborn generators", function () {
  it("should be able to yield* non-newborn generators", function () {
    var _marked99 = /*#__PURE__*/babelHelpers.regenerator().m(inner),
      _marked100 = /*#__PURE__*/babelHelpers.regenerator().m(outer);
    function inner() {
      var _t86, _t87;
      return babelHelpers.regenerator().w(function (_context112) {
        while (1) switch (_context112.n) {
          case 0:
            _context112.n = 1;
            return 1;
          case 1:
            _t86 = _context112.v;
            _context112.n = 2;
            return 2;
          case 2:
            _t87 = _context112.v;
            return _context112.a(2, [_t86, _t87]);
        }
      }, _marked99);
    }
    function outer(delegate) {
      return babelHelpers.regenerator().w(function (_context113) {
        while (1) switch (_context113.n) {
          case 0:
            return _context113.d(babelHelpers.regeneratorValues(delegate), 1);
          case 1:
            return _context113.a(2, _context113.v);
        }
      }, _marked100);
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
    var _marked101 = /*#__PURE__*/babelHelpers.regenerator().m(inner);
    var markers = [];
    function inner() {
      var sent1, sent2;
      return babelHelpers.regenerator().w(function (_context114) {
        while (1) switch (_context114.n) {
          case 0:
            markers.push(0);
            _context114.n = 1;
            return 1;
          case 1:
            sent1 = _context114.v;
            markers.push(2);
            _context114.n = 2;
            return 2;
          case 2:
            sent2 = _context114.v;
            markers.push(3);
            return _context114.a(2, [sent1, sent2]);
        }
      }, _marked101);
    }
    function wrapper(delegate) {
      var gen = /*#__PURE__*/babelHelpers.regenerator().m(function _callee7() {
        var sent, info;
        return babelHelpers.regenerator().w(function (_context115) {
          while (1) switch (_context115.n) {
            case 0:
              _context115.n = 1;
              return "ignored";
            case 1:
              sent = _context115.v;
              markers.push(1);
            case 2:
              if ((info = delegate.next(sent)).done) {
                _context115.n = 4;
                break;
              }
              _context115.n = 3;
              return info.value;
            case 3:
              sent = _context115.v;
              _context115.n = 2;
              break;
            case 4:
              markers.push(4);
              return _context115.a(2, info.value);
          }
        }, _callee7);
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
    var _marked102 = /*#__PURE__*/babelHelpers.regenerator().m(range),
      _marked103 = /*#__PURE__*/babelHelpers.regenerator().m(chain),
      _marked104 = /*#__PURE__*/babelHelpers.regenerator().m(y3),
      _marked105 = /*#__PURE__*/babelHelpers.regenerator().m(y5);
    function range(n) {
      var i;
      return babelHelpers.regenerator().w(function (_context116) {
        while (1) switch (_context116.n) {
          case 0:
            i = 0;
          case 1:
            if (!(i < n)) {
              _context116.n = 3;
              break;
            }
            _context116.n = 2;
            return i;
          case 2:
            ++i;
            _context116.n = 1;
            break;
          case 3:
            return _context116.a(2);
        }
      }, _marked102);
    }
    function chain(a, b) {
      return babelHelpers.regenerator().w(function (_context117) {
        while (1) switch (_context117.n) {
          case 0:
            return _context117.d(babelHelpers.regeneratorValues(a), 1);
          case 1:
            return _context117.d(babelHelpers.regeneratorValues(b), 2);
          case 2:
            return _context117.a(2);
        }
      }, _marked103);
    }
    check(chain(range(3), range(5)), [0, 1, 2, 0, 1, 2, 3, 4]);
    function y3(x) {
      return babelHelpers.regenerator().w(function (_context118) {
        while (1) switch (_context118.n) {
          case 0:
            _context118.n = 1;
            return x;
          case 1:
            _context118.n = 2;
            return _context118.v;
          case 2:
            _context118.n = 3;
            return _context118.v;
          case 3:
            return _context118.a(2, _context118.v);
        }
      }, _marked104);
    }
    function y5(x) {
      return babelHelpers.regenerator().w(function (_context119) {
        while (1) switch (_context119.n) {
          case 0:
            _context119.n = 1;
            return x;
          case 1:
            _context119.n = 2;
            return _context119.v;
          case 2:
            _context119.n = 3;
            return _context119.v;
          case 3:
            _context119.n = 4;
            return _context119.v;
          case 4:
            _context119.n = 5;
            return _context119.v;
          case 5:
            return _context119.a(2, _context119.v);
        }
      }, _marked105);
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
    var _marked106 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    var e1 = "first";
    var e2 = "second";
    var e3 = "third";
    var e4 = "fourth";
    function gen(n, which) {
      var i;
      return babelHelpers.regenerator().w(function (_context120) {
        while (1) switch (_context120.p = _context120.n) {
          case 0:
            _context120.p = 0;
            _context120.n = 1;
            return 0;
          case 1:
            raise(e1);
          case 2:
            _context120.p = 2;
            _context120.n = 3;
            return 1;
          case 3:
            i = 0;
          case 4:
            if (!(i < n)) {
              _context120.n = 20;
              break;
            }
            _context120.n = 5;
            return i;
          case 5:
            _context120.p = 5;
            raise(e2);
          case 6:
            _context120.p = 6;
            _context120.n = 7;
            return 2;
          case 7:
            _context120.p = 7;
            raise(e3);
          case 8:
            _context120.p = 8;
            _context120.n = 9;
            return 3;
          case 9:
            _context120.p = 9;
            raise(e4);
          case 10:
            _context120.p = 10;
            _context120.n = 11;
            return 4;
          case 11:
            if (!(which === "break")) {
              _context120.n = 13;
              break;
            }
            _context120.n = 12;
            return "breaking";
          case 12:
            return _context120.a(3, 20);
          case 13:
            if (!(which === "continue")) {
              _context120.n = 15;
              break;
            }
            _context120.n = 14;
            return "continuing";
          case 14:
            return _context120.a(3, 19);
          case 15:
            _context120.n = 16;
            return 5;
          case 16:
            return _context120.f(10);
          case 17:
            return _context120.f(8);
          case 18:
            return _context120.f(6);
          case 19:
            ++i;
            _context120.n = 4;
            break;
          case 20:
            _context120.n = 21;
            return 6;
          case 21:
            return _context120.f(2);
          case 22:
            return _context120.a(2);
        }
      }, _marked106, null, [[9,, 10, 17], [7,, 8, 18], [5,, 6, 19], [0,, 2, 22]]);
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
    var _marked107 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(limit) {
      var i;
      return babelHelpers.regenerator().w(function (_context121) {
        while (1) switch (_context121.n) {
          case 0:
            _context121.n = 1;
            return 0;
          case 1:
            i = 0;
          case 2:
            if (!(i < limit)) {
              _context121.n = 15;
              break;
            }
            _context121.n = 3;
            return 1;
          case 3:
            _context121.n = 4;
            return 2;
          case 4:
            return _context121.a(3, 5);
          case 5:
            if (!(limit === 3)) {
              _context121.n = 12;
              break;
            }
            _context121.n = 6;
            return 4;
          case 6:
            if (!(i === 0)) {
              _context121.n = 7;
              break;
            }
            return _context121.a(3, 12);
          case 7:
            _context121.n = 8;
            return 5;
          case 8:
            if (!(i === 1)) {
              _context121.n = 9;
              break;
            }
            return _context121.a(3, 12);
          case 9:
            _context121.n = 10;
            return 6;
          case 10:
            if (!(i === 2)) {
              _context121.n = 11;
              break;
            }
            return _context121.a(3, 15);
          case 11:
            _context121.n = 12;
            return 7;
          case 12:
            return _context121.a(3, 13);
          case 13:
            _context121.n = 14;
            return 8;
          case 14:
            ++i;
            _context121.n = 2;
            break;
          case 15:
            _context121.n = 16;
            return 9;
          case 16:
            return _context121.a(2);
        }
      }, _marked107);
    }
    check(gen(0), [0, 9]);
    check(gen(1), [0, 1, 2, 8, 9]);
    check(gen(2), [0, 1, 2, 8, 1, 2, 8, 9]);
    check(gen(3), [0, 1, 2, 4, 8, 1, 2, 4, 5, 8, 1, 2, 4, 5, 6, 9]);
  });
});
describe("for loop with var decl and no update expression", function () {
  var _marked108 = /*#__PURE__*/babelHelpers.regenerator().m(range);
  // https://github.com/facebook/regenerator/issues/103
  function range() {
    var i;
    return babelHelpers.regenerator().w(function (_context122) {
      while (1) switch (_context122.n) {
        case 0:
          for (i = 0; false;) {}
        case 1:
          return _context122.a(2);
      }
    }, _marked108);
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
    var _marked109 = /*#__PURE__*/babelHelpers.regenerator().m(f2),
      _marked110 = /*#__PURE__*/babelHelpers.regenerator().m(f),
      _marked111 = /*#__PURE__*/babelHelpers.regenerator().m(f);
    var GeneratorFunctionPrototype = getProto(f);
    var GeneratorFunction = GeneratorFunctionPrototype.constructor;
    assert.strictEqual(GeneratorFunction.name, "GeneratorFunction");
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
    function f2() {
      return babelHelpers.regenerator().w(function (_context123) {
        while (1) switch (_context123.n) {
          case 0:
            _context123.n = 1;
            return 1;
          case 1:
            return _context123.a(2);
        }
      }, _marked109);
    }
    assert.strictEqual(getProto(f), getProto(f2));
    assert.strictEqual(f.hasOwnProperty("constructor"), false);
    assert.strictEqual(getProto(f).constructor.name, "GeneratorFunction");

    // Intentionally at the end to test hoisting.
    function f() {
      return babelHelpers.regenerator().w(function (_context124) {
        while (1) switch (_context124.n) {
          case 0:
            _context124.n = 1;
            return this;
          case 1:
            return _context124.a(2);
        }
      }, _marked110, this);
    }
    function f() {
      return babelHelpers.regenerator().w(function (_context125) {
        while (1) switch (_context125.n) {
          case 0:
            _context125.n = 1;
            return 1;
          case 1:
            return _context125.a(2);
        }
      }, _marked111);
    }
    var f2 = f;
    f = 42;
    var g = f2();
    assert.deepEqual(g.next(), {
      value: 1,
      done: false
    });
    assert.deepEqual(g.next(), {
      value: void 0,
      done: true
    });
    assert.ok(g instanceof f2);
  });
});
describe("for-of loops", function () {
  var arraysAreIterable = typeof Array.prototype[Symbol.iterator] === "function";
  (fullCompatibility && arraysAreIterable ? it : xit)("should work for Arrays", function () {
    var sum = 0;
    var _iterator = babelHelpers.createForOfIteratorHelper([1, 2].concat(3)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var x = _step.value;
        sum += x;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    assert.strictEqual(sum, 6);
  });
  it("should work for generators", function () {
    var value,
      values = [];
    var _iterator2 = babelHelpers.createForOfIteratorHelper(range(3)),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        value = _step2.value;
        values.push(value);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    assert.deepEqual(values, [0, 1, 2]);
  });
  it("should work inside of generators", function () {
    var _marked112 = /*#__PURE__*/babelHelpers.regenerator().m(yieldPermutations);
    function yieldPermutations(list) {
      var count, first, genRest, _iterator3, _step3, perm, i, prefix, suffix, _t88;
      return babelHelpers.regenerator().w(function (_context126) {
        while (1) switch (_context126.p = _context126.n) {
          case 0:
            if (!(list.length < 2)) {
              _context126.n = 2;
              break;
            }
            _context126.n = 1;
            return list;
          case 1:
            return _context126.a(2, 1);
          case 2:
            count = 0;
            first = list.slice(0, 1);
            genRest = yieldPermutations(list.slice(1));
            _iterator3 = babelHelpers.createForOfIteratorHelper(genRest);
            _context126.p = 3;
            _iterator3.s();
          case 4:
            if ((_step3 = _iterator3.n()).done) {
              _context126.n = 9;
              break;
            }
            perm = _step3.value;
            i = 0;
          case 5:
            if (!(i < list.length)) {
              _context126.n = 7;
              break;
            }
            prefix = perm.slice(0, i);
            suffix = perm.slice(i);
            _context126.n = 6;
            return prefix.concat(first, suffix);
          case 6:
            ++i;
            _context126.n = 5;
            break;
          case 7:
            count += i;
          case 8:
            _context126.n = 4;
            break;
          case 9:
            _context126.n = 11;
            break;
          case 10:
            _context126.p = 10;
            _t88 = _context126.v;
            _iterator3.e(_t88);
          case 11:
            _context126.p = 11;
            _iterator3.f();
            return _context126.f(11);
          case 12:
            return _context126.a(2, count);
        }
      }, _marked112, null, [[3, 10, 11, 12]]);
    }
    var count = 0;
    var _iterator4 = babelHelpers.createForOfIteratorHelper(yieldPermutations([])),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var perm = _step4.value;
        assert.deepEqual(perm, []);
        ++count;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    assert.strictEqual(count, 1);
    check(yieldPermutations([1]), [[1]], 1);
    check(yieldPermutations([2, 1]), [[2, 1], [1, 2]], 2);
    check(yieldPermutations([1, 3, 2]), [[1, 3, 2], [3, 1, 2], [3, 2, 1], [1, 2, 3], [2, 1, 3], [2, 3, 1]], 6);
  });
});
describe("expressions containing yield subexpressions", function () {
  it("should evaluate all subexpressions before yielding", function () {
    var _marked113 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen(x) {
      var _t89, _t90;
      return babelHelpers.regenerator().w(function (_context127) {
        while (1) switch (_context127.n) {
          case 0:
            _t89 = x;
            _context127.n = 1;
            return function (y) {
              x = y;
            };
          case 1:
            _t90 = _context127.v;
            return _context127.a(2, _t89 * _t90);
        }
      }, _marked113);
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
    var _marked114 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t91, _t92;
      return babelHelpers.regenerator().w(function (_context128) {
        while (1) switch (_context128.n) {
          case 0:
            _t91 = a.b;
            _context128.n = 1;
            return "asdf";
          case 1:
            _t92 = _context128.v;
            return _context128.a(2, _t91 + _t92);
        }
      }, _marked114);
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
    var _marked115 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t93, _t94, _t95;
      return babelHelpers.regenerator().w(function (_context129) {
        while (1) switch (_context129.n) {
          case 0:
            _t93 = a;
            _context129.n = 1;
            return "asdf";
          case 1:
            _t94 = _context129.v;
            _t95 = a;
            return _context129.a(2, [_t93, _t94, _t95]);
        }
      }, _marked115);
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
    var _marked116 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t96;
      return babelHelpers.regenerator().w(function (_context130) {
        while (1) switch (_context130.n) {
          case 0:
            _t96 = a.slice(0);
            _context130.n = 1;
            return "asdf";
          case 1:
            a = _t96.concat.call(_t96, _context130.v);
            return _context130.a(2, a);
        }
      }, _marked116);
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
    var _marked117 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t97, _t98;
      return babelHelpers.regenerator().w(function (_context131) {
        while (1) switch (_context131.n) {
          case 0:
            _t97 = a;
            _context131.n = 1;
            return "asdf";
          case 1:
            _t98 = _context131.v;
            return _context131.a(2, _t97 + _t98);
        }
      }, _marked117);
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
  it("should work when yield is in an array spread", function () {
    var _marked118 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t99;
      return babelHelpers.regenerator().w(function (_context132) {
        while (1) switch (_context132.n) {
          case 0:
            _context132.n = 1;
            return "foo";
          case 1:
            _t99 = _context132.v;
            return _context132.a(2, [0, ..._t99, 3]);
        }
      }, _marked118);
    }
    var g = gen();
    assert.deepEqual(g.next(), {
      value: "foo",
      done: false
    });
    assert.deepEqual(g.next([1, 2]), {
      value: [0, 1, 2, 3],
      done: true
    });
  });
  it("should work when yield is in a sparse array", function () {
    var _marked119 = /*#__PURE__*/babelHelpers.regenerator().m(gen);
    function gen() {
      var _t100;
      return babelHelpers.regenerator().w(function (_context133) {
        while (1) switch (_context133.n) {
          case 0:
            _context133.n = 1;
            return "foo";
          case 1:
            _t100 = _context133.v;
            return _context133.a(2, [0, _t100,, 3]);
        }
      }, _marked119);
    }
    var g = gen();
    assert.deepEqual(g.next(), {
      value: "foo",
      done: false
    });
    assert.deepEqual(g.next(1), {
      value: [0, 1,, 3],
      done: true
    });
  });
});
