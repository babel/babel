var _foo = /*#__PURE__*/new WeakMap();
var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      writable: true,
      value: 0
    });
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _this$foo, _this$foo2, _this$foo3, _other$obj, _other$obj$foo, _other$obj$foo2, _other$obj2, _other$obj$foo3;
      babelHelpers.classPrivateFieldSet(this, _foo, (_this$foo = babelHelpers.classPrivateFieldGet(this, _foo), _this$foo2 = _this$foo++, _this$foo)), _this$foo2;
      babelHelpers.classPrivateFieldSet(this, _foo, (_this$foo3 = babelHelpers.classPrivateFieldGet(this, _foo), ++_this$foo3));
      babelHelpers.classPrivateFieldSet(_other$obj = other.obj, _foo, (_other$obj$foo = babelHelpers.classPrivateFieldGet(_other$obj, _foo), _other$obj$foo2 = _other$obj$foo++, _other$obj$foo)), _other$obj$foo2;
      babelHelpers.classPrivateFieldSet(_other$obj2 = other.obj, _foo, (_other$obj$foo3 = babelHelpers.classPrivateFieldGet(_other$obj2, _foo), ++_other$obj$foo3));
    }
  }]);
  return Foo;
}();
