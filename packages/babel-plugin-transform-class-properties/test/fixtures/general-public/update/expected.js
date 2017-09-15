var Foo =
/*#__PURE__*/
function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, "foo", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 0
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      this.foo++;
      ++this.foo;
      other.obj.foo++;
      ++other.obj.foo;
    }
  }]);
  return Foo;
}();
