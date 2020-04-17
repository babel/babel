var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _this = this;

      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
        }

        babelHelpers.createClass(Nested, [{
          key: babelHelpers.classPrivateFieldLooseBase(_this, _foo)[_foo],
          value: function () {}
        }]);
        return Nested;
      }();

      babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
    }
  }]);
  return Foo;
}();

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");
