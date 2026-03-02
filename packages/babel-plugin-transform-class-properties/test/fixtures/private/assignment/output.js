var _foo = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, 0);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _other$obj;
      babelHelpers.classPrivateFieldSet2(_foo, this, babelHelpers.classPrivateFieldGet2(_foo, this) + 1);
      babelHelpers.classPrivateFieldSet2(_foo, this, 2);
      babelHelpers.classPrivateFieldSet2(_foo, _other$obj = other.obj, babelHelpers.classPrivateFieldGet2(_foo, _other$obj) + 1);
      babelHelpers.classPrivateFieldSet2(_foo, other.obj, 2);
    }
  }]);
}();
