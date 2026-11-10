var _marked = /*#__PURE__*/babelHelpers.regenerator().m(gBreak),
  _marked2 = /*#__PURE__*/babelHelpers.regenerator().m(gContinue),
  _marked3 = /*#__PURE__*/babelHelpers.regenerator().m(gOuterFinally);
function gBreak() {
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.n) {
      case 0:
        if (!true) {
          _context.n = 6;
          break;
        }
        _context.p = 1;
        _context.p = 2;
        return _context.a(3, 6);
      case 3:
        _context.p = 3;
        breakEvents.push("inner");
        return _context.f(3);
      case 4:
        _context.p = 4;
        breakEvents.push("outer");
        return _context.f(4);
      case 5:
        _context.n = 0;
        break;
      case 6:
        _context.n = 7;
        return "after";
      case 7:
        return _context.a(2);
    }
  }, _marked, null, [[2,, 3, 4], [1,, 4, 5]]);
}
function gContinue() {
  var i;
  return babelHelpers.regenerator().w(function (_context2) {
    while (1) switch (_context2.p = _context2.n) {
      case 0:
        i = 0;
      case 1:
        if (!(i < 2)) {
          _context2.n = 7;
          break;
        }
        _context2.p = 2;
        _context2.p = 3;
        return _context2.a(3, 6);
      case 4:
        _context2.p = 4;
        continueEvents.push("inner-".concat(i));
        return _context2.f(4);
      case 5:
        _context2.p = 5;
        continueEvents.push("outer-".concat(i));
        return _context2.f(5);
      case 6:
        i++;
        _context2.n = 1;
        break;
      case 7:
        _context2.n = 8;
        return "done";
      case 8:
        return _context2.a(2);
    }
  }, _marked2, null, [[3,, 4, 5], [2,, 5, 6]]);
}
function gOuterFinally() {
  return babelHelpers.regenerator().w(function (_context3) {
    while (1) switch (_context3.p = _context3.n) {
      case 0:
        _context3.p = 0;
      case 1:
        if (!true) {
          _context3.n = 7;
          break;
        }
        _context3.p = 2;
        _context3.p = 3;
        return _context3.a(3, 7);
      case 4:
        _context3.p = 4;
        log("a");
        return _context3.f(4);
      case 5:
        _context3.p = 5;
        log("b");
        return _context3.f(5);
      case 6:
        _context3.n = 1;
        break;
      case 7:
        log("afterLoop");
        _context3.n = 8;
        return 1;
      case 8:
        _context3.p = 8;
        log("outer");
        return _context3.f(8);
      case 9:
        return _context3.a(2);
    }
  }, _marked3, null, [[3,, 4, 5], [2,, 5, 6], [0,, 8, 9]]);
}
