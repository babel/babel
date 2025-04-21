var _marked = /*#__PURE__*/babelHelpers.regenerator().m(foo),
  _marked2 = /*#__PURE__*/babelHelpers.regenerator().m(bar);
function foo() {
  return babelHelpers.regenerator().w(function foo$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        return _context.delegateYield(bar(), "t0", 1);
      case 1:
        _context.t1 = _context.t0;
        return _context.delegateYield(bar(), "t2", 3);
      case 3:
        _context.t3 = _context.t2;
        return _context.abrupt(4, _context.t1 + _context.t3);
      case 5:
        return _context.stop();
    }
  }, _marked);
}
function bar() {
  return babelHelpers.regenerator().w(function bar$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return 2;
      case 2:
        _context2.t0 = _context2.sent;
        _context2.next = 5;
        return 3;
      case 5:
        _context2.t1 = _context2.sent;
        return _context2.abrupt(4, _context2.t0 + _context2.t1);
      case 7:
        return _context2.stop();
    }
  }, _marked2);
}
