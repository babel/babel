var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      get: _get_foo,
      set: void 0
    });
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
    }
  }]);
}();
function _get_foo() {}
