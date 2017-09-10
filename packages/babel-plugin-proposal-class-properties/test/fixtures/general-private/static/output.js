var _bar;

var Foo = function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      return babelHelpers.classPrivateFieldGetStatic(Foo, _bar);
    }
  }], [{
    key: "test",
    value: function test() {
      return babelHelpers.classPrivateFieldGetStatic(Foo, _bar);
    }
  }]);
  return Foo;
}();

_bar = new WeakMap();

_bar.set(Foo, "foo");
