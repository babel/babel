function foo() {
  return babelHelpers.callAsync(/*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee2() {
    return babelHelpers.regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          (function (_x) {
            return babelHelpers.callAsync(/*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee(number) {
              var tmp;
              return babelHelpers.regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    tmp = number;
                  case 1:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }), this, arguments);
          });
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }), this, arguments);
}
