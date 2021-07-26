var _foo = /*#__PURE__*/new WeakMap();

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, function () {
      return this;
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _other$obj;

      babelHelpers.classPrivateFieldGet2(this, _foo).call(this);
      babelHelpers.classPrivateFieldGet2(_other$obj = other.obj, _foo).call(_other$obj);
    }
  }]);
  return Foo;
}();
