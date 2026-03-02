var _foo = Symbol("foo");
var _bar = Symbol("bar");
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _bar, {
      writable: true,
      value: "bar"
    });
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(this), _bar);
    }
  }], [{
    key: "test",
    value: function test() {
      return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(Foo), _foo);
    }
  }]);
}();
Object.defineProperty(Foo, _foo, {
  writable: true,
  value: "foo"
});
