var Foo = function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    this.foo = 0;
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      this.foo++;
      this.foo += 1;
      this.foo = 2;
      other.obj.foo++;
      other.obj.foo += 1;
      other.obj.foo = 2;
    }
  }]);
  return Foo;
}();