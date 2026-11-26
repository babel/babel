var _marked = /*#__PURE__*/babelHelpers.regenerator().m(f),
  _marked2 = /*#__PURE__*/babelHelpers.regenerator().m(withInit),
  _marked3 = /*#__PURE__*/babelHelpers.regenerator().m(forNoInit),
  _marked4 = /*#__PURE__*/babelHelpers.regenerator().m(withParam);
function f() {
  var x, _t, _t2;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.n) {
      case 0:
        _context.p = 0;
        throw "outer";
      case 1:
        _context.p = 1;
        _t = _context.v;
        _context.p = 2;
        throw "inner";
      case 3:
        _context.p = 3;
        _t2 = _context.v;
        _context.n = 4;
        return _t2;
      case 4:
        _context.n = 5;
        return _t;
      case 5:
        _context.n = 6;
        return x;
      case 6:
        return _context.a(2);
    }
  }, _marked, null, [[2, 3], [0, 1]]);
}
function withInit() {
  var x, _t3, _t4;
  return babelHelpers.regenerator().w(function (_context2) {
    while (1) switch (_context2.p = _context2.n) {
      case 0:
        _context2.p = 0;
        throw "outer";
      case 1:
        _context2.p = 1;
        _t3 = _context2.v;
        _context2.p = 2;
        throw "inner";
      case 3:
        _context2.p = 3;
        _t4 = _context2.v;
        _t4 = "reassigned";
        _context2.n = 4;
        return _t4;
      case 4:
        _context2.n = 5;
        return _t3;
      case 5:
        _context2.n = 6;
        return x;
      case 6:
        return _context2.a(2);
    }
  }, _marked2, null, [[2, 3], [0, 1]]);
}
function forNoInit() {
  var x, _t5, _t6;
  return babelHelpers.regenerator().w(function (_context3) {
    while (1) switch (_context3.p = _context3.n) {
      case 0:
        _context3.p = 0;
        throw "outer";
      case 1:
        _context3.p = 1;
        _t5 = _context3.v;
        _context3.p = 2;
        throw "inner";
      case 3:
        _context3.p = 3;
        _t6 = _context3.v;
      case 4:
        _context3.n = 5;
        return _t6;
      case 5:
        return _context3.a(3, 7);
      case 6:
        _context3.n = 4;
        break;
      case 7:
        _context3.n = 8;
        return _t5;
      case 8:
        _context3.n = 9;
        return x;
      case 9:
        return _context3.a(2);
    }
  }, _marked3, null, [[2, 3], [0, 1]]);
}
function withParam(x) {
  var _t7, _t8;
  return babelHelpers.regenerator().w(function (_context4) {
    while (1) switch (_context4.p = _context4.n) {
      case 0:
        _context4.p = 0;
        throw "outer";
      case 1:
        _context4.p = 1;
        _t7 = _context4.v;
        _context4.p = 2;
        throw "inner";
      case 3:
        _context4.p = 3;
        _t8 = _context4.v;
        _context4.n = 4;
        return _t8;
      case 4:
        _context4.n = 5;
        return _t7;
      case 5:
        return _context4.a(2, x);
    }
  }, _marked4, null, [[2, 3], [0, 1]]);
}
