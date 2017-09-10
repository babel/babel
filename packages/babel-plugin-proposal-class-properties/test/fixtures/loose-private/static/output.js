var _bar;

var Foo = function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      return Foo[_bar];
    }
  }], [{
    key: "test",
    value: function test() {
      return Foo[_bar];
    }
  }]);
  return Foo;
}();

_bar = babelHelpers.classPrivateFieldKey("bar");
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: "foo"
});
