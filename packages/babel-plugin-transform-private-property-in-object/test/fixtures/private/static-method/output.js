let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return babelHelpers.checkInRHS(other) === Foo;
    }
  }]);
}();
function _foo() {}
