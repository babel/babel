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
      var _bar = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee() {
        var baz;
        return babelHelpers.regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              baz = 0;
            case 1:
            case "end":
              return _context.stop();
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
  _foo = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee3() {
    var bar, _bar2;
    return babelHelpers.regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _bar2 = function _bar4() {
            _bar2 = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee2() {
              var baz;
              return babelHelpers.regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    baz = {};
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return _bar2.apply(this, arguments);
          };
          bar = function _bar3() {
            return _bar2.apply(this, arguments);
          };
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _foo.apply(this, arguments);
}
