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
      babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo]();
      babelHelpers.classPrivateFieldLooseBase(other.obj, _foo)[_foo]();
    }
  }]);
}();
