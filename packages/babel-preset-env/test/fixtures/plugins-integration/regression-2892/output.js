"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Foo = exports["default"] = /*#__PURE__*/function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }
  return babelHelpers.createClass(Foo, [{
    key: "bar",
    value: function () {
      var _bar = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
        var baz;
        return babelHelpers.regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              baz = 0;
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }));
      function bar() {
        return _bar.apply(this, arguments);
      }
      return bar;
    }()
  }]);
}();
function foo() {
  return _foo.apply(this, arguments);
}
function _foo() {
  _foo = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee3() {
    var bar, _bar2;
    return babelHelpers.regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _bar2 = function _bar4() {
            _bar2 = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee2() {
              var baz;
              return babelHelpers.regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    baz = {};
                  case 1:
                    return _context2.a(2);
                }
              }, _callee2);
            }));
            return _bar2.apply(this, arguments);
          };
          bar = function _bar3() {
            return _bar2.apply(this, arguments);
          };
        case 1:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return _foo.apply(this, arguments);
}
