let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(x) {
      return _foo._.call(Foo, x);
    }
  }]);
}();
var _foo = {
  _: function (x) {
    return x;
  }
};
