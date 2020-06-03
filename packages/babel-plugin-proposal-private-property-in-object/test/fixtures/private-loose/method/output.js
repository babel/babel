var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return Object.prototype.hasOwnProperty.call(other, _foo);
    }
  }]);
  return Foo;
}();

var _foo2 = function _foo2() {};
