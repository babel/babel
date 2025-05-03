/*#__PURE__*/React.createElement(Component, null, () => {
  const saveSession = () => {
    var newSessionId;
    return babelHelpers.regeneratorAsync(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return babelHelpers.awaitAsyncGenerator(someAsyncFunc());
        case 2:
          newSessionId = _context.sent;
        case 3:
          return _context.abrupt(2);
      }
    }, null, null, null, Promise);
  };
});
