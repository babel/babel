function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(number) {
    var tmp;
    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          tmp = number;

        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee, this);
  }));
  return _wrapped.apply(this, arguments);
}

function _foo() {
  _foo = babelHelpers.asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function foo() {
    return regeneratorRuntime.wrap(function foo$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          (function (_x) {
            return _wrapped.apply(this, arguments);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }, foo, this);
  }));
  return _foo.apply(this, arguments);
}

function foo() {
  return _foo.apply(this, arguments);
}
