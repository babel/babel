React.createElement(Component, null, () => {
  const saveSession = () => {
    var newSessionId;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(someAsyncFunc());

        case 2:
          newSessionId = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    });
  };
});
