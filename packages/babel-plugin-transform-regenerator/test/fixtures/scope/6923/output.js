function foo() {
  return babelHelpers.regeneratorAsync(function (_context2) {
    while (1) switch (_context2.p = _context2.n) {
      case 0:
        (function _callee(number) {
          var tmp;
          return babelHelpers.regeneratorAsync(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                tmp = number;
              case 1:
                return _context.a(2);
            }
          }, null, null, null, Promise);
        });
      case 1:
        return _context2.a(2);
    }
  }, null, null, null, Promise);
}
