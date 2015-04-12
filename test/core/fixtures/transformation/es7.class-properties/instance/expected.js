"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    this.bar = "foo";
  }

  babelHelpers.createClass(Foo, [{
    key: "bar",
    value: undefined,
    enumerable: true
  }]);
  return Foo;
})();