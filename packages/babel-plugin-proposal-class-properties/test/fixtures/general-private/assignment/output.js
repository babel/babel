var _foo;

var Foo =
/*#__PURE__*/
function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, 0);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _other$obj;

      babelHelpers.classPrivateFieldPut(this, _foo, babelHelpers.classPrivateFieldGet(this, _foo) + 1);
      babelHelpers.classPrivateFieldPut(this, _foo, 2);
      babelHelpers.classPrivateFieldPut(_other$obj = other.obj, _foo, babelHelpers.classPrivateFieldGet(_other$obj, _foo) + 1);
      babelHelpers.classPrivateFieldPut(other.obj, _foo, 2);
    }
  }]);
  return Foo;
}();

_foo = new WeakMap();
