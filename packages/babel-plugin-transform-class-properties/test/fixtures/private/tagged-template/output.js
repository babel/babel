var _tag = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _tag, void 0);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      babelHelpers.classPrivateFieldGet2(_tag, this).bind(this)``;
    }
  }]);
}();
new Foo();
