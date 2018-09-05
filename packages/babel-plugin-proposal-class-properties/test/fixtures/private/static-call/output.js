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
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _foo).call(Foo, x);
    }
  }]);
  return Foo;
}();

var _foo = {
  writable: true,
  value: function (x) {
    return x;
  }
};
