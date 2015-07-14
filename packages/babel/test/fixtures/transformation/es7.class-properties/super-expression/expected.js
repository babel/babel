"use strict";

var Foo = (function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _temp;

    babelHelpers.classCallCheck(this, Foo);

    foo((_temp = babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).call(this), this.bar = "foo", _temp));
  }

  return Foo;
})(Bar);
