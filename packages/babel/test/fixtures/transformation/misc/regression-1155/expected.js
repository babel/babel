"use strict";

var Foo = (function (_Bar) {
  function Foo(options) {
    babelHelpers.classCallCheck(this, Foo);

    var parentOptions = {};
    parentOptions.init = function () {
      this;
    };
    babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).call(this, parentOptions);
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
})(Bar);
