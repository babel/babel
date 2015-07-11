"use strict";

var Foo = (function (_Bar) {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).apply(this, arguments);
    this.bar = "foo";
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
})(Bar);