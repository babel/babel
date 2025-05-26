function test() {
  return _test.apply(this, arguments);
}
function _test() {
  _test = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
    var obj, _loop, _i, _arr;
    return babelHelpers.regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          obj = {};
          _loop = /*#__PURE__*/babelHelpers.regenerator().m(function _loop() {
            var ch;
            return babelHelpers.regenerator().w(function (_context) {
              while (1) switch (_context.p = _context.n) {
                case 0:
                  ch = _arr[_i];
                  obj[ch] = () => ch;
                case 2:
                  return _context.a(2);
              }
            }, _loop);
          });
          _i = 0, _arr = ["good", "bad"];
        case 3:
          if (!(_i < _arr.length)) {
            _context2.n = 8;
            break;
          }
          return _context2.d(_loop(), 5);
        case 5:
          _i++;
          _context2.n = 3;
          break;
        case 8:
          return _context2.a(2);
      }
    }, _callee);
  }));
  return _test.apply(this, arguments);
}
