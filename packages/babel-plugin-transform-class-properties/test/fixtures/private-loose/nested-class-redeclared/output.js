var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          Object.defineProperty(this, _foo2, {
            writable: true,
            value: 2
          });
        }
        return babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            babelHelpers.classPrivateFieldLooseBase(this, _foo2)[_foo2];
          }
        }]);
      }();
      babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
    }
  }]);
}();
