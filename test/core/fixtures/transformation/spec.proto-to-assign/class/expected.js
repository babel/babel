"use strict";

var Foo = (function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).apply(this, arguments);
  }

  return Foo;
})(Bar);
