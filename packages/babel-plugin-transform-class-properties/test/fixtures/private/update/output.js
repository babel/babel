var _foo = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, 0);
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _this$foo, _this$foo2, _this$foo3, _other$obj, _other$obj$foo, _other$obj$foo2, _other$obj2, _other$obj$foo3;
      babelHelpers.classPrivateFieldSet2(this, _foo, (_this$foo = babelHelpers.classPrivateFieldGet2(this, _foo), _this$foo2 = _this$foo++, _this$foo)), _this$foo2;
      babelHelpers.classPrivateFieldSet2(this, _foo, (_this$foo3 = babelHelpers.classPrivateFieldGet2(this, _foo), ++_this$foo3));
      babelHelpers.classPrivateFieldSet2(_other$obj = other.obj, _foo, (_other$obj$foo = babelHelpers.classPrivateFieldGet2(_other$obj, _foo), _other$obj$foo2 = _other$obj$foo++, _other$obj$foo)), _other$obj$foo2;
      babelHelpers.classPrivateFieldSet2(_other$obj2 = other.obj, _foo, (_other$obj$foo3 = babelHelpers.classPrivateFieldGet2(_other$obj2, _foo), ++_other$obj$foo3));
    }
  }]);
  return Foo;
}();
