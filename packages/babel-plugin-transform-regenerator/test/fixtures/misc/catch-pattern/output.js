var _marked = /*#__PURE__*/babelHelpers.regenerator().m(gen);
var message = "outer";
function gen() {
  var _t, _t2, _t3;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.n) {
      case 0:
        _context.p = 0;
        throw new Error("inner");
      case 1:
        _context.p = 1;
        ({
          message: _t,
          cause: [_t2, _t3 = _t2] = []
        } = _context.v);
        _context.n = 2;
        return [_t, _t2, _t3, () => _t];
      case 2:
        _context.n = 3;
        return message;
      case 3:
        return _context.a(2);
    }
  }, _marked, null, [[0, 1]]);
}
