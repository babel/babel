var Example = /*#__PURE__*/function () {
  "use strict";

  function Example() {}
  var _proto = Example.prototype;
  _proto.test1 = /*#__PURE__*/function () {
    var _test = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee() {
      return babelHelpers.regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve(2);
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function test1() {
      return _test.apply(this, arguments);
    }
    return test1;
  }();
  _proto.test2 = /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function test2() {
    return babelHelpers.regeneratorRuntime().wrap(function test2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return 3;
        case 2:
        case "end":
          return _context2.stop();
      }
    }, test2);
  });
  return Example;
}();
