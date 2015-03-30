"use strict";

var _temp;

var Foo = (function (_Bar) {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    foo((_temp = babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).call(this), this.bar = "foo", _temp));
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
})(Bar);
