var _marked = /*#__PURE__*/babelHelpers.regenerator().m(fn);
function fn() {
  var _t, _t2, _t3, _t4, _t5, _t6, _t7;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _t = obj;
        _context.n = 1;
        return;
      case 1:
        _t.prop = _context.v;
        _t2 = obj;
        _t3 = key;
        _context.n = 2;
        return;
      case 2:
        _t2[_t3] = _context.v;
        _t4 = arr;
        _t5 = i++;
        _t6 = _t4[_t5];
        _context.n = 3;
        return;
      case 3:
        _t4[_t5] = _t6 += _context.v;
        _context.n = 4;
        return;
      case 4:
        this.x = _context.v;
        _t7 = obj;
        _context.n = 5;
        return;
      case 5:
        _t7["literal"] = _context.v;
      case 6:
        return _context.a(2);
    }
  }, _marked, this);
}
