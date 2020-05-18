let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return Object.prototype.hasOwnProperty.call(other, _foo);
    }
  }]);
  return Foo;
}();

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

var _foo2 = function _foo2() {};

Object.defineProperty(Foo, _foo, {
  value: _foo2
});
