"use strict";

var Test = (function (Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    Foo.prototype.test;
    Foo.prototype.test.whatever;
  }

  babelHelpers.inherits(Test, Foo);
  return Test;
})(Foo);