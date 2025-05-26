var _x$y$a$b = {
    x: 1,
    y: 2,
    a: 3,
    b: 4
  },
  x = _x$y$a$b.x,
  y = _x$y$a$b.y,
  z = babelHelpers.objectWithoutProperties(_x$y$a$b, ["x", "y"]);
var n = babelHelpers.objectSpread2({
  x: x,
  y: y
}, z);
function agf() {
  return _agf.apply(this, arguments);
}
function _agf() {
  _agf = babelHelpers.wrapAsyncGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
    return babelHelpers.regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.n = 2;
          return babelHelpers.awaitAsyncGenerator(1);
        case 2:
          _context.n = 4;
          return 2;
        case 4:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _agf.apply(this, arguments);
}
