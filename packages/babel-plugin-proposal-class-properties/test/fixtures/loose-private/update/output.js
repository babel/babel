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
      this[_foo]++;
      ++this[_foo];
      other.obj[_foo]++;
      ++other.obj[_foo];
    }
  }]);
  return Foo;
}();

_foo = babelHelpers.classPrivateFieldKey("foo");
