"use strict";

var Foo = (function (_Bar) {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).call(this);
    this.bar = "foo";
  }

  babelHelpers.inherits(Foo, _Bar);
  babelHelpers.createClass(Foo, [{
    key: "bar",
    value: undefined,
    enumerable: true
  }]);
  return Foo;
})(Bar);