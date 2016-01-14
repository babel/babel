export default class Foo {
  bar() {
    var _this = this;

    return babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var baz;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            baz = 0;

          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee, _this);
    }))();
  }
}
