"use strict";

var Foo = (function (_Bar) {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    this.foo = "bar";
    babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).call(this);
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
})(Bar);