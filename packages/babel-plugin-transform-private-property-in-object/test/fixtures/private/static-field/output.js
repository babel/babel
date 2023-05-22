let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return babelHelpers.checkInRHS(other) === Foo;
    }
  }]);
  return Foo;
}();
var _foo = {
  writable: true,
  value: 1
};
