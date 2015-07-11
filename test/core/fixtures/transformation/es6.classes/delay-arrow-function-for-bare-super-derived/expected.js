"use strict";

var Foo = (function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).call(this, function () {
      _this.test;
    });

    var _this = this;
  }

  return Foo;
})(Bar);
