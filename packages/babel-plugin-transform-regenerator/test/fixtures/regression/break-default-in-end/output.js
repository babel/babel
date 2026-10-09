var _marked = /*#__PURE__*/babelHelpers.regenerator().m(iterate);
function iterate(type) {
  var _t;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _t = type;
        _context.n = _t === 0 ? 1 : 2;
        break;
      case 1:
        _context.n = 2;
        return 0;
      case 2:
        return _context.a(3, 3);
      case 3:
        return _context.a(2);
    }
  }, _marked);
}
expect(iterate(1).next().done).toBe(true);
