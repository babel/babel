var _foo = babelHelpers.temporalUndefined;

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(x) {
      return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _foo).call(Foo, x);
    }
  }]);
  return Foo;
}();

_foo = function (x) {
  return x;
};
