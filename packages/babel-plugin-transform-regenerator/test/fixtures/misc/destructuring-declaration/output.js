var _marked = /*#__PURE__*/babelHelpers.regenerator().m(gen);
function gen(obj) {
  var a, rest, c, d, e, f, g, i, h, k, l, _t, _t2;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return obj;
      case 1:
        ({
          a,
          b: [c, d = 1],
          ...rest
        } = _context.v);
        [e,, ...f] = obj.list, {
          g
        } = obj;
        i = 0, {
          h
        } = obj;
      case 2:
        if (!(i < h)) {
          _context.n = 4;
          break;
        }
        _context.n = 3;
        return i;
      case 3:
        i++;
        _context.n = 2;
        break;
      case 4:
        _t = babelHelpers.regeneratorKeys(obj);
      case 5:
        if ((_t2 = _t()).done) {
          _context.n = 7;
          break;
        }
        [k, l] = _t2.value;
        _context.n = 6;
        return k + l;
      case 6:
        _context.n = 5;
        break;
      case 7:
        return _context.a(2, [a, c, d, rest, e, f, g]);
    }
  }, _marked);
}
