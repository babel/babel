var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, {
      writable: true,
      value: 0
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _this$foo, _other$obj, _other$obj$foo, _other$obj2;

      babelHelpers.classPrivateFieldSet(this, _foo, (_this$foo = +babelHelpers.classPrivateFieldGet(this, _foo)) + 1), _this$foo;
      babelHelpers.classPrivateFieldSet(this, _foo, +babelHelpers.classPrivateFieldGet(this, _foo) + 1);
      babelHelpers.classPrivateFieldSet(_other$obj = other.obj, _foo, (_other$obj$foo = +babelHelpers.classPrivateFieldGet(_other$obj, _foo)) + 1), _other$obj$foo;
      babelHelpers.classPrivateFieldSet(_other$obj2 = other.obj, _foo, +babelHelpers.classPrivateFieldGet(_other$obj2, _foo) + 1);
    }
  }]);
  return Foo;
}();

var _foo = new WeakMap();
