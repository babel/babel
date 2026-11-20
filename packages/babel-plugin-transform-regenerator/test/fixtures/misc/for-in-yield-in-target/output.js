var _marked = /*#__PURE__*/babelHelpers.regenerator().m(gen);
function gen(obj, target) {
  var _t, _t2, _t3, _t4, _t5;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _t = babelHelpers.regeneratorKeys(obj);
      case 1:
        if ((_t2 = _t()).done) {
          _context.n = 4;
          break;
        }
        _context.n = 2;
        return "key";
      case 2:
        _t3 = _context.v;
        target[_t3] = _t2.value;
        _context.n = 3;
        return target;
      case 3:
        _context.n = 1;
        break;
      case 4:
        _t4 = babelHelpers.regeneratorKeys(obj);
      case 5:
        if ((_t5 = _t4()).done) {
          _context.n = 7;
          break;
        }
        _context.n = 6;
        return "object";
      case 6:
        _context.v.key = _t5.value;
        ;
        _context.n = 5;
        break;
      case 7:
        return _context.a(2);
    }
  }, _marked);
}
