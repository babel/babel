var Example = /*#__PURE__*/function () {
  "use strict";

  function Example() {}
  var _proto = Example.prototype;
  _proto.test1 = /*#__PURE__*/function () {
    var _test = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
      return babelHelpers.regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return Promise.resolve(2);
          case 1:
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
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return 3;
        case 1:
          return _context2.a(2);
      }
    }, test2);
  });
  return Example;
}();
