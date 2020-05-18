let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return other === Foo;
    }
  }]);
  return Foo;
}();

var _get_foo = function () {};

var _foo = {
  get: _get_foo,
  set: void 0
};
