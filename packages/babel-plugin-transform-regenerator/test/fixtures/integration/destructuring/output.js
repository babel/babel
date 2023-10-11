var _marked = /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(foo),
  _marked2 = /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(foo3);
function foo() {
  var _bar, bar;
  return babelHelpers.regeneratorRuntime().wrap(function foo$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _bar = {
          bar: "bar"
        }, bar = _bar.bar;
        return _context.abrupt("return", bar);
      case 2:
      case "end":
        return _context.stop();
    }
  }, _marked);
}
expect(foo().next().value).toBe("bar");
;
function foo2(_ref) {
  var _ref$bar = _ref.bar,
    bar = _ref$bar === void 0 ? 0 : _ref$bar;
  return /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee() {
    return babelHelpers.regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", bar);
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee);
  })();
}
expect(foo2({
  bar: undefined
}).next().value).toBe(0);
expect(foo2({
  bar: 3
}).next().value).toBe(3);
function foo3() {
  var _loop, _ret;
  return babelHelpers.regeneratorRuntime().wrap(function foo3$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        _loop = /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee2() {
          var _yield$iteration, what, value;
          return babelHelpers.regeneratorRuntime().wrap(function _callee2$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return "iteration";
              case 2:
                _yield$iteration = _context3.sent;
                what = _yield$iteration.what;
                value = _yield$iteration.value;
                _context3.t0 = what;
                _context3.next = _context3.t0 === "one" ? 8 : _context3.t0 === "two" ? 15 : _context3.t0 === "three" ? 18 : 20;
                break;
              case 8:
                if (!(value === 1)) {
                  _context3.next = 12;
                  break;
                }
                return _context3.abrupt("return", 0);
              case 12:
                if (!(value === 2)) {
                  _context3.next = 14;
                  break;
                }
                return _context3.abrupt("return", 0);
              case 14:
                return _context3.abrupt("break", 20);
              case 15:
                // Removing these 3 lines makes the tests pass.
                ["a", "b"].map(function (v) {
                  return value + v;
                });
                return _context3.abrupt("return", 0);
              case 18:
                return _context3.abrupt("return", 0);
              case 20:
              case "end":
                return _context3.stop();
            }
          }, _callee2);
        });
      case 1:
        if (!true) {
          _context4.next = 8;
          break;
        }
        return _context4.delegateYield(_loop(), "t0", 3);
      case 3:
        _ret = _context4.t0;
        if (!(_ret === 0)) {
          _context4.next = 6;
          break;
        }
        return _context4.abrupt("break", 8);
      case 6:
        _context4.next = 1;
        break;
      case 8:
      case "end":
        return _context4.stop();
    }
  }, _marked2);
}
var gen3 = foo3();
expect(gen3.next().value).toBe("iteration");
expect(gen3.next({
  what: "one",
  value: 3
}).done).toBe(false);
expect(gen3.next({
  what: "one",
  value: 2
}).done).toBe(true);
var gen4 = foo3();
expect(gen4.next().value).toBe("iteration");
expect(gen4.next({
  what: "two",
  value: "sometext"
}).done).toBe(true);
var gen5 = foo3();
expect(gen5.next().value).toBe("iteration");
expect(gen5.next({
  what: "three"
}).done).toBe(true);
