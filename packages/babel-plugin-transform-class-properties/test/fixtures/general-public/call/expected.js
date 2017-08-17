var Foo = function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    this.foo = function () {
      return this;
    };
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      this.foo();
      other.obj.foo();
    }
  }]);
  return Foo;
}();