var _foo = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, 1);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return _foo.has(babelHelpers.checkInRHS(other));
    }
  }]);
}();
