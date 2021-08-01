var _foo = /*#__PURE__*/new WeakMap();

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, 0);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _this$foo, _other$obj, _other$obj$foo, _other$obj2;

      babelHelpers.classPrivateFieldSet2(this, _foo, (_this$foo = +babelHelpers.classPrivateFieldGet2(this, _foo)) + 1), _this$foo;
      babelHelpers.classPrivateFieldSet2(this, _foo, +babelHelpers.classPrivateFieldGet2(this, _foo) + 1);
      babelHelpers.classPrivateFieldSet2(_other$obj = other.obj, _foo, (_other$obj$foo = +babelHelpers.classPrivateFieldGet2(_other$obj, _foo)) + 1), _other$obj$foo;
      babelHelpers.classPrivateFieldSet2(_other$obj2 = other.obj, _foo, +babelHelpers.classPrivateFieldGet2(_other$obj2, _foo) + 1);
    }
  }]);
  return Foo;
}();
