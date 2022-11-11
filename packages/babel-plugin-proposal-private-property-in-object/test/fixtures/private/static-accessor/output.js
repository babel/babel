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
function _get_foo() {}
var _foo = {
  get: _get_foo,
  set: void 0
};
