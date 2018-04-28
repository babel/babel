var Foo =
/*#__PURE__*/
function () {
  "use strict";

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
      babelHelpers.classPrivateFieldBase(this, _foo)[_foo]();

      babelHelpers.classPrivateFieldBase(other.obj, _foo)[_foo]();
    }
  }]);
  return Foo;
}();

var _foo = babelHelpers.classPrivateFieldKey("foo");
