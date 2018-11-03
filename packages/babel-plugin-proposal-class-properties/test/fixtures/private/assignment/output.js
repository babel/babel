var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, {
      writable: true,
      value: 0
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _other$obj;

      babelHelpers.classPrivateFieldSet(this, _foo, babelHelpers.classPrivateFieldGet(this, _foo) + 1);
      babelHelpers.classPrivateFieldSet(this, _foo, 2);
      babelHelpers.classPrivateFieldSet(_other$obj = other.obj, _foo, babelHelpers.classPrivateFieldGet(_other$obj, _foo) + 1);
      babelHelpers.classPrivateFieldSet(other.obj, _foo, 2);
    }
  }]);
  return Foo;
}();

var _foo = new WeakMap();
