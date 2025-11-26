var _marked = /*#__PURE__*/regeneratorRuntime.mark(testA),
  _marked2 = /*#__PURE__*/regeneratorRuntime.mark(testB);

function testA() {
  return regeneratorRuntime.wrap(function testA$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return Promise.resolve({
          key: "value"
        });
      case 2:
        {
          const {
            resData,
            other: {
              otherData: foo
            }
          } = config;
          return _context.abrupt("return", resData);
        }
      case 4:
      case "end":
        return _context.stop();
    }
  }, _marked);
}

function testB() {
  return regeneratorRuntime.wrap(function testB$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return testA();
      case 2:
      case "end":
        return _context2.stop();
    }
  }, _marked2);
}
