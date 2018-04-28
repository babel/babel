var Foo =
/*#__PURE__*/
function () {
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

      babelHelpers.classPrivateFieldGet(this, _foo).call(this);
      babelHelpers.classPrivateFieldGet(_other$obj = other.obj, _foo).call(_other$obj);
    }
  }]);
  return Foo;
}();

var _foo = new WeakMap();
