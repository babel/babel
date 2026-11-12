var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
    }
  }]);
}();
Object.defineProperty(Foo, _foo, {
  writable: true,
  value: 1
});
