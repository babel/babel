/*#__PURE__*/React.createElement(Component, null, () => {
  const saveSession = () => {
    var newSessionId;
    return babelHelpers.regeneratorAsync(function (_context) {
      while (1) switch (_context.next) {
        case 0:
          _context.next = 1;
          return babelHelpers.awaitAsyncGenerator(someAsyncFunc());
        case 1:
          newSessionId = _context.sent;
        case 2:
          return _context.abrupt(2);
      }
    }, null, null, null, Promise);
  };
});
