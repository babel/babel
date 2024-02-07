var _foo = /*#__PURE__*/new WeakMap();
var _bar = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, 1);
    babelHelpers.classPrivateFieldInitSpec(this, _bar, 1);
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _bar2 = /*#__PURE__*/new WeakMap();
      let Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          babelHelpers.classPrivateFieldInitSpec(this, _bar2, 2);
        }
        babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            babelHelpers.classPrivateFieldGet2(this, _foo);
            babelHelpers.classPrivateFieldGet2(this, _bar2);
          }
        }]);
        return Nested;
      }();
      babelHelpers.classPrivateFieldGet2(this, _foo);
      babelHelpers.classPrivateFieldGet2(this, _bar);
    }
  }]);
  return Foo;
}();
