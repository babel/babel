function foo() {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = babelHelpers.asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          /*#__PURE__*/
          (function () {
            var _ref = babelHelpers.asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee(number) {
              var tmp;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    tmp = number;

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }, _callee, this);
            }));

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          })();

        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _foo.apply(this, arguments);
}
