var _marked = /*#__PURE__*/babelHelpers.regenerator().m(foo),
  _marked2 = /*#__PURE__*/babelHelpers.regenerator().m(foo3);
function foo() {
  var _bar, bar;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _bar = {
          bar: "bar"
        }, bar = _bar.bar;
        return _context.a(2, bar);
    }
  }, _marked);
}
expect(foo().next().value).toBe("bar");
;
function foo2(_ref) {
  var _ref$bar = _ref.bar,
    bar = _ref$bar === void 0 ? 0 : _ref$bar;
  return /*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
    return babelHelpers.regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          return _context2.a(2, bar);
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
  return babelHelpers.regenerator().w(function (_context4) {
    while (1) switch (_context4.n) {
      case 0:
        _loop = /*#__PURE__*/babelHelpers.regenerator().m(function _callee2() {
          var _yield$iteration, what, value, _t;
          return babelHelpers.regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return "iteration";
              case 1:
                _yield$iteration = _context3.v;
                what = _yield$iteration.what;
                value = _yield$iteration.value;
                _t = what;
                _context3.n = _t === "one" ? 2 : _t === "two" ? 5 : _t === "three" ? 6 : 7;
                break;
              case 2:
                if (!(value === 1)) {
                  _context3.n = 3;
                  break;
                }
                return _context3.a(2, 0);
              case 3:
                if (!(value === 2)) {
                  _context3.n = 4;
                  break;
                }
                return _context3.a(2, 0);
              case 4:
                return _context3.a(3, 7);
              case 5:
                // Removing these 3 lines makes the tests pass.
                ["a", "b"].map(function (v) {
                  return value + v;
                });
                return _context3.a(2, 0);
              case 6:
                return _context3.a(2, 0);
              case 7:
                return _context3.a(2);
            }
          }, _callee2);
        });
      case 1:
        if (!true) {
          _context4.n = 4;
          break;
        }
        return _context4.d(babelHelpers.regeneratorValues(_loop()), 2);
      case 2:
        _ret = _context4.v;
        if (!(_ret === 0)) {
          _context4.n = 3;
          break;
        }
        return _context4.a(3, 4);
      case 3:
        _context4.n = 1;
        break;
      case 4:
        return _context4.a(2);
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
