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
      var _other$obj, _other$obj2;

      babelHelpers.privateClassPropertyPutNonSpec(this, _foo, babelHelpers.privateClassPropertyGetNonSpec(this, _foo) + 1);
      babelHelpers.privateClassPropertyPutNonSpec(this, _foo, babelHelpers.privateClassPropertyGetNonSpec(this, _foo) + 1);
      babelHelpers.privateClassPropertyPutNonSpec(this, _foo, 2);
      babelHelpers.privateClassPropertyPutNonSpec(_other$obj, _foo, babelHelpers.privateClassPropertyGetNonSpec(_other$obj = other.obj, _foo) + 1);
      babelHelpers.privateClassPropertyPutNonSpec(_other$obj2, _foo, babelHelpers.privateClassPropertyGetNonSpec(_other$obj2 = other.obj, _foo) + 1);
      babelHelpers.privateClassPropertyPutNonSpec(other.obj, _foo, 2);
    }
  }]);
  return Foo;
}();

_foo = babelHelpers.privateClassPropertyKey("foo");