var _marked = /*#__PURE__*/babelHelpers.regenerator().m(foo),
  _marked2 = /*#__PURE__*/babelHelpers.regenerator().m(bar);
function foo() {
  var _t, _t2;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        return _context.delegateYield(bar(), 1);
      case 1:
        _t = _context.sent;
        return _context.delegateYield(bar(), 3);
      case 3:
        _t2 = _context.sent;
        return _context.abrupt(2, _t + _t2);
      case 5:
        return _context.stop();
    }
  }, _marked);
}
function bar() {
  var _t3, _t4;
  return babelHelpers.regenerator().w(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return 2;
      case 2:
        _t3 = _context2.sent;
        _context2.next = 5;
        return 3;
      case 5:
        _t4 = _context2.sent;
        return _context2.abrupt(2, _t3 + _t4);
      case 7:
        return _context2.stop();
    }
  }, _marked2);
}
