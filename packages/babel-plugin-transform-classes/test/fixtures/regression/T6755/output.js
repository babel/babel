var Example = /*#__PURE__*/function () {
  "use strict";

  function Example() {}
  var _proto = Example.prototype;
  _proto.test1 = /*#__PURE__*/function () {
    var _test = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
      return babelHelpers.regenerator().w(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve(2);
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    function test1() {
      return _test.apply(this, arguments);
    }
    return test1;
  }();
  _proto.test2 = /*#__PURE__*/babelHelpers.regenerator().m(function test2() {
    return babelHelpers.regenerator().w(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return 3;
        case 2:
          return _context2.a(2);
      }
    }, test2);
  });
  return Example;
}();
