var _foo;

var Foo = function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      writable: true,
      value: function () {
        return this;
      }
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _other$obj;

      babelHelpers.privateClassPropertyGetNonSpec(this, _foo).call(this);
      babelHelpers.privateClassPropertyGetNonSpec(_other$obj = other.obj, _foo).call(_other$obj);
    }
  }]);
  return Foo;
}();

_foo = babelHelpers.privateClassPropertyKey("foo");