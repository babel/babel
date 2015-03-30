"use strict";

var Foo = (function (_Bar) {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    if (_Bar != null) {
      _Bar.apply(this, arguments);
    }

    this.bar = "foo";
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
})(Bar);
