let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return babelHelpers.checkInRHS(other) === Foo && _foo !== void 0;
    }
  }]);
}();
var _foo = {
  _: 1
};
