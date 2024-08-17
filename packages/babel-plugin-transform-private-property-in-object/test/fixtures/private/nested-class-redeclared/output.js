var _foo = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, 1);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _foo2 = /*#__PURE__*/new WeakMap();
      let Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          babelHelpers.classPrivateFieldInitSpec(this, _foo2, 2);
        }
        return babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            _foo2.has(babelHelpers.checkInRHS(this));
          }
        }]);
      }();
      _foo.has(babelHelpers.checkInRHS(this));
    }
  }]);
}();
