var _marked = /*#__PURE__*/babelHelpers.regenerator().m(foobar);
function foobar() {
  var _t;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.n) {
      case 0:
        _context.p = 0;
        _context.n = 1;
        return 1;
      case 1:
        _context.n = 3;
        break;
      case 2:
        _context.p = 2;
        _t = _context.v;
        return _context.a(2, false);
      case 3:
        return _context.a(2);
    }
  }, _marked, null, [[0, 2]]);
}
var gen = foobar();
expect(gen.next().value).toBe(1);
expect(gen.next().value).toBe(undefined);
