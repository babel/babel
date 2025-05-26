function foo() {
  return _foo.apply(this, arguments);
}
function _foo() {
  _foo = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee2() {
    return babelHelpers.regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.next) {
        case 0:
          /*#__PURE__*/(function () {
            var _ref = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee(number) {
              var tmp;
              return babelHelpers.regenerator().w(function (_context) {
                while (1) switch (_context.p = _context.next) {
                  case 0:
                    tmp = number;
                  case 1:
                    return _context.a(2);
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          })();
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _foo.apply(this, arguments);
}
