// #15142
() => {
  var _t;
  return babelHelpers.regeneratorAsync(function (_context) {
    while (1) switch (_context.next) {
      case 0:
        _context.next = 1;
        return babelHelpers.awaitAsyncGenerator(0);
      case 1:
        _t = _context.sent;
        return _context.abrupt(2, [_t,,]);
      case 2:
        return _context.abrupt(2);
    }
  }, null, null, null, Promise);
};
