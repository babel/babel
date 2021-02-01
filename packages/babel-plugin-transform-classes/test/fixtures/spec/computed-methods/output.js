var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "foo",
    value: function foo() {
      "second";
    }
  }, {
    key: bar,
    value: function value() {}
  }, {
    key: bar + "foo",
    value: function value() {}
  }]);
  return Foo;
}();
