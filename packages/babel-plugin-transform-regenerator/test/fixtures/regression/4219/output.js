function test(fn) {
  return /*#__PURE__*/babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
    var _args = arguments;
    return babelHelpers.regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          return _context.a(2, fn.apply(void 0, _args));
      }
    }, _callee);
  }));
}
