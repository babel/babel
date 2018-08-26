var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(x) {
      return babelHelpers.classStaticPrivateFieldLooseBase(Foo, Foo)._foo(x);
    }
  }]);
  return Foo;
}();

Object.defineProperty(Foo, "_foo", {
  value: function (x) {
    return x;
  },
  enumerable: false,
  configurable: false,
  writable: true
});
