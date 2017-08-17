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
      this[_foo] += 1;
      this[_foo] = 2;
      other.obj[_foo]++;
      other.obj[_foo] += 1;
      other.obj[_foo] = 2;
    }
  }]);
  return Foo;
}();

_foo = babelHelpers.privateClassPropertyKey("foo");