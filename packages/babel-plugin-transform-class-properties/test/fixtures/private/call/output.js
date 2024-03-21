var _foo = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, function () {
      return this;
    });
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _other$obj;
      babelHelpers.classPrivateFieldGet2(_foo, this).call(this);
      babelHelpers.classPrivateFieldGet2(_foo, _other$obj = other.obj).call(_other$obj);
    }
  }]);
}();
