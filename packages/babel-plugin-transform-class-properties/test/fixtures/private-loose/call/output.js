var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
var Foo = /*#__PURE__*/function () {
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
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      this[_foo]();
      other.obj[_foo]();
    }
  }]);
}();
