var _Foo_brand = /*#__PURE__*/new WeakSet();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return _Foo_brand.has(babelHelpers.checkInRHS(other));
    }
  }]);
}();
function _get_foo(_this) {}
