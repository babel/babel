var _foo;

var Foo = function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, 0);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _this$foo, _other$obj, _other$obj$foo, _other$obj2;

      babelHelpers.classPrivateFieldPut(this, _foo, (_this$foo = +babelHelpers.classPrivateFieldGet(this, _foo)) + 1), _this$foo;
      babelHelpers.classPrivateFieldPut(this, _foo, babelHelpers.classPrivateFieldGet(this, _foo) + 1);
      babelHelpers.classPrivateFieldPut(_other$obj = other.obj, _foo, (_other$obj$foo = +babelHelpers.classPrivateFieldGet(_other$obj, _foo)) + 1), _other$obj$foo;
      babelHelpers.classPrivateFieldPut(_other$obj2 = other.obj, _foo, babelHelpers.classPrivateFieldGet(_other$obj2, _foo) + 1);
    }
  }]);
  return Foo;
}();

_foo = new WeakMap();
