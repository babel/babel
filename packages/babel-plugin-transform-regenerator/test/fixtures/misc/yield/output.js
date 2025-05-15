var _marked = /*#__PURE__*/babelHelpers.regenerator().m(foo),
  _marked2 = /*#__PURE__*/babelHelpers.regenerator().m(bar);
function foo() {
  var _t, _t2;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        return _context.d(bar(), 1);
      case 1:
        _t = _context.v;
        return _context.d(bar(), 2);
      case 2:
        _t2 = _context.v;
        return _context.a(2, _t + _t2);
    }
  }, _marked);
}
function bar() {
  var _t3, _t4;
  return babelHelpers.regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        _context2.n = 1;
        return 2;
      case 1:
        _t3 = _context2.v;
        _context2.n = 2;
        return 3;
      case 2:
        _t4 = _context2.v;
        return _context2.a(2, _t3 + _t4);
    }
  }, _marked2);
}
