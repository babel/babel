function gen() {
  return _gen.apply(this, arguments);
}
function _gen() {
  _gen = babelHelpers.skipFirstGeneratorNext(/*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee() {
    var _functionSent, sent;
    return babelHelpers.regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return;
        case 2:
          _functionSent = _context.sent;
          sent = _functionSent;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _gen.apply(this, arguments);
}
