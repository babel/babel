function foo() {
  return babelHelpers.regeneratorRuntime().async(function foo$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        (function _callee(number) {
          var tmp;
          return babelHelpers.regeneratorRuntime().async(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                tmp = number;
              case 1:
              case "end":
                return _context.stop();
            }
          }, null, null, null, Promise);
        });
      case 1:
      case "end":
        return _context2.stop();
    }
  }, null, null, null, Promise);
}
