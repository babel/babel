function test(fn) {
  return /*#__PURE__*/babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee() {
    var _args = arguments;
    return babelHelpers.regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", fn.apply(void 0, _args));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}
