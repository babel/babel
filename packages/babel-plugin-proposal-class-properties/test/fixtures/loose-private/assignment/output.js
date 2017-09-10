var _foo;

var Foo = function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 0
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      babelHelpers.classPrivateFieldBase(this, _foo)[_foo] += 1;
      babelHelpers.classPrivateFieldBase(this, _foo)[_foo] = 2;
      babelHelpers.classPrivateFieldBase(other.obj, _foo)[_foo] += 1;
      babelHelpers.classPrivateFieldBase(other.obj, _foo)[_foo] = 2;
    }
  }]);
  return Foo;
}();

_foo = babelHelpers.classPrivateFieldKey("foo");
