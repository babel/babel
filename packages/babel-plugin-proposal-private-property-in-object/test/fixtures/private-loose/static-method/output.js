var _foo = /*#__PURE__*/Symbol("foo");
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
    }
  }]);
  return Foo;
}();
function _foo2() {}
Object.defineProperty(Foo, _foo, {
  value: _foo2
});
