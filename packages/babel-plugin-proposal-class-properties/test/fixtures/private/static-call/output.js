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
      return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _FooStatics, "foo").call(Foo, x);
    }
  }]);
  return Foo;
}();

var _FooStatics = Object.create(null);

babelHelpers.defineProperty(_FooStatics, "foo", function (x) {
  return x;
});
