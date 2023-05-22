var _foo = /*#__PURE__*/new WeakSet();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateMethodInitSpec(this, _foo);
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return _foo.has(babelHelpers.checkInRHS(other));
    }
  }]);
  return Foo;
}();
function _foo2() {}
