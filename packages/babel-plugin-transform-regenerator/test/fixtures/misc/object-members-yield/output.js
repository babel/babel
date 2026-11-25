var _marked = /*#__PURE__*/babelHelpers.regenerator().m(gen);
function gen(__proto__) {
  var _t, _t2, _t3, _t4, _t5, _t6;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return "spread";
      case 1:
        _t = _context.v;
        _context.n = 2;
        return "key";
      case 2:
        _t2 = _context.v;
        _context.n = 3;
        return "method";
      case 3:
        _t3 = _context.v;
        _context.n = 4;
        return "getter";
      case 4:
        _t4 = _context.v;
        _t5 = __proto__;
        _context.n = 5;
        return "last";
      case 5:
        _t6 = _context.v;
        return _context.a(2, {
          ..._t,
          [_t2]: 1,
          [_t3]() {},
          get [_t4]() {},
          ["__proto__"]: _t5,
          last: _t6
        });
    }
  }, _marked);
}
