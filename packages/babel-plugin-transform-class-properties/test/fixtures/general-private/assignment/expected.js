var _foo;

var Foo = function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, 0);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _other$obj;

      babelHelpers.privateClassPropertyPutSpec(this, _foo, babelHelpers.privateClassPropertyGetSpec(this, _foo) + 1);
      babelHelpers.privateClassPropertyPutSpec(this, _foo, 2);
      babelHelpers.privateClassPropertyPutSpec(_other$obj = other.obj, _foo, babelHelpers.privateClassPropertyGetSpec(_other$obj, _foo) + 1);
      babelHelpers.privateClassPropertyPutSpec(other.obj, _foo, 2);
    }
  }]);
  return Foo;
}();

_foo = new WeakMap();
