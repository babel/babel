var _foo = /*#__PURE__*/new WeakMap();
var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      writable: true,
      value: 1
    });
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
        }
        babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            babelHelpers.classPrivateFieldGet(this, _foo);
          }
        }]);
        return Nested;
      }();
      babelHelpers.classPrivateFieldGet(this, _foo);
    }
  }]);
  return Foo;
}();
